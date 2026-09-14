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
