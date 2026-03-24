---
name: sync-design
description: Stitch 프로젝트의 디자인 시스템을 분석하여 DESIGN.md 파일로 동기화합니다.
allowed-tools:
  - "mcp__stitch__list_projects"
  - "mcp__stitch__get_project"
  - "mcp__stitch__list_screens"
  - "mcp__stitch__get_screen"
  - Read
  - Write
  - WebFetch
  - Glob
---

# Stitch → DESIGN.md 동기화 스킬

Stitch MCP 서버에서 프로젝트 디자인 데이터를 가져와 `DESIGN.md` 파일로 동기화합니다.
google-labs-code/stitch-skills의 design-md 스킬을 기반으로 합니다.

## 파이프라인

```
1. Stitch 프로젝트 조회 → 2. 스크린 메타데이터 수집 → 3. HTML/스크린샷 분석 → 4. DESIGN.md 생성
```

## 1단계: 프로젝트 탐색

사용자가 프로젝트를 지정하지 않은 경우:

1. `mcp__stitch__list_projects`로 전체 프로젝트 목록 조회
2. 프로젝트 제목을 보여주고 사용자에게 선택 요청
3. 프로젝트 ID 추출 (예: `projects/3447765571931286468` → `3447765571931286468`)

사용자가 프로젝트를 지정한 경우:

1. `mcp__stitch__get_project`로 해당 프로젝트 직접 조회

## 2단계: 스크린 메타데이터 수집

1. `mcp__stitch__list_screens`로 프로젝트 내 모든 스크린 조회
2. 대표 스크린 선택 (Home, Landing Page 등 메인 스크린 우선)
3. `mcp__stitch__get_screen`으로 상세 정보 수집:
   - `screenshot.downloadUrl` — 디자인 시각 참조
   - `htmlCode.downloadUrl` — HTML/CSS 소스 코드
   - `width`, `height`, `deviceType` — 화면 스펙

## 3단계: 에셋 다운로드 및 분석

1. `WebFetch`로 `htmlCode.downloadUrl`에서 HTML 코드 다운로드
2. HTML에서 디자인 토큰 추출:
   - Tailwind 클래스 패턴
   - 커스텀 CSS 변수 및 색상 값
   - 폰트 패밀리, 크기, 웨이트
   - 간격(spacing), 둥글기(roundness) 패턴
   - 그림자(shadow) 및 깊이(depth) 표현
3. 프로젝트의 `designTheme` 메타데이터 분석:
   - `namedColors` — 색상 토큰 매핑
   - `font`, `headlineFont`, `bodyFont` — 타이포그래피
   - `roundness`, `spacingScale` — 형태 및 간격
   - `colorMode`, `customColor` — 테마 설정
   - `designMd` — 기존 디자인 시스템 설명 (있는 경우)

## 4단계: DESIGN.md 생성

프로젝트 루트에 `DESIGN.md` 파일을 생성합니다.

### 출력 구조

```markdown
# Design System: [프로젝트 제목]

**Project ID:** [Stitch 프로젝트 ID]
**Last Synced:** [동기화 일시]
**Device:** [디바이스 타입]

## 1. Visual Theme & Atmosphere
(분위기, 밀도, 미적 철학을 서술적으로 기술)

## 2. Color Palette & Roles
(색상별 서술적 이름 + Hex 코드 + 기능적 역할)

### Primary Foundation
- **[서술적 이름]** ([hex]) — 역할 설명

### Accent & Interactive
- **[서술적 이름]** ([hex]) — 역할 설명

### Typography & Text
- **[서술적 이름]** ([hex]) — 역할 설명

## 3. Typography Rules
(폰트 패밀리, 웨이트 계층, 자간, 행간 규칙)

## 4. Component Stylings
* **Buttons:** 형태, 색상, 호버/포커스 동작
* **Cards/Containers:** 둥글기, 배경, 그림자
* **Navigation:** 레이아웃, 상태별 스타일
* **Inputs/Forms:** 테두리, 배경, 포커스

## 5. Layout Principles
(여백 전략, 그리드, 반응형 브레이크포인트)

## 6. Design Notes for Stitch
(Stitch에서 새 스크린 생성 시 참조할 프롬프트 가이드)
```

### 작성 규칙

- **서술적 언어 사용**: "blue" 대신 "Deep Ocean Blue (#0077B6)" 형태로 기술
- **기능적 역할 명시**: 각 디자인 요소의 용도를 설명
- **기술 값 번역**: `rounded-xl` → "넉넉하게 둥근 모서리", `shadow-sm` → "미세한 확산 그림자"
- **Hex 코드 필수**: 서술적 이름 뒤에 항상 괄호로 정확한 값 포함
- **한국어 + 영어 혼용**: 섹션 제목은 영어(Stitch 호환), 설명은 한국어 가능

### designTheme.designMd가 있는 경우

Stitch 프로젝트에 이미 `designMd` 필드가 포함되어 있으면:

1. 해당 내용을 기반으로 시작
2. 실제 HTML 코드 분석 결과로 보완/수정
3. 위 출력 구조에 맞게 재구성
4. 누락된 섹션 추가

## 사용 예시

```
/sync-design
/sync-design anveloper.dev
/sync-design 3447765571931286468
```

## 주의사항

- 기존 DESIGN.md가 있으면 덮어쓰기 전 확인
- 색상 코드는 프로젝트 메타데이터의 실제 값 사용 (추측 금지)
- 스크린이 여러 개면 가장 대표적인 1-2개만 심층 분석
- `designTheme` 데이터가 있으면 반드시 우선 활용
