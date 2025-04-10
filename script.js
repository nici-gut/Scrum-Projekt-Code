function initCarousel(trackId, prevId, nextId, dotsId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsContainer = document.getElementById(dotsId);
  const items = track.querySelectorAll('.carousel-item');
  const visibleItems = 3;
  const pageCount = Math.ceil(items.length / visibleItems);
  let currentIndex = 0;

  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('.dot');

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20;
    const scrollX = currentIndex * itemWidth * visibleItems;
    track.style.transform = `translateX(-${scrollX}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex % pageCount].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < pageCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}

window.addEventListener('load', () => {
  initCarousel('carouselTrack', 'prevBtn', 'nextBtn', 'carouselDots');
  initCarousel('carouselTrack2', 'prevBtn2', 'nextBtn2', 'carouselDots2');
  initCarousel('carouselTrack3', 'prevBtn3', 'nextBtn3', 'carouselDots3');
});
document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("trainings").scrollIntoView({ behavior: "smooth" });
});

// Funktion, die den Inhalt basierend auf dem angeklickten Tag anzeigt
function showDay(day) {
  const dayContent = document.getElementById('dayContent');
  const dayTitle = document.getElementById('dayTitle');
  const dayDescription = document.getElementById('dayDescription');

  // Verstecke die Karussell-Div und zeige den Tag-Content
  document.getElementById('trainings').style.display = 'none';
  dayContent.style.display = 'block';

  // Dynamischer Inhalt basierend auf dem Tag
  switch (day) {
    case 'montag':
      dayTitle.textContent = 'Montag – Maximalkraft';
      dayDescription.textContent = 'Heute konzentrieren wir uns auf das Maximalkrafttraining, insbesondere für die Fingerkraft und kleine Leisten.';
      break;
    case 'dienstag':
      dayTitle.textContent = 'Dienstag – Ausdauer';
      dayDescription.textContent = 'Dienstag steht für Ausdauertraining mit Fokus auf Technik und Ausdauer.';
      break;
    case 'mittwoch':
      dayTitle.textContent = 'Mittwoch – Ruhetag';
      dayDescription.textContent = 'Mittwoch ist ein Ruhetag für Erholung und Regeneration.';
      break;
    case 'donnerstag':
      dayTitle.textContent = 'Donnerstag – Techniktraining';
      dayDescription.textContent = 'Donnerstag ist für spezifisches Techniktraining und kleine Bewegungen vorgesehen.';
      break;
    case 'freitag':
      dayTitle.textContent = 'Freitag – Kraftausdauer';
      dayDescription.textContent = 'Freitag ist für das Training der Kraftausdauer auf längeren Routen gedacht.';
      break;
    case 'samstag':
      dayTitle.textContent = 'Samstag – Bouldertraining';
      dayDescription.textContent = 'Samstag ist für intensives Bouldertraining mit Fokus auf schwierige Routen.';
      break;
    case 'sonntag':
      dayTitle.textContent = 'Sonntag – Erholung und Dehnung';
      dayDescription.textContent = 'Sonntag ist für Erholung, Dehnung und leichte Übungen vorgesehen.';
      break;
    default:
      dayTitle.textContent = 'Unbekannter Tag';
      dayDescription.textContent = 'Für diesen Tag gibt es keine spezifischen Informationen.';
  }
}

// Funktion, um zurück zur Karussellansicht zu gehen
function backToCarousel() {
  document.getElementById('trainings').style.display = 'block';
  document.getElementById('dayContent').style.display = 'none';
}