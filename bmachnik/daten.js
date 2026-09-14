/* ============================================================
   DATEN — die einzige Datei, die du zum Aktualisieren brauchst
   ============================================================

   Hier trägst du deine Bilder und Ausstellungen ein.
   Die Website baut sich daraus von selbst auf — sowohl die
   Startseite als auch die Unterseiten.

   Du musst KEINE andere Datei anfassen.

   Drei Regeln, damit nichts kaputtgeht:
   1. Jeder Eintrag steht in geschweiften Klammern  {  ...  }
   2. Nach jedem Eintrag kommt ein Komma
   3. Texte stehen immer in "Anführungszeichen"

   ============================================================ */


/* ------------------------------------------------------------
   1. SERIEN
   ------------------------------------------------------------
   Das sind die Filter-Schaltflächen auf der Seite "Arbeiten".
   "id" ist der interne Name — den benutzt du unten bei den
   Bildern. Er darf keine Leerzeichen und keine Umlaute haben.
   ------------------------------------------------------------ */

var SERIEN = [
  { id: "stillleben",   name: "Stillleben",          zeitraum: "1983–1988" },
  { id: "tischflaechen", name: "Tischflächen",       zeitraum: "2017–2020" },
  { id: "landschaften", name: "Landschaften",        zeitraum: "2019–2025" },
  { id: "grafik-kugel", name: "Grafik",              zeitraum: "Kugelschreiber" },
  { id: "grafik-div",   name: "Grafik",              zeitraum: "diverse" }
];


/* ------------------------------------------------------------
   2. ARBEITEN
   ------------------------------------------------------------
   Ein Block pro Bild. So legst du ein neues Bild an:

   - Bilddatei in den Ordner  assets/werke/  legen
   - Einen Block hier kopieren, einfügen und ausfüllen
   - Bei "serie" eine der id's aus der Liste oben eintragen

   "start: true"  bedeutet: dieses Bild erscheint zusätzlich in
   der Vorschau auf der Startseite. Ohne diese Zeile erscheint
   es nur auf der Seite "Arbeiten".
   Empfehlung: 6 bis 8 Bilder auf  start: true  setzen.
   ------------------------------------------------------------ */

var WERKE = [

  /* --- Stillleben ------------------------------------------ */
  {
    bild:    "assets/werke/stillleben-01.jpg",
    titel:   "Glas auf Tisch",
    jahr:    "1985",
    technik: "Öl auf Leinwand",
    masse:   "55 × 35 cm",
    serie:   "stillleben",
    start:   true
  },
  {
    bild:    "assets/werke/stillleben-02.jpg",
    titel:   "Kanne",
    jahr:    "1985",
    technik: "Öl auf Leinwand",
    masse:   "60 × 45 cm",
    serie:   "stillleben",
    start:   true
  },
  {
    bild:    "assets/werke/stillleben-03.jpg",
    titel:   "Schale, blau",
    jahr:    "1986",
    technik: "Öl auf Leinwand",
    masse:   "50 × 40 cm",
    serie:   "stillleben",
    start:   true
  },
  {
    bild:    "assets/werke/stillleben-04.jpg",
    titel:   "Ohne Titel",
    jahr:    "1987",
    technik: "Öl auf Hartfaser",
    masse:   "45 × 35 cm",
    serie:   "stillleben"
  },
  {
    bild:    "assets/werke/stillleben-05.jpg",
    titel:   "Ackerstraße",
    jahr:    "1988",
    technik: "Öl auf Leinwand",
    masse:   "140 × 120 cm",
    serie:   "stillleben",
    start:   true
  },

  /* --- Tischflächen ---------------------------------------- */
  {
    bild:    "assets/werke/tischflaechen-01.jpg",
    titel:   "Tischfläche I",
    jahr:    "2017",
    technik: "Öl auf Leinwand",
    masse:   "80 × 60 cm",
    serie:   "tischflaechen",
    start:   true
  },
  {
    bild:    "assets/werke/tischflaechen-02.jpg",
    titel:   "Tischfläche IV",
    jahr:    "2018",
    technik: "Öl auf Leinwand",
    masse:   "80 × 60 cm",
    serie:   "tischflaechen"
  },
  {
    bild:    "assets/werke/tischflaechen-03.jpg",
    titel:   "Tischfläche IX",
    jahr:    "2020",
    technik: "Öl auf Leinwand",
    masse:   "100 × 70 cm",
    serie:   "tischflaechen",
    start:   true
  },

  /* --- Landschaften ---------------------------------------- */
  {
    bild:    "assets/werke/landschaften-01.jpg",
    titel:   "Seestück I",
    jahr:    "2019",
    technik: "Öl auf Leinwand",
    masse:   "120 × 90 cm",
    serie:   "landschaften",
    start:   true
  },
  {
    bild:    "assets/werke/landschaften-02.jpg",
    titel:   "Seestück VI",
    jahr:    "2022",
    technik: "Öl auf Leinwand",
    masse:   "120 × 90 cm",
    serie:   "landschaften",
    start:   true
  },
  {
    bild:    "assets/werke/landschaften-03.jpg",
    titel:   "Horizont",
    jahr:    "2025",
    technik: "Öl auf Leinwand",
    masse:   "160 × 110 cm",
    serie:   "landschaften"
  },

  /* --- Grafik (Kugelschreiber) ----------------------------- */
  {
    bild:    "assets/werke/grafik-kugel-01.jpg",
    titel:   "Ohne Titel",
    jahr:    "2021",
    technik: "Kugelschreiber auf Papier",
    masse:   "29,7 × 21 cm",
    serie:   "grafik-kugel"
  },
  {
    bild:    "assets/werke/grafik-kugel-02.jpg",
    titel:   "Ohne Titel",
    jahr:    "2023",
    technik: "Kugelschreiber auf Papier",
    masse:   "29,7 × 21 cm",
    serie:   "grafik-kugel"
  },

  /* --- Grafik (diverse) ------------------------------------ */
  {
    bild:    "assets/werke/grafik-div-01.jpg",
    titel:   "Selbstporträt",
    jahr:    "1988",
    technik: "Kohle auf Papier",
    masse:   "70 × 50 cm",
    serie:   "grafik-div"
  },
  {
    bild:    "assets/werke/grafik-div-02.jpg",
    titel:   "Studie",
    jahr:    "1984",
    technik: "Bleistift auf Papier",
    masse:   "42 × 29,7 cm",
    serie:   "grafik-div"
  }

];


