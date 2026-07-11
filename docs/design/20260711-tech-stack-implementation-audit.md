# 프로젝트 기술스택 구현 실재성 검증

> 작성일: 2026-07-11
> 목적: `_projects/` 12개 프로젝트가 **기재한 기술스택이 실제 레포 코드로 구현·사용되는지**(선언만 되고 미사용이거나 아예 없는 "유령 스택" 색출) 대조 검증
> 검증 방법: 각 프로젝트를 `gh repo clone`으로 직접 클론 → `package.json`/`build.gradle`/`pom.xml`/`schema.prisma` 등 의존성 + **소스 import·설정·호출 grep**으로 실사용 확인. "의존성에 존재"만으로는 판정하지 않음
> 검증 관점: 이전 [콘텐츠 검수](20260628-project-content-audit.md)가 수치·기능 정확성 중심이었다면, 이번은 **스택 항목이 진짜 코드로 존재하는가**에 초점
> 범위: `main`/`develop` 최신 기준, 비공개 레포(`tils-ai`, `Reciflow`, `anveloper/stars-for-me`)는 gh 인증으로 접근

---

## 1. 판정 기준

| 기호 | 의미 |
| ---- | ---- |
| ✅ IMPLEMENTED | 의존성에 있고 **소스에서 import·설정·호출 확인** |
| ⚠️ DECLARED-ONLY | 의존성/설정엔 있으나 **실제 사용 흔적 없음** (또는 전이 의존성만) |
| ❌ PHANTOM | 의존성·코드에 **아예 없음** (허위 기재) |
| 🔢 VERSION-MISMATCH | 존재하나 **기재 버전이 실제와 다름** |

---

## 2. 종합 진단

**12개 중 9개는 기재 스택이 전부 실구현으로 확인**(과장·허위 없음). 정정이 필요했던 항목은 소수이며, 대부분 "선언만 된 라이브러리를 실사용처럼 나열" 또는 "미구현 기능을 동작처럼 서술"한 케이스.

| 프로젝트 | 레포 | 결과 요약 |
| -------- | ---- | --------- |
| SSAFIT | `ssafy-anveloper/ssafit` | ✅ 전 항목 구현 (MySQL "8.0" 버전만 코드 확증 불가) |
| 당신의 계절 | `ssafy-anveloper/your-seasons` | ⚠️ Emotion 직접 import 0건(MUI 경유) → **정정** |
| README(NFT) | `ssafy-anveloper/readme-nft` | ✅ 전 항목 구현·버전 정합 (컨트랙트 5종 실재) |
| NAYA | `ssafy-anveloper/naya` | ⚠️ **NFC 미구현·Kalendar 미사용 → 정정** |
| Simple Thumbnail | `yangjaecheon-otter-guardians/simple-thumbnail` | ✅ 전 항목 구현 (미사용 dep은 문서 미기재라 무결) |
| DPS | `tils-ai/dps` | ❌ **shadcn/ui 허위·Radix 전이만 → 정정** |
| Reciflow | `Reciflow/ReciflowBackend` | ✅ 백엔드 스택 전부 구현 (프론트는 별도 레포 명시) |
| DPS Store | `tils-ai/dps-store` | ⚠️ **PWA 오프라인 지원 과장 → 정정** |
| 정보보안기사 | `study-anveloper/information-security-engineer` | ✅ 전 항목 구현 (프레임워크는 Vite/React SPA) |
| 딸깍톤 | `vibe-ai-coding-club/ttalkkakthon` | ✅ 웹앱 스택 전부 구현 (Discord 봇/gh는 레포 밖 에이전트) |
| 날별(Stars for me) | `anveloper/stars-for-me` | ✅ 전 항목 구현 (결제는 "설계만"으로 정직 표기) |
| 육아밸 | `four-lovely-fairies/yougabell` | ✅ 전 항목 구현 (멀티레포 5개 전수 대조) |

---

## 3. 정정 적용 항목 (2026-07-11)

### 3.1 DPS — `20240801-dps.mdx` ❌ UI 스택 허위

| 위치 | 현재 | 정정 | 근거 |
| ---- | ---- | ---- | ---- |
| L53 | UI: `Radix UI, shadcn/ui` | `clsx + tailwind-merge` | `shadcn/ui`: `components.json` 없음, CVA 미설치 → **PHANTOM**. `Radix UI`: `@radix-ui/*` 직접 의존성 없음, `pnpm-lock.yaml`에 전이 의존성만, 소스 직접 import 0건 → **DECLARED-ONLY** |

