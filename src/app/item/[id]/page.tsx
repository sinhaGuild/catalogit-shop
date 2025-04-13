import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchProducts } from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-2 py-4 sm:px-0">
            <nav className="w-full max-w-md mb-4 flex items-center">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                >
                    ← Home
                </a>
            </nav>
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {product.images.map((img, idx) => (
                                    <CarouselItem key={img + idx} className="flex items-center justify-center w-full h-full">
                                        <div className="relative w-full h-60 sm:h-80 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={product.name}
                                                width={400}
                                                height={300}
                                                className="object-contain w-full h-full"
                                                priority={idx === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-center mb-1">{product.name}</h1>
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <span className="text-primary font-bold text-xl">
                            {product.estimatedValue !== null
                                ? `₹${(product.estimatedValue * 81.6).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="text-base text-center text-muted-foreground mb-2">
                        {product.description || "No description available."}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="font-semibold">Condition:</span> {product.condition || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Material:</span> {product.material || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Weight:</span> {product.weight !== null ? `${product.weight}g` : "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Dimensions:</span> {product.dimensions || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Year Made:</span> {product.yearMade !== null ? product.yearMade : "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
