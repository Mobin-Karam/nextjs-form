"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(id: string) {
    setSelectedId(id);

    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      {/* HERO */}
      <section className="px-5 sm:px-8 pt-14 pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground tracking-wide mb-3">
            خدمات و محصولات
          </p>

          <h1 className="text-2xl sm:text-4xl font-bold text-foreground leading-[1.3] mb-4">
            یه خدمت رو انتخاب کن،
            <span className="text-muted-foreground font-normal">
              {" "}
              بقیه‌ش با من
            </span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-7 max-w-2xl mb-10">
            هر کدوم از این مسیرها برای یک مرحله مشخص از رشد کسب‌وکار طراحی شده.
            روی هر کارت که بزنی، فرم تماس با جزئیات همون سرویس برات آماده میشه.
          </p>

          {/* PRODUCTS GRID */}
          <div className="grid sm:grid-cols-2 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedId === product.id}
                onSelect={() => handleSelect(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="px-5 sm:px-8 py-16 border-t border-border bg-muted"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs text-muted-foreground tracking-wide mb-2">
              مرحله بعد
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              اطلاعاتت رو بفرست تا شروع کنیم
            </h2>

            <p className="text-sm text-muted-foreground mt-2 leading-7">
              سرویس انتخاب‌شده به صورت خودکار داخل فرم قرار می‌گیره.
            </p>
          </div>

          <ContactForm
            selectedProductId={selectedId}
            onClearSelection={() => setSelectedId(null)}
          />
        </div>
      </section>
    </>
  );
}
