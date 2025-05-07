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
  progressBar.style.backgroundColor = isPause ? '#4e1900' : 'var(--main-orange)';
}

function starteTimer(duration, pauseDuration, sets, onComplete, resume = false) {
  if (!resume) {
    aktuellerSatz = 1;
    timerPhase = "exercise";
    restSekunden = duration;
    updateAnzeige();
    updateProgressBar(duration, restSekunden, false);
  }

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
          if (onComplete) onComplete(); // Nur ausführen, wenn der Timer tatsächlich abgelaufen ist
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
    const videoElement = document.getElementById('uebungsvideo');
    if (aktuelleUebung && !aktuelleUebung.counter) {
      starteTimer(
        aktuelleUebung.duration,
        aktuelleUebung.pauseDuration,
        aktuelleUebung.sets,
        () => {
          document.getElementById('weiterBtn').click(); // Automatisch zur nächsten Übung
        },
        true // Timer wird fortgesetzt
      );
      if (videoElement) {
        videoElement.play(); // Video starten
      }
    }
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
  const videoElement = document.getElementById('uebungsvideo');
  if (videoElement) {
    videoElement.pause(); // Video pausieren
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  läuft = false;
  clearInterval(timer);
  const aktuelleUebung = aktuelleUebungen[aktuelleUebungIndex];
  const videoElement = document.getElementById('uebungsvideo');
  if (aktuelleUebung && !aktuelleUebung.counter) {
    // Timer auf die ursprüngliche Dauer zurücksetzen
    restSekunden = aktuelleUebung.duration;
    updateAnzeige();
    updateProgressBar(aktuelleUebung.duration, restSekunden, false);
  }
  if (videoElement) {
    videoElement.pause(); // Video pausieren
    videoElement.currentTime = 0; // Video zurücksetzen
  }
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
        onMaxReached(); // Funktion ausführen, wenn die maximale Anzahl erreicht ist
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

// Funktion zum Starten des Vorlauftimers
function starteVorlauftimer(onComplete) {
  let countdown = 7;
  const progressBarContainer = document.getElementById('progress-bar-container');
  const progressBar = document.getElementById('progress-bar');
  const zeitElement = document.getElementById('zeit');

  progressBarContainer.style.display = 'block';
  progressBar.style.width = '100%';
  progressBar.style.backgroundColor = '#4e1900'; // Farbe für den Vorlauftimer
  zeitElement.textContent = `00:05`;

  const vorlaufInterval = setInterval(() => {
    countdown--;
    zeitElement.textContent = `00:0${countdown}`;
    progressBar.style.width = `${(countdown / 5) * 100}%`;

    if (countdown <= 0) {
      clearInterval(vorlaufInterval);
      progressBar.style.backgroundColor = 'var(--main-orange)'; // Zurück zur Standardfarbe
      if (onComplete) onComplete();
    }
  }, 1000);
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
  const weiterButton = document.getElementById('weiterBtn');
  const timerControls = document.querySelector('.timer-controls'); // Container für Start, Stopp, Reset-Buttons
  const counterContainer = document.getElementById('counter-container'); // Plus- und Minus-Buttons

  // Prüfen, ob Timerdaten vorhanden sind (Sekundenbasierte Übung)
  const hasTimerData = uebung.duration && uebung.pauseDuration && uebung.sets;

  // Alle UI-Elemente ausblenden während des Vorlauftimers
  const hideAllUI = () => {
    weiterButton.style.display = 'none';
    timerControls.style.display = 'none';
    counterContainer.style.display = 'none';
    document.getElementById('zeit').style.display = 'none';
    progressBarContainer.style.display = 'none';
  };

  // Alle UI-Elemente wieder einblenden
  const showRelevantUI = () => {
    if (uebung.counter) {
      counterContainer.style.display = 'flex';
      document.getElementById('zeit').style.display = 'none';
      progressBarContainer.style.display = 'none';
      timerControls.style.display = 'none';
    } else if (hasTimerData) {
      counterContainer.style.display = 'none';
      document.getElementById('zeit').style.display = 'block';
      progressBarContainer.style.display = 'block';
      timerControls.style.display = 'flex';
    }
    weiterButton.style.display = 'block';
  };

  if (uebung.counter) {
    // Zähler anzeigen (Setbasierte Übung)
    hideAllUI(); // Alle UI-Elemente ausblenden
    showRelevantUI(); // Direkt relevante UI-Elemente einblenden (kein Vorlauftimer)
    weiterButton.textContent = index < aktuelleUebungen.length - 1 ? "Weiter" : "Beenden";
    weiterButton.onclick = () => {
      if (index < aktuelleUebungen.length - 1) {
        aktuelleUebungIndex++;
        ladeUebung(aktuelleUebungIndex);
      } else {
        zeigeAbschlussmeldung();
      }
    };

    initCounter(maxCount, () => {
      if (index < aktuelleUebungen.length - 1) {
        aktuelleUebungIndex++;
        ladeUebung(aktuelleUebungIndex);
      } else {
        zeigeAbschlussmeldung(); // Abschlussmeldung nur bei der letzten Übung
      }
    });
  } else if (hasTimerData) {
    // Sekundenbasierte Übung (mit Vorlauftimer)
    hideAllUI(); // Alle UI-Elemente ausblenden während des Vorlauftimers
    starteVorlauftimer(() => {
      showRelevantUI(); // Nach dem Vorlauftimer relevante UI-Elemente einblenden
      weiterButton.textContent = index < aktuelleUebungen.length - 1 ? "Weiter" : "Beenden";
      weiterButton.onclick = () => {
        if (index < aktuelleUebungen.length - 1) {
          aktuelleUebungIndex++;
          ladeUebung(aktuelleUebungIndex);
        } else {
          zeigeAbschlussmeldung();
        }
      };

      starteTimer(
        uebung.duration,
        uebung.pauseDuration,
        uebung.sets,
        () => {
          if (index < aktuelleUebungen.length - 1) {
            aktuelleUebungIndex++;
            ladeUebung(aktuelleUebungIndex);
          } else {
            zeigeAbschlussmeldung(); // Abschlussmeldung nur bei der letzten Übung
          }
        }
      );
    });
  } else {
    // Weder Timer noch Zähler anzeigen
    hideAllUI(); // Alle UI-Elemente ausblenden
    showRelevantUI(); // Direkt relevante UI-Elemente einblenden
    weiterButton.textContent = index < aktuelleUebungen.length - 1 ? "Weiter" : "Beenden";
    weiterButton.onclick = () => {
      if (index < aktuelleUebungen.length - 1) {
        aktuelleUebungIndex++;
        ladeUebung(aktuelleUebungIndex);
      } else {
        zeigeAbschlussmeldung();
      }
    };
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
    videoElement.play(); // Video automatisch starten
  } else {
    videoElement.style.display = 'none';
  }
}

// Funktion zum Anzeigen der Abschlussmeldung
function zeigeAbschlussmeldung() {
  const meldung = document.createElement('div');
  meldung.id = 'abschlussmeldung';
  meldung.textContent = "Herzlichen Glückwunsch, Sie haben das Workout erfolgreich beendet!";
  document.body.appendChild(meldung);

  setTimeout(() => {
    meldung.remove();
    window.location.href = "index.html";
  }, 4000);
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
