"use client";

import { Product } from "@/lib/products";

export default function ProductCard({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-card text-card-foreground overflow-hidden transition-all duration-200
        ${
          selected
            ? "border-primary shadow-md ring-2 ring-primary/20"
            : "border-border hover:border-primary/40 hover:shadow-sm"
        }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="text-[11px] tracking-widest text-muted-foreground">
          {product.code}
        </span>

        {selected && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            انتخاب‌شده
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="px-5 pt-3 pb-5">
        <h3 className="text-lg font-bold mb-1">{product.title}</h3>

        <p className="text-sm text-muted-foreground mb-4">{product.tagline}</p>

        <p className="text-sm leading-7 text-muted-foreground/90 mb-4">
          {product.description}
        </p>

        {/* FEATURES */}
        <ul className="space-y-2 mb-5">
          {product.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* DIVIDER */}
      <div className="relative px-5">
        <div className="border-t border-dashed border-border" />
        <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-background" />
        <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-background" />
      </div>

      {/* FOOTER */}
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="text-[11px] text-muted-foreground leading-5">
          <div>{product.deliveryTime}</div>
          <div className="text-foreground font-medium">
            {product.startingPrice}
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-medium transition-all
            ${
              selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
        >
          {selected ? "انتخاب شد ✓" : "انتخاب این خدمت"}
        </button>
      </div>
    </div>
  );
}
