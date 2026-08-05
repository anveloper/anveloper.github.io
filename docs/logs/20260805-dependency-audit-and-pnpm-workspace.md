# 20260805 - pnpm audit 취약점 전면 해소 및 pnpm-workspace.yaml 이전

## chore

- pnpm audit 취약점 55건 해결 (high 19 / moderate 30 / low 6 → 0건)
- pnpm 설정을 `package.json`의 `pnpm` 필드에서 `pnpm-workspace.yaml`로 이전 (pnpm 10.6+ 권장 위치)
  - `overrides`, `onlyBuiltDependencies` 이동

### 직접 의존성 버전 상향

- `next` / `@next/mdx` / `eslint-config-next`: `^16.2.6` → `^16.2.11` (설치 16.3.0)
  - Next 자체 advisory 9건(high 4 / moderate 5) 해소

### overrides 신규 추가

| 패키지              | 버전             | 경유 경로                        |
| ------------------- | ---------------- | -------------------------------- |
| `sharp`             | `>=0.35.0 <0.36` | next (libvips CVE 4건)           |
| `@hono/node-server` | `>=2.0.5 <3`     | shadcn > MCP SDK                 |
| `qs`                | `>=6.15.2 <7`    | shadcn > MCP SDK > express       |
| `body-parser`       | `>=2.3.0 <3`     | shadcn > MCP SDK > express       |
| `@babel/core`       | `>=7.29.6 <8`    | eslint-config-next > react-hooks |

### overrides 버전 상향

| 패키지       | 변경                         |
| ------------ | ---------------------------- |
| `hono`       | `>=4.12.18` → `>=4.12.34 <5` |
| `fast-uri`   | `>=3.1.2` → `>=3.1.5 <4`     |
| `dompurify`  | `>=3.4.0` → `>=3.4.12 <4`    |
| `ip-address` | `>=10.1.1` → `>=10.3.1 <11`  |
| `postcss`    | `>=8.5.10` → `>=8.5.23 <9`   |

### 메이저 라인 공존 패키지 경로별 고정

`brace-expansion`, `js-yaml`은 트리에 두 메이저가 동시에 존재해 열린 범위 override가 오히려 잘못된 해석을 만들었다.

최초에 `">=1.1.18"`, `">=3.15.1"` 로 걸었더니 상한이 없어 `minimatch@3` 아래에 `brace-expansion@5`가, `gray-matter` 아래에 `js-yaml@4`가 설치됐다. 두 경우 모두 CJS/ESM·API 비호환으로 런타임이 깨질 수 있는 조합이다.

경로별 선택자 + 상한 명시로 교정:

```yaml
"minimatch@3>brace-expansion": ">=1.1.18 <2" # → 1.1.18
"minimatch@10>brace-expansion": ">=5.0.9 <6" # → 5.0.9
js-yaml: ">=4.3.1 <5" # → 4.3.1 (@eslint/eslintrc, cosmiconfig)
"gray-matter>js-yaml": ">=3.15.1 <4" # → 3.15.1
```

기존 override 항목에도 전부 상한을 추가했다.

## docs

- `CLAUDE.md` 기술 스택 표 Next.js 버전 현행화 (16.2.3 → 16.3.0)
- `CLAUDE.md`에 "의존성 관리" 섹션 추가
  - pnpm 설정 위치가 `pnpm-workspace.yaml`임을 명시
  - overrides 작성 규칙(상한 명시, 경로별 고정, `pnpm ls`로 실제 해석 버전 확인) 정리

## 검증

- `pnpm audit` → No known vulnerabilities found
- `pnpm lint` → 통과
- `pnpm build` → 통과 (45 페이지 정적 생성)

빌드 중 `.next/dev/types/validator.ts`가 이미 삭제된 `app/overview`, `app/solutions` 라우트를 참조해 타입 에러가 발생했다. 이번 변경과 무관한 stale 캐시로, `.next` 삭제 후 정상 빌드됐다.

---

# 20260805 (2) - 회사 프로젝트 문서 재대조 및 unlisted 플래그

## docs

로컬 레포 기준 `category: "company"` 프로젝트 문서 재검증. 상세 내역은 [재대조 검증 문서](../design/20260805-local-repo-reverify.md).

직전 대조(7/28) 이후 커밋이 있는 `dps`(8/4) · `dps-store`(8/3) · `estimator-manager`(8/5) 3개만 대상으로 잡았다. 장비 클라이언트 4종은 변동이 없어 그대로 뒀다.

### 정정

- **Estimator 퀵 지오코딩 제공자 오기** — "카카오 지오코딩" → 브이월드. 레포 전체에서 `kakao` 문자열 0건이고, 코드 주석에 "카카오는 앱 등록 시 과금 대상이라 무료 공공 API로 전환"한 사유가 남아 있었다. 기재 스택이 실제로 쓰지 않는 외부 서비스를 가리키던 유일한 사례
- **Estimator "미구현" 서술 3건** — 일주일 사이 구현이 진행돼 문서가 실제보다 축소돼 있었다
  - 일반 타입 상품 렌더러: "설계만 존재" → 7종 골격 완료(PR #386~#393), 단가만 임시값
  - 퀵 실제 배차: "미연동" → `DverDispatch` + 접수·취소·상태 동기화 구현, 실호출 검증만 잔여
  - 라우팅 provider stub: 해소(브이월드 좌표 + 하버사인 + 도로보정 1.3 + 30일 캐시)
- **Estimator Cafe24 주문 API 래핑** 43 → 38 (레포 체크리스트의 2026-07-28 코드 실측치)
- **규모 수치** — DPS services 29→28, DPS Store 42→43 모델·124→129 라우트, Estimator 1,472→1,761 커밋·94→97 모델·42→46 라우트·16→18 단가·기여율 85%→88%
- **TypeScript 메이저 버전 명시** — DPS·DPS Store 6, Estimator 5 (기존엔 버전 없이 "TypeScript (strict mode)")

### 추가

- DPS: Jarvis 고정 템플릿 동결(freeze)·해제, 삭제 템플릿 참조 상품 자동 재매핑
- DPS Store: 다면 디자인 미리보기, 접수 라인 매핑(`TerminalLineMapping`)
- Estimator: "상품 타입 확장" 절 신설, 규격 직접입력 서버 재검증

과장이 아니라 **과소 기재**가 주된 낙차였다. 잔여 목록은 레포 인수인계 문서와 갱신 주기를 맞출 필요가 있다.

## feat

프로젝트 `unlisted` 플래그 추가. frontmatter에 `unlisted: true`면 목록·sitemap·홈·이전/다음 네비게이션에서 빠지되, 상세 페이지는 계속 생성돼 URL 직접 접근은 살아 있다.

- `getAllProjects({ includeUnlisted })` — 기본 제외, `generateStaticParams`만 `true`로 호출해 정적 페이지 보존
- 목록에 없는 slug는 `findIndex`가 -1을 반환해 엉뚱한 이웃이 붙으므로, 이전/다음 네비게이션을 생략하는 가드 추가
- Estimator를 `unlisted` 처리

## 검증

- `pnpm lint` / `pnpm build` 통과
- 빌드 산출물 대조 — `out/projects/estimator-manager/index.html` 생성됨(제목 정상), `out/projects/index.html`·`out/index.html`·`out/sitemap.xml`에서 `estimator-manager` 0건
