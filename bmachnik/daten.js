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
  { id: "aquarell",             titel: "Aquarell",                   zeitraum: "" },
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
  { id: "lw-1983-01", serie: "oel-leinwand", jahr: 1983, technik: "Öl auf Leinwand", masse: "",
    datei: "leinwand-1983-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Krug)]
  { id: "lw-1984-01", serie: "oel-leinwand", jahr: 1984, technik: "Öl auf Leinwand", masse: "",
    datei: "leinwand-1984-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße]
  { id: "st-1985-01", serie: "oel-leinwand", jahr: 1985, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1985-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1984 abgelegt), Technik, Maße]
  { id: "st-1986-01", serie: "oel-leinwand", jahr: 1986, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1986-01.jpg", start: false },
    // [bitte prüfen: Technik]
  { id: "lw-1986-01", serie: "oel-leinwand", jahr: 1986, technik: "Öl auf Leinwand", masse: "50 × 60 cm",
    datei: "leinwand-1986-01.jpg", start: false, status: "nichtverkaeuflich" },
    // [bitte prüfen: Torso, Eigenbesitz: Verkauf mit Bernd klären; Maße (Dateiname „0.60 x 0.50“)]
  { id: "st-1987-01", serie: "oel-leinwand", jahr: 1987, technik: "Öl auf Leinwand", masse: "50 × 70 cm",
    datei: "stillleben-1987-01.jpg", start: true },
    // [bitte prüfen: Jahr (auch als 1986 abgelegt), Maße]
  { id: "lw-1987-01", serie: "oel-leinwand", jahr: 1987, technik: "Öl auf Leinwand", masse: "",
    datei: "leinwand-1987-01.jpg", start: false },
    // [bitte prüfen: Diptychon: Maße]
  { id: "lw-1988-01", serie: "oel-leinwand", jahr: 1988, technik: "Öl auf Leinwand", masse: "",
    datei: "leinwand-1988-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Flur Ackerstraße)]
  { id: "lw-1989-01", serie: "oel-leinwand", jahr: 1989, technik: "Öl auf Leinwand", masse: "140 × 120 cm",
    datei: "leinwand-1989-01.jpg", start: false },
  { id: "lw-1992-01", serie: "oel-leinwand", jahr: 1992, technik: "Öl auf Leinwand", masse: "110 × 280 cm",
    datei: "leinwand-1992-01.jpg", start: false },
    // [bitte prüfen: Diptychon]
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
  { id: "hf-1985-01", serie: "oel-hartfaser-karton", jahr: 1985, technik: "Öl auf Hartfaser", masse: "",
    datei: "hartfaser-1985-01.jpg", start: false },
    // [bitte prüfen: Maße (Dateiname „0.60 x 0.50“ passt nicht zum Format)]
  { id: "hf-1986-01", serie: "oel-hartfaser-karton", jahr: 1986, technik: "Öl auf Karton", masse: "",
    datei: "hartfaser-1986-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Zeichenpraktikum Wiehe)]
  { id: "hf-1986-02", serie: "oel-hartfaser-karton", jahr: 1986, technik: "Öl auf Karton", masse: "",
    datei: "hartfaser-1986-02.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Zeichenpraktikum Wiehe)]
  { id: "tf-2020-01", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Karton", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-01.jpg", start: false },
    // [bitte prüfen: Jahr (auch als 2016 abgelegt)]
  { id: "tf-2020-02", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-02.jpg", start: false },
  { id: "tf-2020-03", serie: "oel-hartfaser-karton", jahr: 2020, technik: "Öl auf Hartfaser", masse: "60 × 80 cm",
    datei: "tischflaechen-2020-03.jpg", start: true },

  /* Grafik ---------------------------------------------------------------- */
  { id: "gr-1983-01", serie: "grafik", jahr: 1983, technik: "Mischtechnik auf Papier", masse: "",
    datei: "grafik-1983-01.jpg", start: false, status: "nichtverkaeuflich" },
    // [bitte prüfen: Selbstporträt, in Privatbesitz: Verkauf mit Bernd klären; Maße]
  { id: "gd-1984-01", serie: "grafik", titel: "Eishaus in Sauen", jahr: 1984, technik: "Kaltnadelradierung", masse: "16,2 × 20,8 cm",
    datei: "grafik-diverse-1984-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1984, Dateiname 1983]
  { id: "gr-1984-01", serie: "grafik", jahr: 1984, technik: "Bleistift auf Papier", masse: "",
    datei: "grafik-1984-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Stühle)]
  { id: "gr-1985-01", serie: "grafik", jahr: 1985, technik: "Kohle auf Papier", masse: "",
    datei: "grafik-1985-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Gasse in Wiehe)]
  { id: "gr-1985-02", serie: "grafik", jahr: 1985, technik: "Kohle auf Papier", masse: "90 × 70 cm",
    datei: "grafik-1985-02.jpg", start: false },
    // [bitte prüfen: Technik (Zeichnung Ackerstraße)]
  { id: "gr-1985-03", serie: "grafik", jahr: 1985, technik: "Gouache auf Papier", masse: "",
    datei: "grafik-1985-03.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Maxhütte; Jahr laut Signatur 1985, Dateiname 1986)]
  { id: "gr-1986-01", serie: "grafik", jahr: 1986, technik: "Kohle auf Papier", masse: "",
    datei: "grafik-1986-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Veteranenclub Berlin-Mitte)]
  { id: "gr-1987-01", serie: "grafik", jahr: 1987, technik: "Kaltnadelradierung", masse: "18 × 25 cm",
    datei: "grafik-1987-01.jpg", start: false },
    // [bitte prüfen: Maße (Dateiname „ca. 25 x 18 cm“)]
  { id: "gk-1987-01", serie: "grafik", jahr: 1987, technik: "Kugelschreiber auf Papier", masse: "",
    datei: "grafik-kugelschreiber-1987-01.jpg", start: false },
    // [bitte prüfen: Skizzenbuch „Figuren im Raum“ – Papier und Maße]
  { id: "gr-1990-01", serie: "grafik", jahr: 1990, technik: "Mischtechnik auf Papier", masse: "",
    datei: "grafik-1990-01.jpg", start: false, status: "nichtverkaeuflich" },
    // [bitte prüfen: Trio, in Privatbesitz: Verkauf mit Bernd klären; Technik und Maße (drei Blätter)]
  { id: "gr-2010-01", serie: "grafik", jahr: 2010, technik: "Bleistift auf Papier", masse: "",
    datei: "grafik-2010-01.jpg", start: false },
    // [bitte prüfen: Technik und Maße (Schädel)]
  { id: "gr-2013-01", serie: "grafik", jahr: 2013, technik: "Kugelschreiber auf Karton", masse: "",
    datei: "grafik-2013-01.jpg", start: false },
    // [bitte prüfen: Maße]
  { id: "gr-2013-02", serie: "grafik", jahr: 2013, technik: "Kugelschreiber auf Karton", masse: "",
    datei: "grafik-2013-02.jpg", start: false },
    // [bitte prüfen: Maße]
  { id: "gk-2014-01", serie: "grafik", jahr: 2014, technik: "Kugelschreiber auf Karton", masse: "18 × 21 cm",
    datei: "grafik-kugelschreiber-2014-01.jpg", start: false },
    // [bitte prüfen: Maße – Dateiname „21 x 18cm“, Blatt ist querformatig]
  { id: "gk-2015-01", serie: "grafik", jahr: 2015, technik: "Kugelschreiber auf Karton", masse: "25 × 35 cm",
    datei: "grafik-kugelschreiber-2015-01.jpg", start: true },
    // [bitte prüfen: Technik]
  { id: "gr-2016-01", serie: "grafik", jahr: 2016, technik: "Bleistift auf Karton", masse: "",
    datei: "grafik-2016-01.jpg", start: false },
    // [bitte prüfen: Maße]
  { id: "gr-2016-02", serie: "grafik", jahr: 2016, technik: "Kugelschreiber auf Karton", masse: "",
    datei: "grafik-2016-02.jpg", start: false },
    // [bitte prüfen: Technik und Maße]
  { id: "gd-2018-01", serie: "grafik", titel: "Lobbe", jahr: 2018, technik: "Kugelschreiber auf Karton", masse: "20 × 28 cm",
    datei: "grafik-diverse-2018-01.jpg", start: false },

  /* Aquarell -------------------------------------------------------------- */
  { id: "gd-1985-01", serie: "aquarell", titel: "Koppenplatz", jahr: 1985, technik: "Aquarell auf Karton", masse: "28 × 39 cm",
    datei: "grafik-diverse-1985-01.jpg", start: false },
    // [bitte prüfen: Jahr – Werkverzeichnis 1985, Dateiname 1986]
  { id: "aq-1987-01", serie: "aquarell", jahr: 1987, technik: "Aquarell auf Papier", masse: "",
    datei: "aquarell-1987-01.jpg", start: false },
    // [bitte prüfen: Skizze für Interieur Krematorium Baumschulenweg: Maße]
  { id: "aq-2006-01", serie: "aquarell", jahr: 2006, technik: "Aquarell auf Papier", masse: "",
    datei: "aquarell-2006-01.jpg", start: false },
    // [bitte prüfen: Studie am Gardasee: Maße]
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
    titel: "", text: "Gruppenausstellung, gemeinsam mit einer Bildhauerin.", bild: "", gross: false },
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
  { zeit: "ab 1990",     text: "zurück in Berlin, Bauleiter neben der Malerei" },
  { zeit: "1993",        text: "Gruppenausstellung, Galerie Berlin-Marzahn" },
  { zeit: "seit 2017",   text: "Öl auf Hartfaser und Karton: Fläche und Raum" },
  { zeit: "seit 2025",   text: "Atelier in Wildau" },
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
