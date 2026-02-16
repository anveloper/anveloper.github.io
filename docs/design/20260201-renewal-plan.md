# 포트폴리오 사이트 전면 리뉴얼 계획

> 작성일: 2026-02-01
> 작성자: Claude Code (with anveloper)

## 1. 개요

anveloper.github.io 포트폴리오 사이트의 전면 리뉴얼을 진행합니다.

### 1.1 리뉴얼 목표

- 기술 스택 최신화 (Next.js 16, React 19.2 등)
- 미완성 페이지 완성 (About, Skills, Education, Overview, Email)
- UI/UX 개선
- 성능 최적화
- 접근성 강화

### 1.2 현재 상태

| 페이지                          | 상태   |
| ------------------------------- | ------ |
| `/` (홈)                        | 완성   |
| `/posts`, `/posts/[slug]`       | 완성   |
| `/projects`, `/projects/[slug]` | 완성   |
| `/about`                        | 미완성 |
| `/skills`                       | 미완성 |
| `/education`                    | 미완성 |
| `/overview`                     | 미완성 |
| `/contact`                      | 미완성 |

---

## 2. 기술 스택 업그레이드

### 2.1 업그레이드 완료 버전 (2026-02-01)

| 패키지                        | 이전 버전 | 현재 버전 | 상태 |
| ----------------------------- | --------- | --------- | ---- |
| **next**                      | 15.3.3    | 16.1.6    | 완료 |
| **react**                     | 19.1.0    | 19.2.4    | 완료 |
| **react-dom**                 | 19.1.0    | 19.2.4    | 완료 |
| **typescript**                | 5.8.3     | 5.9.3     | 완료 |
| **tailwindcss**               | 4.1.8     | 4.1.18    | 완료 |
| **@tailwindcss/postcss**      | 4.1.8     | 4.1.18    | 완료 |
| **motion**                    | 12.15.0   | 12.29.2   | 완료 |
| **lucide-react**              | 0.511.0   | 0.563.0   | 완료 |
| **eslint**                    | 9.28.0    | 9.39.2    | 완료 |
| **eslint-config-next**        | 15.3.3    | 16.1.6    | 완료 |
| **@next/mdx**                 | 15.5.4    | 16.1.6    | 완료 |
| **@radix-ui/react-separator** | 1.1.7     | 1.1.8     | 완료 |
| **@radix-ui/react-slot**      | 1.2.3     | 1.2.4     | 완료 |
| **@radix-ui/react-tooltip**   | 1.2.7     | 1.2.8     | 완료 |
| **tailwind-merge**            | 3.3.0     | 3.4.0     | 완료 |
| **tw-animate-css**            | 1.3.2     | 1.4.0     | 완료 |
| **@types/node**               | 20.17.57  | 25.1.0    | 완료 |
| **@types/react**              | 19.1.6    | 19.2.10   | 완료 |
| **@types/react-dom**          | 19.1.5    | 19.2.3    | 완료 |

### 2.2 Next.js 16 마이그레이션 변경사항

> 업그레이드 시 수정한 내용

1. **ESLint 설정 변경**
   - `next lint` 명령어 제거됨 → `eslint .` 직접 사용
   - `eslint.config.mjs`: FlatCompat 방식 → 직접 import 방식
   ```javascript
   // Before (Next.js 15)
   import { FlatCompat } from "@eslint/eslintrc";
   const compat = new FlatCompat({ baseDirectory: __dirname });
   export default [...compat.extends("next/core-web-vitals")];

   // After (Next.js 16)
   import nextConfig from "eslint-config-next";
   const config = [...nextConfig];
   export default config;
   ```

2. **React 19 lint 규칙 대응**
   - `react-hooks/set-state-in-effect` 규칙 추가됨
   - `use-mounted.ts`: useState + useEffect → useSyncExternalStore 패턴 적용
   ```typescript
   // Before
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   // After
   import { useSyncExternalStore } from "react";
   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
   ```

3. **tsconfig.json 자동 수정**
   - `include`에 `.next/dev/types/**/*.ts` 자동 추가
   - `jsx`: `preserve` → `react-jsx` 자동 변경

### 2.3 업그레이드 전략

#### Phase 1: 안전한 업그레이드 (패치/마이너)

```bash
pnpm update
```

- Tailwind CSS, Motion, Radix UI 등 패치/마이너 업데이트
- 빌드 및 테스트 확인

#### Phase 2: 메이저 업그레이드 (Next.js 16)

