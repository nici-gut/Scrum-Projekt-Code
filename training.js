// Timer Logik
let timer;
let sekunden = 0;
let läuft = false;

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

// Training laden
async function ladeTraining() {
  const urlParams = new URLSearchParams(window.location.search);
  const woche = urlParams.get('week');
  const tag = urlParams.get('day');

  const response = await fetch('data/trainingsplan.json');
  const daten = await response.json();

  const übungen = daten[woche]?.[tag];

  if (!übungen || übungen.length === 0) {
    document.getElementById('übungen').textContent = "Keine Übungen gefunden.";
    return;
  }

  // Erste Übung laden
  const ersteÜbung = übungen[0];

  // Titel und Beschreibung setzen
  document.getElementById('übungen').textContent = ersteÜbung.exercise || "Keine Übung angegeben";
  document.getElementById('beschreibung').textContent = ersteÜbung.description || "Keine Beschreibung verfügbar";

  // Video setzen (falls vorhanden)
  const videoElement = document.getElementById('uebungsvideo');
  if (ersteÜbung.video) {
    videoElement.src = ersteÜbung.video;
    videoElement.style.display = 'block';
  } else {
    videoElement.style.display = 'none';
  }
}

// Beim Laden der Seite Training initialisieren
ladeTraining();
