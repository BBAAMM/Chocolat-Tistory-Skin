//Scroll Speed GSAP
const slider = document.getElementById("slider");
const slides = document.querySelectorAll("#slider > div");

let currentIndex = 0;
let startpos = 0;
let endpos = 0;
// Scroll

// Slide with button by GSAP
function gsapSnapToSlide(index, duration = 0.8) {
  const totalSlides = slides.length;
  const slideWidth = slides[0].offsetWidth;

  gsap.to(slider, {
    x: -index * slideWidth, // 슬라이드 이동
    duration: duration, // 애니메이션 속도
    ease: "power4.out", // Ease-Out 효과
  });

  // 활성화된 슬라이드 업데이트
  slides.forEach((slide, idx) => {
    slide.classList.remove("active", "inactive");
    if (idx === index) {
      slide.classList.add("active");
    } else {
      slide.classList.add("inactive");
    }
  });
}

// "prev" Action Listener
function prevAction() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  gsapSnapToSlide(currentIndex);
}

// "next" Action Listener
function nextAction() {
  currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  gsapSnapToSlide(currentIndex);
}

// Handle scroll and snap to nearest slide
// TODO(1.7.2025) : Making Scroll
//마우스를 클릭 시작
function motionCapture() {
  //시작과 종료 지점의 포지션 값 비교 후 슬라이드 이동 실행 및 초기화
  if (startpos < endpos) {
    prevAction();
  } else {
    nextAction();
  }
  //pos 값 초기화
  startpos = 0;
  endpos = 0;
}
slider.addEventListener("mousedown", (event) => {
  startpos = event.pageX;
});
//마우스를 클릭 해제
slider.addEventListener("mouseup", (event) => {
  endpos = event.pageX;
  motionCapture();
});
//터치 시작
slider.addEventListener("touchstart", (event) => {
  startpos = event.touches[0].pageX;
});
//터치 해제
slider.addEventListener("touchend", (event) => {
  endpos = event.changedTouches[0].pageX;
  motionCapture();
});

// 리사이즈 이벤트 핸들러
function handleResize() {
  slideWidth = slides[0].offsetWidth; // 슬라이드 너비 업데이트
  gsapSnapToSlide(currentIndex, 0); // 현재 활성화된 슬라이드 위치로 다시 스냅
}

// 윈도우 리사이즈 이벤트
window.addEventListener("resize", handleResize);

gsapSnapToSlide(currentIndex);

// // Previous version
// function snapToSlide(index) {
//   const slideWidth = slides[0].offsetWidth;
//   const scrollPosition = index * slideWidth;

//   slider.scrollTo({
//     left: scrollPosition,
//     behavior: "smooth",
//   });
// }

// // Working Listener
// document.addEventListener("click", function (e) {
//   const prevButton = e.target.closest("#prev");
//   const nextButton = e.target.closest("#next");
//   if (prevButton) {
//     currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
//     snapToSlide(currentIndex);
//   }
//   if (nextButton) {
//     currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
//     snapToSlide(currentIndex);
//   }
// });

// Slider

// function updateSlider() {
//   const offset = -currentIndex * 100;
//   slider.style.transform = `translateX(${offset}%)`;
// }

// document.addEventListener("click", function (e) {
//   const prevElement = e.target.closest("#prev");
//   const nextElement = e.target.closest("#next");
//   if (prevElement) {
//     currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
//     updateSlider();
//   }
//   if (nextElement) {
//     currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
//     updateSlider();
//   }
// });

// prevButton.addEventListener("click", () => {
//   console.log(2);
//   currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
//   updateSlider();
// });

// nextButton.addEventListener("click", () => {
//   currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
//   updateSlider();
// });

// // 자동 슬라이드 (선택 사항)
// setInterval(() => {
//   currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
//   updateSlider();
// }, 5000); // 5초 간격
