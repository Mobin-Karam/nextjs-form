"use client";

import { useState } from "react";
import { z } from "zod";
import { appEventBus } from "@/lib/appEventBus";
import { getProductById } from "@/lib/products";

/* ---------------- VALIDATION ---------------- */
const schema = z.object({
  name: z.string().min(2, "نام الزامی است"),
  brand: z.string().min(2, "نام پیج یا فروشگاه الزامی است"),
  phone: z.string().min(8, "شماره تماس معتبر وارد کنید"),
  email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm({
  selectedProductId,
  onClearSelection,
}: {
  selectedProductId?: string | null;
  onClearSelection?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    brand: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedProduct = getProductById(selectedProductId);

  function validate() {
    const res = schema.safeParse(form);

    if (!res.success) {
      const flat = res.error.flatten().fieldErrors;
      const err: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => {
        err[k] = v?.[0] || "";
      });
      setErrors(err);
      return false;
    }

    setErrors({});
    return true;
  }

  const canSubmit =
    form.name.trim().length >= 2 &&
    form.brand.trim().length >= 2 &&
    form.phone.trim().length >= 8 &&
    !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const composedMessage = [
        selectedProduct
          ? `خدمت انتخاب‌شده: ${selectedProduct.title} (${selectedProduct.code})`
          : "خدمت انتخاب‌شده: -",
        `پیج/فروشگاه: ${form.brand}`,
        form.message?.trim() ? `توضیحات: ${form.message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || "",
          message: composedMessage,
          productId: selectedProduct?.id ?? null,
          productTitle: selectedProduct?.title ?? null,
          brand: form.brand,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setForm({ name: "", brand: "", phone: "", email: "", message: "" });
        setDone(true);
        onClearSelection?.();
        appEventBus.emit("درخواست شما با موفقیت ارسال شد", "success");
      } else {
        appEventBus.emit("ارسال درخواست با خطا مواجه شد", "error");
      }
    } catch {
      appEventBus.emit("ارتباط با سرور برقرار نشد", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card text-card-foreground rounded-2xl shadow-md border border-border p-6 sm:p-8">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            تکمیل درخواست
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            پاسخ سریع در کمتر از ۲۴ ساعت
          </p>
        </div>

        {/* SELECTED PRODUCT */}
        {selectedProduct ? (
          <div className="mb-6 rounded-xl border border-dashed border-border bg-accent/20 px-4 py-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">
                شما انتخاب کرده‌اید
              </p>
              <p className="text-sm font-semibold">
                {selectedProduct.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedProduct.startingPrice} · {selectedProduct.deliveryTime}
              </p>
            </div>

            <button
              type="button"
              onClick={onClearSelection}
              className="text-[11px] text-muted-foreground hover:text-destructive transition underline"
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-border bg-surface px-4 py-3 text-xs text-muted-foreground text-center">
            هنوز خدمتی انتخاب نکرده‌اید
          </div>
        )}

        {done && (
          <div className="mb-6 rounded-xl bg-green-500/10 border border-green-500 text-green-600 px-4 py-3 text-sm text-center">
            درخواستت ثبت شد ✓ به‌زودی باهات تماس می‌گیرم.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <input
              placeholder="نام و نام خانوادگی *"
              autoComplete="name"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          {/* BRAND */}
          <div>
            <input
              placeholder="نام پیج یا فروشگاه *"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
            />
            {errors.brand && (
              <p className="text-xs text-destructive mt-1">{errors.brand}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              placeholder="شماره تماس *"
              type="tel"
              dir="ltr"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              placeholder="ایمیل (اختیاری)"
              type="email"
              dir="ltr"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <textarea
            placeholder="توضیح بیشتر (اختیاری)"
            rows={3}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl font-medium transition ${
              canSubmit
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                : "bg-surface text-muted-foreground cursor-not-allowed"
            }`}
          >
            {loading ? "در حال ارسال..." : "تکمیل درخواست"}
          </button>
        </form>
      </div>
    </div>
  );
}