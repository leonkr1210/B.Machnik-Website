/* ==========================================================================
   b.machnik – Inhalte der Website
   --------------------------------------------------------------------------
   Alles, was sich ändert, steht in dieser Datei. Die Seiten bauen sich
   daraus selbst auf; HTML muss dafür nicht angefasst werden.

   Kurzanleitung (ausführlich in PFLEGE.md):
   – Jeder Eintrag steht in geschweiften Klammern { … } und endet mit einem Komma.
   – Texte stehen in Anführungszeichen "…". Typografische Zeichen („ “ – ×)
     dürfen direkt verwendet werden.
   – Platzhalter und offene Fragen sind mit eckigen Klammern [ … ] markiert.
     Suche nach „[“, um alle zu finden.
   ========================================================================== */


/* --------------------------------------------------------------------------
   SERIEN
   Reihenfolge hier = Reihenfolge auf der Seite „Arbeiten“ und im Filter.
   id        kurzer Name ohne Umlaute und Leerzeichen (wird in WERKE verwendet)
   titel     wie er auf der Seite erscheint
   zeitraum  z. B. "2017–2020" (mit Halbgeviertstrich –); leer lassen, wenn offen
   -------------------------------------------------------------------------- */

const SERIEN = [
  { id: "stillleben",            titel: "Stillleben",              zeitraum: "1983–1988" },
  { id: "tischflaechen",         titel: "Tischflächen",            zeitraum: "2017–2020" },
  { id: "landschaften",          titel: "Landschaften",            zeitraum: "2019–2025" },
  { id: "grafik-kugelschreiber", titel: "Grafik (Kugelschreiber)", zeitraum: "" }, // [bitte prüfen: Zeitraum ergänzen]
  { id: "grafik-diverse",        titel: "Grafik (diverse)",        zeitraum: "" }, // [bitte prüfen: Zeitraum ergänzen]
];


/* --------------------------------------------------------------------------
   WERKE
   id       eindeutig, z. B. "tf-2020-01" (Kürzel der Serie, Jahr, laufende Nummer)
   serie    id aus SERIEN
   jahr     Entstehungsjahr
   technik  z. B. "Öl auf Leinwand"
   masse    immer Höhe × Breite, z. B. "60 × 80 cm" (leer lassen, wenn unbekannt)
   datei    Dateiname im Ordner bilder/werke/
   start    true = erscheint in der Auswahl auf der Startseite (genau 6 empfohlen)

   Die Reihenfolge innerhalb einer Serie ist die Reihenfolge hier in der Liste.
   Angaben stammen aus den Dateinamen und dem Werkverzeichnis „Grafiken März 2018“.
   -------------------------------------------------------------------------- */

