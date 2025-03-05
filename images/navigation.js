// 텍스트 배열 및 초기 변수
const texts = ["Hello World", "CodeZaram"];
const typewriterElement = document.getElementById("typewriter");
const navTextElement = document.getElementById("nav-text");
const navigationElement = document.getElementById("navigation");
let index = 0; // 현재 텍스트 인덱스
let charIndex = 0; // 글자 인덱스
let isDeleting = false; // 삭제 여부
let isNavVisible = false; // 네비게이션 표시 여부

// 타이핑 효과 함수
function startTyping() {
  const currentText = texts[index];

  if (isDeleting) {
    // 삭제 중일 때 뒤에서부터 삭제
    charIndex--;
    typewriterElement.textContent = currentText.substring(0, charIndex);
  } else {
    // 추가 중일 때 앞에서부터 추가
    charIndex++;
    typewriterElement.textContent = currentText.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => (isDeleting = true), 1000); // 타이핑 완료 후 대기
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length; // 다음 텍스트로 이동
  }

  const speed = isDeleting ? 100 : 200; // 삭제 속도와 추가 속도
  setTimeout(startTyping, speed);
}

// 스크롤 이벤트 처리
function handleScroll() {
  const secondSection = document.getElementById("second-section");
  const secondSectionPosition = secondSection.getBoundingClientRect();

  if (secondSectionPosition.top <= 0 && !isNavVisible) {
    isNavVisible = true;

    // 네비게이션에 텍스트 추가
    navTextElement.textContent = typewriterElement.textContent;

    // 네비게이션 표시
    navigationElement.classList.remove("hidden");

    // 기존 타이핑 요소 숨기기
    gsap.to(typewriterElement, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        typewriterElement.style.display = "none";
      },
    });
  }
}

// 초기화
startTyping();
window.addEventListener("scroll", handleScroll);
