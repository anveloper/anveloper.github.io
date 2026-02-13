# 헤더 개선 및 포스트 추가

> 작업일: 2026-02-13

## refactor

### HeaderLogo 컴포넌트 분리

- `nav-bar.tsx`에서 `header-logo.tsx`로 HeaderLogo 컴포넌트 분리
- 로고 텍스트 변경: `["anveloper.dev", "안녕하세요, 안성진입니다. ☺️", "오늘도 기분 좋은 하루되세요. 😊"]`
- 첫 번째 로고 텍스트("anveloper.dev") 표시 시간 2배로 조정 (setInterval → setTimeout)
- Link 래핑을 HeaderLogo 컴포넌트 내부로 이동
- 네비게이션 메뉴 순서 변경: About → Projects → Posts

## style

### 헤더 모바일 반응형 레이아웃 개선

- `nav-bar.tsx`: 모바일에서 세로 배치, md 이상에서 가로 배치 (`flex-col` → `md:flex-row`)
- `header-logo.tsx`: `w-full` 클래스 추가
- 네비게이션·소셜 링크 패딩 반응형 조정 (`p-2 md:px-3`)

## feat

### About 소개에 다중 플랫폼·멀티테넌트 경험 추가

- `page.tsx`, `about/page.tsx`: 판매사·공급사·어드민 다중 플랫폼 설계·개발 경험 추가
- 멀티테넌트 기반 다중 도메인 플랫폼 개발 경험 추가
- 경력 뱃지에 "다중 플랫폼", "멀티테넌트" 추가

## docs

### GitHub 프로필 경력 자동 갱신 포스트 추가

- `20260213-github-profile-auto-update-period.mdx` 신규 작성
- GitHub Actions schedule cron으로 프로필 README 경력 개월차 자동 갱신하는 방법

## 관련 커밋

- `76a944c` refactor: HeaderLogo 컴포넌트 분리 및 로고 텍스트 개선 (nav)
- `508ec82` style: 헤더 모바일 반응형 레이아웃 개선 (nav)
- `4a6829d` docs: GitHub 프로필 경력 자동 갱신 포스트 추가 (posts)
- `b9fbbbb` feat: About 소개에 다중 플랫폼·멀티테넌트 경험 추가
