import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LegalPage } from './legal/LegalPage';
import { contactEmail } from './data';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage title="Datenschutzerklärung" homeLabel="Back to Home">
      <section>
        <h2 className="soft-text mb-6 border-b border-brand/30 pb-2 text-xl font-bold">1. Datenschutz Auf Einen Blick</h2>

        <h3 className="soft-text mb-3 text-base font-bold">Allgemeine Hinweise</h3>
        <p className="mb-4">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>

        <h3 className="soft-text mb-3 text-base font-bold">Datenerfassung Auf Dieser Website</h3>
        <p className="mb-4">
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website
          entnehmen.
        </p>
        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong>
          <br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, zum Beispiel per E-Mail oder über eine Buchungsanfrage. Andere Daten
          werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch IT-Systeme erfasst, zum Beispiel IP-Adresse, Browser oder Uhrzeit
          des Seitenaufrufs.
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-6 border-b border-brand/30 pb-2 text-xl font-bold">2. Hosting (GitHub Pages)</h2>
        <p className="mb-4">
          Wir hosten unsere Website bei GitHub Pages. Anbieter ist die GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA.
        </p>
        <p>
          Wenn Sie unsere Website besuchen, erfasst GitHub unter anderem Ihre IP-Adresse. Dies ist technisch notwendig, um die Website an Ihren Browser zu
          übermitteln. Die Verwendung von GitHub Pages erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer fehlerfreien
          und sicheren Bereitstellung unserer Website). Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub:{' '}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            GitHub Privacy Statement
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="soft-text mb-6 border-b border-brand/30 pb-2 text-xl font-bold">3. Allgemeine Hinweise Und Pflichtinformationen</h2>

        <h3 className="soft-text mb-3 text-base font-bold">Datenschutz</h3>
        <p className="mb-4">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
          entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>

        <h3 className="soft-text mb-3 text-base font-bold">Hinweis Zur Verantwortlichen Stelle</h3>
        <p className="mb-4">
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Person.
          <br />
          E-Mail:{' '}
          <a href={`mailto:${contactEmail}`} className="text-brand hover:underline">
            {contactEmail}
          </a>
        </p>

        <h3 className="soft-text mb-3 text-base font-bold">Widerruf Ihrer Einwilligung Zur Datenverarbeitung</h3>
        <p className="mb-4">
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit
          widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>

        <h3 className="soft-text mb-3 text-base font-bold">Recht Auf Beschwerde Bei Der Zuständigen Aufsichtsbehörde</h3>
        <p className="mb-4">
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>

        <h3 className="soft-text mb-3 text-base font-bold">Recht Auf Auskunft, Löschung Und Berichtigung</h3>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und gegebenenfalls ein Recht auf Berichtigung oder
          Löschung dieser Daten.
        </p>
      </section>
    </LegalPage>
  </StrictMode>,
);
