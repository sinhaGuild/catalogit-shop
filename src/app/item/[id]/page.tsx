import ItemImageGallery from "@/components/ItemImageGallery";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/lib/notion";
import { Separator } from "@radix-ui/react-separator";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    // Dynamically construct the product URL
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = host && host.startsWith("localhost") ? "http" : "https";
    const productUrl = host ? `${protocol}://${host}/item/${id}` : "";

    const whatsappMessage = `Hi, I'm interested in "${product.name}".\n${productUrl}`;

    return (
        <div className="min-h-screen bg-background px-4 py-2">
            {/* Header */}

            <main className="flex flex-col items-center px-2 py-8 sm:px-0 w-full">
                <div className="max-w-screen-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <ItemImageGallery images={product.images} alt={product.name} />
                    <div className="p-6 flex flex-col gap-3">
                        <h1 className="text-2xl font-bold text-center mb-1">{product.name}</h1>
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="inline-block bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1 text-lg">
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
                        <div className="uppercase tracking-widest">Details (approximate)</div>
                        <Separator className="my-2" />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Condition:</span> {product.condition || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Material:</span> {product.material || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Weight:</span> {product.weight !== null ? `${product.weight}kg` : "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Dimensions (in cm):</span> {product.dimensions || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Year Made:</span> {product.yearMade !== null ? product.yearMade : "N/A"}
                            </div>
                        </div>
                        <a
                            href={`https://wa.me/917899234352?text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex justify-center items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-lg shadow transition"
                        >
                            Contact Us on WhatsApp
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
