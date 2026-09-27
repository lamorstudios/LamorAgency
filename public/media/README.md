# Medien-Slots

Dateien, die hier liegen, werden beim Build automatisch erkannt und
eingesetzt. Es muss nichts im Code umgeschaltet werden.

## Hero-Video der Startseite

    hero.webm         bevorzugt (kleiner)
    hero.mp4          Fallback für Safari/ältere Geräte
    hero-poster.jpg   Standbild – wird vor dem Video und bei Reduced Motion gezeigt

Solange keine Datei hier liegt, zeigt der Hero die Platzhalter-Fläche.
Sobald `hero.mp4` oder `hero.webm` vorhanden ist, läuft das Video.

### Empfehlung für die Dateien

| Datei           | Richtwert                                                  |
|-----------------|------------------------------------------------------------|
| hero.mp4        | H.264, 1920×1080, ~6–10 s Loop, 3–6 MB, ohne Tonspur        |
| hero.webm       | VP9, gleiche Länge, meist 30–40 % kleiner als das MP4       |
| hero-poster.jpg | 1920×1080, ~150–250 KB, erstes Frame des Loops              |

Die Tonspur kann entfallen: Das Video läuft stumm (Browser erlauben
Autoplay zuverlässig nur ohne Ton).

Beispiel zum Erzeugen:

    ffmpeg -i original.mov -an -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow hero.mp4
    ffmpeg -i original.mov -an -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 hero.webm
    ffmpeg -i original.mov -vf "select=eq(n\,0),scale=1920:-2" -frames:v 1 -q:v 3 hero-poster.jpg

## Showreel

    showreel.mp4 / showreel.webm / showreel-poster.jpg

Gleiche Logik wie oben.

## Cinematic Film der Webdesign-Landingpage

    cinematic.mp4          der Film (Pflicht)
    cinematic.webm         optional, VP9 – wird bevorzugt, wenn vorhanden
    cinematic-poster.jpg   Standbild, wird vor dem ersten Frame gezeigt

Liegt keine Videodatei hier, rendert der Abschnitt gar nichts. Es entsteht
keine leere schwarze Fläche, die Seite bleibt vollständig.

Aktuell liegt hier der freigegebene Master, **unverändert** übernommen:
1920×1080, H.264 High, 25 fps, 30,2 s, ohne Tonspur, 7,4 MB (2,05 Mbit/s),
moov-Atom vorne (faststart). Bewusst kein zweiter Encode – jeder weitere
Durchlauf kostet in den tiefen Schwarzwerten sichtbar Qualität.

### Wenn der Film auf dem Handy leichter werden soll

Der Film wird erst geladen, wenn der Abschnitt ins Sichtfeld kommt – wer nie
so weit scrollt, lädt ihn nie. Wem das auf Mobilfunk trotzdem zu viel ist:

    ffmpeg -i cinematic.mp4 -an -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 cinematic.webm

Das WebM wird automatisch bevorzugt, sobald es hier liegt; Safari fällt auf
das MP4 zurück. Vorher am Bildschirm prüfen: Der Film ist überwiegend
schwarz mit feinen Verläufen, und genau dort entsteht bei zu hohem CRF
Streifenbildung (Banding).

### Wichtig: der Preis steckt im Bild

Im Film ist **„ab 124,17 € im Monat"** fest eingebrannt – als Bild, nicht als
Text. Ändert sich der Einstiegspreis oder die längste Laufzeit in
`src/data/website-pricing.ts`, stimmt der Film nicht mehr und muss neu
gerendert werden. Der Build meldet das: `WebsiteFilm.astro` vergleicht die
Zahl beim Bauen und schreibt eine Warnung ins Log, sobald sie abweicht.

## Mobile-Showcase im orangen Abschnitt („Website + Content")

    mobile.mp4          das Hochformat-Video (Pflicht)
    mobile.webm         optional, VP9 – wird bevorzugt, wenn vorhanden
    mobile-poster.jpg   Standbild

Läuft im CSS-Smartphone-Mockup (`src/components/PhoneMockup.astro`). Liegt
keine Videodatei hier, rendert das Mockup nichts – der Abschnitt bleibt
stehen, nur ohne Medienspalte.

Aktuell: 1080×1920 (9:16), H.264, 30 fps, 10 s, 5,3 MB. Der Bildstrom wurde
**nicht neu kodiert** (MD5 der Videospur vor und nach der Bearbeitung
identisch); entfernt wurde nur die AAC-Tonspur, und das moov-Atom liegt
jetzt vorne.

### Seitenverhältnis: 9:16, nicht 19,5:9

Die Displayfläche des Mockups hat exakt das Verhältnis des Videos. Ein
modernes iPhone ist schmaler (19,5:9); bei diesem Verhältnis würde
`object-fit: cover` links und rechts je rund 11 % wegschneiden – und genau
dort stehen im Video die Überschriften und die Vergleichstabelle. Deshalb
folgt die Aussparung dem Material, nicht dem Gerät. Wer ein Video mit
anderem Verhältnis einsetzt, gibt es dem Mockup über `ratio` mit.

### Warum zwei Videodateien

`cinematic.mp4` (Querformat, 30 s) und `mobile.mp4` (Hochformat, 10 s) sind
unterschiedliche Filme mit unterschiedlichem Inhalt – keine zwei Fassungen
desselben Materials. Jede Datei wird auf der Seite genau einmal eingebunden
und nur geladen, wenn ihr Abschnitt ins Sichtfeld kommt.
