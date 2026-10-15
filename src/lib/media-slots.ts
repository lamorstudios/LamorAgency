/**
 * Medien-Slots: prüft zur BUILD-Zeit, welche Dateien in /public/media liegen.
 *
 * Damit muss niemand ein Flag umlegen. Datei ablegen, neu bauen, fertig –
 * die Anleitung dazu steht in public/media/README.md.
 *
 * Läuft ausschliesslich im Build (Node), nie im Browser.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const MEDIA_DIR = join(process.cwd(), 'public', 'media');

const has = (file: string) => existsSync(join(MEDIA_DIR, file));

export interface VideoSlot {
  /** Mindestens eine Videodatei liegt vor. */
  available: boolean;
  webm?: string;
  mp4?: string;
  poster?: string;
}

/** Sucht webm/mp4/poster zu einem Basisnamen, z. B. "hero". */
export function videoSlot(base: string): VideoSlot {
  const webm = has(`${base}.webm`) ? `/media/${base}.webm` : undefined;
  const mp4 = has(`${base}.mp4`) ? `/media/${base}.mp4` : undefined;
  const poster = ['jpg', 'jpeg', 'webp', 'avif', 'png']
    .map((ext) => (has(`${base}-poster.${ext}`) ? `/media/${base}-poster.${ext}` : undefined))
    .find(Boolean);
  return { available: Boolean(webm || mp4), webm, mp4, poster };
}

/**
 * ERKLAERFILM ZU EINER LEISTUNG
 *
 * Sucht den Film zu einem Service-Slug aus src/data/services.ts:
 *
 *   public/media/erklaerfilm-video-production.mp4
 *   public/media/erklaerfilm-motion-graphics.mp4
 *   public/media/erklaerfilm-branding.mp4
 *   public/media/erklaerfilm-web-design.mp4
 *   … dazu optional -poster.jpg und .webm
 *
 * Es muss nichts umgeschaltet werden: Datei ablegen, neu bauen, der Film
 * steht auf der Startseite. Fehlt er, zeigt der Block statt dessen das
 * Standbild oder – wenn auch das fehlt – nur Text. Es entsteht nie eine
 * leere schwarze Flaeche und nie ein "Video folgt"-Hinweis.
 */
export function serviceFilm(slug: string): VideoSlot {
  return videoSlot(`erklaerfilm-${slug}`);
}
