import { Category, Product } from "./types";
import ProductoAdminCard from "./ProductoAdminCard.tsx";

interface Props {
  category: Category;
  data: Category[];
  onEditProduct: (product: Product) => void;
  onUpdate: () => void;
}

const CategoriaCard: React.FC<Props> = ({ category, data, onEditProduct, onUpdate }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {category.products.map((product) => (
          <ProductoAdminCard
            key={product.id}
            product={product}
            categorySlug={category.slug}
            allData={data}
            onEdit={() => onEditProduct(product)}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriaCard;
