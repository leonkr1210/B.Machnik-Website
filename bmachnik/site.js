/* ==========================================================================
   b.machnik – baut die Seiten aus daten.js auf.
   Für neue Werke, Bilder oder Ausstellungen muss hier nichts geändert werden.
   ========================================================================== */

(function () {
  "use strict";

  const PFAD_WERKE = "bilder/werke/";
  const PFAD_AUSSTELLUNGEN = "bilder/ausstellungen/";
  const PFAD_SEITE = "bilder/seite/";
  const STANDARD_VERHAELTNIS = 1.25;
  const KUENSTLER = "Bernd Machnik";
  const NBSP = " ";

  /* Daten laden ------------------------------------------------------------ */

  function ladeDaten() {
    try {
      return {
        serien: SERIEN,
        werke: WERKE,
        ausstellungen: AUSSTELLUNGEN,
        vita: typeof VITA !== "undefined" ? VITA : [],
        hintergrund: typeof HINTERGRUND !== "undefined" ? HINTERGRUND : [],
        einstellungen: typeof EINSTELLUNGEN !== "undefined" ? EINSTELLUNGEN : {},
      };
    } catch (fehler) {
      console.error(
        "daten.js konnte nicht gelesen werden. Häufige Ursache: ein fehlendes Komma, " +
        "eine fehlende Klammer oder ein Anführungszeichen. Die Fehlermeldung darüber nennt die Zeile.",
        fehler
      );
      return null;
    }
  }

  function pruefeDaten(d) {
    const warne = (text) => console.warn("daten.js: " + text);
    const doppelt = (liste, name) => {
      const gesehen = new Set();
      liste.forEach((e) => {
        if (!e || !e.id) return warne(`Ein Eintrag in ${name} hat keine id.`);
        if (gesehen.has(e.id)) warne(`Die id „${e.id}“ kommt in ${name} mehrfach vor.`);
        gesehen.add(e.id);
      });
    };
    doppelt(d.serien, "SERIEN");
    doppelt(d.werke, "WERKE");
    doppelt(d.ausstellungen, "AUSSTELLUNGEN");

    const serienIds = new Set(d.serien.map((s) => s.id));
    d.werke.forEach((w) => {
      if (!serienIds.has(w.serie)) warne(`Werk „${w.id}“ nennt die unbekannte Serie „${w.serie}“.`);
      if (!w.datei) warne(`Werk „${w.id}“ hat keine Bilddatei (datei).`);
      if (!w.jahr) warne(`Werk „${w.id}“ hat kein Jahr.`);
    });
    d.ausstellungen.forEach((a) => {
      if (a.status !== "kommend" && a.status !== "vergangen") {
        warne(`Ausstellung „${a.id}“: status muss "kommend" oder "vergangen" sein.`);
      }
      if (a.werk && !findeWerk(a.werk)) warne(`Ausstellung „${a.id}“ nennt das unbekannte Werk „${a.werk}“.`);
    });
    if (!d.hintergrund.length) {
      warne("HINTERGRUND ist leer — der Kopfbereich der Startseite bleibt dunkel.");
    }
    if (d.werke.filter((w) => w.start).length !== 6) {
      warne("Für die Startseite sind genau 6 Werke mit start: true vorgesehen.");
    }
  }

  /* Hilfsfunktionen ---------------------------------------------------------- */

  function el(tag, eigenschaften, kinder) {
    const knoten = document.createElement(tag);
    Object.entries(eigenschaften || {}).forEach(([name, wert]) => {
      if (wert === undefined || wert === null || wert === false) return;
      if (name === "text") knoten.textContent = wert;
      else if (name === "class") knoten.className = wert;
      else knoten.setAttribute(name, wert);
    });
    (kinder || []).forEach((kind) => kind && knoten.append(kind));
    return knoten;
  }

  const istPlatzhalter = (wert) => /[[\]]/.test(String(wert || ""));
  const findeWerk = (id) => daten.werke.find((w) => w.id === id);
  const findeSerie = (id) => daten.serien.find((s) => s.id === id);

  function bildpfad(ordner, datei) {
    if (!datei) return "";
    return datei.includes("/") ? datei : ordner + datei;
  }

  /** „60x80“ → „60 × 80 cm“ mit geschützten Leerzeichen */
  function formatMasse(masse) {
    let s = String(masse || "").trim();
    if (!s || istPlatzhalter(s)) return s;
    s = s.replace(/\s*[x×X]\s*/g, NBSP + "×" + NBSP);
    if (!/(mm|cm|m)\.?$/.test(s)) s += " cm";
    return s.replace(/\s+(mm|cm|m)(\.?)$/, NBSP + "$1$2");
  }

  /** Seitenverhältnis Breite / Höhe aus „Höhe × Breite“ */
  function seitenverhaeltnis(masse) {
    const zahlen = String(masse || "").match(/\d+(?:[.,]\d+)?/g);
    if (!zahlen || zahlen.length < 2) return null;
    const hoehe = parseFloat(zahlen[0].replace(",", "."));
    const breite = parseFloat(zahlen[1].replace(",", "."));
    return hoehe > 0 && breite > 0 ? breite / hoehe : null;
  }

  /** „Tischflächen, 2020, Öl auf Hartfaser, 60 × 80 cm“ */
  function bildunterschrift(werk) {
    const serie = findeSerie(werk.serie);
    return [serie && serie.titel, werk.jahr, werk.technik, formatMasse(werk.masse)]
      .filter(Boolean)
      .join(", ");
  }

  /** „2020 · Öl auf Hartfaser · 60 × 80 cm“ (Serie steht schon in der Überschrift) */
  function kurzangabe(werk) {
    return [werk.jahr, werk.technik, formatMasse(werk.masse)].filter(Boolean).join(" · ");
  }

  const altText = (werk) => KUENSTLER + ", " + bildunterschrift(werk);

  /**
   * Bild im Rahmen mit Platzhalter.
   * traeger: Element, das --r trägt (Raster-Eintrag, Hero-Figur …)
   */
  function erzeugeRahmen(src, alt, traeger, optionen) {
    const o = Object.assign({ lazy: true, korrigieren: true, prioritaet: false }, optionen);
    const rahmen = el("span", { class: "rahmen" });
    const img = el("img", { alt: alt, decoding: "async", loading: o.lazy ? "lazy" : null });
    if (o.prioritaet) img.setAttribute("fetchpriority", "high");
    rahmen.append(img);
    bindeBild(img, rahmen, o.korrigieren ? traeger || rahmen : null);
    if (src) img.src = src;
    else markiereFehlend(rahmen, img);
    return rahmen;
  }

  function markiereFehlend(rahmen, img) {
    rahmen.classList.add("ohne-bild");
    rahmen.classList.remove("ist-geladen");
    if (img.alt) {
      rahmen.setAttribute("role", "img");
      rahmen.setAttribute("aria-label", img.alt);
    }
  }

  function bindeBild(img, rahmen, traeger) {
    const geladen = () => {
      if (!img.naturalWidth) return markiereFehlend(rahmen, img);
      if (traeger) traeger.style.setProperty("--r", (img.naturalWidth / img.naturalHeight).toFixed(4));
      rahmen.classList.add("ist-geladen");
    };
    img.addEventListener("load", geladen);
    img.addEventListener("error", () => markiereFehlend(rahmen, img));
    if (img.complete && img.getAttribute("src")) geladen();
  }

  function setzeVerhaeltnis(element, r) {
    element.style.setProperty("--r", (r || STANDARD_VERHAELTNIS).toFixed(4));
  }

  /** Listeneintrag für das Werkraster; mitSerie, wenn keine Serienüberschrift darüber steht */
  function erzeugeWerk(werk, href, mitSerie) {
    const eintrag = el("li");
    setzeVerhaeltnis(eintrag, seitenverhaeltnis(werk.masse));
    const quelle = bildpfad(PFAD_WERKE, werk.datei);
    const link = el("a", { class: "werk__link", href: href || quelle || "#", "data-werk": werk.id });
    link.append(erzeugeRahmen(quelle, altText(werk), eintrag));
    eintrag.append(
      el("figure", { class: "werk" }, [
        link,
        el("figcaption", { class: "werk__angabe", text: mitSerie ? bildunterschrift(werk) : kurzangabe(werk) }),
      ])
    );
    return eintrag;
  }

  /* Ausstellungen ------------------------------------------------------------ */

  function istVergangen(a, heute) {
    if (a.status === "vergangen") return true;
    if (a.ende) {
      const [jahr, monat] = String(a.ende).split("-").map(Number);
      const letzterTag = new Date(jahr, monat || 12, 0, 23, 59, 59);
      if (!isNaN(letzterTag) && letzterTag < heute) return true;
    }
    return false;
  }

  function sortiereAusstellungen(liste) {
    const heute = new Date();
    const schluessel = (a) => String(a.beginn || a.zeitraum || "");
    const kommend = liste
      .filter((a) => !istVergangen(a, heute))
      .sort((x, y) => schluessel(x).localeCompare(schluessel(y)));
    const bisherig = liste
      .filter((a) => istVergangen(a, heute))
      .sort((x, y) => schluessel(y).localeCompare(schluessel(x)));
    return { kommend, bisherig };
  }

  function ortZeile(a) {
    const ort = a.ort || "";
    if (!a.stadt || ort.includes(a.stadt)) return ort || a.stadt || "";
    return ort ? ort + ", " + a.stadt : a.stadt;
  }

  function erzeugeKarte(a, gross, ueberschrift) {
    const figur = el("figure", { class: "karte__bild" });
    const werk = a.werk ? findeWerk(a.werk) : null;
    let rahmen;
    if (a.bild) {
      rahmen = erzeugeRahmen(bildpfad(PFAD_AUSSTELLUNGEN, a.bild), "Ausstellungsort: " + ortZeile(a), null, {
        korrigieren: false,
      });
    } else if (werk) {
      rahmen = erzeugeRahmen(bildpfad(PFAD_WERKE, werk.datei), altText(werk), null, { korrigieren: false });
      rahmen.classList.add("rahmen--enthalten");
    } else {
      rahmen = erzeugeRahmen("", "", null, { korrigieren: false });
      rahmen.setAttribute("aria-hidden", "true");
    }
    rahmen.classList.add("rahmen--raum");
    figur.append(rahmen);

    const text = el("div", { class: "karte__text" }, [
      a.zeitraum && el("p", { class: "karte__zeit", text: a.zeitraum }),
      el(ueberschrift, { class: "karte__ort", text: ortZeile(a) }),
      a.titel && el("p", { class: "karte__titel", text: a.titel }),
      a.text && el("p", { class: "karte__beschreibung", text: a.text }),
    ]);

    return el("article", { class: "karte" + (gross ? " karte--gross" : "") }, [figur, text]);
  }

  /** Große Karte und bis zu drei kleine */
  function erzeugeAnkuendigungen(kommend, maxKlein, ueberschrift) {
    const gross = kommend.find((a) => a.gross) || kommend[0];
    const rest = kommend.filter((a) => a !== gross).slice(0, maxKlein);
    const huelle = el("div");
    huelle.append(erzeugeKarte(gross, true, ueberschrift));
    if (rest.length) {
      const liste = el("ul", { class: "karten" });
      rest.forEach((a) => liste.append(el("li", {}, [erzeugeKarte(a, false, ueberschrift)])));
      huelle.append(liste);
    }
    return huelle;
  }

  /* Kopfzeile und Menü ------------------------------------------------------- */

  function richteKopfEin() {
    const kopf = document.querySelector("[data-kopf]");
    if (!kopf || kopf.classList.contains("kopf--fest")) return;
    const marke = el("div", { "aria-hidden": "true" });
    marke.style.cssText = "position:absolute;top:0;left:0;width:1px;height:3rem;pointer-events:none";
    document.body.prepend(marke);
    if (!("IntersectionObserver" in window)) return kopf.classList.add("kopf--fest");
    new IntersectionObserver(([eintrag]) => {
      kopf.classList.toggle("kopf--fest", !eintrag.isIntersecting);
    }).observe(marke);
  }

  function richteMenueEin() {
    const knopf = document.querySelector("[data-menue-oeffnen]");
    const menue = document.getElementById("menue");
    if (!knopf || !menue || typeof menue.showModal !== "function") return;

    knopf.addEventListener("click", () => {
      menue.showModal();
      knopf.setAttribute("aria-expanded", "true");
    });
    menue.addEventListener("close", () => {
      knopf.setAttribute("aria-expanded", "false");
      knopf.focus({ preventScroll: true });
    });
    menue.querySelector("[data-menue-schliessen]").addEventListener("click", () => menue.close());
    menue.addEventListener("click", (e) => {
      if (e.target.closest("a")) menue.close();
    });
    const breit = window.matchMedia("(min-width: 48rem)");
    const schliesseBeiBreite = (e) => e.matches && menue.open && menue.close();
    if (breit.addEventListener) breit.addEventListener("change", schliesseBeiBreite);
  }

  /** Bilder, die direkt im HTML stehen */
  function bindeStatischeBilder() {
    document.querySelectorAll(".rahmen > img").forEach((img) => {
      const rahmen = img.parentElement;
      if (!img.getAttribute("src")) return markiereFehlend(rahmen, img);
      bindeBild(img, rahmen, rahmen);
    });
  }

  /* Werkansicht (Lightbox) --------------------------------------------------- */

  function richteLightboxEin(holeListe) {
    const dialog = document.querySelector("[data-lightbox]");
    if (!dialog || typeof dialog.showModal !== "function") return null;
    const buehne = dialog.querySelector("[data-lightbox-buehne]");
    const angabe = dialog.querySelector("[data-lightbox-angabe]");
    const zaehler = dialog.querySelector("[data-lightbox-zaehler]");
    let liste = [];
    let index = 0;

    function vorladen(werk) {
      if (werk && werk.datei) new Image().src = bildpfad(PFAD_WERKE, werk.datei);
    }

    function zeige(i) {
      const n = liste.length;
      if (!n) return;
      index = (i + n) % n;
      const werk = liste[index];
      const rahmen = erzeugeRahmen(bildpfad(PFAD_WERKE, werk.datei), altText(werk), null, { lazy: false });
      setzeVerhaeltnis(rahmen, seitenverhaeltnis(werk.masse));
      buehne.replaceChildren(rahmen);
      angabe.textContent = bildunterschrift(werk);
      zaehler.textContent = index + 1 + " / " + n;
      history.replaceState(null, "", "#werk-" + werk.id);
      vorladen(liste[(index + 1) % n]);
      vorladen(liste[(index - 1 + n) % n]);
    }

    function oeffne(id) {
      liste = holeListe();
      const i = liste.findIndex((w) => w.id === id);
      if (i < 0) return false;
      zeige(i);
      if (!dialog.open) dialog.showModal();
      return true;
    }

    dialog.querySelector("[data-lightbox-zurueck]").addEventListener("click", () => zeige(index - 1));
    dialog.querySelector("[data-lightbox-weiter]").addEventListener("click", () => zeige(index + 1));
    dialog.querySelector("[data-lightbox-schliessen]").addEventListener("click", () => dialog.close());

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        zeige(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        zeige(index - 1);
      }
    });

    // Klick auf die freie Fläche neben dem Bild schließt
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target === buehne) dialog.close();
    });

    dialog.addEventListener("close", () => {
      history.replaceState(null, "", location.pathname + location.search);
      const werk = liste[index];
      const link = werk && document.querySelector('[data-werk="' + CSS.escape(werk.id) + '"]');
      if (link) link.focus({ preventScroll: false });
    });

    return { oeffne };
  }

  /* Seiten ------------------------------------------------------------------- */

  function seiteStart() {
    richteBildlaufEin();

    // Arbeiten-Auswahl
    const raster = document.querySelector("[data-start-werke]");
    if (raster) {
      daten.werke
        .filter((w) => w.start)
        .slice(0, 6)
        .forEach((w) => raster.append(erzeugeWerk(w, "arbeiten.html#werk-" + w.id, true)));
    }

    // Ausstellungen
    const ziel = document.querySelector("[data-start-ausstellungen]");
    if (ziel) {
      const { kommend } = sortiereAusstellungen(daten.ausstellungen);
      ziel.append(
        kommend.length
          ? erzeugeAnkuendigungen(kommend, 3, "h3")
          : el("p", { class: "hinweis", text: "Derzeit sind keine Ausstellungen angekündigt." })
      );
    }

  }

  /* Kopfbereich der Startseite: Bilder weich überblenden ---------------------
     Die Dateien stehen in daten.js unter HINTERGRUND. Wer „Bewegung reduzieren“
     eingestellt hat, sieht nur das erste Bild. */

  function richteBildlaufEin() {
    const buehne = document.querySelector("[data-hero]");
    if (!buehne) return;

    const dateien = daten.hintergrund.filter((d) => d && !istPlatzhalter(d));
    if (!dateien.length) return;

    const sparsam = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sichtbare = sparsam ? dateien.slice(0, 1) : dateien;

    const bilder = sichtbare.map((datei, i) => {
      const img = el("img", {
        src: bildpfad(PFAD_SEITE, datei),
        alt: "",
        decoding: "async",
        loading: i === 0 ? null : "lazy",
      });
      if (i === 0) img.setAttribute("fetchpriority", "high");
      buehne.append(img);
      return img;
    });

    bilder[0].classList.add("ist-sichtbar");
    if (bilder.length < 2) return;

    let aktuell = 0;
    setInterval(() => {
      const naechste = (aktuell + 1) % bilder.length;
      bilder[aktuell].classList.remove("ist-sichtbar");
      bilder[naechste].classList.add("ist-sichtbar");
      aktuell = naechste;
    }, 5000);
  }

  function seiteKontakt() {
    renderKontakt();
  }

  function renderKontakt() {
    const ziel = document.querySelector("[data-kontakt]");
    if (!ziel) return;
    const { email, atelier } = daten.einstellungen;
    const zeile = (begriff, wert, href) =>
      el("div", {}, [
        el("dt", { text: begriff }),
        el("dd", {}, [
          !href || istPlatzhalter(wert) ? el("span", { text: wert }) : el("a", { href: href, text: wert }),
        ]),
      ]);
    if (email) ziel.append(zeile("E-Mail", email, "mailto:" + email));
    if (atelier) ziel.append(zeile("Atelier", atelier, null));
  }

  function seiteArbeiten() {
    const filterLeiste = document.querySelector("[data-filter]");
    const katalog = document.querySelector("[data-katalog]");
    if (!filterLeiste || !katalog) return;

    const serienMitWerken = daten.serien.filter((s) => daten.werke.some((w) => w.serie === s.id));
    const abschnitte = new Map();

    serienMitWerken.forEach((serie) => {
      const titelId = "serie-" + serie.id;
      const kopf = el("div", { class: "serie__kopf" }, [
        el("h2", { id: titelId, text: serie.titel }),
        serie.zeitraum && el("span", { class: "serie__zeit", text: serie.zeitraum }),
      ]);
      const raster = el("ul", { class: "raster" });
      daten.werke.filter((w) => w.serie === serie.id).forEach((w) => raster.append(erzeugeWerk(w)));
      const abschnitt = el("section", { class: "serie", "aria-labelledby": titelId }, [kopf, raster]);
      abschnitte.set(serie.id, abschnitt);
      katalog.append(abschnitt);
    });

    // Filter
    const knoepfe = [{ id: "alle", titel: "Alle" }].concat(serienMitWerken).map((s) => {
      const knopf = el("button", { type: "button", class: "knopf-text", "data-serie": s.id, text: s.titel });
      knopf.addEventListener("click", () => setzeFilter(s.id, true));
      filterLeiste.append(knopf);
      return knopf;
    });

    let aktiv = "alle";
    function setzeFilter(id, inUrl) {
      aktiv = abschnitte.has(id) ? id : "alle";
      knoepfe.forEach((k) => k.setAttribute("aria-pressed", String(k.dataset.serie === aktiv)));
      abschnitte.forEach((abschnitt, serieId) => {
        abschnitt.hidden = aktiv !== "alle" && aktiv !== serieId;
      });
      if (inUrl) {
        const url = new URL(location.href);
        if (aktiv === "alle") url.searchParams.delete("serie");
        else url.searchParams.set("serie", aktiv);
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    }

    const sichtbareWerke = () =>
      daten.werke.filter((w) => abschnitte.has(w.serie) && (aktiv === "alle" || w.serie === aktiv));

    setzeFilter(new URLSearchParams(location.search).get("serie") || "alle", false);

    // Werkansicht
    const lightbox = richteLightboxEin(sichtbareWerke);
    if (!lightbox) return;

    katalog.addEventListener("click", (e) => {
      const link = e.target.closest("[data-werk]");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      lightbox.oeffne(link.dataset.werk);
    });

    const oeffneAusHash = () => {
      const treffer = location.hash.match(/^#werk-(.+)$/);
      if (!treffer) return;
      const id = decodeURIComponent(treffer[1]);
      if (!sichtbareWerke().some((w) => w.id === id)) setzeFilter("alle", true);
      lightbox.oeffne(id);
    };
    oeffneAusHash();
    window.addEventListener("hashchange", oeffneAusHash);
  }

  function seiteAusstellungen() {
    const { kommend, bisherig } = sortiereAusstellungen(daten.ausstellungen);

    const zielKommend = document.querySelector("[data-kommend]");
    if (zielKommend) {
      zielKommend.append(
        kommend.length
          ? erzeugeAnkuendigungen(kommend, Infinity, "h3")
          : el("p", { class: "hinweis", text: "Derzeit sind keine Ausstellungen angekündigt." })
      );
    }

    const register = document.querySelector("[data-bisherig]");
    if (register) {
      bisherig.forEach((a) => {
        register.append(
          el("li", {}, [
            el("span", { class: "register__jahr", text: a.zeitraum || a.beginn }),
            el("span", { class: "register__ort", text: [ortZeile(a), a.titel].filter(Boolean).join(" – ") }),
            el("span", { class: "register__notiz", text: a.text || "" }),
          ])
        );
      });
    }
  }

  function seiteWirken() {
    const portrait = document.querySelector("[data-portrait]");
    const p = daten.einstellungen.portrait;
    if (portrait && p) {
      setzeVerhaeltnis(portrait, 0.75);
      portrait.append(
        erzeugeRahmen(bildpfad(PFAD_SEITE, p.datei), KUENSTLER + ", " + (p.angabe || "Selbstbildnis"), portrait),
        p.angabe && el("figcaption", { text: p.angabe })
      );
    }

    const vita = document.querySelector("[data-vita]");
    if (vita) {
      daten.vita.forEach((v) => {
        vita.append(
          el("li", {}, [el("span", { class: "vita__zeit", text: v.zeit }), el("span", { text: v.text })])
        );
      });
    }
  }

  function zeigeDatenfehler() {
    document
      .querySelectorAll("[data-start-werke], [data-katalog], [data-kommend], [data-vita], [data-kontakt]")
      .forEach((ziel) => {
        ziel.replaceWith(el("p", { class: "hinweis", text: "Die Inhalte können gerade nicht angezeigt werden." }));
      });
  }

  /* Start -------------------------------------------------------------------- */

  const daten = ladeDaten();
  richteKopfEin();
  richteMenueEin();
  bindeStatischeBilder();

  if (!daten) {
    zeigeDatenfehler();
    return;
  }
  pruefeDaten(daten);

  const seiten = {
    start: seiteStart,
    arbeiten: seiteArbeiten,
    ausstellungen: seiteAusstellungen,
    wirken: seiteWirken,
    kontakt: seiteKontakt,
  };
  const seite = seiten[document.body.dataset.seite];
  if (seite) seite();
})();
