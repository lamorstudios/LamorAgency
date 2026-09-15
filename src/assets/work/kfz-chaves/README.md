# Screenshots KFZ Chaves

Hier gehören die **echten Screenshots** von <https://kfz-chaves.de/> hinein.
Sie erscheinen im Abschnitt „So sehen unsere Websites aus." auf
`/webdesign-muenchen/`.

## Benötigte Dateien

| Dateiname | Inhalt | Beschriftung auf der Seite |
| --- | --- | --- |
| `hero.png` | Hero / Startseite | Start |
| `werkstatt.png` | „Mehr als eine Werkstatt" | Werkstatt |
| `terminbuchung.png` | Terminbuchung (5 Schritte) | Terminbuchung |

## Vorgaben

- **PNG** (verlustfrei, so wie das Handy den Screenshot speichert). JPG geht
  auch, PNG ist bei Screenshots aber sauberer. Nicht vorher zu WebP
  konvertieren – das macht der Build.
- **Originalauflösung** unverändert lassen, mindestens **900 px Breite**.
  Astro erzeugt beim Build AVIF/WebP in 420/640/900/1200 px.
- Alle drei Screenshots mit **derselben Gerätebreite** aufnehmen, damit die
  Überblendung nicht springt.
- Ohne Statusleiste/Browserleiste des Telefons – die Browserzeile
  (Punkte + `kfz-chaves.de`) wird im Code gebaut.

## Regeln

Nur echte Aufnahmen der Live-Website. Keine nachgebauten Screens, keine
generierten Inhalte, keine Laptop-, Handy- oder 3D-Mockups.

Fehlt eine Datei, rendert `WebsiteShowcase.astro` einen sichtbar
gekennzeichneten Slot – nie ein erfundenes Bild.

Weitere Referenzen bekommen einen eigenen Ordner `src/assets/work/<id>/` und
einen Eintrag in `src/data/website-showcase.ts`.