- 실제 UI 계층은 Tailwind 4 + `utils/cn.ts`(clsx+tailwind-merge) + Heroicons/Tabler/lucide 아이콘 조합. Radix/shadcn 컴포넌트 시스템은 도입되지 않음.
- **정정 적용**: `| UI | React 19, Tailwind CSS 4, clsx + tailwind-merge |` (사용자 결정: 간결 정정, 아이콘 나열 생략)
- 나머지 버전(Zod 4·Tiptap 3·Recharts 3·Prisma 7·NextAuth 5·next-intl 4 등)은 전부 `package.json`과 일치. Winston(daily-rotate)·PM2·node-cron·Monaco·Lunasoft 알림톡 모두 실사용 확인.

### 3.2 NAYA — `20221121-naya.mdx` ⚠️ 미구현 기능/미사용 라이브러리

| 위치 | 현재 | 정정 | 근거 |
| ---- | ---- | ---- | ---- |
| L38·L57·L14·L71·L92·L99 | "NFC 태그 쓰기로 오프라인 공유" | **NFC 서술 전면 제거** | android 전체 트리에서 `NfcAdapter`/`NdefMessage`/`NdefRecord`/`writeNdefMessage` 사용 **0건**. 매니페스트 인텐트필터 + `NfcActivity` Compose 화면(껍데기)만 존재 → 실제 태그 쓰기 미구현 |
| L44 | "커스텀 캘린더 UI (Kalendar 라이브러리)" | "커스텀 캘린더 UI (자체 구현)" | `com.himanshoe:kalendar` gradle 선언만 존재, 소스 import·사용 0건. 실제 캘린더는 `widgets/calendar/customCalendar/` 자체 구현 20+파일 |

- **정정 적용**: 개요·주요 기능·기술 스택표·다이어그램·회고 6곳에서 NFC 제거, 실동작 공유 채널을 **QR·카카오·Instagram 스토리**로 통일 (사용자 결정). Kalendar → 자체 구현.
- 그 외 Kotlin/Compose/CameraX/Room(4엔티티)/Hilt/ML Kit+Tesseract 이중 OCR/OpenCV(명함 경계 검출)/ZXing/Kakao SDK/Firebase/ExoPlayer/Retrofit2·WorkManager(미기재이나 실사용) 모두 구현 확인.
- **Instagram vs Facebook 표기는 정확**: 공유 인텐트가 `com.instagram.share.ADD_TO_STORY`(Instagram Stories)이고 Facebook SDK는 App ID(`source_application`) 제공용. 별도 "페이스북" 버튼은 빈 람다 스텁 + 호출부 주석 처리 → 실 동작은 Instagram+Kakao.

### 3.3 DPS Store — `20260108-dps-store.mdx` ⚠️ PWA 과장

| 위치 | 현재 | 정정 | 근거 |
| ---- | ---- | ---- | ---- |
| L136 | "서비스 워커 기반 오프라인 지원" | "서비스 워커 등록 (즉시 활성화 — `skipWaiting`/`clients.claim`)" | `public/sw.js`가 `skipWaiting`/`clients.claim`만 수행, **오프라인 캐싱 전략(runtimeCaching/precache) 없음** → "오프라인 지원"은 과장 |

- 매니페스트 엔드포인트 행에 "테넌트별 홈 화면 설치" 명기 추가.
- 그 외 Tailwind v4·Prisma 7(MariaDB 어댑터)·NextAuth 5(4-세션 분리)·Caddy On-Demand TLS·PM2 Blue-Green·프린터 3종 큐+상태머신·Device Auth Flow(`pk_` 키)·5개 언어(zh 포함)·MyMemory 번역·QR 캐셔 모두 실구현. Electron 데스크톱은 별도 공개 레포(`tils-ai/dps-store-desktop`)로 정확히 "병행" 서술됨.

### 3.4 당신의 계절 — `20220826-your-seasons.mdx` ⚠️ 경미

| 위치 | 현재 | 정정 | 근거 |
| ---- | ---- | ---- | ---- |
| L53 | Frontend: `Material UI, Emotion` | `Material UI (Emotion 엔진)` | `@emotion/react`·`@emotion/styled`는 직접 dep이나 소스 직접 import 0건. MUI v5의 필수 peer dep로만 존재, `styled`는 `@mui/material`에서 import → Emotion 단독 나열은 과장 |

