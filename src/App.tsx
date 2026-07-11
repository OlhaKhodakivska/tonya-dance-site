import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  contactEmail,
  heroVideo,
  landingContent,
  type Lang,
} from './data';

const LANGUAGE_LABELS: Record<Lang, string> = {
  en: 'Eng',
  ua: 'Ua',
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

    if (form.name.trim().length < 2) nextErrors.name = isUkrainian ? 'Ім’я Має Містити Щонайменше 2 Символи' : 'Name Must Be At Least 2 Characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = isUkrainian ? 'Вкажіть Коректну Email-Адресу' : 'Enter A Valid Email Address';
    if (!form.message.trim()) nextErrors.message = isUkrainian ? 'Напишіть Повідомлення' : 'Message Cannot Be Empty';

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

  const languageOrder: Lang[] = ['ua', 'en'];

  return (
    <div className="site-shell min-h-screen bg-[#0D0B0A] text-[#E5E5E5] antialiased">
      {/* Header / Navigation */}
      <header className="fixed z-50 w-full border-b border-[#C2954C]/25 bg-[#0D0B0A] py-4 backdrop-blur-md">
        <div className="mx-auto flex items-center justify-between px-6 container">
          <a
            href="#home"
            className="font-display gold-text text-3xl tracking-[0.16em] transition flex items-center gap-3"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('home');
            }}
          >
            <img src="./icons/Gemini_Generated_512512.png" alt="Tonya Musemotion" className="h-20 w-20 object-contain" />
            <span className="sr-only">Musemotion</span>
          </a>

          <nav className="hidden items-center space-x-8 text-[13px] font-medium tracking-[0.2em] md:flex">
            {navItems.map((item, index) => {
              const ids = ['about', 'classes', 'workshops', 'contact'];
              return (
                <a
                  key={item}
                  href={`#${ids[index]}`}
                  className="soft-text transition hover:text-[#E5C483]"
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
              className="primary-button px-6 py-2 text-[13px] font-bold tracking-[0.16em] transition-all duration-300 ease-in-out active:scale-95"
            >
              {heroCtas[0]}
            </button>
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-[#A39A94]">
              {languageOrder.map((item, index) => (
                <span key={item} className="flex items-center gap-2">
                  <button
                    onClick={() => setLang(item)}
                    className={item === lang ? 'soft-text' : 'text-[#C2954C] hover:text-[#E5C483]'}
                  >
                    {LANGUAGE_LABELS[item]}
                  </button>
                  {index < languageOrder.length - 1 ? <span className="text-[#C2954C]/55">|</span> : null}
                </span>
              ))}
            </div>
          </nav>

          <button
            className="soft-text md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <aside
        className={`fixed inset-0 z-[1020] bg-[#0D0B0A] transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setMenuOpen(false)} className="soft-text text-3xl">
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
                  className="font-display text-4xl tracking-[0.04em] text-[#E5C483] transition hover:text-[#FFF0C2]"
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
            <div className="flex gap-3 text-sm font-medium tracking-[0.16em] text-[#A39A94]">
              {languageOrder.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  <button key={item} onClick={() => setLang(item)} className={item === lang ? 'soft-text' : 'text-[#C2954C] hover:text-[#E5C483]'}>
                    {LANGUAGE_LABELS[item]}
                  </button>
                  {index < languageOrder.length - 1 ? <span className="text-[#C2954C]/55">|</span> : null}
                </span>
              ))}
            </div>
            <button onClick={openBooking} className="primary-button px-8 py-5 font-bold tracking-[0.16em]">
              {heroCtas[0]}
            </button>
          </nav>
        </div>
      </aside>

      <main className="site-main-background pt-20">
        {/* Hero Section */}
        <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0D0B0A] text-center">
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover opacity-55"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0A]/20 via-[#0D0B0A]/36 to-[#0D0B0A]/92" />
          <div className="relative z-10 px-6">
            <h1 className="font-display soft-text mx-auto mb-6 max-w-5xl text-[clamp(3.25rem,8vw,7rem)] leading-[0.96]">
              {heroHeading[0]} {heroHeading[1]} <span className="gold-text">{heroHeading[2]}</span>
            </h1>
            <p className="soft-text mx-auto max-w-2xl text-[1.1rem] font-light leading-relaxed md:text-[1.3rem]">
              {copy.hero.subhead[lang]}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button onClick={openBooking} className="primary-button px-7 py-3 font-bold tracking-[0.18em] transition">
                {heroCtas[0]}
              </button>
              <button
                onClick={() => scrollToSection('classes')}
                className="secondary-button px-7 py-3 font-medium tracking-[0.16em] transition"
              >
                {heroCtas[1]}
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="./images/subhead.jpg"
                alt="Tonya stretching"
                className="w-full rounded-sm border border-[#C2954C]/25 object-cover shadow-2xl"
              />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div>
                <h2 className="font-display gold-text text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.98]">
                  {aboutTitle}
                </h2>
                <div className="gold-divider mt-3" />
              </div>
              <p className="font-display soft-text text-3xl leading-[1.08] md:text-[3.15rem]">
                {copy.about.intro[lang]}
              </p>
              <p className="soft-text max-w-xl text-[1rem] leading-8 md:text-[1.05rem]">
                {copy.about.body[lang]}
              </p>
            </div>
          </div>
        </section>

        {/* Classes / Training Section */}
        <section id="classes" className="border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-10">
              <h2 className="font-display gold-text text-4xl md:text-6xl">
                {servicesTitle}
              </h2>
              <div className="gold-divider mt-3" />
              <p className="mt-3 text-[1rem] leading-8 text-[#A39A94]">{copy.services.description[lang]}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {copy.services.items.map((service) => (
                <article key={service.alt} className="glass-card p-4">
                  <img src={service.image} alt={service.alt} className="h-[360px] w-full object-cover" />
                  <h3 className="mt-5 font-display text-4xl leading-none text-[#E5C483]">{service.title[lang]}</h3>
                  <p className="soft-text mt-3 text-[0.98rem] leading-8">{service.description[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops & Masterclasses Section */}
        <section id="workshops" className="border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl text-[#E5C483] md:text-6xl">
                {workshopsTitle}
              </h2>
              <div className="gold-divider mt-3" />
              <p className="soft-text mt-6 max-w-xl text-[1rem] font-light leading-8 md:text-[1.05rem]">{copy.workshops.body[lang]}</p>
              <ul className="workshop-list mt-6">
                {copy.workshops.formats[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button onClick={openBooking} className="primary-button px-6 py-2 font-bold tracking-[0.16em] transition">
                  {copy.workshops.ctas[lang][0]}
                </button>
              </div>
            </div>
            <div className="workshop-image-frame">
              <img src="./images/workshop.JPG" alt="Workshops" className="workshop-image" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact & Legal Section */}
      <footer id="contact" className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__meta">
            <p>
              <span className="site-footer__label">Booking:</span>{' '}
              <a className="site-footer__value site-footer__blurred-email" href={`mailto:${contactEmail}`} aria-label={contactEmail}>
                {contactEmail}
              </a>
            </p>
            <p>
              <span className="site-footer__label">Location:</span>{' '}
              <span className="site-footer__value">City / Online</span>
            </p>
          </div>

          <div className="site-footer__divider" />

          <nav className="site-footer__legal" aria-label="Legal links">
            <a href="./impressum.html">Impressum</a>
            <a href="./datenschutz.html">Datenschutz</a>
          </nav>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="glass-card relative w-full max-w-md p-8">
            <button className="absolute right-4 top-4 text-2xl text-[#C2954C] hover:text-[#E5E5E5]" onClick={closeBooking} aria-label="Close Booking Modal">
              ×
            </button>
            {bookingState === 'success' ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-5xl text-[#E5C483]">✓</div>
                <h2 className="font-display gold-text text-4xl">{isUkrainian ? 'Дякую!' : 'Thank You!'}</h2>
                <p className="soft-text mt-2">
                  {isUkrainian ? 'Я Зв’яжусь З Вами Найближчим Часом.' : 'I Will Contact You Shortly.'}
                </p>
                <button onClick={closeBooking} className="mt-6 text-xs tracking-[0.16em] text-[#E5C483] underline">
                  {isUkrainian ? 'Закрити' : 'Close'}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display gold-text mb-6 text-4xl leading-none">
                  {heroCtas[0]}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      type="text"
                      placeholder={isUkrainian ? 'Ваше Ім’я' : 'Your Name'}
                      className="w-full rounded-[5px] border border-[#C2954C]/35 bg-[#0D0B0A] p-3 text-[#E5E5E5] outline-none transition placeholder:text-[#A39A94] focus:border-[#E5C483]"
                    />
                    {errors.name ? <p className="mt-1 text-xs font-bold tracking-tighter text-red-500">{errors.name}</p> : null}
                  </div>
                  <div>
                    <input
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      type="email"
                      placeholder={isUkrainian ? 'Ваш Email' : 'Your Email'}
                      className="w-full rounded-[5px] border border-[#C2954C]/35 bg-[#0D0B0A] p-3 text-[#E5E5E5] outline-none transition placeholder:text-[#A39A94] focus:border-[#E5C483]"
                    />
                    {errors.email ? <p className="mt-1 text-xs font-bold tracking-tighter text-red-500">{errors.email}</p> : null}
                  </div>
                  <div>
                    <textarea
                      value={form.message}
                      onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                      placeholder={isUkrainian ? 'Ваше Повідомлення' : 'Message'}
                      className="h-28 w-full rounded-[5px] border border-[#C2954C]/35 bg-[#0D0B0A] p-3 text-[#E5E5E5] outline-none transition placeholder:text-[#A39A94] focus:border-[#E5C483]"
                    />
                    {errors.message ? <p className="mt-1 text-xs font-bold tracking-tighter text-red-500">{errors.message}</p> : null}
                  </div>
                  <button type="submit" className="primary-button w-full py-4 font-bold tracking-[0.18em] transition">                    {heroCtas[0]}
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
