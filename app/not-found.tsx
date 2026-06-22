"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6 overflow-hidden">
      <div className="text-center max-w-md space-y-6">
        {/* FLOATING 404 */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-7xl font-bold tracking-tight text-primary"
        >
          404
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold"
        >
          صفحه‌ای که دنبالش بودی پیدا نشد
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground leading-7"
        >
          ممکنه لینک اشتباه باشه یا صفحه حذف شده باشه.
          <br />
          می‌تونی برگردی به صفحه اصلی یا بخش خدمات رو ببینی.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
        >
          <Link
            href="/"
            className="px-5 py-3 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition"
          >
            رفتن به صفحه اصلی
          </Link>

          <Link
            href="/products"
            className="px-5 py-3 rounded-xl text-sm font-medium border border-border bg-card text-foreground hover:bg-muted transition"
          >
            مشاهده خدمات
          </Link>
        </motion.div>

        {/* SMALL NOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[11px] text-muted-foreground pt-4"
        >
          اگر فکر می‌کنی این خطا اشتباهه، آدرس رو دوباره چک کن.
        </motion.p>
      </div>
    </main>
  );
}
