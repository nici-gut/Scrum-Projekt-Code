// Timer Logik
let timer;
let sekunden = 0;
let läuft = false;
let aktuelleUebungIndex = 0; // Index der aktuellen Übung
let aktuelleUebungen = []; // Liste der Übungen für den Tag
let zählerWerte = {}; // Speichert die Zählerwerte für jede Übung

function updateAnzeige() {
  const minuten = String(Math.floor(sekunden / 60)).padStart(2, '0');
  const sek = String(sekunden % 60).padStart(2, '0');
  document.getElementById('zeit').textContent = `${minuten}:${sek}`;
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!läuft) {
    läuft = true;
    timer = setInterval(() => {
      sekunden++;
      updateAnzeige();
    }, 1000);
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
  sekunden = 0;
  updateAnzeige();
});

// Funktion zum Laden einer Übung
function ladeUebung(index) {
  if (index >= aktuelleUebungen.length) {
    document.getElementById('weiterBtn').style.display = 'none'; // "Weiter"-Button ausblenden
    return;
  }

  const uebung = aktuelleUebungen[index];

  // Titel und Beschreibung setzen
  document.getElementById('übungen').textContent = uebung.exercise || "Keine Übung angegeben";
  document.getElementById('beschreibung').textContent = uebung.description || "Keine Beschreibung verfügbar";

  // Video setzen (falls vorhanden)
  const videoElement = document.getElementById('uebungsvideo');
  if (uebung.video) {
    videoElement.src = uebung.video;
    videoElement.style.display = 'block';
    videoElement.load(); // Video neu laden
  } else {
    videoElement.style.display = 'none';
  }

  // Zähler anzeigen, falls die Übung einen Zähler benötigt
  const zählerContainer = document.getElementById('zählerContainer');
  if (uebung.exercise === "Klimmzüge am Griffbrett" || uebung.exercise === "Klimmzüge an Kugeln" || uebung.exercise === "Rudern an Ringen" || uebung.exercise === "Bizeps-Curls mit Ringen" || uebung.exercise === "Archer Pull-Ups / Einarmige Unterstützungsklimmzüge" || uebung.exercise === "Ring Dips" || uebung.exercise === "Shrugs an Klimmzugstange" || uebung.exercise === "Schulter-Stabilisationsübungen mit Ringen" || uebung.exercise === "Klimmzüge mit Gewicht" || uebung.exercise === "Explosive Kugel-Klimmzüge" || uebung.exercise === "Tiefe Ruderzüge an Ringen" || uebung.exercise === "Eng-geführte Ring-Curls" || uebung.exercise === "Explosive Archer Pull-Ups" || uebung.exercise === "Explosive Shrugs" || uebung.exercise === "Instabile Schulterarbeit an tiefen Ringen") {
    zählerContainer.style.display = 'block';
    document.getElementById('zählerWert').textContent = zählerWerte[uebung.exercise] || 0;
    document.getElementById('zählerTitel').textContent = `Zähler für: ${uebung.exercise}`;
  } else {
    zählerContainer.style.display = 'none';
  }

  // "Weiter"-Button anzeigen, wenn es eine nächste Übung gibt
  if (index < aktuelleUebungen.length - 1) {
    document.getElementById('weiterBtn').style.display = 'block';
  } else {
    document.getElementById('weiterBtn').style.display = 'none';
  }
}

// Training laden
async function ladeTraining() {
  const urlParams = new URLSearchParams(window.location.search);
  const woche = urlParams.get('week');
  const tag = urlParams.get('day');

  const response = await fetch('data/trainingsplan.json');
  const daten = await response.json();

  aktuelleUebungen = daten[woche]?.[tag] || [];

  if (aktuelleUebungen.length === 0) {
    document.getElementById('übungen').textContent = "Keine Übungen gefunden.";
    return;
  }

  // Erste Übung laden
  ladeUebung(aktuelleUebungIndex);
}

// "Weiter"-Button Funktionalität
document.getElementById('weiterBtn').addEventListener('click', () => {
  aktuelleUebungIndex++;
  ladeUebung(aktuelleUebungIndex);
});

// Zähler erhöhen
document.getElementById('zählerPlus').addEventListener('click', () => {
  const aktuelleÜbung = aktuelleUebungen[aktuelleUebungIndex];
  if (!aktuelleÜbung) return;

  zählerWerte[aktuelleÜbung.exercise] = (zählerWerte[aktuelleÜbung.exercise] || 0) + 1;
  document.getElementById('zählerWert').textContent = zählerWerte[aktuelleÜbung.exercise];
});

// Zähler zurücksetzen
document.getElementById('zählerReset').addEventListener('click', () => {
  const aktuelleÜbung = aktuelleUebungen[aktuelleUebungIndex];
  if (!aktuelleÜbung) return;

  zählerWerte[aktuelleÜbung.exercise] = 0;
  document.getElementById('zählerWert').textContent = 0;
});

// Beim Laden der Seite Training initialisieren
ladeTraining();
