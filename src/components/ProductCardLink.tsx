"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ProductCardLinkProps {
    product: {
        id: string;
        name: string;
        image: string | null;
        estimatedValue: number | null;
    };
}

export default function ProductCardLink({ product }: ProductCardLinkProps) {
    const router = useRouter();
    const toastIdRef = useRef<number | string | null>(null);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
            e.preventDefault();
            // Show loading toast and store id
            toastIdRef.current = toast.loading("Loading item details...", { duration: 10000 });
            router.push(`/item/${product.id}`);
        },
        [router, product.id]
    );

    // Dismiss toast when component unmounts (navigation away)
    useEffect(() => {
        return () => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
                toastIdRef.current = null;
            }
        };
    }, []);

    return (
        <a
            href={`/item/${product.id}`}
            onClick={handleClick}
            className="group"
            tabIndex={0}
            aria-label={`View details for ${product.name}`}
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
        </a>
    );
}
