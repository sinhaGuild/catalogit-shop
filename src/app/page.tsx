import { Card } from "@/components/ui/card";
import { fetchProducts } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

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
            <Link
              key={product.id}
              href={`/item/${product.id}`}
              className="group"
              prefetch={false}
            >
              <Card className="flex flex-col items-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-zinc-50 dark:bg-zinc-800">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="object-contain w-full h-full"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center w-full px-4 py-3 gap-2">
                  <span className="font-semibold text-base text-center w-full truncate">{product.name}</span>
                  <span className="inline-block bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1 text-sm">
                    {product.estimatedValue !== null
                      ? `₹${(product.estimatedValue * 81.6).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                      : "N/A"}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
