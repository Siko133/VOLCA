import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}