```bash
pnpm add next@latest eslint-config-next@latest @next/mdx@latest
```

- Next.js 16 마이그레이션 가이드 참조
- Breaking Changes 대응
- 빌드 및 테스트 확인

#### Phase 3: 타입 업그레이드

```bash
pnpm add -D @types/node@latest
```

- Node.js 타입 v25 적용
- 타입 에러 수정

---

## 3. 리뉴얼 작업 계획

### 3.1 Phase 1: 기술 스택 업그레이드 (완료)

- [x] 패치/마이너 버전 업그레이드
- [x] Next.js 16 업그레이드
- [x] 빌드 확인 및 에러 수정
- [x] ESLint 설정 마이그레이션 (Next.js 16 호환)
- [x] use-mounted 훅 React 19 패턴 적용 (useSyncExternalStore)
- [ ] 로컬 테스트

### 3.2 Phase 2: 기존 페이지 개선 (완료)

- [x] 홈페이지 UI/UX 개선 (프로필 이미지, 전체 섹션, Projects 목록)
- [x] 포스트 목록/상세 페이지 개선 (심플 디자인, 구문 하이라이팅, 플로팅 TOC)
- [x] 프로젝트 목록/상세 페이지 개선 (심플 디자인, 썸네일/아이콘, 플로팅 TOC)
- [x] 네비게이션 개선 (Dock → 헤더, Projects 추가)

### 3.3 Phase 3: 미완성 페이지 구현 (완료)

- [x] About 페이지 (자기소개)
- [x] Skills 페이지 (기술 스택, shields.io 뱃지)
- [x] Education 페이지 (교육/경력)
- [x] Overview 페이지 (개요/요약)
- [x] Contact 페이지 (연락처)

### 3.4 Phase 4: 공통 기능 (완료)

- [x] SEO 최적화 (메타데이터, sitemap, robots.txt)
- [x] 성능 최적화 (이미지, 폰트)
- [ ] 접근성 개선 (a11y)
- [x] 반응형 디자인 점검

### 3.5 Phase 5: 콘텐츠 및 배포

- [x] 콘텐츠 작성 (포스트 9편, 프로젝트 8건)
- [ ] 최종 테스트
- [ ] 프로덕션 배포 (main 브랜치 머지)

---

## 4. 업그레이드 명령어

### 4.1 전체 업그레이드 (권장)

```bash
# 1. 마이너/패치 업데이트
pnpm update

# 2. Next.js 16 및 관련 패키지 업그레이드
pnpm add next@latest react@latest react-dom@latest
pnpm add -D eslint-config-next@latest @next/mdx@latest @types/node@latest @types/react@latest @types/react-dom@latest

# 3. 기타 최신 버전
pnpm add motion@latest lucide-react@latest tailwind-merge@latest
pnpm add -D eslint@latest typescript@latest tailwindcss@latest @tailwindcss/postcss@latest tw-animate-css@latest
```

### 4.2 업그레이드 후 확인

```bash
# 빌드 테스트
pnpm build

# 개발 서버 확인
pnpm dev

# 린트 확인
pnpm lint
```

---

## 5. 참고 문서

- [Next.js 16 릴리즈 노트](https://nextjs.org/blog)
- [Next.js 마이그레이션 가이드](https://nextjs.org/docs/app/building-your-application/upgrading)
- [React 19 문서](https://react.dev/)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)

---

## 6. 체크리스트

### 업그레이드 전

- [ ] 현재 브랜치 확인 (develop)
- [ ] 변경사항 커밋 완료
- [ ] pnpm-lock.yaml 백업

### 업그레이드 후

- [ ] `pnpm build` 성공
- [ ] `pnpm dev` 정상 동작
- [ ] 모든 페이지 렌더링 확인
- [ ] 다크/라이트 모드 동작 확인
- [ ] 반응형 디자인 확인
- [ ] 콘솔 에러 없음

---

## 7. 롤백 계획

업그레이드 실패 시:

```bash
# 1. node_modules 삭제
rm -rf node_modules

# 2. pnpm-lock.yaml 복원
git checkout pnpm-lock.yaml

# 3. 재설치
pnpm install
```

---

## 변경 이력

| 날짜       | 내용                                            |
| ---------- | ----------------------------------------------- |
| 2026-02-01 | 초안 작성                                       |
| 2026-02-01 | Phase 1 완료 - 전체 패키지 최신 버전 업그레이드 |
| 2026-02-12 | Phase 2~4 완료 상태 반영                        |
