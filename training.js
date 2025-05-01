// Timer Logik
let timer;
let läuft = false;
let aktuelleUebungIndex = 0; // Index der aktuellen Übung
let aktuelleUebungen = []; // Liste der Übungen für den Tag
let aktuellerSatz = 0; // Aktueller Satz der Übung
let timerPhase = "exercise"; // "exercise" oder "pause"
let restSekunden = 0; // Restzeit für den Timer

function updateAnzeige() {
  const minuten = String(Math.floor(restSekunden / 60)).padStart(2, '0');
  const sek = String(restSekunden % 60).padStart(2, '0');
  document.getElementById('zeit').textContent = `${minuten}:${sek}`;
}

function starteTimer(duration, pauseDuration, sets, onComplete) {
  aktuellerSatz = 1;
  timerPhase = "exercise";
  restSekunden = duration;
  updateAnzeige();

  läuft = true;
  timer = setInterval(() => {
    if (restSekunden > 0) {
      restSekunden--;
      updateAnzeige();
    } else {
      if (timerPhase === "exercise") {
        if (aktuellerSatz < sets) {
          timerPhase = "pause";
          restSekunden = pauseDuration;
          updateAnzeige();
        } else {
          clearInterval(timer);
          läuft = false;
          onComplete(); // Alle Sätze abgeschlossen
        }
      } else if (timerPhase === "pause") {
        aktuellerSatz++;
        timerPhase = "exercise";
        restSekunden = duration;
        updateAnzeige();
      }
    }
  }, 1000);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!läuft) {
    const aktuelleUebung = aktuelleUebungen[aktuelleUebungIndex];
    if (aktuelleUebung && !aktuelleUebung.counter) {
      starteTimer(
        aktuelleUebung.duration,
        aktuelleUebung.pauseDuration,
        aktuelleUebung.sets,
        () => {
          document.getElementById('weiterBtn').click(); // Automatisch zur nächsten Übung
        }
      );
    }
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
  restSekunden = 0;
  updateAnzeige();
});

// Funktion zum Initialisieren des Zählers
function initCounter(maxCount, onMaxReached) {
  let counter = 0;
  const counterContainer = document.getElementById('counter-container');
  const counterValue = document.getElementById('counterValue');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');

  incrementBtn.addEventListener('click', () => {
    if (counter < maxCount) {
      counter++;
      counterValue.textContent = counter;

      if (counter === maxCount) {
        onMaxReached();
      }
    }
  });

  decrementBtn.addEventListener('click', () => {
    if (counter > 0) {
      counter--;
      counterValue.textContent = counter;
    }
  });

  counterValue.textContent = counter;
  return counterContainer;
}

// Funktion zum Laden einer Übung
function ladeUebung(index) {
  if (index >= aktuelleUebungen.length) {
    return;
  }

  const uebung = aktuelleUebungen[index];
  const maxCount = uebung.maxCount || 0;

  const onMaxReached = () => {
    if (index < aktuelleUebungen.length - 1) {
      aktuelleUebungIndex++;
      ladeUebung(aktuelleUebungIndex);
    } else {
      window.location.href = "index.html";
    }
  };

  const counterContainer = initCounter(maxCount, onMaxReached);

  const counterValue = document.getElementById('counterValue');
  counterValue.textContent = 0;

  if (uebung.counter) {
    counterContainer.style.display = 'flex';
  } else {
    counterContainer.style.display = 'none';
  }

  document.getElementById('übungen').textContent = uebung.exercise || "Keine Übung angegeben";
  document.getElementById('beschreibung').textContent = uebung.description || "Keine Beschreibung verfügbar";

  const videoElement = document.getElementById('uebungsvideo');
  if (uebung.video) {
    videoElement.src = uebung.video;
    videoElement.style.display = 'block';
    videoElement.load();
  } else {
    videoElement.style.display = 'none';
  }

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
      window.location.href = "index.html";
    };
  }

  weiterButton.style.display = 'block';
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

  ladeUebung(aktuelleUebungIndex);
}

ladeTraining();
