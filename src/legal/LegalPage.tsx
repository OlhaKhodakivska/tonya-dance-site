import type { ReactNode } from 'react';

type LegalPageProps = {
  title: string;
  homeLabel: string;
  children: ReactNode;
};

export function LegalPage({ title, homeLabel, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F5F5F5]">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20">
        <a
          href="./index.html"
          className="group mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#C9A96A] transition hover:text-[#D4AF37]"
        >
          <span className="transition-transform group-hover:-translate-x-2">⟵</span>
          {homeLabel}
        </a>

        <h1 className="mb-12 text-center text-4xl font-black uppercase italic tracking-tighter md:text-6xl">
          {title}
        </h1>

        <div className="space-y-8 leading-relaxed text-[#F5F5F5]/75">{children}</div>

        <footer className="mt-20 border-t border-[#C9A96A]/15 pt-8 text-[10px] uppercase tracking-[0.28em] text-[#C9A96A]/60 italic">
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