/* ------------------------------------------------------------
   3. AUSSTELLUNGEN
   ------------------------------------------------------------
   "status" ist entweder "kommend" oder "vergangen".
   Danach sortiert die Seite automatisch.

   "start: true"  heißt wieder: erscheint in der Vorschau auf
   der Startseite. Die erste kommende Ausstellung mit
   "start: true" wird dort groß dargestellt.

   Ein Bild ist optional. Fehlt es, zeigt die Seite einfach
   den Text — es bleibt nichts kaputt.
   ------------------------------------------------------------ */

var AUSSTELLUNGEN = [

  {
    ort:      "Berlin",
    haus:     "Kunstquartier Bethanien, Kreuzberg",
    zeitraum: "September – Dezember 2027",
    jahr:     2027,
    status:   "kommend",
    bild:     "assets/ausstellungen/berlin-bethanien.jpg",
    text:     "Die nächste Ausstellung der Serie „Seestücke“ findet im Kunstquartier Bethanien in Berlin-Kreuzberg statt. Gezeigt werden die jüngsten Arbeiten mit Schwerpunkt auf den Landschaften.",
    start:    true
  },
  {
    ort:      "Leipzig",
    haus:     "Spinnerei",
    zeitraum: "Juni – August 2028",
    jahr:     2028,
    status:   "kommend",
    bild:     "assets/ausstellungen/leipzig-spinnerei.jpg",
    text:     "Fortsetzung der Serie in der Leipziger Spinnerei.",
    start:    true
  },
  {
    ort:      "München",
    haus:     "Bergson Kunstkraftwerk",
    zeitraum: "Februar – Mai 2029",
    jahr:     2029,
    status:   "kommend",
    bild:     "assets/ausstellungen/muenchen-bergson.jpg",
    text:     "Arbeiten aus den Serien „Tischflächen“ und „Landschaften“.",
    start:    true
  },
  {
    ort:      "Darmstadt",
    haus:     "Institut Mathildenhöhe",
    zeitraum: "Januar – April 2030",
    jahr:     2030,
    status:   "kommend",
    bild:     "assets/ausstellungen/darmstadt-mathildenhoehe.jpg",
    text:     "Abschluss der Ausstellungsreihe auf der Mathildenhöhe.",
    start:    true
  },

  {
    ort:      "Berlin",
    haus:     "Galerie des Stadtbezirks Berlin-Marzahn",
    zeitraum: "1993",
    jahr:     1993,
    status:   "vergangen",
    text:     "Gemeinschaftsausstellung mit einer Plastikerin. Gezeigt wurden vor allem die vierteiligen Diptychen der frühen neunziger Jahre."
  },
  {
    ort:      "Berlin",
    haus:     "Galerie des Stadtbezirks Berlin-Mitte",
    zeitraum: "1988",
    jahr:     1988,
    status:   "vergangen",
    text:     "Zweite Einzelausstellung mit Stillleben und Zeichnungen."
  },
  {
    ort:      "Berlin",
    haus:     "Jugendclub Berlin-Mitte",
    zeitraum: "1987",
    jahr:     1987,
    status:   "vergangen",
    text:     "Erste Präsentation der klassischen Stillleben."
  }

];
