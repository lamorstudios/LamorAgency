# Logos: Werkzeug und Technik

Die Logos für den Abschnitt „Technik, die man kennt" auf der Startseite.

## Dateien ablegen

Dateiname = das Feld `file` aus `src/data/toolkit.ts`:

    adobe.svg       Adobe Creative Cloud
    sony.svg        Sony
    neumann.svg     Neumann
    cubase.svg      Cubase Pro
    dji.svg         DJI
    procreate.svg   Procreate

SVG bevorzugt, PNG/WebP gehen auch. Nichts umschalten: Datei ablegen,
neu bauen, das Logo steht.

## Worauf es ankommt

- **Einfarbig weiß oder schwarz auf transparent.** Die Seite stellt alle
  Logos monochrom dar, damit sechs fremde Markenfarben das Layout nicht
  zerreißen. Ein buntes Logo wird entfärbt und sieht dann flau aus.
- **Eng beschnitten**, ohne eigene Ränder im Bild – die Abstände kommen aus
  dem Layout.
- **Höhe reicht ab 80 px** (PNG: 2× für Retina, also 160 px).

## Ohne Logo

Steht der Markenname typografisch gesetzt. Das ist bewusst gestaltet und
kein kaputter Zustand – die Seite ist auch ohne ein einziges Logo vollständig.

## Regel

Nur Marken, mit denen wirklich gearbeitet wird. Es wird kein Logo
nachgebaut, nachgezeichnet oder generiert, und es wird keine Marke ergänzt,
damit die Reihe voller aussieht. Pflege der Liste: `src/data/toolkit.ts`.
