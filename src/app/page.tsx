import ProductCardLink from "@/components/ProductCardLink";
import { fetchProducts } from "@/lib/notion";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center h-16 px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight flex items-center gap-2">
            <ShoppingBag />
            ESTATE SALE
          </span>
        </div>
      </header> */}
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
