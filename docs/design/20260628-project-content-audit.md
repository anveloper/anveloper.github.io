# 프로젝트 콘텐츠 검수·보완 계획

> 작성일: 2026-06-28
> 목적: `_projects/` 11개 프로젝트 설명을 실제 GitHub 레포와 대조 검증하고, 사실관계 오류·누락·문장 품질을 정정
> 검증 방법: 각 프로젝트 frontmatter의 `github` 레포(README·package.json·소스 트리)를 직접 대조
> 범위: 콘텐츠(서술/수치/용어)만 수정. 레이아웃/디자인은 별도 계획 참조

---

## 1. 검증 커버리지

| 프로젝트         | 레포                                            | 접근          | 검증 |
| ---------------- | ----------------------------------------------- | ------------- | ---- |
| SSAFIT           | `ssafy-anveloper/ssafit`                        | PUBLIC        | ✅   |
| 당신의 계절      | `ssafy-anveloper/your-seasons`                  | PUBLIC        | ✅   |
| README           | `ssafy-anveloper/readme-nft`                    | PUBLIC        | ✅   |
| NAYA             | `ssafy-anveloper/naya`                          | PUBLIC        | ✅   |
| Simple Thumbnail | `yangjaecheon-otter-guardians/simple-thumbnail` | PUBLIC        | ✅   |
| 정보보안기사     | `study-anveloper/information-security-engineer` | PUBLIC        | ✅   |
| 딸깍톤           | `vibe-ai-coding-club/ttalkkakthon`              | PUBLIC        | ✅   |
| Reciflow         | `Reciflow/ReciflowBackend`                      | PRIVATE(인증) | ✅   |
| 육아밸           | `four-lovely-fairies/yougabell`                 | PUBLIC        | ✅   |
| DPS              | `tils-ai/dps`                                   | PRIVATE(인증) | ✅   |
| DPS Store        | `tils-ai/dps-store`                             | PRIVATE(인증) | ✅   |

> DPS / DPS Store는 MDX에 `github` 필드가 없지만(회사 비공개 레포), 본인 계정(`tils-ai` org)으로 접근 가능하여 검증함. 비공개라 사이트에 링크는 노출하지 않되 **수치/버전은 정정**한다.

---

## 2. 종합 진단

콘텐츠 품질(문장·구성)은 전반적으로 양호하나, **최근 1인/팀 프로젝트일수록 "규모를 부풀린 수치"가 실제와 어긋남**. 우선순위:

- **P1 (사실관계 오류)** — 수치·기능·제품명이 레포와 다름. 신뢰도 직결, 즉시 수정.
- **P2 (누락 보완)** — 레포에 실재하나 글에 빠진 주요 기능. 추가 시 설득력↑.
- **P3 (문장·용어 다듬기)** — 오탈자·비문·표기 일관성.

가장 시급한 5개: **정보보안기사(수치 3건 과장)**, **Reciflow(헤드라인 수치 4건 전부 오류)**, **딸깍톤(투표 서브시스템 통째 누락)**, **DPS(모듈 수 과장 4건 + 버전 오류 3건)**, **DPS Store(Tailwind 버전·Winston 허위 의존·페이지 타입·언어 수)**.

> 흥미로운 패턴: DPS 계열은 **모듈/페이지 타입은 부풀리고, 테이블·엔드포인트·컴포넌트 수는 오히려 축소**했다. 정확히 정정하면 일부 수치는 오히려 더 인상적이다(예: DPS Store 테이블 20+→42, 엔드포인트 70+→123).

---

## 3. 프로젝트별 정정 항목

### 3.1 정보보안기사 — `20260207-information-security-engineer.mdx` 🔴 P1 다수

| 위치      | 현재                    | 정정                  | 근거                                                                    |
| --------- | ----------------------- | --------------------- | ----------------------------------------------------------------------- |
| L22       | "5과목 30+ 챕터"        | **18개 챕터**         | `src/content/theory/` 실제 18개 (6/3/3/3/3), 본문 표(L89-95)와도 모순   |
| L105·L120 | "200+ 정적 HTML"        | **50여 개**           | `scripts/generate-static-pages.mjs` 실제 51 라우트(문항별 아님, 챕터별) |
| L75       | "페이지 컴포넌트 (9개)" | **13개**              | `src/pages/` 실제 13개                                                  |
| L93 등    | "어플리케이션 보안"     | **애플리케이션 보안** | 국립국어원 표기 + 정보보안기사 공식 과목명                              |

