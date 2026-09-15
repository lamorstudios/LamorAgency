/**
 * ============================================================================
 * TEMPORAERER STANDALONE-MODUS – NUR FUER DIE WEBDESIGN-LANDINGPAGE
 * ============================================================================
 *
 * WARUM ES DAS GIBT
 * Die oeffentliche Hauptwebsite von LAMOR AGENCY laeuft aktuell noch ueber
 * Wix. Der Relaunch in diesem Projekt ist noch nicht vollstaendig – auf
 * mehreren Seiten fehlen Inhalte, Bilder und Videos. Die Webdesign-Unterseite
 * ist dagegen fertig genug, um sie vorab als eigenstaendige Landingpage
 * (z. B. webdesign.lamoragency.de) fuer Meta Ads auszuspielen.
 *
 * WAS DAS HIER IST – UND WAS NICHT
 * Das ist KEIN Fork und KEINE zweite Webdesign-Seite. Es gibt weiterhin
 * genau eine Quelle: src/pages/webdesign-muenchen.astro mit denselben
 * Komponenten, denselben Preisdaten und demselben Rechner. Der Standalone-
 * Modus ist nur ein anderer BUILD-MODUS derselben Seite:
 *
 *   npm run build              -> vollstaendiger Relaunch, Webdesign ist
 *                                 eine normale Unterseite
 *   npm run build:standalone   -> nur die Webdesign-Seite (plus Pflicht-
 *                                 seiten), ausgeliefert unter "/"
 *
 * Inhaltliche Aenderungen an der Webdesign-Seite wirken automatisch in
 * beiden Modi. Es kann nichts auseinanderlaufen, weil nichts kopiert wird.
 *
 * WAS DER MODUS VERAENDERT
 *   1. Header: keine Navigation zu den unfertigen Relaunch-Seiten, kein
 *      Burger-Menue, Logo fuehrt zum Seitenanfang (siehe logoHref).
 *   2. Footer: keine Navigationsspalte in den Relaunch, CTA bleibt im Funnel.
 *   3. Build: alles ausser der Allowlist wird aus dist/ entfernt, die
 *      Webdesign-Seite rueckt auf "/" (siehe astro.config.mjs).
 * Der Besucher kann den Funnel damit nicht versehentlich verlassen.
 *
 * ============================================================================
 * SO WIRD DER MODUS SPAETER WIEDER ABGESCHALTET
 * ============================================================================
 * Wenn der komplette Relaunch fertig ist, reicht es, wieder mit
 * `npm run build` zu bauen. Es ist KEINE Code-Aenderung noetig – die
 * Webdesign-Seite ist dann sofort wieder eine regulaere Unterseite unter
 * /webdesign-muenchen/ mit voller Navigation.
 * Wer den Zwischenstand ganz entfernen will, loescht diese Datei, die
 * standaloneBuild()-Integration in astro.config.mjs, das Script
 * "build:standalone" in package.json und die drei mit STANDALONE
 * markierten Bloecke in Header.astro und Footer.astro.
 * ============================================================================
 */

/** Liest das Build-Flag. Laeuft nur im Build (Node), nie im Browser. */
const flag = (): boolean => {
  if (typeof process === 'undefined' || !process.env) return false;
  const v = process.env.LAMOR_STANDALONE;
  return v === '1' || v === 'true';
};

export const standalone = {
  /** true = temporaerer Landingpage-Build. Steuert Header, Footer und dist/. */
  enabled: flag(),

  /** Oeffentliche Adresse der temporaeren Landingpage. */
  origin: 'https://webdesign.lamoragency.de',

  /**
   * Die eine Seite, die im Standalone-Modus ausgeliefert wird.
   * Im Build wird sie zusaetzlich auf "/" gelegt.
   */
  page: 'webdesign-muenchen',

  /**
   * Bestehende Hauptwebsite (aktuell noch Wix). Wird NICHT von uns
   * veraendert. Sobald das Logo dorthin fuehren soll, `logoLeavesSite`
   * auf true setzen – dann verlaesst der Besucher die Landingpage
   * allerdings bewusst.
   */
  mainSite: 'https://www.lamoragency.de',
  logoLeavesSite: false,

  /**
   * Was im Standalone-Build erhalten bleibt. Alles andere wird aus dist/
   * entfernt, damit keine unfertige Relaunch-Seite erreichbar ist.
   * Impressum und Datenschutz MUESSEN bleiben: eine deutsche Landingpage
   * mit Kontaktformular braucht beides.
   */
  keep: ['webdesign-muenchen', 'impressum', 'datenschutz'] as const,
};

/** Ziel des Logos im Header. Im Standalone-Modus bleibt der Funnel zu. */
export const logoHref = standalone.enabled
  ? (standalone.logoLeavesSite ? standalone.mainSite : '#top')
  : '/';
