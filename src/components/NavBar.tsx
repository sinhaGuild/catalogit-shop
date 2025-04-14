"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "917899234352";
const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi, I have a question about your catalog items."
);

export function NavBar() {
    return (
        <nav className="sticky top-0 w-full flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm z-[100]">
            <div className="flex items-center gap-4">
                <span className="font-bold text-xl tracking-tight flex items-center gap-2">
                    <Link href={"/"}>
                        <ShoppingBag />
                    </Link>
                    ESTATE SALE
                </span>
                <Link
                    href="/"
                    className="px-4 py-2 rounded-md font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
                >
                    All Items
                </Link>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md font-semibold text-green-700 bg-green-100 hover:bg-green-200 transition"
                >
                    Contact us
                </a>
            </div>
        </nav>
    );
}

export default NavBar;