- **P2 보완**: **실기(practical) 모듈 통째 누락**. `src/content/practical/`(terms 1099줄, hands-on 846줄, descriptive 404줄) + 전용 페이지 4개 존재. 현재 글은 "필기시험"만 다룬다고 서술 → 실기(용어/단답/실무) 추가하고 "필기" 한정 표현 완화.
- **정확한 수치(유지 가능)**: "760+ 문제"는 정확히 760개로 확인됨. 과목별 문제 수(180+/90+...)는 보수적으로 맞음.
- **P3**: "760여 개"+정확히 760 → "760개"가 깔끔.

### 3.2 Reciflow — `20260313-reciflow.mdx` 🔴 P1 헤드라인 수치 전부 오류

L64·L70-71의 "규모" 수치 4개가 모두 실제와 불일치:

| 현재               | 실제                                           | 근거                                            |
| ------------------ | ---------------------------------------------- | ----------------------------------------------- |
| RPC 함수 62개      | **78개**                                       | `supabase/sql/functions/**/*.sql`               |
| 테이블 33개        | **36개**                                       | `supabase/sql/tables/*.sql` (`_enums.sql` 제외) |
| 마이그레이션 109개 | **baseline 1 + 1 (구 129개 archive로 squash)** | `supabase/migrations/` + `_archive/`            |
| 도메인 19개        | **20개**                                       | `functions/*/` 디렉토리                         |

- **마이그레이션 수치는 특히 부적절**: 레포의 핵심 엔지니어링이 "126→1 baseline squash"(`docs/design/20260422-migration-baseline-squash.md`)인데 "109개"는 그 반대 메시지. → **트러블슈팅을 squash 서사로 교체**하면 더 강력 (스키마·데이터 0건 변경, PROD 누락 RPC 1건 발견·동기화).
- **경로 오류** L55: `supabase/sql/migrations/` → 실제 `supabase/migrations/` (sql 옆).
- **명칭 오류** L28·L56·L72: "cf-images" → 실제 `cf-images-ua`(업로드)/`cf-images-delete`(삭제) 2개. "Cloudflare Images 연동 함수군"으로.
- **P2 보완**: ① 소셜 로그인 **Google 누락**(Apple/Kakao만 기재, `_enums.sql`에 GOOGLE 존재) ② **푸시 알림** 기능 통째 누락(`push-send` 함수 + device_push_token/notification_preference 테이블 + 설계문서).

### 3.3 딸깍톤 — `20260311-ttalkkakthon.mdx` 🟠 P1+P2

- **P2 (가장 큰 누락) — 투표/좋아요 서브시스템**: 레포 태그라인이 "운영/심사/**투표** 플랫폼"인데 글에 투표가 거의 없음. 실재: `app/teams/vote`, `app/admin/vote`, `api/vote`, `model Vote`, 설계문서(참가자 투표 50% + 심사위원 50% 최종 점수). **Like** 기능도 별도 존재. → frontmatter description(L3)에 "투표" 추가 + 주요 기능에 참가자 투표 항목 추가.
- **P1 제품명** L42·L74: "Vercel Postgres (Neon)"은 구명칭(Vercel Postgres는 sunset, Neon으로 통합). 또한 "Neon 어댑터, Vercel Postgres (Neon)"은 Neon 중복. → **"Neon Postgres (Vercel Marketplace)"**.
- **P2**: `분석` 명령 흐름 미문서화(`심사`/`냥심사`만 서술). `분석`은 gh CLI로 공개 레포 코드 분석하는 별도 명령.
- **P3** L26: "...호출, 평가 프롬프트와..." 쉼표 접속 비문 → "...호출하고, ...검토해 결과를 DB에 저장".

### 3.4 NAYA — `20221121-naya.mdx` 🟠 P1

