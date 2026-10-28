# Bilder

## Ordner

| Ordner           | Inhalt                                             |
|------------------|----------------------------------------------------|
| `werke/`         | Abbildungen der Werke                              |
| `ausstellungen/` | Raumfotos der Ausstellungsorte                     |
| `seite/`         | `portrait.jpg` (Selbstbildnis), `og.jpg` (Vorschaubild beim Teilen von Links) |

## Dateinamen

Nur Kleinbuchstaben, Ziffern und Bindestriche, keine Umlaute, keine Leerzeichen.

- **Werke:** `<serie>-<jahr>-<nr>.jpg`, zum Beispiel `tischflaechen-2020-01.jpg` oder `landschaften-2025-02.jpg`.
  Die Serie wird so geschrieben wie die `id` in `daten.js` (`stillleben`, `tischflaechen`, `landschaften`, `grafik-kugelschreiber`, `grafik-diverse`).
- **Ausstellungen:** `<stadt>-<ort>.jpg`, zum Beispiel `berlin-bethanien.jpg` oder `leipzig-spinnerei.jpg`.

Der Dateiname muss genau so in `daten.js` stehen (Feld `datei` bzw. `bild`).

## Format und Größe

- JPEG, Farbraum sRGB.
- **Werke:** längste Kante 1600 bis 2000 px, möglichst unter 600 KB. Nur das Bild selbst zeigen: ohne Rahmen, Passepartout und Wand, gerade aufgenommen, ohne Spiegelungen.
- **Ausstellungen:** Querformat, längste Kante etwa 1600 px. Die Fotos werden im Format 3:2 gezeigt und dabei mittig beschnitten. Werke selbst werden nie beschnitten.
- **og.jpg:** etwa 1200 × 630 px.

Fehlt eine Datei, zeigt die Seite an ihrer Stelle eine ruhige Fläche in den richtigen Proportionen.

## Zum aktuellen Stand

Die Abbildungen in `werke/` sind aus Archivfotos zugeschnitten (Ordner `230822 Kunst B.Machnik`). Sie sollten nach und nach durch gute Reproduktionen ersetzt werden; dabei einfach dieselben Dateinamen verwenden.
