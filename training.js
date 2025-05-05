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

function updateProgressBar(totalDuration, remainingTime, isPause) {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return; // Sicherstellen, dass das Element existiert
  const progress = (remainingTime / totalDuration) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor = isPause ? 'green' : 'var(--main-orange)';
}

function starteTimer(duration, pauseDuration, sets, onComplete) {
  aktuellerSatz = 1;
  timerPhase = "exercise";
  restSekunden = duration;
  updateAnzeige();
  updateProgressBar(duration, restSekunden, false);

  läuft = true;
  timer = setInterval(() => {
    if (restSekunden > 0) {
      restSekunden--;
      updateAnzeige();
      updateProgressBar(
        timerPhase === "exercise" ? duration : pauseDuration,
        restSekunden,
        timerPhase === "pause"
      );
    } else {
      if (timerPhase === "exercise") {
        if (aktuellerSatz < sets) {
          timerPhase = "pause";
          restSekunden = pauseDuration;
          updateAnzeige();
          updateProgressBar(pauseDuration, restSekunden, true);
        } else {
          clearInterval(timer);
          läuft = false;
          onComplete();
        }
      } else if (timerPhase === "pause") {
        aktuellerSatz++;
        timerPhase = "exercise";
        restSekunden = duration;
        updateAnzeige();
        updateProgressBar(duration, restSekunden, false);
      }
    }
  }, 1000); // Timer läuft weiterhin in 1-Sekunden-Schritten
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

  // Vorherigen Timer stoppen und zurücksetzen
  läuft = false;
  clearInterval(timer);
  restSekunden = 0;
  updateAnzeige();
  updateProgressBar(0, 0, false);

  const uebung = aktuelleUebungen[index];
  const maxCount = uebung.maxCount || 0;

  const progressBarContainer = document.getElementById('progress-bar-container');

  // Timer oder Zähler basierend auf dem JSON-Wert anzeigen
  if (uebung.counter) {
    // Zähler anzeigen
    document.getElementById('counter-container').style.display = 'flex';
    document.getElementById('zeit').style.display = 'none';
    progressBarContainer.style.display = 'none'; // Fortschrittsbalken ausblenden

    // Start- und Stopp-Buttons ausblenden
    document.querySelector('.timer-controls').style.display = 'none';

    initCounter(maxCount, () => {
      if (index < aktuelleUebungen.length - 1) {
        aktuelleUebungIndex++;
        ladeUebung(aktuelleUebungIndex);
      } else {
        window.location.href = "index.html";
      }
    });
  } else {
    // Timer anzeigen
    document.getElementById('counter-container').style.display = 'none';
    document.getElementById('zeit').style.display = 'block';
    progressBarContainer.style.display = 'block'; // Fortschrittsbalken einblenden

    // Start- und Stopp-Buttons einblenden
    document.querySelector('.timer-controls').style.display = 'flex';

    starteTimer(
      uebung.duration,
      uebung.pauseDuration,
      uebung.sets,
      () => {
        if (index < aktuelleUebungen.length - 1) {
          aktuelleUebungIndex++;
          ladeUebung(aktuelleUebungIndex);
        } else {
          window.location.href = "index.html";
        }
      }
    );
  }

  // Übungstitel und Beschreibung aktualisieren
  document.getElementById('übungen').textContent = uebung.exercise || "Keine Übung angegeben";
  document.getElementById('beschreibung').textContent = uebung.description || "Keine Beschreibung verfügbar";

  // Video aktualisieren
  const videoElement = document.getElementById('uebungsvideo');
  if (uebung.video) {
    videoElement.src = uebung.video;
    videoElement.style.display = 'block';
    videoElement.load();
  } else {
    videoElement.style.display = 'none';
  }

  // Weiter-Button konfigurieren
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