- OpenVidu WebRTC + 시그널링(채팅·필터·컬러셋 3종 동기화), JWT, Spring Security, JPA(18엔티티), Redis(이메일 토큰), Nginx/Docker/Certbot/EC2, 컬러 드레이프(패브릭 오버레이+CSS 필터), Canvas 드로잉 모두 실구현.

---

## 4. 정정하지 않은 관찰 사항 (기록만)

| 프로젝트 | 관찰 | 판단 |
| -------- | ---- | ---- |
| SSAFIT·당신의 계절 | MySQL **"8.0"** 버전이 코드/설정에 핀 없음(`docker pull mysql` latest, 스키마에 버전 명시 없음) | 사실상 8.x이며 시기상 개연성 있음. "부적절"이 아닌 "확증 불가"라 유지 |
| 딸깍톤 | "Discord 봇 / gh CLI 분석" 실행 주체가 레포 **밖** 외부 Discord+AI 에이전트. 레포는 `/api/evaluate`+프롬프트+DB 필드만 제공 | 허위 아님(외부 에이전트가 소비하는 API 실재). 이미 [6/28 검수](20260628-project-content-audit.md)에서 경계 서술 권장됨. 본문 서술 상당히 정확하여 유지 |
| Reciflow | frontmatter/본문에 Expo·RN·Zustand·Next.js(Admin) 등 프론트 스택 기재 | 본 레포(ReciflowBackend)엔 없으나 MDX가 "별도 레포·주력은 백엔드"로 명시 → 범위 구분 정확, 유지 |
| Simple Thumbnail | `axios`·`react-helmet-async` 미사용 dep 존재 | MDX 표에 미기재 → 문서 무결. 레포 측 정리 사항 |
| 육아밸 | `schema.prisma`·`ingest-knowledge.ts` **주석**에 옛 `text-embedding-004` 잔존 | 실행 코드는 `gemini-embedding-001`로 MDX와 일치. 주석이라 문서 영향 없음 |

---

## 5. 검증 커버리지 (실사용까지 확인한 대표 근거)

- **SSAFIT**: `foodSearch.js`(식품안전나라 I2790), `youtube.js`(YouTube v3), `MapView.vue`(Kakao Map), `JWTUtil`/`JWTInterceptor`, MyBatis 매퍼 7개
- **README**: 컨트랙트 5종(`MintReadmeToken` ERC721 등) + `BidReadmeToken`(옥션, 미기재), `web3Config.ts`, `ipfs-http-client`, Truffle/OpenZeppelin 4.7, socket 서버(Express+Socket.io)
- **Reciflow**: RPC 78 / 테이블 36(RLS 66 policy) / Deno Edge 5함수, Gemini 2.5-flash-lite, Cloudflare Images(업로드/삭제), Expo Push 배치, pg_net 트리거 파이프라인
- **딸깍톤**: Prisma7+Neon 어댑터, NextAuth5 beta, Zod4, Vercel Blob(`put`), motion/canvas-confetti, three.js PixelBlast(미기재)
- **날별**: 자체 사주 엔진(율리우스적일/십성/신살/대운), AI 3단 폴백(gemini→gpt-4o-mini→Mock), Prisma 15모델, refresh rotation, 크론 4종. 결제는 스키마+스텁 라우트만(Toss confirm은 TODO) → "설계만" 표기와 부합
- **육아밸**: NestJS11, AI SDK 6(`streamText`/`Output.object`/`embed`), pgvector 코사인 RAG, SSE 스트리밍, `gemini-embedding-001` 768d, 39 Prisma 모델, node-cron+GitHub Actions 이중 크론

---

## 6. 변경 이력

| 날짜 | 내용 |
| ---- | ---- |
| 2026-07-11 | 12개 프로젝트 레포 클론 대조로 기술스택 구현 실재성 검증. 정정: DPS(shadcn/ui 허위·Radix 전이만 → clsx+tailwind-merge), NAYA(NFC 미구현 전면 제거·Kalendar→자체 구현), DPS Store(PWA 오프라인 과장 완화), your-seasons(Emotion→MUI 엔진). 9개 프로젝트는 전 항목 실구현·버전 정합 확인 |
