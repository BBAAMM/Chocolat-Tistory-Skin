const texts = ["안녕, 세계", "Code, 자람"];
const typewriterElement = document.getElementById("typewriter");
let index = 0; // 현재 텍스트 인덱스
let charIndex = 0; // 글자 인덱스
let isDeleting = false; // 삭제 여부
let isNavVisible = false; // 네비게이션 표시 여부

// Typing Effect[Fin](1.5.2025)
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
// 초기화
startTyping();

//Appearance of a Navigation logo
//TODO(1.5.2025) : Making a Function
