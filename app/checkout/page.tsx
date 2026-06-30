"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    if (!name || !phone || !city || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const products = cart
      .map(
        (item) =>
          `• ${item.name}
Size: ${item.size}
Qty: ${item.quantity}
Price: ${item.price} EGP`
      )
      .join("\n\n");

    const message = `🛍️ NEW ORDER - VOLCA

👤 Name:
${name}

📞 Phone:
${phone}

🏙️ City:
${city}

📍 Address:
${address}

━━━━━━━━━━━━━━

${products}

━━━━━━━━━━━━━━

💰 Total:
${totalPrice} EGP`;

    window.open(
      `https://wa.me/201017516709?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart();

    setName("");
    setPhone("");
    setCity("");
    setAddress("");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        <h1 className="text-5xl font-black mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Customer Info */}

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 rounded-xl bg-zinc-900 border border-zinc-700 px-5 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-14 rounded-xl bg-zinc-900 border border-zinc-700 px-5 outline-none"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-14 rounded-xl bg-zinc-900 border border-zinc-700 px-5 outline-none"
            />

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-36 rounded-xl bg-zinc-900 border border-zinc-700 px-5 py-4 outline-none resize-none"
            />

          </div>

          {/* Order Summary */}

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between"
                >

                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-zinc-400 text-sm">
                      {item.size} × {item.quantity}
                    </p>

                  </div>

                  <p>
                    {item.price * item.quantity} EGP
                  </p>

                </div>

              ))}

            </div>

            <div className="border-t border-zinc-700 mt-8 pt-8 flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>{totalPrice} EGP</span>

            </div>

            <button
              onClick={handleOrder}
              className="mt-10 w-full h-16 rounded-full bg-white text-black text-lg font-bold hover:bg-zinc-200 transition"
            >
              Place Order
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}