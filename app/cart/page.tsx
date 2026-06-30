"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/context/CartContext";

export default function CartPage() {
  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        <h1 className="text-5xl font-black mb-12">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="border border-zinc-800 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold">
              Your cart is empty
            </h2>

            <p className="text-zinc-400 mt-5">
              Looks like you haven't added anything yet.
            </p>

            <Link href="/shop">
              <button className="mt-10 px-10 h-14 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition">
                Continue Shopping
              </button>
            </Link>

          </div>
        ) : (
          <>
            <div className="space-y-8">

              {cart.map((item) => (

                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between border border-zinc-800 rounded-3xl p-6"
                >

                  <Link
                    href={`/product/${item.id}`}
                    className="flex items-center gap-6 flex-1"
                  >

                    <div className="relative w-28 h-28 bg-zinc-900 rounded-2xl overflow-hidden">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold hover:text-zinc-300 transition">
                        {item.name}
                      </h2>

                      <p className="text-zinc-400 mt-2">
                        Size: {item.size}
                      </p>

                      <p className="text-xl font-bold mt-3">
                        {item.price} EGP
                      </p>

                    </div>

                  </Link>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.size)
                      }
                      className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.size)
                      }
                      className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size)
                      }
                      className="ml-5 flex items-center gap-2 text-red-500 hover:text-red-400 text-lg font-semibold transition"
                    >
                      Remove 🗑️
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-14 border-t border-zinc-800 pt-10 flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Total
              </h2>

              <h2 className="text-3xl font-black">
                {totalPrice} EGP
              </h2>

            </div>

            <Link href="/checkout">
              <button className="mt-10 w-full h-16 rounded-full bg-white text-black text-lg font-bold hover:bg-zinc-200 transition">
                Checkout
              </button>
            </Link>

          </>
        )}

      </section>

      <Footer />

    </main>
  );
}