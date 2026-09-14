# Website Bernd Machnik — Anleitung

Kurz und ohne Fachbegriffe. Alles, was du regelmäßig änderst, steht in **einer**
Datei: `daten.js`.

---

## 1. Welche Datei macht was?

| Datei | Wofür |
|---|---|
| `index.html` | Startseite (Wirken kurz, Arbeiten-Vorschau, Ausstellungs-Vorschau) |
| `wirken.html` | Ausführlicher Werdegang und Vita — **bewusst nicht im Menü** |
| `arbeiten.html` | Vollständiges Werkverzeichnis mit Serien-Filtern |
| `ausstellungen.html` | Vollständiges Ausstellungsregister |
| `impressum.html` | Pflichtangaben — **muss noch ausgefüllt werden** |
| `daten.js` | **Deine Arbeitsdatei.** Bilder und Ausstellungen |
| `style.css` | Aussehen (Farben, Schriften, Abstände) |
| `script.js` | Technik im Hintergrund — nicht anfassen |
| `assets/` | Ordner für alle Bilddateien |
| `icons/` | Favicon (das kleine Symbol im Browser-Tab) |

---

## 2. Ein neues Bild hinzufügen

1. Bilddatei in den Ordner `assets/werke/` legen.
   Empfehlung: JPG, längste Seite ca. 1600 px, unter 500 KB.
2. `daten.js` in einem Texteditor öffnen (TextEdit, VS Code, Notepad).
3. Bei `var WERKE = [` einen vorhandenen Block kopieren und anpassen:

```js
  {
    bild:    "assets/werke/landschaften-04.jpg",
    titel:   "Seestück VIII",
    jahr:    "2026",
    technik: "Öl auf Leinwand",
    masse:   "120 × 90 cm",
    serie:   "landschaften",
    start:   true
  },
```

* `serie` muss einer der Kurznamen aus der Liste `SERIEN` ganz oben sein.
* `start: true` bedeutet: erscheint zusätzlich in der Vorschau auf der Startseite.
  Lass diese Zeile weg, wenn das Bild nur unter „Arbeiten“ stehen soll.
* Nach jedem Block steht ein **Komma**. Nur nach dem allerletzten nicht.

Speichern, Seite im Browser neu laden — fertig.

---

## 3. Eine Ausstellung eintragen

Gleiches Prinzip, weiter unten bei `var AUSSTELLUNGEN = [`:

```js
  {
    ort:      "Hamburg",
    haus:     "Kunstverein Hamburg",
    zeitraum: "März – Juni 2031",
    jahr:     2031,
    status:   "kommend",
    bild:     "assets/ausstellungen/hamburg.jpg",
    text:     "Kurzbeschreibung in ein bis zwei Sätzen.",
    start:    true
  },
```

* `status` ist `"kommend"` oder `"vergangen"` — danach sortiert die Seite selbst.
* Wenn eine Ausstellung vorbei ist: `status` auf `"vergangen"` ändern und
  `start: true` löschen. Sie rutscht dann automatisch ins untere Register.
* `bild` ist freiwillig. Fehlt es, zeigt die Seite nur den Text.

---

## 4. Eine neue Serie anlegen

Ganz oben in `daten.js` bei `var SERIEN = [` eine Zeile ergänzen:

```js
  { id: "portraets", name: "Porträts", zeitraum: "1990–1995" },
```

Der `id`-Name darf keine Leerzeichen und keine Umlaute enthalten. Danach kannst
du bei Bildern `serie: "portraets"` eintragen. Die Filter-Schaltfläche erscheint
von selbst — aber nur, wenn mindestens ein Bild dieser Serie zugeordnet ist.

---

## 5. Was noch fehlt

- [ ] `assets/hero.jpg` — großes Bild für den Kopf der Startseite (quer, ab 2000 px)
- [ ] `assets/portrait.jpg` — das Selbstporträt
- [ ] Die echten Bilddateien in `assets/werke/`
- [ ] Ausstellungsfotos in `assets/ausstellungen/`
- [ ] E-Mail-Adresse und Telefonnummer: stehen in **allen** HTML-Dateien ganz
      unten im Kontakt-Bereich (`kontakt@berndmachnik.de`, `+49000000000`)
- [ ] `impressum.html` ausfüllen — für eine deutsche Website Pflicht
- [ ] Die Texte der vier kommenden Ausstellungen prüfen (aktuell aus deinem
      Entwurf übernommen, teils Platzhalter)

Solange Bilder fehlen, zeigt die Seite einen ruhigen Platzhalter statt eines
kaputten Symbols. Es sieht also nie beschädigt aus.

---

## 6. Menü ändern

Die Navigation steht in jeder HTML-Datei oben, zwischen `<nav class="nav">` und
`</nav>`. Änderst du sie, ändere sie in **allen fünf** Dateien gleich.

„Wirken“ steht auf deinen Wunsch nicht im Menü. Die Seite ist erreichbar über
den Link „Werdegang lesen“ auf der Startseite und über die Fußzeile.

---

## 7. Farben ändern

In `style.css` ganz oben, im Block `:root`. Dort stehen alle Farben an einer
Stelle — änderst du dort einen Wert, ändert er sich auf allen Seiten.

```css
--linen:        #eae3d3;   /* heller Hintergrund */
--indigo:       #20232b;   /* dunkle Flächen     */
--ultramarine:  #2e4374;   /* kühler Akzent      */
--ochre:        #c89b3c;   /* warmer Akzent      */
```

---

## 8. Hochladen zu IONOS

Alle Dateien **und** die Ordner `assets/` und `icons/` in das Web-Verzeichnis
laden (bei IONOS meist ein Ordner, der ähnlich wie `/` oder `htdocs` heißt).
Die Ordnerstruktur muss dabei erhalten bleiben — `index.html` liegt oben,
`assets/` und `icons/` daneben.

Zum Ausprobieren vorher: `index.html` einfach doppelklicken. Die Seite
funktioniert vollständig auch ohne Internet-Server.
