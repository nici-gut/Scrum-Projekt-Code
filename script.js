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