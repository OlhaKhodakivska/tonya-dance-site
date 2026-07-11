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
export const heroVideo = './videos/website-start.mov';

export const landingContent: Content = {
  nav: {
    en: ['About', 'Training', 'Workshops', 'Contact'],
    ua: ['Про мене', 'Заняття', 'Воркшопи', 'Контакт'],
  },
  hero: {
    heading: {
      en: ['Strength.', 'Flexibility.', 'Confidence.'],
      ua: ['Сила.', 'Гнучкість.', 'Жіночність.'],
    },
    subhead: {
      en: 'Professional stretching & pole dance coach. Build a strong, flexible and confident body through precise technique, control and refined movement.',
      ua: 'Професійна тренерка зі стретчингу та pole dance. Трансформація твого тіла через техніку, контроль і естетику руху.',
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
      en: 'I’m Tonya, a professional stretching and pole dance coach.',
      ua: 'Я — Тоня, професійна тренерка зі стретчингу та pole dance.',
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
      en: 'Stretching · Pole Dance · Exotic',
      ua: 'Стретчинг · Pole Dance · Exotic',
    },
    items: [
      {
        title: { en: 'Stretching', ua: 'Stretching' },
        description: {
          en: 'Structured sessions to increase mobility, strength and recovery.',
          ua: 'Спеціально розроблені тренування для підвищення рухливості, сили та прискорення відновлення.',
        },
        image: './images/stretching.jpg',
        alt: 'Stretching',
      },
      {
        title: { en: 'Pole Dance', ua: 'Pole Dance' },
        description: {
          en: 'Technique-based pole classes for graceful movement and control.',
          ua: 'Заняття з пілону, орієнтовані на техніку, для витончених рухів та контролю.',
        },
        image: './images/pole_dance.jpg',
        alt: 'Pole dance',
      },
      {
        title: { en: 'Exotic Pole', ua: 'Exotic Pole' },
        description: {
          en: 'Expressive sensual movement with elegant lines and strong choreography.',
          ua: 'Виразні чуттєві рухи з витонченими лініями та потужною хореографією.',
        },
        image: './images/exotic.jpg',
        alt: 'Exotic pole',
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