- **P1 공유 채널 오류** L38·L56: "Facebook 소셜 공유 / Facebook SDK" → 실제 **Instagram 스토리 공유**(`ShareActivity.kt`의 `com.instagram.share.ADD_TO_STORY`). Facebook SDK는 App ID 제공용으로만 존재. → "Instagram(스토리) 공유"로.
- **P1 용어 모순** L45: "참석자에 명함(Nuya) 연동" — Nuya=상대가 공유한 소개 카드(L79 표), 명함=Business 카드. 둘을 등치한 모순. → "일정 참석자에 소개 카드(Naya)·명함 연동".
- **P1 검증 실패(제거 검토)** L53: 프론트 스택 "Styled Components, Framer Motion" → `frontend/package.json`에 **없음**(axios/redux/react-router/helmet/device-detect만). 재확인 후 제거.
- **P2 누락**: OpenCV 모듈(`android/opencv/`, 명함 스캔 전처리), 커스텀 DocumentScanner 모듈, Retrofit2/OkHttp/WorkManager.
- **검증 불가(외부 증빙 필요)**: "6인 팀", "최우수상(1위)" — 레포 어디에도 근거 없음. 외부 증빙 보유 확인 권장.
- **정확(유지)**: Spring Boot 2.7은 글이 맞고 오히려 레포 README(2.5.5)가 틀림.

### 3.5 당신의 계절 — `20220826-your-seasons.mdx` 🟡 P2 중심

- **P2 주요 UI 라이브러리 누락**: **Material UI(`@mui/material` 5.9.1)**가 실제 주력 UI인데 "Emotion"만 기재(Emotion은 MUI 엔진). MUI 추가. redux-persist, react-canvas-draw, react-component-export-image(결과 이미지 다운로드)도 실재.
- **P3 기술 정확성**:
  - L24·L53 "WebSocket 실시간 채팅" → 실제 **OpenVidu 시그널링 채널**(`session.signal`), 독립 WebSocket/STOMP 아님 → "OpenVidu 시그널링 기반 실시간 채팅".
  - L20·L91 "컬러 드레이프 (Canvas 기반)" → 실제 **패브릭 PNG 오버레이 + CSS 필터**(`CoverFilter.jsx`/`rgbConverter.js`). 진짜 Canvas는 별도 드로잉 도구(`react-canvas-draw`).
  - OpenVidu 버전: 클라 2.19 / 서버 2.22 혼재 → "OpenVidu 2.x" 권장.
- **P3** L98 "3명의 팀원": FE 서브팀이 본인 포함 3명 → "프론트엔드 3인이" 권장.

### 3.6 SSAFIT — `20220622-ssafit.mdx` 🟢 정확, 소폭 보완

- **P2 역할 과소 기술**: 글은 "프론트엔드 담당"만, 실제 README 로그상 Spring 컨트롤러(Member/Video/Reply)·JWT 로그인·SQL 스키마 등 **백엔드 기여 상당**. 풀스택 성격 반영 고려.
- **P3 Mermaid 줄바꿈** L60-61: 노드 라벨 내 `\n`은 Mermaid에서 줄바꿈 안 됨(`<br/>` 필요). → **사이트 `components/mermaid.tsx`가 `\n`을 전처리하는지 먼저 확인** 후, 안 하면 전 프로젝트 다이어그램 일괄 점검 필요(공통 이슈).
- **P3**: "공공 데이터 API" → "식품안전나라 식품영양성분 API(I2790)"로 구체화 가능. 13개 테이블·3개 외부 API·MySQL 8.0·Spring Boot 2.6 등은 정확.

### 3.7 README(NFT) — `20221007-readme-nft.mdx` 🟢 정확

- 스마트 컨트랙트 5종·버전·팀(6인)·기간(7주)·역할 모두 레포와 일치.
- **P2**: "이벤트 옥션" 기능 대비 컨트랙트 표에 Bid/Auction 컨트랙트 없음(`BidReadmeTokenABI`는 프론트에 존재) → 온체인/오프체인 여부 한 줄 명확화. Artillery 부하 테스트(socket 서버) 언급 가능.
- **P3** L23·L91 "채팅 정답 자동 감지" → "채팅 메시지에서 정답 자동 판별" 권장.

### 3.8 Simple Thumbnail — `20230227-simple-thumbnail.mdx` 🟢 정확

- **P2 스택 시점 불일치(판단 필요)**: 글은 Vite 6 + Cloudflare Workers를 2023 스프린트 스택처럼 서술하나, 실제 wrangler `compatibility_date: 2026-01-27` + Vite 6은 스프린트 이후 현대화. → "원 스프린트(2023) 후 스택 현대화"를 구분하면 시점 모순 해소.
- **P3**: axios 스택 표 누락(추가), "산돌 삼립호빵체" → "산돌 삼립호빵체 Basic", L14 "PNG 다운로드" → "PNG로 다운로드".
- 팀(7인)·스프린트(스프린트14, 2.22~2.27, 6일)·비율·폰트·최대 3레이어 등 정확.

