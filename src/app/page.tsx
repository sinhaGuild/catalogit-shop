import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="container mx-auto py-12">
      <nav className="w-full max-w-5xl mx-auto mb-6 flex items-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow">
          CatalogIt Shop
        </span>
      </nav>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/item/${product.id}`}
            className="group"
            prefetch={false}
          >
            <Card className="transition-transform duration-200 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden rounded-2xl border-2 border-transparent group-hover:border-primary bg-white/90 dark:bg-zinc-900/80">
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-full aspect-[4/3] flex items-center justify-center mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={320}
                      height={240}
                      className="object-cover w-full h-full transition-all duration-200 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
                      No Image
                    </div>
                  )}
                </div>
                <div className="w-full text-center">
                  <h2 className="text-lg font-semibold mb-1 truncate">{product.name}</h2>
                  <div className="text-primary font-bold text-xl">
                    {product.estimatedValue !== null
                      ? `₹${(product.estimatedValue * 81.6).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                      : "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
