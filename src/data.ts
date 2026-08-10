export type Lang = 'en' | 'ua';

export type Service = {
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  alt: string;
};

export type Content = {
  nav: Record<Lang, string[]>;
  hero: {
    heading: Record<Lang, [string, string, string]>;
    subhead: Record<Lang, string>;
    ctas: Record<Lang, [string, string]>;
  };
  about: {
    title: Record<Lang, string>;
    intro: Record<Lang, string>;
    body: Record<Lang, string>;
  };
  services: {
    title: Record<Lang, string>;
    description: Record<Lang, string>;
    items: Service[];
  };
  workshops: {
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    formats: Record<Lang, string[]>;
    ctas: Record<Lang, [string, string]>;
  };
  contact: {
    title: Record<Lang, string>;
    bookingLabel: Record<Lang, string>;
    instagramLabel: Record<Lang, string>;
  };
  footer: Record<Lang, string>;
};

export const contactEmail = 'tonya.musemotion@gmail.com';
export const instagramUrl = 'https://www.instagram.com/tonya.musemotion/';
export const heroVideo = './videos/website-start.mp4';

export const landingContent: Content = {
  nav: {
    en: ['About', 'Training', 'Workshops', 'Contact'],
    ua: ['Про мене', 'Заняття', 'Воркшопи', 'Контакт'],
  },
  hero: {
    heading: {
      en: ['Dance', 'Artist and', 'Coach'],
      ua: ['Танцювальна', 'артистка та', 'тренерка'],
    },
    subhead: {
      en: 'Build a strong, flexible and confident body through precise technique, control and refined movement.',
      ua: 'Побудуй сильне, гнучке та впевнене тіло завдяки точній техніці, контролю й витонченому руху.',
    },
    ctas: {
      en: ['Book a Session', 'Explore Training'],
      ua: ['Записатись', 'Напрямки Тренувань'],
    },
  },
  about: {
    title: {
      en: 'About Me',
      ua: 'Про мене',
    },
    intro: {
      en: "I'm Tonya, movement artist and professional personal dance & pole coach for adults.",
      ua: 'Я — Тоня, артистка руху та професійна персональна тренерка з танців і pole dance для дорослих.',
    },
    body: {
      en: 'I help women build strength, flexibility and confidence through structured, technique-driven training. My approach combines precision, aesthetics and a calm, supportive environment.',
      ua: 'Моя робота — це створення сильного, гнучкого та впевненого тіла через точні та системні тренування. Я поєдную техніку, естетику та комфортну атмосферу.',
    },
  },
  services: {
    title: {
      en: 'Training Directions',
      ua: 'Заняття в студії',
    },
    description: {
      en: 'Event Shows · Workshops · Private Classes',
      ua: 'Шоу для подій · Воркшопи · Індивідуальні заняття',
    },
    items: [
      {
        title: { en: 'Event Shows', ua: 'Шоу для подій' },
        description: {
          en: 'Elegant, expressive dance and pole performances tailored to your event.',
          ua: 'Елегантні й виразні танцювальні та pole-виступи, створені спеціально для вашої події.',
        },
        image: './images/exotic.jpg',
        alt: 'Event dance show',
      },
      {
        title: { en: 'Workshops', ua: 'Воркшопи' },
        description: {
          en: 'Technique-focused group workshops with signature choreography and a structured approach.',
          ua: 'Групові воркшопи з акцентом на техніку, авторську хореографію та структурований підхід.',
        },
        image: './images/pole_dance.jpg',
        alt: 'Dance workshop',
      },
      {
        title: { en: 'Private Classes', ua: 'Індивідуальні заняття' },
        description: {
          en: 'Personal training built around your goals, level and preferred movement style.',
          ua: 'Персональні тренування, побудовані навколо ваших цілей, рівня та бажаного стилю руху.',
        },
        image: './images/stretching.jpg',
        alt: 'Private dance class',
      },
    ],
  },
  workshops: {
    title: {
      en: 'Workshops & Masterclasses',
      ua: 'Воркшопи та майстер-класи',
    },
    body: {
      en: 'I travel to different cities and studios, delivering high-level training and signature choreography. Perfect for studios that want to elevate their classes and offer something unique.',
      ua: 'Я виїжджаю в різні міста й студії, проводжу тренування високого рівня та авторську хореографію. Ідеально для студій, які хочуть підняти рівень занять і запропонувати щось особливе.',
    },
    formats: {
      en: ['Private sessions', 'Pole Art', 'Exotic'],
      ua: ['Private sessions', 'Pole Art', 'Exotic'],
    },
    ctas: {
      en: ['Invite Me', 'Book a Session'],
      ua: ['Запроси мене', 'Записатись'],
    },
  },
  contact: {
    title: {
      en: 'Contact',
      ua: 'Контакт',
    },
    bookingLabel: {
      en: 'Booking',
      ua: 'Запис',
    },
    instagramLabel: {
      en: 'Instagram',
      ua: 'Instagram',
    },
  },
  footer: {
    en: 'Strength. Flexibility. Confidence.',
    ua: 'Сила. Гнучкість. Жіночність.',
  },
};
