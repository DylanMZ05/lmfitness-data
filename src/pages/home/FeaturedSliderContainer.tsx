import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Category, Product } from "../../data/products";
import FeaturedSlider from "../../components/FeaturedSlider";

interface Props {
  title: string;
  bgColor?: string;
  mode?: "featured" | "exclusive";
}

const FeaturedSliderContainer: React.FC<Props> = ({
  title,
  bgColor,
  mode = "featured",
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasSnap = await getDocs(collection(db, "productos"));

        // ✅ Cargamos todas las categorías en paralelo
        const categoriasData = await Promise.all(
          categoriasSnap.docs.map(async (catDoc) => {
            const catData = catDoc.data();
            const itemsSnap = await getDocs(collection(catDoc.ref, "items"));
            const productos: Product[] = itemsSnap.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                title: data.title,
                price: Number(data.price),
                offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
                images: Array.isArray(data.images)
                  ? data.images.map((img: string) => img.replace(/^\/+/, ""))
                  : [],
                featuredId: data.featuredId ?? null,
                exclusiveId: data.exclusiveId ?? null,
              };
            });

            return {
              name: catData.name,
              slug: catDoc.id,
              image: catData.image,
              orden: parseInt(catData.orden ?? "999"),
              products: productos,
            } as Category;
          })
        );

        setCategories(categoriasData);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className={`w-full flex flex-col items-center px-4 ${bgColor}`}
      aria-labelledby="featured-title"
    >
      {/* SEO + Accesibilidad */}
      <h2
        id="featured-title"
        className="text-2xl font-bold text-black/90 mt-6 mb-4 text-center"
      >
        {title}
      </h2>

      <div className="w-full flex justify-center min-h-[440px]">
        {loading ? (
          <div
            className="flex gap-4"
            role="status"
            aria-label="Cargando productos destacados"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-[250px] h-[400px] flex-shrink-0 bg-white border border-black/10 shadow-md rounded-lg p-4 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-4" />
                <div className="flex-1 flex flex-col justify-start gap-2">
                  <div className="w-3/4 h-4 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-100 rounded" />
                  <div className="w-1/2 h-3 bg-gray-100 rounded" />
                </div>
                <div className="mt-4 w-full h-8 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <FeaturedSlider title="" categories={categories} mode={mode} />
        )}
      </div>
    </section>
  );
};

export default FeaturedSliderContainer;
