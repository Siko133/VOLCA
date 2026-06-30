import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/context/CartContext";

export const metadata: Metadata = {
  title: "VOLCA",
  description: "Premium Streetwear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}