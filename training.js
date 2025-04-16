// Timer Logik
let timer;
let sekunden = 0;
let läuft = false;
let aktuelleUebungIndex = 0; // Index der aktuellen Übung
let aktuelleUebungen = []; // Liste der Übungen für den Tag

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

// Beim Laden der Seite Training initialisieren
ladeTraining();
