import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LegalPage } from './legal/LegalPage';
import { contactEmail } from './data';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage title="Impressum" homeLabel="Back to Home">
      <section>
        <h2 className="mb-4 border-b border-brand/30 pb-2 text-sm font-bold uppercase tracking-widest text-white">
          Angaben gemäß § 5 TMG
        </h2>
        <p className="text-lg text-zinc-300">
          Tonya Musemotion<br />
          Adresse: [wird bei Geschäftsaufnahme eingetragen]
        </p>
      </section>
      <section>
        <h2 className="mb-4 border-b border-brand/30 pb-2 text-sm font-bold uppercase tracking-widest text-white">
          Kontakt
        </h2>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${contactEmail}`} className="text-brand hover:underline">
            {contactEmail}
          </a>
        </p>
      </section>
    </LegalPage>
  </StrictMode>,
);
