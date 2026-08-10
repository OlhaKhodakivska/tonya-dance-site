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

const WEB3FORMS_ACCESS_KEY = '0baa075e-e905-4003-b04d-6a9773e0dc58';

type BookingState = 'idle' | 'success' | 'error';

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
  const [lang, setLang] = useState<Lang>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const copy = landingContent;
  const isUkrainian = lang === 'ua';

  useEffect(() => {
    document.documentElement.lang = isUkrainian ? 'uk' : 'en';
  }, [isUkrainian, lang]);

  useEffect(() => {
    if (bookingState !== 'success') return;

    const timer = window.setTimeout(() => setBookingState('idle'), 6000);
    return () => window.clearTimeout(timer);
  }, [bookingState]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setBookingOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = useMemo(() => copy.nav[lang], [copy.nav, lang]);
  const heroHeading = copy.hero.heading[lang];
  const heroCtas = copy.hero.ctas[lang];
  const aboutTitle = copy.about.title[lang];
  const servicesTitle = copy.services.title[lang];
  const workshopsTitle = copy.workshops.title[lang];

  function openBooking() {
    setBookingState('idle');
    setErrors({});
    setMenuOpen(false);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setBookingState('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Booking from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Web3Forms submission failed');
      }

      setForm(EMPTY_FORM);
      setErrors({});
      setBookingState('success');
    } catch (error) {
      console.error('Contact form submission error:', error);
      setBookingState('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const languageOrder: Lang[] = ['en', 'ua'];

  return (
    <div className="site-shell min-h-screen bg-[#0D0B0A] text-[#E5E5E5] antialiased">
      {/* Header / Navigation */}
      <header className="app-header fixed z-50 w-full border-b border-[#C2954C]/25 bg-[#0D0B0A] py-4 backdrop-blur-md">
        <div className="mx-auto flex items-center justify-between px-6 container">
          <a
            href="#home"
            className="brand-mark font-display gold-text text-3xl tracking-[0.16em] transition flex items-center gap-3"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('home');
            }}
          >
            <img src="./icons/Gemini_Generated_512512.png" alt="Tonya Musemotion" className="brand-logo h-20 w-20 object-contain" />
            <span className="sr-only">Musemotion</span>
          </a>

          <nav className="hidden items-center space-x-8 text-[13px] font-medium tracking-[0.2em] xl:flex">
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
            className="menu-trigger soft-text xl:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <aside
        className={`mobile-menu fixed inset-0 z-[1020] bg-[#0D0B0A] transition-transform duration-300 xl:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="mobile-menu__top flex items-center justify-between p-6">
            <img src="./icons/Gemini_Generated_512512.png" alt="" className="h-14 w-14 object-contain" />
            <button onClick={() => setMenuOpen(false)} className="mobile-menu__close soft-text text-3xl" aria-label="Close menu">
              ×
            </button>
          </div>
          <nav className="mobile-menu__nav flex flex-grow flex-col justify-center">
            {navItems.map((item, index) => {
              const ids = ['about', 'classes', 'workshops', 'contact'];
              return (
                <a
                  key={item}
                  href={`#${ids[index]}`}
                  className="mobile-menu__link font-display text-[#E5C483] transition hover:text-[#FFF0C2]"
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
            <div className="mobile-menu__language flex gap-3 text-sm font-medium tracking-[0.16em] text-[#A39A94]">
              {languageOrder.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  <button key={item} onClick={() => setLang(item)} className={item === lang ? 'soft-text' : 'text-[#C2954C] hover:text-[#E5C483]'}>
                    {LANGUAGE_LABELS[item]}
                  </button>
                  {index < languageOrder.length - 1 ? <span className="text-[#C2954C]/55">|</span> : null}
                </span>
              ))}
            </div>
            <button onClick={openBooking} className="primary-button mobile-menu__cta font-bold tracking-[0.16em]">
              {heroCtas[0]}
            </button>
          </nav>
        </div>
      </aside>

      <main className="site-main-background pt-20">
        {/* Hero Section */}
        <section id="home" className="hero-section relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0D0B0A] text-center">
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover opacity-100"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0A]/20 via-[#0D0B0A]/36 to-[#0D0B0A]/92" />
          <div className="hero-content relative z-10 px-6">
            <h1 className="hero-title font-display soft-text mx-auto mb-6 max-w-5xl text-[clamp(3.25rem,8vw,7rem)] leading-[0.96]">
              <span className="hero-title__part">{heroHeading[0]}</span>{' '}
              <span className="hero-title__part">{heroHeading[1]}</span>{' '}
              <span className="hero-title__part gold-text">{heroHeading[2]}</span>
            </h1>
            <p className="hero-subhead soft-text mx-auto max-w-2xl text-[1.1rem] font-light leading-relaxed md:text-[1.3rem]">
              {copy.hero.subhead[lang]}
            </p>
            <div className="hero-actions mt-10 flex flex-col justify-center gap-4 sm:flex-row">
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
        <section id="about" className="content-section border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="./images/subhead.jpg"
                alt="Tonya stretching"
                className="about-image w-full rounded-sm border border-[#C2954C]/25 object-cover shadow-2xl"
              />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div>
                <h2 className="font-display gold-text text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.98]">
                  {aboutTitle}
                </h2>
                <div className="gold-divider mt-3" />
              </div>
              <p className="about-intro font-display soft-text text-3xl leading-[1.08] md:text-[3.15rem]">
                {copy.about.intro[lang]}
              </p>
              <p className="mobile-readable soft-text max-w-xl text-[1rem] leading-8 md:text-[1.05rem]">
                {copy.about.body[lang]}
              </p>
            </div>
          </div>
        </section>

        {/* Classes / Training Section */}
        <section id="classes" className="content-section border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-10">
              <h2 className="font-display gold-text text-4xl md:text-6xl">
                {servicesTitle}
              </h2>
              <div className="gold-divider mt-3" />
              <p className="mt-3 text-[1rem] leading-8 text-[#A39A94]">{copy.services.description[lang]}</p>
            </div>

            <div className="service-grid grid gap-6 md:grid-cols-3">
              {copy.services.items.map((service) => (
                <article key={service.alt} className="service-card glass-card p-4">
                  <img src={service.image} alt={service.alt} className="service-card__image h-[360px] w-full object-cover" />
                  <div className="service-card__body">
                    <h3 className="font-display text-4xl leading-none text-[#E5C483]">{service.title[lang]}</h3>
                    <p className="soft-text text-[0.98rem] leading-8">{service.description[lang]}</p>
                    <button onClick={openBooking} className="service-card__button secondary-button font-bold tracking-[0.14em]">
                      {heroCtas[0]}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops & Masterclasses Section */}
        <section id="workshops" className="content-section border-t border-[#C2954C]/20 bg-[#0D0B0A] py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl text-[#E5C483] md:text-6xl">
                {workshopsTitle}
              </h2>
              <div className="gold-divider mt-3" />
              <p className="mobile-readable soft-text mt-6 max-w-xl text-[1rem] font-light leading-8 md:text-[1.05rem]">{copy.workshops.body[lang]}</p>
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

      <div className="mobile-action-bar xl:hidden" aria-label="Quick actions">
        <button onClick={openBooking} className="primary-button mobile-action-bar__primary font-bold">
          {heroCtas[0]}
        </button>
        <button onClick={() => scrollToSection('classes')} className="mobile-action-bar__secondary secondary-button font-bold">
          {heroCtas[1]}
        </button>
      </div>

      {/* Booking Modal */}
      {bookingOpen ? (
        <div className="booking-overlay fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="booking-card glass-card relative w-full max-w-md p-8">
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
                <form
                  className="space-y-4"
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                  <div>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      type="text"
                      name="name"
                      required
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
                      name="email"
                      required
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
                      name="message"
                      required
                      className="h-28 w-full rounded-[5px] border border-[#C2954C]/35 bg-[#0D0B0A] p-3 text-[#E5E5E5] outline-none transition placeholder:text-[#A39A94] focus:border-[#E5C483]"
                    />
                    {errors.message ? <p className="mt-1 text-xs font-bold tracking-tighter text-red-500">{errors.message}</p> : null}
                  </div>
                  {bookingState === 'error' ? (
                    <p className="text-sm text-red-400" role="status">
                      {isUkrainian
                        ? 'Не вдалося надіслати повідомлення. Спробуйте ще раз.'
                        : 'The message could not be sent. Please try again.'}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="primary-button w-full py-4 font-bold tracking-[0.18em] transition disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSubmitting
                      ? isUkrainian ? 'Надсилання…' : 'Sending…'
                      : heroCtas[0]}
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