const WERKE = [

  /* Stillleben ------------------------------------------------------------ */
  { id: "st-1985-01", serie: "stillleben", jahr: 1985, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1985-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1984 abgelegt), Technik, Maße]
  { id: "st-1986-01", serie: "stillleben", jahr: 1986, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1986-01.jpg", start: false },
    // [bitte prüfen: Technik]
  { id: "st-1987-01", serie: "stillleben", jahr: 1987, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1987-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1986 abgelegt), Maße]

  /* Tischflächen ---------------------------------------------------------- */
  { id: "tf-2020-01", serie: "tischflaechen", jahr: 2020, technik: "Öl auf Karton", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-01.jpg", start: false },
    // [bitte prüfen: Jahr (auch als 2016 abgelegt)]
  { id: "tf-2020-02", serie: "tischflaechen", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-02.jpg", start: false },
  { id: "tf-2020-03", serie: "tischflaechen", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-03.jpg", start: true },

  /* Landschaften ---------------------------------------------------------- */
  { id: "ls-2019-01", serie: "landschaften", jahr: 2019, technik: "Öl auf Leinwand", masse: "140 × 160 cm",
    datei: "landschaften-2019-01.jpg", start: false },
    // [bitte prüfen: Jahr (auch als 2021 abgelegt), Technik, Maße („1.60 x 140m“)]
  { id: "ls-2020-01", serie: "landschaften", jahr: 2020, technik: "Öl auf Leinwand", masse: "120 × 140 cm",
    datei: "landschaften-2020-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 2021 abgelegt), Technik]
  { id: "ls-2022-01", serie: "landschaften", jahr: 2022, technik: "Öl auf Leinwand", masse: "120 × 140 cm",
    datei: "landschaften-2022-01.jpg", start: true },
    // [bitte prüfen: Technik]
  { id: "ls-2025-01", serie: "landschaften", jahr: 2025, technik: "Öl auf Leinwand", masse: "",
    datei: "landschaften-2025-01.jpg", start: false },
    // [bitte prüfen: Jahr, Technik und Maße – aus dem Ordner „Neue Bilder/392“]

  /* Grafik (Kugelschreiber) ----------------------------------------------- */
  { id: "gk-1987-01", serie: "grafik-kugelschreiber", jahr: 1987, technik: "Kugelschreiber auf Papier", masse: "",
    datei: "grafik-kugelschreiber-1987-01.jpg", start: false },
    // [bitte prüfen: Skizzenbuch „Figuren im Raum“ – Papier und Maße]
  { id: "gk-2014-01", serie: "grafik-kugelschreiber", jahr: 2014, technik: "Kugelschreiber auf Karton", masse: "18 × 21 cm",
    datei: "grafik-kugelschreiber-2014-01.jpg", start: false },
    // [bitte prüfen: Maße – Dateiname „21 x 18cm“, Blatt ist querformatig]
  { id: "gk-2015-01", serie: "grafik-kugelschreiber", jahr: 2015, technik: "Kugelschreiber auf Karton", masse: "25 × 35 cm",
    datei: "grafik-kugelschreiber-2015-01.jpg", start: true },
    // [bitte prüfen: Technik]

  /* Grafik (diverse) ------------------------------------------------------ */
  { id: "gd-1984-01", serie: "grafik-diverse", jahr: 1984, technik: "Kaltnadelradierung", masse: "16,2 × 20,8 cm",
    datei: "grafik-diverse-1984-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1984, Dateiname 1983]
  { id: "gd-1985-01", serie: "grafik-diverse", jahr: 1985, technik: "Aquarell auf Karton", masse: "28 × 39 cm",
    datei: "grafik-diverse-1985-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1985, Dateiname 1986]
  { id: "gd-2018-01", serie: "grafik-diverse", jahr: 2018, technik: "", masse: "",
    datei: "grafik-diverse-2018-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße der Zeichnung „Seeblick“]
];


/* --------------------------------------------------------------------------
   AUSSTELLUNGEN
   status    "kommend" oder "vergangen"
   ort       Haus oder Galerie
   stadt     Stadt (wird weggelassen, wenn sie schon im Ort steht)
   zeitraum  wie er angezeigt wird, z. B. "September–Dezember 2027"
   beginn    zum Sortieren: "JJJJ-MM" oder "JJJJ"
   ende      optional "JJJJ-MM": danach rutscht die Ausstellung automatisch
             zu „Bisherig“, auch wenn status noch "kommend" lautet
   titel     optional
   text      ein kurzer Satz
   bild      optional: Raumfoto im Ordner bilder/ausstellungen/ (wird im Format 3:2 gezeigt)
   werk      optional: id eines Werks, wird gezeigt, solange kein Raumfoto da ist
   gross     true = große Karte (nur bei einer Ausstellung setzen)

   Die Sortierung erfolgt automatisch: Kommende aufsteigend, bisherige absteigend.
   -------------------------------------------------------------------------- */

const AUSSTELLUNGEN = [

  /* Kommend --------------------------------------------------------------- */
  { id: "berlin-2027", status: "kommend",
    ort: "Bethanien", stadt: "Berlin",
    zeitraum: "September–Dezember 2027", beginn: "2027-09", ende: "2027-12",
    titel: "", // [bitte entscheiden: „Seestücke“ oder Landschaftsausstellung? Die alte Seite nennt beides.]
    text: "Neue Arbeiten, Schwerpunkt Landschaft.", // [bitte bestätigen]
    bild: "", werk: "ls-2025-01", // [bitte prüfen: Raumfoto oder anderes Werk]
    gross: true },

  { id: "leipzig-2028", status: "kommend",
    ort: "Spinnerei", stadt: "Leipzig",
    zeitraum: "Juni–August 2028", beginn: "2028-06", ende: "2028-08",
    titel: "",
    text: "Malerei: Tischflächen und Landschaften.", // [bitte bestätigen]
    bild: "", werk: "tf-2020-03", // [bitte prüfen: Raumfoto oder anderes Werk]
    gross: false },

  { id: "muenchen-2029", status: "kommend",
    ort: "Bergson", stadt: "München",
    zeitraum: "Februar–Mai 2029", beginn: "2029-02", ende: "2029-05",
    titel: "",
    text: "Malerei und Zeichnung.", // [bitte bestätigen]
    bild: "", werk: "ls-2019-01", // [bitte prüfen: Raumfoto oder anderes Werk]
    gross: false },

  { id: "darmstadt-2030", status: "kommend",
    ort: "Institut Mathildenhöhe", stadt: "Darmstadt",
    zeitraum: "Januar–April 2030", beginn: "2030-01", ende: "2030-04",
    titel: "",
    text: "Zeichnungen und Grafik.", // [bitte bestätigen]
    bild: "", werk: "gk-2015-01", // [bitte prüfen: Raumfoto oder anderes Werk]
    gross: false },

  /* Bisherig -------------------------------------------------------------- */
  { id: "berlin-1987", status: "vergangen",
    ort: "Jugendclub Berlin-Mitte", stadt: "Berlin",
    zeitraum: "1987", beginn: "1987",
    titel: "", text: "", bild: "", gross: false },
    // [bitte prüfen: Name des Clubs – im Archiv als „W. Pieck Club“ abgelegt?]

  { id: "berlin-1988", status: "vergangen",
    ort: "Galerie des Stadtbezirks Berlin-Mitte", stadt: "Berlin",
    zeitraum: "1988", beginn: "1988",
    titel: "", text: "", bild: "", gross: false },

  { id: "berlin-1993", status: "vergangen",
    ort: "Galerie Berlin-Marzahn", stadt: "Berlin",
    zeitraum: "1993", beginn: "1993",
    titel: "", text: "Gemeinsam mit einer Bildhauerin.", bild: "", gross: false },
    // [bitte prüfen: Name der Bildhauerin ergänzen?]
];


/* --------------------------------------------------------------------------
   VITA (Seite „Wirken“)
   zeit  z. B. "1982–1987" oder "seit 1990"
   text  eine Zeile
   -------------------------------------------------------------------------- */

const VITA = [
  { zeit: "1980",        text: "Studium Konstruktiver Ingenieurhochbau, IHS Cottbus" },
  { zeit: "1982–1987",   text: "Architekturstudium, Kunsthochschule Berlin-Weißensee" },
  { zeit: "1987–1989",   text: "Szenenbildner, Fernsehfunk der DDR" },
    // [bitte prüfen: 1987–1989 hieß der Sender offiziell „Fernsehen der DDR“]
  { zeit: "1987 / 1988", text: "Ausstellungen: Jugendclub Berlin-Mitte; Galerie des Stadtbezirks Berlin-Mitte" },
  { zeit: "1989–1990",   text: "Architekt in Xanten" },
  { zeit: "seit 1990",   text: "zurück in Berlin, Malerei neben der Bauleitung" },
  { zeit: "seit 2010",   text: "Atelier in Wildau" }, // [bitte prüfen: seit wann genau?]
  { zeit: "1993",        text: "Ausstellung, Galerie Berlin-Marzahn" },
  { zeit: "seit 2017",   text: "Serie der Tischflächen" },
];


/* --------------------------------------------------------------------------
   EINSTELLUNGEN
   portrait  Bild und Angabe auf der Seite „Wirken“ (Datei in bilder/seite/)
   email     Kontaktadresse (erscheint auf der Seite „Kontakt“)
   atelier   Ort des Ateliers (erscheint daneben)
   -------------------------------------------------------------------------- */

const EINSTELLUNGEN = {
  portrait: {
    datei: "portrait.jpg",
    angabe: "Selbstbildnis, 2016, Kohle auf Packpapier", // [bitte prüfen]
  },
  email: "distribution@berndmachnik.de",
  atelier: "Wildau",
};


/* --------------------------------------------------------------------------
   HINTERGRUND
   Die Bilder, die im Kopfbereich der Startseite durchlaufen — alle fünf
   Sekunden wechselt eines weich ins nächste.

   Dateien liegen in bilder/seite/. Reihenfolge hier = Reihenfolge auf der
   Seite; das erste Bild ist das, was Besucher zuerst sehen.
   Weitere Bilder: Datei dort ablegen und hier eine Zeile ergänzen.
   Nur ein Bild eintragen = stehendes Bild ohne Wechsel.
   -------------------------------------------------------------------------- */

const HINTERGRUND = [
  "hintergrund-1.jpg",
  "hintergrund-2.jpg",
  "hintergrund-3.jpg",
  "hintergrund-4.jpg",
  "hintergrund-5.jpg",
];
