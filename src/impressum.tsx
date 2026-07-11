import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LegalPage } from './legal/LegalPage';
import { contactEmail } from './data';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage title="Impressum" homeLabel="Back to Home">
      <section>
        <h2 className="soft-text mb-4 border-b border-brand/30 pb-2 text-sm font-bold tracking-[0.12em]">Angaben Gemäß § 5 TMG:</h2>
        <p className="soft-text text-lg">
          [Vollständiger Name Antonina]<br />
          [Straße und Hausnummer]<br />
          [Postleitzahl und Stadt]
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-4 border-b border-brand/30 pb-2 text-sm font-bold tracking-[0.12em]">Kontakt:</h2>
        <p>
          Telefon: [Telefonnummer]<br />
          E-Mail:{' '}
          <a href={`mailto:${contactEmail}`} className="text-brand hover:underline">
            {contactEmail}
          </a>
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-4 border-b border-brand/30 pb-2 text-sm font-bold tracking-[0.12em]">Umsatzsteuer-ID:</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          [Umsatzsteuer-ID eintragen oder diesen Abschnitt entfernen, falls nicht vorhanden]
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-4 border-b border-brand/30 pb-2 text-sm font-bold tracking-[0.12em]">EU-Streitschlichtung:</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            https://ec.europa.eu/consumers/odr
          </a>
          .<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-4 border-b border-brand/30 pb-2 text-sm font-bold tracking-[0.12em]">
          Verbraucherstreitbeilegung/Universalschlichtungsstelle:
        </h2>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>
    </LegalPage>
  </StrictMode>,
);
