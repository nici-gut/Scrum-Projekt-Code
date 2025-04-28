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

// Funktion zum Initialisieren des Zählers
function initCounter() {
  let counter = 0;
  const counterContainer = document.getElementById('counter-container');
  const counterValue = document.getElementById('counterValue');
  const incrementBtn = document.getElementById('incrementBtn');

  incrementBtn.addEventListener('click', () => {
    counter++;
    counterValue.textContent = counter;
  });

  decrementBtn.addEventListener('click', () => {
    if (counter > 0) counter--;
    counterValue.textContent = counter;
  });

  return counterContainer;
}

// Funktion zum Laden einer Übung
function ladeUebung(index) {
  if (index >= aktuelleUebungen.length) {
    return;
  }

  const uebung = aktuelleUebungen[index];
  const counterContainer = initCounter();

  if (uebung.counter) {
    counterContainer.style.display = 'flex';
  } else {
    counterContainer.style.display = 'none';
  }

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

  // "Weiter"-Button anpassen
  const weiterButton = document.getElementById('weiterBtn');
  if (index < aktuelleUebungen.length - 1) {
    weiterButton.textContent = "Weiter";
    weiterButton.onclick = () => {
      aktuelleUebungIndex++;
      ladeUebung(aktuelleUebungIndex);
    };
  } else {
    weiterButton.textContent = "Beenden";
    weiterButton.onclick = () => {
      window.location.href = "index.html"; // Zurück zur Startseite
    };
  }

  weiterButton.style.display = 'block'; // Button anzeigen
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

// Beim Laden der Seite Training initialisieren
ladeTraining();
