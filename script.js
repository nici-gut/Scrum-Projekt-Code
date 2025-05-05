let time = 10 * 60; // 10 Minuten in Sekunden
let interval = null;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  document.getElementById('timer').textContent = `${minutes}:${formattedSeconds}`;
}

//Timer
function startTimer() {
  if (interval) return; // verhindert mehrfaches Starten
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(interval);
  interval = null;
  time = 10 * 60; // Reset auf 10 Minuten
  updateDisplay();
}

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
  updateDisplay(); // Timer beim Laden anzeigen
});

document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("trainings").scrollIntoView({ behavior: "smooth" });
});