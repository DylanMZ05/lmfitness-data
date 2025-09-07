// src/hooks/useCatalog.ts
import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocsFromServer,
  getDocFromServer,
  doc,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

/* ===========================
   Tipos
=========================== */
export interface Product {
  id: string;
  title: string;
  price: string; // en catálogo mostramos string
  offerPrice?: string;
  description?: string;
  longDescription?: string;
  images: string[];
  sinStock?: boolean;
  selectedSabor?: string;
  sabores?: string[];
  sabor?: string; // lo usa el carrito
  /** posición dentro de la categoría (admin) */
  orden?: number;
}

export interface Category {
  name: string;
  slug: string;
  image?: string;
  orden?: number;
  products: Product[];
}

/* ===========================
   Claves de caché
=========================== */
const CACHE_KEY_DATA = "catalogCacheV1:data";
const CACHE_KEY_VERSION = "catalogCacheV1:version";
const CACHE_KEY_UPDATED_AT = "catalogCacheV1:updatedAt";
const CACHE_KEY_INDEX = "catalogCacheV1:index"; // { [productId]: categorySlug }

/* ===========================
   Utils
=========================== */
const hasWindow = typeof window !== "undefined";
const byOrdenThenTitle = (a: Product, b: Product) => {
  const ao = Number((a as any).orden ?? 9999);
  const bo = Number((b as any).orden ?? 9999);
  if (ao !== bo) return ao - bo;
  return a.title.localeCompare(b.title, "es", { sensitivity: "base" });
};

/** Normaliza un producto proveniente de Firestore a nuestro tipo Product */
function normalizeProduct(raw: DocumentData, id: string): Product {
  const price =
    raw?.price !== undefined && raw?.price !== null ? String(raw.price) : "";
  const offerPrice =
    raw?.offerPrice !== undefined && raw?.offerPrice !== null
      ? String(raw.offerPrice)
      : undefined;

  const images: string[] = Array.isArray(raw?.images)
    ? (raw.images as unknown[]).map((x) => String(x))
    : [];

  const sabores: string[] | undefined = Array.isArray(raw?.sabores)
    ? (raw.sabores as unknown[]).map((x) => String(x).trim())
    : undefined;

  const orden =
    typeof raw?.orden === "number" ? (raw.orden as number) : undefined;

  return {
    id,
    title: String(raw?.title ?? ""),
    price,
    offerPrice,
    description: raw?.description ? String(raw.description) : undefined,
    longDescription: raw?.longDescription
      ? String(raw.longDescription)
      : undefined,
    images,
    sinStock: Boolean(raw?.sinStock),
    sabores,
    orden,
  };
}

/* ===========================
   META: versión/updatedAt
   (se escribe desde el admin en: meta/catalog)
=========================== */
export async function fetchCatalogMeta(): Promise<{
  version?: string | number;
  updatedAt?: number;
} | null> {
  try {
    const metaRef = doc(db, "meta", "catalog");
    const snap = await getDoc(metaRef);
    if (!snap.exists()) return null;
    const data = snap.data() as {
      version?: string | number;
      updatedAt?: Timestamp | number;
    };
    return {
      version: data.version,
      updatedAt:
        typeof data.updatedAt === "number"
          ? data.updatedAt
          : data.updatedAt?.toMillis
          ? data.updatedAt.toMillis()
          : undefined,
    };
  } catch (e) {
    console.warn("No se pudo leer meta/catalog:", e);
    return null;
  }
}

/* ===========================
   Carga completa desde server
   (LECTURAS: 1 por categoría + 1 por items de esa categoría)
=========================== */
export async function fetchCatalogDataFromServer(): Promise<{
  categorias: Category[];
  index: Record<string, string>;
}> {
  const categoriasSnap = await getDocsFromServer(collection(db, "productos"));
  const categorias: Category[] = [];
  const index: Record<string, string> = {};

  for (const catDoc of categoriasSnap.docs) {
    const catData = catDoc.data() as DocumentData;

    // Ocultar SIN STOCK y oculta:true
    if (catData?.oculta || String(catData?.name || "").toUpperCase() === "SIN STOCK") {
      continue;
    }

    const itemsSnap = await getDocsFromServer(collection(catDoc.ref, "items"));
    const productos: Product[] = itemsSnap.docs.map((docu) => {
      const raw = docu.data();
      const p = normalizeProduct(raw, docu.id);
      index[p.id] = catDoc.id; // mapear producto -> categoria
      return p;
    });

    productos.sort(byOrdenThenTitle);

    categorias.push({
      name: String(catData?.name || "Sin nombre"),
      image: catData?.image ? String(catData.image) : undefined,
      slug: catDoc.id,
      orden: Number.parseInt(String(catData?.orden ?? "999"), 10),
      products: productos,
    });
  }

  categorias.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
  return { categorias, index };
}

/* ===========================
   Helpers de caché (localStorage)
=========================== */
export function readCache(): {
  data?: Category[];
  version?: string | number;
  updatedAt?: number;
  index?: Record<string, string>;
} {
  if (!hasWindow) return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY_DATA);
    const ver = window.localStorage.getItem(CACHE_KEY_VERSION);
    const up = window.localStorage.getItem(CACHE_KEY_UPDATED_AT);
    const idx = window.localStorage.getItem(CACHE_KEY_INDEX);

    return {
      data: raw ? (JSON.parse(raw) as Category[]) : undefined,
      version: ver !== null ? (isNaN(Number(ver)) ? ver : Number(ver)) : undefined,
      updatedAt: up ? Number(up) : undefined,
      index: idx ? (JSON.parse(idx) as Record<string, string>) : undefined,
    };
  } catch {
    return {};
  }
}

