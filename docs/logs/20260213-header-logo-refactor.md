# HeaderLogo 컴포넌트 분리 및 헤더 개선

> 작업일: 2026-02-13

## refactor

### HeaderLogo 컴포넌트 분리

- `nav-bar.tsx`에서 `header-logo.tsx`로 HeaderLogo 컴포넌트 분리
- 로고 텍스트 변경: `["anveloper.dev", "안녕하세요, 안성진입니다. ☺️", "오늘도 기분 좋은 하루되세요. 😊"]`
- 첫 번째 로고 텍스트("anveloper.dev") 표시 시간 2배로 조정 (setInterval → setTimeout)
- Link 래핑을 HeaderLogo 컴포넌트 내부로 이동
- 네비게이션 메뉴 순서 변경: About → Projects → Posts

## 관련 커밋

- `76a944c` refactor: HeaderLogo 컴포넌트 분리 및 로고 텍스트 개선 (nav)
