import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  contactEmail,
  heroVideo,
  instagramUrl,
  landingContent,
  type Lang,
} from './data';

const LANGUAGE_LABELS: Record<Lang, string> = {
  en: 'ENG',
  ua: 'UA',
};

type BookingState = 'idle' | 'success';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const EMPTY_FORM: FormState = { name: '', email: '', message: '' };

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = window.localStorage.getItem('tonya-lang');
    return stored === 'ua' ? 'ua' : 'en';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>('idle');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const copy = landingContent;
  const isUkrainian = lang === 'ua';

  useEffect(() => {
    window.localStorage.setItem('tonya-lang', lang);
    document.documentElement.lang = isUkrainian ? 'uk' : 'en';
  }, [isUkrainian, lang]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingOpen, menuOpen]);

  const navItems = useMemo(() => copy.nav[lang], [copy.nav, lang]);
  const heroHeading = copy.hero.heading[lang];
  const heroCtas = copy.hero.ctas[lang];
  const aboutTitle = copy.about.title[lang];
  const servicesTitle = copy.services.title[lang];
  const workshopsTitle = copy.workshops.title[lang];
  const contactTitle = copy.contact.title[lang];

  function openBooking() {
    setBookingState('idle');
    setErrors({});
    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    setBookingState('idle');
    setErrors({});
    setForm(EMPTY_FORM);
  }

  function validate(): boolean {
    const nextErrors: Partial<FormState> = {};

    if (form.name.trim().length < 2) nextErrors.name = isUkrainian ? 'Ім’я має містити щонайменше 2 символи' : 'Name must be at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = isUkrainian ? 'Вкажіть коректну email-адресу' : 'Enter a valid email address';
    if (!form.message.trim()) nextErrors.message = isUkrainian ? 'Напишіть повідомлення' : 'Message cannot be empty';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`New Booking from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setBookingState('success');
  }

  const bookingLabel = isUkrainian ? 'Запис' : 'Booking';

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F5] antialiased">
      <header className="fixed z-50 w-full border-b border-[#C9A96A]/20 bg-[#0B0B0D]/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex items-center justify-between px-6 container">
          <a
            href="#home"
            className="font-display text-3xl italic tracking-[0.18em] text-[#C9A96A] transition hover:text-[#D4AF37]"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('home');
            }}
          >
            MUSEMOTION
          </a>

          <nav className="hidden items-center space-x-8 text-[13px] font-bold uppercase tracking-[0.28em] md:flex">
            {navItems.map((item, index) => {
              const ids = ['about', 'classes', 'workshops', 'contact'];
              return (
                <a
                  key={item}
                  href={`#${ids[index]}`}
                  className="transition hover:text-[#D4AF37]"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(ids[index]);
                  }}
                >
                  {item}
                </a>
              );
            })}
            <button
              onClick={openBooking}
              className="border border-[#C9A96A] px-6 py-2 text-[13px] font-bold uppercase tracking-[0.2em] text-[#C9A96A] transition-all duration-300 ease-in-out hover:bg-[#C9A96A] hover:text-[#0B0B0D] active:scale-95"
            >
              {heroCtas[0]}
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96A]/80">
              {(['en', 'ua'] as Lang[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={item === lang ? 'text-[#D4AF37]' : 'hover:text-[#F5F5F5]'}
                >
                  {LANGUAGE_LABELS[item]}
                </button>
              ))}
            </div>
          </nav>

          <button
            className="text-[#F5F5F5] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      <aside
        className={`fixed inset-0 z-[1020] bg-[#0B0B0D] transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setMenuOpen(false)} className="text-3xl text-[#F5F5F5]">
              ×
            </button>
          </div>
          <nav className="flex flex-grow flex-col items-center justify-center space-y-10">
            {navItems.map((item, index) => {
              const ids = ['about', 'classes', 'workshops', 'contact'];
              return (
                <a
                  key={item}
                  href={`#${ids[index]}`}
                  className="text-3xl font-black uppercase italic tracking-tighter transition hover:text-[#D4AF37]"
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(false);
                    scrollToSection(ids[index]);
                  }}
                >
                  {item}
                </a>
              );
            })}
            <div className="flex gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C9A96A]/80">
              {(['en', 'ua'] as Lang[]).map((item) => (
                <button key={item} onClick={() => setLang(item)} className={item === lang ? 'text-[#D4AF37]' : 'hover:text-[#F5F5F5]'}>
                  {LANGUAGE_LABELS[item]}
                </button>
              ))}
            </div>
            <button onClick={openBooking} className="bg-[#C9A96A] px-8 py-5 font-black uppercase tracking-widest text-[#0B0B0D] shadow-[0_0_30px_rgba(201,169,106,0.35)]">
              {heroCtas[0]}
            </button>
          </nav>
        </div>
      </aside>

      <main className="pt-20">
        <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0B0B0D] text-center">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/20 via-[#3A0A12]/35 to-[#0B0B0D]/90" />
          <div className="relative z-10 px-6">
            <h1 className="font-display mx-auto mb-6 max-w-5xl text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] tracking-[-0.03em] text-[#F5F5F5]">
              {heroHeading[0]} {heroHeading[1]} <span className="text-[#C9A96A]">{heroHeading[2]}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[1.1rem] font-light leading-relaxed text-[#F5F5F5]/86 md:text-[1.3rem]">
              {copy.hero.subhead[lang]}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button onClick={openBooking} className="rounded-sm border border-[#D4AF37] bg-[#C9A96A] px-7 py-3 font-bold uppercase tracking-[0.26em] text-[#0B0B0D] transition hover:bg-[#D4AF37]">
                {heroCtas[0]}
              </button>
              <button
                onClick={() => scrollToSection('classes')}
                className="rounded-sm border border-[#C9A96A]/35 px-7 py-3 font-medium uppercase tracking-[0.22em] text-[#F5F5F5]/86 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                {heroCtas[1]}
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-[#C9A96A]/15 bg-[#0B0B0D] py-20">
          <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="/images/subhead.jpg"
                alt="Tonya stretching"
                className="w-full rounded-sm object-cover shadow-2xl"
              />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.02em] text-[#C9A96A]">
                  {aboutTitle}
                </h2>
                <div className="mt-3 h-px w-24 bg-[#C9A96A]" />
              </div>
              <p className="font-display text-3xl leading-[1.05] text-[#F5F5F5] md:text-[3.15rem]">
                {copy.about.intro[lang]}
              </p>
              <p className="max-w-xl text-[1rem] leading-8 text-[#F5F5F5]/82 md:text-[1.05rem]">
                {copy.about.body[lang]}
              </p>
            </div>
          </div>
        </section>

        <section id="classes" className="border-t border-[#C9A96A]/15 bg-[#0B0B0D] py-20">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-10">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter md:text-5xl">
                {servicesTitle}
              </h2>
              <div className="mt-2 h-px w-24 bg-[#C9A96A]" />
              <p className="mt-3 text-[1rem] leading-8 text-[#F5F5F5]/70">{copy.services.description[lang]}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {copy.services.items.map((service) => (
                <article key={service.alt} className="border border-[#C9A96A]/15 bg-[#3A0A12]/20 p-4 shadow-[0_0_0_1px_rgba(201,169,106,0.08)]">
                  <img src={service.image} alt={service.alt} className="h-[360px] w-full object-cover" />
                  <h3 className="mt-5 font-display text-4xl leading-none tracking-[-0.02em] text-[#F5F5F5]">{service.title[lang]}</h3>
                  <p className="mt-3 text-[0.98rem] leading-8 text-[#F5F5F5]/72">{service.description[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workshops" className="border-t border-[#C9A96A]/15 bg-[#0B0B0D] py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter md:text-5xl">
                {workshopsTitle}
              </h2>
              <div className="mt-2 h-px w-24 bg-[#C9A96A]" />
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#F5F5F5]/82 md:text-[1.05rem]">{copy.workshops.body[lang]}</p>
              <ul className="mt-6 space-y-2 text-lg text-[#F5F5F5] tracking-[0.02em]">
                {copy.workshops.formats[lang].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button onClick={openBooking} className="bg-[#C9A96A] px-6 py-3 font-bold uppercase tracking-widest text-[#0B0B0D] transition hover:bg-[#D4AF37]">
                  {copy.workshops.ctas[lang][0]}
                </button>
                <button onClick={openBooking} className="border border-[#C9A96A]/30 px-6 py-3 font-medium transition hover:border-[#D4AF37] hover:text-[#D4AF37]">
                  {copy.workshops.ctas[lang][1]}
                </button>
              </div>
            </div>
            <div>
              <img src="/images/tonya.jpg" alt="Workshops" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-[#C9A96A]/15 bg-[#0B0B0D] py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-10 px-6 md:flex-row md:justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A96A]">{contactTitle}</h4>
            <div className="space-y-2 text-[#F5F5F5]">
              <p className="uppercase tracking-[0.28em] text-[#C9A96A]/80 text-xs">{bookingLabel}</p>
              <a className="block text-lg hover:text-[#D4AF37]" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <a className="block text-[#F5F5F5]/70 hover:text-[#D4AF37]" href={instagramUrl} target="_blank" rel="noreferrer">
                {instagramUrl}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A96A]">Legal</h4>
            <div className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#C9A96A]/70">
              <a href="./impressum.html" className="transition hover:text-white">
                Impressum
              </a>
              <a href="./datenschutz.html" className="transition hover:text-white">
                Datenschutz
              </a>
            </div>
          </div>

          <div className="max-w-sm text-right text-[#F5F5F5]/40">
            <p className="font-display text-4xl italic uppercase tracking-[0.18em] text-[#C9A96A]/20">MUSEMOTION</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em]">{copy.footer[lang]}</p>
          </div>
        </div>
      </footer>

      {bookingOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-[#C9A96A]/15 bg-[#0B0B0D] p-8 shadow-[0_0_60px_rgba(58,10,18,0.3)]">
            <button className="absolute right-4 top-4 text-2xl text-[#C9A96A]/70 hover:text-[#F5F5F5]" onClick={closeBooking} aria-label="Close booking modal">
              ×
            </button>
            {bookingState === 'success' ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-5xl text-[#D4AF37]">✓</div>
                <h2 className="text-2xl font-black uppercase italic">{isUkrainian ? 'Дякую!' : 'Thank you!'}</h2>
                <p className="mt-2 text-[#F5F5F5]/70">
                  {isUkrainian ? 'Я зв’яжусь з вами найближчим часом.' : 'I will contact you shortly.'}
                </p>
                <button onClick={closeBooking} className="mt-6 text-xs uppercase tracking-widest text-[#C9A96A]/80 underline">
                  {isUkrainian ? 'Закрити' : 'Close'}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display mb-6 text-4xl leading-none tracking-[-0.02em] text-[#C9A96A]">
                  {heroCtas[0]}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      type="text"
                      placeholder={isUkrainian ? 'Ваше ім’я' : 'Your Name'}
                      className="w-full border border-[#C9A96A]/20 bg-[#0B0B0D] p-3 outline-none transition focus:border-[#D4AF37]"
                    />
                    {errors.name ? <p className="mt-1 text-xs font-bold uppercase tracking-tighter text-red-500">{errors.name}</p> : null}
                  </div>
                  <div>
                    <input
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      type="email"
                      placeholder={isUkrainian ? 'Ваш email' : 'Your Email'}
                      className="w-full border border-[#C9A96A]/20 bg-[#0B0B0D] p-3 outline-none transition focus:border-[#D4AF37]"
                    />
                    {errors.email ? <p className="mt-1 text-xs font-bold uppercase tracking-tighter text-red-500">{errors.email}</p> : null}
                  </div>
                  <div>
                    <textarea
                      value={form.message}
                      onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                      placeholder={isUkrainian ? 'Ваше повідомлення' : 'Message'}
                      className="h-28 w-full border border-[#C9A96A]/20 bg-[#0B0B0D] p-3 outline-none transition focus:border-[#D4AF37]"
                    />
                    {errors.message ? <p className="mt-1 text-xs font-bold uppercase tracking-tighter text-red-500">{errors.message}</p> : null}
                  </div>
                  <button type="submit" className="w-full bg-[#C9A96A] py-4 font-bold uppercase tracking-[0.28em] text-[#0B0B0D] transition hover:bg-[#D4AF37]">
                    {heroCtas[0]}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
