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
   GRUPPEN (im Code „SERIEN“ genannt)
   Die Seite „Arbeiten“ ordnet die Werke nach Technik und Bildträger — nicht
   nach Titeln oder Themen. Reihenfolge hier = Reihenfolge auf der Seite und
   im Filter.
   id        kurzer Name ohne Umlaute und Leerzeichen (wird in WERKE verwendet)
   titel     wie er auf der Seite erscheint
   zeitraum  optional, z. B. "2017–2020"; leer lassen = nichts anzeigen
   -------------------------------------------------------------------------- */

const SERIEN = [
  { id: "oel-leinwand",         titel: "Öl auf Leinwand",            zeitraum: "" },
  { id: "oel-hartfaser-karton", titel: "Öl auf Hartfaser und Karton", zeitraum: "" },
  { id: "grafik",               titel: "Grafik",                     zeitraum: "" },
];


/* --------------------------------------------------------------------------
   STATUS
   Für Werke, die nicht mehr zu haben sind. Im Werk wird einfach
   status: "verkauft" ergänzt; auf der Seite erscheint dann unter dem Bild ein
   kleiner Punkt mit dem Wort aus dieser Liste. Das Bild selbst bleibt, wie es ist.
   Links steht das Kürzel (Kleinbuchstaben, keine Umlaute), rechts das Wort,
   das Besucher lesen.
   -------------------------------------------------------------------------- */

const STATUS = {
  verkauft:          "Verkauft",
  privatbesitz:      "In Privatbesitz",
  nichtverkaeuflich: "Nicht verkäuflich",
};


/* --------------------------------------------------------------------------
   WERKE
   id       eindeutig, z. B. "ls-2020-01" (Kürzel, Jahr, laufende Nummer);
            bleibt bestehen, auch wenn ein Werk die Gruppe wechselt
   serie    id aus SERIEN (Gruppe, in der das Werk erscheint)
   titel    nur bei den Werken, die ausnahmsweise einen Namen tragen
   jahr     Entstehungsjahr
   technik  z. B. "Öl auf Leinwand", bei Grafik die Art: "Kaltnadelradierung"
   masse    immer Höhe × Breite, z. B. "60 × 80 cm" (leer lassen, wenn unbekannt)
   datei    Dateiname im Ordner bilder/werke/
   start    true = erscheint in der Auswahl auf der Startseite (genau 6 empfohlen)
   status   optional: "verkauft", "privatbesitz" oder "nichtverkaeuflich" (siehe STATUS)

   Die Reihenfolge innerhalb einer Gruppe ist die Reihenfolge hier in der Liste.
   Angaben stammen aus den Dateinamen und dem Werkverzeichnis „Grafiken März 2018“.
   -------------------------------------------------------------------------- */

