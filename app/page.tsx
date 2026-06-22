import Link from "next/link";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "طراحی پیج اینستاگرام",
  "راه‌اندازی فروشگاه دیجیتال",
  "استراتژی محتوا",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative px-5 sm:px-8 pt-16 sm:pt-24 pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-[auto_1fr] gap-10 sm:gap-14 items-center">
          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <div
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center text-5xl font-bold shadow-md text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              MK
            </div>

            <span className="block text-center mt-3 text-[11px] tracking-widest text-muted-foreground">
              MOBIN.KARAM
            </span>
          </div>

          {/* Content */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 tracking-wide">
              توسعه‌دهنده و طراح حضور دیجیتال
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold leading-[1.3] text-foreground mb-5">
              کسب‌وکارت رو از یه پیج ساده،
              <br />
              به یه برند دیجیتال جدی تبدیل می‌کنم
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base leading-7 max-w-xl mx-auto sm:mx-0 mb-7">
              از طراحی تا راه‌اندازی، قدم‌به‌قدم کنارتم.
            </p>

            {/* Skills */}
            <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mb-9">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-card"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl text-sm font-medium text-white shadow-md"
                style={{ background: "var(--gradient-primary)" }}
              >
                درباره من ↓
              </a>

              <Link
                href="/products"
                className="px-6 py-3 rounded-xl text-sm font-medium border border-border text-foreground bg-card hover:bg-muted transition"
              >
                خدمات و محصولات ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="px-5 sm:px-8 py-20 border-t border-border bg-muted"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-muted-foreground mb-3 tracking-wide">
            درباره من
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            یه برنامه‌نویس که زبان فروشگاه‌داری رو هم بلده
          </h2>

          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-8">
            <p>...</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a className="text-xs px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
