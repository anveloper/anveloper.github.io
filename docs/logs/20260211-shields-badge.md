# 2026-02-11 shields.io 뱃지 기반 스킬·태그 컴포넌트 구현

## feat

### shields.io 뱃지 데이터 모듈 및 컴포넌트 생성

- `lib/skill-data.ts` 생성
  - `Skill`, `SkillLevel`, `SkillCategory` 공용 타입 정의
  - `SKILL_BADGE_MAP`: 47개 기술 스택의 shields.io 뱃지 매핑 (logo, color, logoColor)
  - `getShieldUrl()`: shields.io URL 빌더 함수
- `components/skill-badge.tsx` 생성
  - `SkillBadge`: shields.io 이미지 + 불꽃 레벨 표시 (Skills 페이지용)
  - `TechBadge`: shields.io 이미지만 표시 (프로젝트 태그용)
  - `ring-1 ring-border/50`으로 다크모드 검정 뱃지 가시성 확보
  - 매핑에 없는 스킬은 텍스트 Badge로 폴백

## refactor

### 스킬·프로젝트 뱃지에 shields.io 이미지 적용

- `app/page.tsx`: 로컬 `SkillBadge`·타입 제거, 공용 모듈 import, 프로젝트 태그 `TechBadge` 적용
- `app/skills/page.tsx`: 로컬 `SkillBadge`·타입 제거, 공용 모듈 import
- `app/projects/page.tsx`: 프로젝트 목록 태그 `TechBadge` 적용
- `app/projects/[slug]/page.tsx`: 프로젝트 상세 태그 `TechBadge` 적용
