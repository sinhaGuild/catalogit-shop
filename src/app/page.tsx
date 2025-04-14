export const dynamic = "force-dynamic";
import ProductCardLink from "@/components/ProductCardLink";
import { fetchProducts } from "@/lib/notion";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1">
          {products.map((product) => (
            <ProductCardLink key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
