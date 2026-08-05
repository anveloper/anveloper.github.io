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
