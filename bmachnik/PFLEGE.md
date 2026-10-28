# Website pflegen

Alle Inhalte, die sich ändern, stehen in **`daten.js`**. Die Datei lässt sich mit jedem Texteditor öffnen (TextEdit im Modus „Reiner Text“, besser: Visual Studio Code oder BBEdit). HTML-Dateien müssen nicht angefasst werden.

Nach dem Speichern die Seite im Browser neu laden. Bleibt eine Seite leer, steht in `daten.js` meist ein Komma oder Anführungszeichen zu wenig. Die Browser-Konsole (Safari: Entwickler › JavaScript-Konsole) nennt die Zeile.

---

## Ein Bild austauschen

1. Neue Datei unter **genau demselben Namen** in `bilder/werke/` ablegen (alte Datei ersetzen).
2. Fertig. Die Proportionen werden aus dem Bild übernommen.

## Ein neues Werk hinzufügen

1. Bild nach den Regeln in `bilder/README.md` benennen und in `bilder/werke/` legen.
2. In `daten.js` in der Liste `WERKE` an der passenden Stelle einen Eintrag einfügen:

```js
  { id: "ls-2026-01", serie: "landschaften", jahr: 2026, technik: "Öl auf Leinwand", masse: "120 × 140 cm",
    datei: "landschaften-2026-01.jpg", start: false },
```

- `masse` immer **Höhe × Breite**. Unbekannt: leer lassen (`masse: ""`).
- `start: true` zeigt das Werk auf der Startseite. Es sind genau sechs vorgesehen; dafür bei einem anderen Werk `start: false` setzen.

## Die Bilder im Kopfbereich der Startseite wechseln

Oben auf der Startseite laufen mehrere Bilder durch, alle fünf Sekunden wechselt
eines weich ins nächste.

1. Neue Datei in `bilder/seite/` ablegen, zum Beispiel `hintergrund-6.jpg`
   (quer, mindestens 2000 px breit, als JPG unter 400 KB).
2. In `daten.js` in der Liste `HINTERGRUND` eine Zeile ergänzen.

Die Reihenfolge in der Liste ist die Reihenfolge auf der Seite — das erste Bild
sehen Besucher zuerst. Steht dort nur ein einziges Bild, bleibt es stehen und
wechselt nicht. Wer am Rechner „Bewegung reduzieren“ eingestellt hat, sieht
ebenfalls nur das erste Bild.

## Eine Ausstellung ankündigen

In `daten.js` in der Liste `AUSSTELLUNGEN` einen Eintrag einfügen:

```js
  { id: "hamburg-2031", status: "kommend",
    ort: "Name des Hauses", stadt: "Hamburg",
    zeitraum: "März–Mai 2031", beginn: "2031-03", ende: "2031-05",
    titel: "", text: "Ein kurzer Satz.",
    bild: "hamburg-haus.jpg", werk: "", gross: false },
```

- Die Reihenfolge ergibt sich von selbst aus `beginn`.
- Nach dem Monat in `ende` wandert die Ausstellung automatisch zu „Bisherig“.
- `bild` ist ein Raumfoto aus `bilder/ausstellungen/`. Gibt es noch keins, kann bei `werk` die `id` eines Werks stehen.
- `gross: true` macht daraus die große Karte. Das sollte nur bei einer Ausstellung gesetzt sein.

## Kontakt und Vita

- E-Mail und Atelier-Ort: in `EINSTELLUNGEN`. Sie erscheinen auf der Seite „Kontakt“.
- Vita: Liste `VITA`, ein Eintrag pro Zeile.
- Impressum und Datenschutz stehen direkt in `impressum.html` und werden nur selten geändert.

## Offene Stellen finden

Alle Platzhalter und offenen Fragen stehen in eckigen Klammern. In allen Dateien nach `[` suchen.

## Vorschau auf dem eigenen Rechner

`index.html` per Doppelklick öffnen genügt für einen schnellen Blick (Chrome zeigt dabei Ersatzschriften, Safari die richtigen). Genau wie online sieht es aus, wenn man im Terminal im Projektordner startet:

```bash
ruby -run -e httpd . -p 8000
```

und dann `http://localhost:8000` aufrufen.

## Veröffentlichen

Den ganzen Ordner auf den Webspace hochladen, **ohne** den Archivordner `230822 Kunst B.Machnik`, ohne `.claude/` und ohne die `.md`-Dateien. Es gibt keinen Build-Schritt.


---

## Das Kontaktformular

Das Formular auf `kontakt.html` wird von **Netlify** entgegengenommen — dort
läuft die Website. Im HTML steht dafür nur das Attribut `data-netlify="true"`;
es braucht kein Skript und keinen Dienstleister.

**Einmalig einzurichten**, nachdem die Seite das erste Mal mit Formular
veröffentlicht wurde:

1. Im Netlify-Konto das Projekt `berndmachnik` öffnen.
2. Unter *Project configuration › Forms* das Formular `kontakt` auswählen.
3. Bei *Form notifications* eine E-Mail-Benachrichtigung an
   `distribution@berndmachnik.de` einrichten.

Ohne Schritt 3 landen die Nachrichten zwar im Netlify-Konto, es kommt aber keine
E-Mail an. Die kostenlose Stufe umfasst 100 Nachrichten im Monat.

Nach dem Absenden landen Besucher auf `danke.html`. Diese Seite ist absichtlich
von Suchmaschinen ausgenommen.

## Schrift nachrüsten

Die Überschriften sollen in **Inter** stehen. Die Schriftdatei fehlt noch, bis
dahin nimmt der Browser automatisch die nächstbeste Systemschrift (auf dem Mac
Helvetica Neue). Das sieht ordentlich aus, ist aber auf jedem Rechner minimal
anders.

So wird Inter fest eingebaut:

1. Auf <https://rsms.me/inter/> oder <https://fontsource.org/fonts/inter> die
   Variable-Fassung als `woff2` für „latin“ herunterladen.
2. Die Datei in den Ordner `fonts/` legen und in
   `inter-latin-wght-normal.woff2` umbenennen.
3. In `style.css` ganz oben den auskommentierten `@font-face`-Block für Inter
   freischalten: die Zeile `/* Zum Nachrüsten von Inter: …` und das `*/`
   darunter entfernen.
4. In allen HTML-Dateien im Kopf diese Zeile ergänzen, direkt über der Zeile mit
   `work-sans`:

```html
  <link rel="preload" href="fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
```

Danach sieht die Seite überall gleich aus.

## Farben ändern

Alle Farbwerte stehen in `style.css` ganz oben im Block `:root`, und zwar nur
dort. Vier Grundfarben, der Rest sind Aufhellungen davon:

| Variable | Wert | wofür |
|---|---|---|
| `--weiss` | `#fafcfc` | helle Grundfläche |
| `--grau` | `#c5d6de` | zweite helle Fläche, Platzhalter |
| `--dunkel` | `#332929` | dunkle Flächen und Text auf hell |
| `--akzent` | `#4a0b0b` | Links, Linien, Fokusrahmen auf hell |

Wer einen dieser Werte ändert, ändert ihn auf allen Seiten gleichzeitig.
