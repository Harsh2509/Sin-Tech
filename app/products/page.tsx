import ProductCard from "@/components/ProductCard";
import { Products } from "@/lib/products";

export default function Page() {
  const products = Products.getInstance();
  return (
    <div className="flex justify-center gap-9 md:gap-28 mt-9 flex-wrap">
      {products.all().map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
