export const runtime = "edge";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/lib/products";

export default function Page() {
  const products = Products.getInstance();
  return (
    <div className="flex justify-center gap-9 md:gap-6 mt-9 flex-wrap items-center">
      {products.all().map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
