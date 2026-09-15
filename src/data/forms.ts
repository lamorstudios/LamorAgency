/**
 * ============================================================================
 * FORMULAR-VERSAND – zentrale Konfiguration
 * ============================================================================
 *
 * WARUM ES DAS GIBT
 * Die Formulare im Projekt sind fuer NETLIFY FORMS gebaut (data-netlify,
 * netlify-honeypot, verstecktes form-name; siehe netlify.toml). Netlify
 * erkennt diese Formulare beim Deploy und legt serverseitig einen Endpunkt
 * an. Das funktioniert ausschliesslich auf Netlify.
 *
 * Die Landingpage laeuft aktuell auf GitHub Pages. GitHub Pages ist ein
 * reiner Dateiserver und beantwortet nur GET und HEAD – ein POST bekommt
 * 405 zurueck. Genau daran scheitert der Versand dort: das Formular ist in
 * Ordnung, der Host kann keine Formulare annehmen.
 *
 * Deshalb kennt das Formular jetzt zwei Transportwege, umschaltbar an
 * genau dieser Stelle:
 *
 *   'netlify'   Netlify Forms. Kein Zusatzdienst, keine Zugangsdaten.
 *               Voraussetzung: die Seite liegt auf Netlify.
 *
 *   'endpoint'  POST an einen externen Formular-Endpunkt (z. B. Formspree).
 *               Fuer statische Hoster wie GitHub Pages. Die Adresse kommt
 *               aus der Umgebungsvariable LAMOR_FORM_ENDPOINT und steht
 *               NICHT im Repository.
 *
 * Umgeschaltet wird nicht im Code, sondern ueber die Umgebung:
 *   ist LAMOR_FORM_ENDPOINT gesetzt -> 'endpoint'
 *   sonst                           -> 'netlify'
 *
 * KEINE GEHEIMNISSE IM FRONTEND
 * Hier steht nie ein API-Key, kein Passwort, kein Postfachzugang. Die
 * Endpunkt-Adresse ist eine oeffentliche URL, die der Dienst selbst
 * vergibt; das Ziel-Postfach ist ausschliesslich beim Dienst hinterlegt.
 * Deshalb gehoert sie in eine Umgebungsvariable, nicht in den Quelltext.
 */

/** Postfach, in dem die Anfragen landen sollen. Nur zur Anzeige im Fehlerfall. */
export const formRecipient = 'info@lamoragency.de';

const endpoint =
  (typeof process !== 'undefined' && process.env?.LAMOR_FORM_ENDPOINT) || '';

export const formConfig = {
  /** 'netlify' oder 'endpoint' – ergibt sich aus der Umgebung. */
  transport: (endpoint ? 'endpoint' : 'netlify') as 'netlify' | 'endpoint',
  /** Nur im Modus 'endpoint' gesetzt. Oeffentliche Adresse, kein Secret. */
  endpoint,
  recipient: formRecipient,
};
