import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import ToastContainer from "@/components/ui/ToastContainer";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Carto — Find It. Cart It. Get It.",
  description: "Minimalist e-commerce for high-fidelity headphones and audio gear.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-gray-50/50 text-gray-900 selection:bg-gray-900 selection:text-white"
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        <ShopProvider>
          {children}
          <Footer />
          <ToastContainer />
          <CartDrawer />
        </ShopProvider>
      </body>
    </html>
  );
}
