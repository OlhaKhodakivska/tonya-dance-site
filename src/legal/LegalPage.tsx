import type { ReactNode } from 'react';

type LegalPageProps = {
  title: string;
  homeLabel: string;
  children: ReactNode;
};

export function LegalPage({ title, homeLabel, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0D0B0A] text-[#E5E5E5]">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-20">
        <a
          href="./index.html"
          className="group mb-12 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#E5C483] transition hover:text-[#FFF0C2]"
        >
          <span className="transition-transform group-hover:-translate-x-2">⟵</span>
          {homeLabel}
        </a>

        <h1 className="font-display gold-text mb-12 text-center text-4xl md:text-6xl">
          {title}
        </h1>

        <div className="legal-content space-y-8 leading-relaxed text-[#D9D9D9]">{children}</div>

        <footer className="mt-20 border-t border-[#C2954C]/20 pt-8 text-[10px] tracking-[0.18em] text-[#A39A94]">
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
