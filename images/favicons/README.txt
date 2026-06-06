Chocolat 파비콘 세트
=====================

C4 · 코코아 아이소메트릭 큐브 + 핑크 프랄린 점

포함 파일
---------
favicon.svg       마스터 (무한 확장, 최신 브라우저에서 가장 선명)
favicon.ico       16·32·48 멀티사이즈 (구형 브라우저·윈도우 호환)
favicon-16.png    브라우저 탭 (작은 크기)
favicon-32.png    브라우저 탭 (표준)
favicon-48.png    고해상도 탭 / 티스토리 파비콘 설정용
favicon-180.png   apple-touch-icon (iOS 홈 화면)
favicon-512.png   PWA / 매니페스트용

티스토리 적용
-------------
1) 스킨 편집 → 파일 업로드에서 png/svg 파일을 올립니다.
   (업로드된 파일은 ./images/ 경로로 참조됩니다)
2) <head> 안, RSS 링크 아래에 아래 코드를 붙여 넣습니다.
3) 또는 더 간단하게: 블로그 관리 → 꾸미기 → 스킨 → 파비콘 설정에
   favicon-48.png 를 등록해도 됩니다.

<head> 삽입 코드
----------------
<!-- Chocolat favicon -->
<link rel="icon" href="./images/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="./images/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="icon" href="./images/favicon-16.png" sizes="16x16" type="image/png" />
<link rel="apple-touch-icon" href="./images/favicon-180.png" />

색상
----
큐브 밝은면  #A06A44
큐브 왼쪽면  #6F4327
큐브 오른쪽면 #41281A
프랄린 점    #F9A8D4
타일 배경    #0B0B0D