export function writeCache(
  data: Category[],
  version?: string | number,
  updatedAt?: number,
  index?: Record<string, string>
) {
  if (!hasWindow) return;
  try {
    window.localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(data));
    if (version !== undefined)
      window.localStorage.setItem(CACHE_KEY_VERSION, String(version));
    if (updatedAt !== undefined)
      window.localStorage.setItem(CACHE_KEY_UPDATED_AT, String(updatedAt));
    if (index)
      window.localStorage.setItem(CACHE_KEY_INDEX, JSON.stringify(index));
  } catch {
    // quota excedida u otros: ignoramos
  }
}

export function clearCache() {
  if (!hasWindow) return;
  window.localStorage.removeItem(CACHE_KEY_DATA);
  window.localStorage.removeItem(CACHE_KEY_VERSION);
  window.localStorage.removeItem(CACHE_KEY_UPDATED_AT);
  window.localStorage.removeItem(CACHE_KEY_INDEX);
}

/* ===========================
   Estrategia de carga con caché
=========================== */
/**
 * Carga catálogo con estrategia:
 * 1) Mostrar cache inmediato si versión coincide (o si no hay meta, usar TTL).
 * 2) Hacer 1 lectura a meta para comparar versión.
 * 3) Si cambió, recargar del server, guardar cache y devolver actualizado.
 *
 * @param options
 *  - fallbackTtlMs: si no hay doc meta, cuánto tiempo considerar válido el cache (ej: 6h).
 */
export async function loadCatalogWithCache(options?: {
  fallbackTtlMs?: number;
}): Promise<{
  data: Category[];
  fromCache: boolean;
  changed: boolean;
}> {
  const fallbackTtlMs = options?.fallbackTtlMs ?? 6 * 60 * 60 * 1000; // 6h
  const cached = readCache();

  // Intento cache inmediato (el componente decide mostrarlo)
  const immediate = cached.data;

  // 1 lectura: meta (versión/updatedAt)
  const meta = await fetchCatalogMeta();

  // Con meta: comparar versión
  if (meta && (meta.version !== undefined || meta.updatedAt !== undefined)) {
    const sameVersion =
      cached.version !== undefined &&
      String(cached.version) === String(meta.version);

    if (sameVersion && immediate) {
      return { data: immediate, fromCache: true, changed: false };
    }

    // Cambió -> recargo (lecturas: categorías + items)
    const { categorias, index } = await fetchCatalogDataFromServer();
    writeCache(categorias, meta.version, meta.updatedAt, index);
    return { data: categorias, fromCache: false, changed: true };
  }

  // Sin meta: TTL
  if (immediate && cached.updatedAt) {
    const age = Date.now() - cached.updatedAt;
    if (age <= fallbackTtlMs) {
      return { data: immediate, fromCache: true, changed: false };
    }
  }

  // Sin meta o cache viejo -> server
  const { categorias, index } = await fetchCatalogDataFromServer();
  writeCache(categorias, undefined, Date.now(), index);
  return { data: categorias, fromCache: false, changed: true };
}

/* ===========================
   Detalle eficiente por ID
=========================== */
/**
 * Busca un producto por id usando:
 * 1) Cache (categorías en memoria) si versión/TTL válido.
 * 2) Índice {id -> categoria} para evitar barrer todo (1 lectura al doc de producto).
 * 3) Si no hay índice válido, último recurso: escaneo.
 *
 * Devuelve { product, categorySlug, fromCache }.
 */
export async function getProductByIdWithCache(
  id: string,
  options?: { fallbackTtlMs?: number }
): Promise<{
  product: Product | null;
  categorySlug: string | null;
  fromCache: boolean;
}> {
  const fallbackTtlMs = options?.fallbackTtlMs ?? 6 * 60 * 60 * 1000;
  const cached = readCache();

  // 1) Intento usar cache por versión/meta
  const meta = await fetchCatalogMeta(); // 1 lectura
  const cacheFreshByVersion =
    !!meta && cached.version !== undefined && String(cached.version) === String(meta.version);

  const cacheFreshByTtl =
    !meta && cached.updatedAt !== undefined && Date.now() - cached.updatedAt <= fallbackTtlMs;

  const cacheUsable = (cacheFreshByVersion || cacheFreshByTtl) && !!cached.data;

  if (cacheUsable && cached.data) {
    for (const cat of cached.data) {
      const p = cat.products.find((x) => x.id === id);
      if (p) return { product: p, categorySlug: cat.slug, fromCache: true };
    }
  }

  // 2) Si tengo índice usable, leo 1 doc directo
  const indexUsable =
    (cacheFreshByVersion || cacheFreshByTtl) &&
    cached.index &&
    typeof cached.index[id] === "string";

  if (indexUsable) {
    try {
      const catSlug = cached.index![id];
      const ref = doc(db, "productos", catSlug, "items", id);
      const snap = await getDocFromServer(ref); // lectura directa fresca
      if (snap.exists()) {
        const data = normalizeProduct(snap.data()!, snap.id);
        return { product: data, categorySlug: catSlug, fromCache: false };
      }
      // si no existe, caemos al 3)
    } catch (e) {
      console.warn("Falló lectura directa por índice:", e);
    }
  }

  // 3) Último recurso: barrer
  try {
    const { categorias } = await fetchCatalogDataFromServer();
    for (const cat of categorias) {
      const p = cat.products.find((x) => x.id === id);
      if (p) return { product: p, categorySlug: cat.slug, fromCache: false };
    }
  } catch (e) {
    console.error("Escaneo total falló:", e);
  }

  return { product: null, categorySlug: null, fromCache: false };
}