### 3.9 육아밸 — `20260612-yougabell.mdx` 🟢 정확, 표현 다듬기

- 임베딩 모델(`gemini-embedding-001` 768d), 도메인 스키마 11개, 모델 30+(실제 39), Gemini 2.5 Flash, RAG/SSE/단일세션, 전 스택 버전 모두 정확.
- **P3 표현**:
  - L20 "정성 회고" → 의미 모호. "정성적 회고"(qualitative) 또는 "정성스러운 회고" 중 택1.
  - L101 "burn 하지 않고" → 영어 jargon. "별도 호출을 낭비하지 않고".
  - L51·L64 "5개 레포" → umbrella 자체 전략 문서는 "4 서비스 레포 + 임시 크론". "umbrella + 4개 서비스 레포(+임시 크론)"로 정합.
- **P2**: "30+ 테이블" → "39개 모델"로 구체화 + pgvector(`Unsupported("vector(768)")`) 언급 시 강점. 단, 웜업 크론이 로컬 tsx와 GitHub Actions(`warm-api.yml` 등) 이중 트랙 → 정식 표현 정리.

### 3.10 DPS — `20240801-dps.mdx` 🔴 P1 다수 (`tils-ai/dps`)

**모듈 수 과장(4건):**

| 위치 | 현재                | 실제   | 근거                     |
| ---- | ------------------- | ------ | ------------------------ |
| L70  | admin "23개 모듈"   | **18** | `app/admin/*/page.tsx`   |
| L71  | partner "25개 모듈" | **13** | `app/partner/*/page.tsx` |
| L72  | store "27개 모듈"   | **16** | `app/store/*/page.tsx`   |
| L73  | creator "10개 모듈" | **6**  | `app/creator/*/page.tsx` |

**수치 축소(정정 시 오히려 유리):**

| 위치     | 현재                    | 실제                              | 근거                          |
| -------- | ----------------------- | --------------------------------- | ----------------------------- |
| L81      | components "365개 파일" | **414개(.ts/.tsx) / 513개(전체)** | `components/`                 |
| L113     | "80개 이상 페이지"      | **200개**                         | 전체 `page.tsx`               |
| L76·L108 | 배치 "12개"/"10개 이상" | **16개**                          | `app/api/schedule/*/route.ts` |
| L87      | zod "11개 도메인"       | **8개**                           | `lib/zod/*.ts` (index 제외)   |

**버전 오류(3건):**

| 위치 | 현재       | 실제                               |
| ---- | ---------- | ---------------------------------- |
| L54  | Zod 3      | **Zod 4** (`zod ^4.4.3`)           |
| L57  | Tiptap 2   | **Tiptap 3** (`@tiptap/* ^3.23.1`) |
| L58  | Recharts 2 | **Recharts 3** (`recharts ^3.8.1`) |

- **P2/정확성**: 카카오 알림톡은 **Lunasoft(리셀러)** 경유(`services/alimtalk/utils/lunasoft-api.ts`) — "카카오 알림톡(Lunasoft 연동)" 명기 가능. EC DB `make-status`는 env(`EC_DATABASE_URL`)로만 참조되어 스키마에 이름 하드코딩 없음(레포는 실재) → "전자상거래 DB" 표현은 유지 가능. 멀티 DB(메인 71모델 + EC 3모델) 구조는 정확.
- **P2 누락**: Monaco 기반 인앱 에디터(`app/editor/`, `app/html-editor/`), Swagger API 문서(`app/docs/` + 공급사 가이드 PDF 생성), 클레임/문의 CS 워크플로(`services/claim`/`inquiry`), 판매사/공급사 정산 분리(`seller-settle`/`supplier-settle`), i18n 자동 동기화 스크립트. "자동화/정산" 주장을 구체화할 소재 풍부.
- **P3**: L14·L22 store/creator를 한 역할로 묶었으나 실제 별도 route 트리(store 16모듈 / creator 6모듈). L62 "배포: PM2, node-cron" — node-cron은 배포 도구 아님 → "프로세스 관리·스케줄링".

### 3.11 DPS Store — `20260108-dps-store.mdx` 🔴 P1 (`tils-ai/dps-store`)

