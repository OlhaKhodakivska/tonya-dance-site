import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LegalPage } from './legal/LegalPage';
import { contactEmail } from './data';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage title="Datenschutzerklärung" homeLabel="Back to Home">
      <section>
        <h2 className="mb-6 border-b border-brand/30 pb-2 text-xl font-bold uppercase text-white">
          1. Datenschutz auf einen Blick
        </h2>
        <h3 className="mb-3 text-base font-bold text-white">Allgemeine Hinweise</h3>
        <p className="mb-4">
          Diese Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        </p>
        <h3 className="mb-3 text-base font-bold text-white">Datenerfassung auf dieser Website</h3>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ entnehmen.
        </p>
      </section>

      <section>
        <h2 className="mb-6 border-b border-brand/30 pb-2 text-xl font-bold uppercase text-white">
          2. Hosting
        </h2>
        <p>
          Wir hosten die Inhalte unserer Website bei einem externen Anbieter. Dabei können technische Daten wie IP-Adressen, Meta- und Kommunikationsdaten gespeichert werden.
        </p>
      </section>

      <section>
        <h2 className="mb-6 border-b border-brand/30 pb-2 text-xl font-bold uppercase text-white">
          3. Allgemeine Hinweise und Pflichtinformationen
        </h2>
        <h3 className="mb-3 text-base font-bold text-white">Hinweis zur verantwortlichen Stelle</h3>
        <p className="mb-4 text-white">
          Tonya Musemotion<br />
          Adresse: [wird bei Geschäftsaufnahme eingetragen]<br />
          E-Mail: {contactEmail}
        </p>
        <p>
          Ihre personenbezogenen Daten werden ausschließlich zur Bearbeitung von Anfragen und Buchungen verwendet. Es werden angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer Daten ergriffen.
        </p>
      </section>

      <section>
        <h2 className="mb-6 border-b border-brand/30 pb-2 text-xl font-bold uppercase text-white">
          4. Datenerfassung auf dieser Website
        </h2>
        <h3 className="mb-3 text-base font-bold text-white">Kontaktformular / Buchung</h3>
        <p className="mb-4">
          Wenn Sie uns per Kontaktformular oder Buchungsanfrage Informationen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert.
        </p>
        <p>
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
        </p>
      </section>

      <section>
        <h2 className="mb-6 border-b border-brand/30 pb-2 text-xl font-bold uppercase text-white">
          5. Betroffenenrechte
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
      </section>
    </LegalPage>
  </StrictMode>,
);
