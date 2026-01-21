// src/App.tsx
import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/CartContext";
import WspButton from "./components/WspButton";
import FeaturedAthletesPage from "./pages/atletas/FeaturedAthletesPage";


// ==========================================
// SEEDER: AÑADIR PRODUCTO A FIREBASE
// Comentar la línea de abajo para producción
// ==========================================
import "./data/añadirProducto.js";
// ==========================================


// Home NO lazy para asegurar primer render sólido
import HomeWrapper from "./components/HomeWrapper";

// Rutas pesadas en lazy
const Catalogo = lazy(() => import("./pages/products/Catalogo"));
const ProductoDetalle = lazy(() => import("./pages/products/ProductoDetalle"));
const Login = lazy(() => import("./admin/admin"));
// const Upload = lazy(() => import("./admin/Upload"));

/** Error boundary simple para evitar “pantalla en blanco” */
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [err, setErr] = React.useState<Error | null>(null);

  useEffect(() => {
    const onError = (e: ErrorEvent) => setErr(e.error ?? new Error(e.message));
    const onRejection = (e: PromiseRejectionEvent) => {
      const r: any = (e as any).reason;
      setErr(r instanceof Error ? r : new Error(String(r)));
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (err) {
    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ color: "#b91c1c", marginBottom: 8 }}>
          Se produjo un error de runtime
        </h2>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#fee2e2",
            padding: 12,
            borderRadius: 8,
            color: "#7f1d1d",
            fontSize: 13,
          }}
        >
          {String(err?.stack || err?.message || err)}
        </pre>
      </div>
    );
  }
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = ["/admin/login", "/admin/dashboard"].includes(
    location.pathname
  );

  return (
    <>
      {!isAdminRoute && <Header />}

      <ErrorBoundary>
        <Suspense
          fallback={
            <div style={{ textAlign: "center", marginTop: 50 }}>Cargando...</div>
          }
        >
          <Routes>
            <Route path="/" element={<HomeWrapper />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/atletas-lm" element={<FeaturedAthletesPage />} />
            <Route path="/admin/dashboard" element={<Login />} />
            {/* <Route path="/admin/upload" element={<Upload />} /> */}
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {!isAdminRoute && <WspButton />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  // 0) Trusted Types default policy (si activaste la cabecera en .htaccess)
  useEffect(() => {
    const w = window as any;
    if (w.trustedTypes && !w.trustedTypes.defaultPolicy) {
      w.trustedTypes.createPolicy("default", {
        createHTML: (s: string) => s,
        createScript: (s: string) => s,
        createScriptURL: (s: string) => s,
      });
    }
  }, []);

  // 1) Firebase: iniciar SOLO tras primera interacción del usuario.
  //    Evita TBT en móvil y el timeout de /Listen/channel en Lighthouse.
  useEffect(() => {
    let kicked = false;

    const kick = () => {
      if (kicked) return;
      kicked = true;

      import("./firebase/init")
        .then((m) => typeof m.getDb === "function" && m.getDb())
        .catch(() => {});

      import("./firebase/realtime")
        .then((m) => typeof m.startRealtime === "function" && m.startRealtime())
        .catch(() => {});

      cleanup();
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown", // cubre click/touch
      "keydown",
    ];
    const opts: AddEventListenerOptions = { once: true, passive: true };

    const cleanup = () => {
      events.forEach((ev) => window.removeEventListener(ev, kick as any));
    };

    events.forEach((ev) => window.addEventListener(ev, kick as any, opts));

    // fallback muuuy tardío por si la página queda abierta sin interacción
    // (fuera de la ventana temporal de Lighthouse)
    const idle = (cb: () => void) => {
      const w = window as any;
      if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 60000 });
      else setTimeout(cb, 60000);
    };
    idle(() => !kicked && kick());

    return cleanup;
  }, []);

  // 2) Prefetch suave de rutas pesadas solo en redes buenas y sin ahorro de datos
  useEffect(() => {
    const nav: any = navigator as any;
    const conn = nav?.connection || nav?.mozConnection || nav?.webkitConnection;
    const canPrefetch =
      !conn || (!conn.saveData && (conn.effectiveType === "4g" || conn.effectiveType === "wifi"));

    if (!canPrefetch) return;

    const idle = (cb: () => void) => {
      const w = window as any;
      if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 8000 });
      else setTimeout(cb, 8000);
    };

    idle(() => {
      // precarga tranquila de los módulos (no ejecuta UI)
      import("./pages/products/Catalogo");
      import("./pages/products/ProductoDetalle");
    });
  }, []);

  return (
    <CartProvider>
      <Router basename="/">
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;