| 위치              | 현재                                                  | 실제                        | 비고                                                                |
| ----------------- | ----------------------------------------------------- | --------------------------- | ------------------------------------------------------------------- |
| L119              | Tailwind CSS 3                                        | **Tailwind v4** (`^4.3.0`)  | 버전 오류                                                           |
| L125              | "Winston (Daily Rotate)"                              | **의존성에 Winston 없음**   | 허위 — 제거                                                         |
| L51-64·L165       | "10개 페이지 타입" (PRODUCT_DETAIL·ORDER_STATUS 포함) | **8개** (PageType enum)     | PRODUCT_DETAIL=admin 컴포넌트, ORDER_STATUS=주문 상수 → 표에서 제외 |
| L46·L90·L165·L187 | "다국어 한/영/일/베 4개 언어"                         | **5개 (한/영/일/베/중 zh)** | `shared/types/i18n.ts`                                              |
| L21·L164          | "20개+ DB 테이블"                                     | **42개 모델**               | 축소 — "40개+"로                                                    |
| L164              | "70개+ 엔드포인트"                                    | **123개 route.ts**          | 축소 — "120개+"로                                                   |

- **정확(유지)**: TenantType 3종(FIXED/FLEXIBLE/GENERATIVE), proxy.ts 서브도메인 추출→rewrite, `/api/caddy/check-domain` On-Demand TLS, 4가지 도메인 접근, Blue-Green(4033/4034, `.next-blue/green`, 30초 헬스체크, 307/308 허용, ACTIVE_PORT), 스탬프/캐셔(QR)/PWA 멀티테넌트 매니페스트, MyMemory 자동번역, 트러블슈팅 2건 모두 코드로 확인.
- **P2 누락(강력 소재)**: **프린터 자동화 연동** — 스키마에 `MugTransferPrintQueue`/`ReceiptPrintQueue`/`GarmentPrintQueue`/`PrinterApiKey` 존재, org의 **`equip-sync-m-module`(머그 전사지 프린터 자동화)** 와 직결. 현장 하드웨어 연동은 차별화 포인트인데 글에 전무. **`dps-store-desktop`(Electron 키오스크)**, 소셜 로그인/멤버십(`CustomerSocialAccount`/`Membership`)도 누락.
- **P3**: L156 "Caddy ACTIVE_PORT 환경변수 전환" → 실제 포트 파일에 기록 후 systemd EnvironmentFile 주입(L181과 일관되게).

---

## 4. 공통 점검 항목

1. **Mermaid `\n` 줄바꿈** (전 프로젝트 다이어그램) — `components/mermaid.tsx` 전처리 여부 확인이 선행. 미처리 시 `<br/>` 일괄 치환.
2. **제품명 최신화** — "Vercel Postgres"(→Neon), 구버전 표기 점검.
3. **수치 표기 원칙** — "N여 개/N+"가 실제와 어긋나지 않게. 과장보다 정확/보수가 신뢰에 유리(정보보안기사·Reciflow 교훈).
4. **검증 불가 주장** — NAYA 수상·팀 규모 등 외부 증빙 없는 수치는 본인 확인 후 유지.

---

## 5. 권장 작업 순서

1. **P1 사실관계** (정보보안기사 4건, Reciflow 6건, 딸깍톤 제품명, NAYA 공유/용어/스택, **DPS 모듈 수 4건 + 버전 3건**, **DPS Store Tailwind/Winston/페이지타입/언어**) — 즉시
2. **P2 누락 보완** (정보보안기사 실기, Reciflow 푸시/Google, 딸깍톤 투표, your-seasons MUI, **DPS Store 프린터 자동화**, DPS 에디터/정산)
3. **P3 문장·용어** (육아밸·SSAFIT·README·Simple Thumbnail 다듬기)
4. **공통** Mermaid 전처리 확인 → 필요 시 일괄

> 참고: DPS/DPS Store는 비공개 레포라 frontmatter `github` 링크는 추가하지 않는다(사이트 방문자 접근 불가). 수치/버전 정정만 적용.

---

## 6. 변경 이력

| 날짜       | 내용                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------- |
| 2026-06-28 | 초안 — 9개 레포 대조 검증, 프로젝트별 정정/보완 항목 정리                                 |
| 2026-06-28 | DPS/DPS Store(`tils-ai`) 추가 검증 — 11개 전 프로젝트 커버, 모듈/버전/언어 수치 정정 반영 |
| 2026-06-28 | P1~P3 정정 MDX 적용 완료(`pnpm build` 통과). 단, Mermaid `\n` 줄바꿈은 시각 확인 보류     |