const WERKE = [

  /* Öl auf Leinwand ------------------------------------------------------- */
  { id: "st-1985-01", serie: "oel-leinwand", jahr: 1985, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1985-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1984 abgelegt), Technik, Maße]
  { id: "st-1986-01", serie: "oel-leinwand", jahr: 1986, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1986-01.jpg", start: false },
    // [bitte prüfen: Technik]
  { id: "st-1987-01", serie: "oel-leinwand", jahr: 1987, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1987-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1986 abgelegt), Maße]
  { id: "ls-2019-01", serie: "oel-leinwand", jahr: 2019, technik: "Öl auf Leinwand", masse: "140 × 160 cm",
    datei: "landschaften-2019-01.jpg", start: false },
    // [bitte prüfen: Jahr (auch als 2021 abgelegt), Technik, Maße („1.60 x 140m“)]
  { id: "ls-2020-01", serie: "oel-leinwand", jahr: 2020, technik: "Öl auf Leinwand", masse: "120 × 140 cm",
    datei: "landschaften-2020-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 2021 abgelegt), Technik]
  { id: "ls-2022-01", serie: "oel-leinwand", jahr: 2022, technik: "Öl auf Leinwand", masse: "120 × 140 cm",
    datei: "landschaften-2022-01.jpg", start: true },
    // [bitte prüfen: Technik]
  { id: "ls-2025-01", serie: "oel-leinwand", jahr: 2025, technik: "Öl auf Leinwand", masse: "",
    datei: "landschaften-2025-01.jpg", start: false },
    // [bitte prüfen: Jahr, Technik und Maße – aus dem Ordner „Neue Bilder/392“]

  /* Öl auf Hartfaser und Karton ------------------------------------------- */
  { id: "tf-2020-01", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Karton", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-01.jpg", start: false },
    // [bitte prüfen: Jahr (auch als 2016 abgelegt)]
  { id: "tf-2020-02", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-02.jpg", start: false },
  { id: "tf-2020-03", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-03.jpg", start: true },

  /* Grafik ---------------------------------------------------------------- */
  { id: "gd-1984-01", serie: "grafik", titel: "Eishaus in Sauen", jahr: 1984, technik: "Kaltnadelradierung", masse: "16,2 × 20,8 cm",
    datei: "grafik-diverse-1984-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1984, Dateiname 1983]
  { id: "gd-1985-01", serie: "grafik", titel: "Koppenplatz", jahr: 1985, technik: "Aquarell auf Karton", masse: "28 × 39 cm",
    datei: "grafik-diverse-1985-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1985, Dateiname 1986]
  { id: "gk-1987-01", serie: "grafik", jahr: 1987, technik: "Kugelschreiber auf Papier", masse: "",
    datei: "grafik-kugelschreiber-1987-01.jpg", start: false },
    // [bitte prüfen: Skizzenbuch „Figuren im Raum“ – Papier und Maße]
  { id: "gk-2014-01", serie: "grafik", jahr: 2014, technik: "Kugelschreiber auf Karton", masse: "18 × 21 cm",
    datei: "grafik-kugelschreiber-2014-01.jpg", start: false },
    // [bitte prüfen: Maße – Dateiname „21 x 18cm“, Blatt ist querformatig]
  { id: "gk-2015-01", serie: "grafik", jahr: 2015, technik: "Kugelschreiber auf Karton", masse: "25 × 35 cm",
    datei: "grafik-kugelschreiber-2015-01.jpg", start: true },
    // [bitte prüfen: Technik]
  { id: "gd-2018-01", serie: "grafik", titel: "Lobbe", jahr: 2018, technik: "Kugelschreiber auf Karton", masse: "20 × 28 cm",
    datei: "grafik-diverse-2018-01.jpg", start: false },
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
  // Derzeit sind keine Ausstellungen geplant; die Seite zeigt dann den Hinweis
  // „Neue Ausstellungen werden hier angekündigt.“ Sobald eine feststeht, hier
  // einen Eintrag nach dem Muster in PFLEGE.md ergänzen.

  /* Bisherig -------------------------------------------------------------- */
  { id: "berlin-1987", status: "vergangen",
    ort: "Wohngebietsgalerie Berlin-Mitte", stadt: "Berlin",
    zeitraum: "1987", beginn: "1987",
    titel: "", text: "", bild: "", gross: false },

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
  { zeit: "1987 / 1988", text: "Ausstellungen: Wohngebietsgalerie Berlin-Mitte; Galerie des Stadtbezirks Berlin-Mitte" },
  { zeit: "1989–1990",   text: "Architekt in Xanten" },
  { zeit: "seit 1990",   text: "zurück in Berlin, Malerei neben der Bauleitung" },
  { zeit: "1993",        text: "Ausstellung, Galerie Berlin-Marzahn" },
  { zeit: "seit 2010",   text: "Atelier in Wildau" }, // [bitte prüfen: seit wann genau?]
  { zeit: "seit 2017",   text: "Öl auf Hartfaser und Karton: Fläche und Raum" },
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
