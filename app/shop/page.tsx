
"use client";

import { useState } from "react";

function ProductCard({ item }: any) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div
      style={{
        background: "#181818",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#fff",
          height: "520px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <img
          src={item.images[currentImage]}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {item.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImage(
                  (currentImage - 1 + item.images.length) % item.images.length
                )
              }
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentImage((currentImage + 1) % item.images.length)
              }
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div style={{ padding: 20 }}>
        <h2>{item.name}</h2>
        <h3>{item.price}</h3>

        <button
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 50,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Blue Korean Tee",
      price: "600 EGP",
      images: ["/images/shirt1.jpeg", "/images/shirt1back.jpeg"],
    },
    {
      id: 2,
      name: "VOLCA White Tee",
      price: "600 EGP",
      images: ["/images/shirt2.jpeg", "/images/shirt2back.jpeg"],
    },
    {
      id: 3,
      name: "Black Earth Tee",
      price: "600 EGP",
      images: ["/images/shirt3.jpeg", "/images/shirt3back.jpeg"],
    },
    {
      id: 4,
      name: "VOLCA Minimal Tee",
      price: "600 EGP",
      images: ["/images/shirt4.jpeg", "/images/shirt4back.jpeg"],
    },
    {
      id: 5,
      name: "VOLCA Tee 5",
      price: "600 EGP",
      images: ["/images/shirt5.jpeg"],
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        padding: "50px",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: 48, marginBottom: 40 }}>
        VOLCA COLLECTION
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 30,
        }}
      >
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
