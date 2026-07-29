# 회사 프로젝트 문서 로컬 레포 대조 갱신

> 작성일: 2026-07-28
> 목적: 사내 PC의 **로컬 레포 최신 코드**를 기준으로 `category: "company"` 프로젝트 문서를 현행화하고, 미문서화 회사 프로젝트를 추가
> 검증 방법: `~/Workspace` 하위 레포를 직접 열어 `package.json` / `prisma/schema.prisma` / 라우트·페이지 파일 수 / 배치 진입점 / 소스 grep으로 실사용 확인. 사내 설계 문서는 참고하되 **코드에서 재확인된 항목만 기재**
> 선행 문서: [기술스택 구현 실재성 검증](20260711-tech-stack-implementation-audit.md) — 당시 회사 레포는 `gh repo clone` 스냅샷 기준이었고, 본 문서는 오늘자 로컬 작업 트리 기준

---

## 1. 대상 레포 현황

`~/Workspace`에서 확인된 사내 조직(`tils-ai`, `wepnp-dev`) 레포는 15개이며, 이 중 문서화 대상은 아래와 같다.

| 레포                  | 브랜치/최종 커밋       | 커밋 수 | 문서                                     |
| --------------------- | ---------------------- | ------- | ---------------------------------------- |
| `dps`                 | develop / 2026-07-28   | 8,922   | `_projects/20240801-dps.mdx` (갱신)      |
| `dps-store`           | main / 2026-07-28      | 2,036   | `_projects/20260108-dps-store.mdx` (갱신) |
| `equip-sync-l-module` | main / 2026-06-02      | 70      | DPS Store 문서에 통합                    |
| `equip-sync-g-module` | main / 2026-06-18      | 121     | DPS Store 문서에 통합                    |
| `equip-sync-m-module` | main / 2026-05-18      | 59      | DPS Store 문서에 통합                    |
| `dps-store-desktop`   | main / 2026-06-02      | 29      | DPS Store 문서에 통합                    |
| `estimator-manager`   | feat 브랜치 / 2026-07-28 | 1,472 | `_projects/20260422-estimator-manager.mdx` (신규) |

> 장비 3종과 데스크톱 앱은 **DPS Store에 종속된 클라이언트**이므로 별도 프로젝트로 분리하지 않고 DPS Store 문서의 "장비 클라이언트" 절로 통합했다. 설계 문서 자체도 `dps-store/docs/print/`에서 통합 관리된다.

미문서화로 남긴 레포: `dps-design`, `member`, `tracking-delivery`, `tils-ai`, `tils-ai-agent`, `tils-commerce`, `dps-schedule`, `estimator-engine`, `shopify-manager`, `jarvis-bundle`.

---

## 2. 정정 항목

### 2.1 DPS Store — 생성형(GENERATIVE) 테넌트 타입 과장

| 위치        | 기존                                       | 정정                                                              |
| ----------- | ------------------------------------------ | ----------------------------------------------------------------- |
| 개요 / 기능 | "생성형(GENERATIVE): AI가 자동으로 페이지 생성" | "타입 선택지와 렌더링 분기만 준비된 확장 슬롯. AI 자동 생성 미도입" |

- 근거: `prisma/schema.prisma`에 `GENERATIVE` enum이 있고 타입 선택 모달·설정 화면에 노출되지만, 렌더링 분기는 전부 `// FLEXIBLE/GENERATIVE: 동적 렌더러 사용`으로 **자유형과 동일 경로**를 탄다.
- 레포 전체에서 AI/LLM 의존성(`openai`·`anthropic`·`gemini`·`@ai-sdk`) 및 호출 코드 **0건** → "AI 자동 생성"은 미구현.
- 3가지 타입을 지원한다는 서술은 "고정형·자유형 2가지 + 확장 슬롯"으로 조정.

### 2.2 DPS — 배치 주기 표 부정확

| 위치        | 기존                                   | 정정                                       |
| ----------- | -------------------------------------- | ------------------------------------------ |
| 배치 처리 표 | "승인 처리 매 1시간 / 결제 처리 매 5분" | APPROVAL·PAYMENT·MAIL 매 1분, 정산 매 1시간 등 실제 16종 주기 |

- 근거: `batch.cron.mjs`의 운영/개발 환경별 등록 목록과 `docs/operations/20260224-주문상태-및-배치-스케줄러.md`.
- 누락돼 있던 작업(SELLER_SETTLE·SUPPLIER_SETTLE·ORDER_NOTIFICATION·ORDER_SYNC_CLEANUP·RATINGS·TOKEN_REFRESH)을 표에 반영.

### 2.3 DPS — 모듈 수·규모 수치 갱신

| 항목             | 기존              | 실측                                     |
| ---------------- | ----------------- | ---------------------------------------- |
| admin 모듈       | 17                | 20 (`app/admin` 하위 디렉토리)           |
| creator 모듈     | 6                 | 6 (유지)                                 |
| 페이지 / API     | "200개 이상 페이지" | 202 페이지 / 265 route.ts                |
| Prisma 모델      | 미기재            | 메인 71 + EC 3                           |
| 배포             | "PM2 기반 배포"   | PM2 Blue-Green(:3010/:3011) + 배치 프로세스 분리 |

### 2.4 DPS — 담당 역할 서술 조정

- 기존 "풀스택 개발자로 프론트엔드와 백엔드 전반을 담당" → 커밋 저자 기준 사내 팀 프로젝트(총 8,922 커밋 중 본인 4,528)임을 명시하고 "절반가량을 담당한 주 기여자"로 조정.
- 6/28 검수에서 SSAFIT에 적용한 "커밋 저자 기준 역할 기재" 원칙과 동일한 처리.

### 2.5 DPS Store — 규모 수치 갱신

| 항목        | 기존       | 실측                    |
| ----------- | ---------- | ----------------------- |
| DB 테이블   | "40개+"    | 42 모델                 |
| API         | "120개+"   | 124 route.ts            |
| 출력 큐     | "머그 큐"  | `MugTransferPrintQueue` 포함 3종 큐 명시 |

---

## 3. 추가 반영 항목 (신규 구현분)

### 3.1 DPS

- 주문 14단계 상태 머신과 상태 그룹, 자동 승인–결제–발주 흐름, 발주 실패 4회 재시도 제한
- 외부 제조사 자동 발주(`services/external/redprint.ts`, `wowpress.ts`), 고도몰 배송 연동
- Cafe24 멀티샵(`shop_no`)·멀티디자인 주문 인입, ScriptTag 주입, 앱 연결 상태 관리
- 스마트스토어 커머스 ID 인증
- Jarvis 계정 기반 SSO 로그인·토큰 갱신 (`docs/integrations/20260722-jarvis-로그인-연동-가이드.md`)
- 파일봇 연동(PDF 메타 추출·옵션별 가이드 파일)
- 공급사 오픈 API(`app/api/v1/supplier`: order·product·category·group·settle·business-request)
- 관리자 대시보드(`services/admin-dashboard`: KPI·일별 매출·채널 분류·베스트셀러·To-do 등 9종 집계)
- 판매사/공급사 정산 스케줄러, PDF 복원 검수 도구(`app/admin/pdf-recovery`)

### 3.2 DPS Store

- 소셜 로그인(카카오·네이버·구글) 자체 OAuth 프로바이더 + `CustomerSocialAccount`
- 게스트 세션(`guest_{tenantId}_{uuid}`, Server Action 발급, 정책·페이지 토글 양방향 동기화, 식별자 노출 차단)
- Innopay 간편결제(Epay) 연동 및 주문 취소 시 결제 자동 취소
- `OrderItemProductionStatus` + 이력 모델로 주문 상태와 제작 상태 분리
- 고객 이미지 업로드(QR `/upload/[hash]`, `CustomerUploadToken`·`OrderAccessToken`)
- 스탬프 집계의 Jarvis 라이브러리 카테고리 연동, 다중 디자인 식별자 분해, 미분류 행 집계
- 관리자 장비 설정(라벨기·가먼트·머그·설치형 4탭)·장비 인증 승인·출력 큐 화면
- 장비 클라이언트 4종 상세: Watcher+Agent 단일 EXE(PyInstaller), GitHub Actions 태그 빌드, GTX4CMD 연동, 머그 2-up 좌우반전 합본, Electron 셸의 부팅 시 프린터 자가복구

> KICC 키오스크 단말 연동은 기획 문서만 존재하고 코드 0건이라 **문서에 기재하지 않음**.

### 3.3 Estimator (신규)

`estimator-manager` 레포 기준으로 `_projects/20260422-estimator-manager.mdx` 신규 작성. 날짜는 최초 커밋일(2026-04-22).

- display/purchase 이중 상품 구조, 해시 세션, 임베드 6슬롯(esbuild IIFE 고정 파일명)
- 옵션·가격 엔진(규칙 6종·단가 테이블 16종·옵셋 2트랙), 주문 운영 표면(Cafe24 주문 API 43/94 래핑)
- 분할배송·박스분할·부릉(dver) 퀵 운임, 월결제 후불(여신), Jarvis 편집기·디자인 의뢰, S3 대용량 원본, MES 게이트웨이
- **범위 경계 명시**: 일반 타입 상품 렌더러 미구현, 퀵 실제 배차 미연동, 라우팅 provider stub, Prisma 마이그레이션 베이스라인 부재
- 담당 역할은 커밋 저자 기준(3인 중 본인 약 85%)으로 기재
- 사내 계약·거래처 관련 서술은 포트폴리오 문서에서 제외

---

## 4. 기재하지 않은 관찰 사항

| 대상            | 관찰                                                       | 판단                                     |
| --------------- | ---------------------------------------------------------- | ---------------------------------------- |
| `dps-store`     | `README.md`의 다국어 "한/영/일" 서술이 코드(5개 언어)와 불일치 | 레포 README 문제. MDX는 이미 5개 언어로 정확 |
| `estimator-manager` | `README.md` "코드 구현 미착수" 문구가 1,400여 커밋 이후에도 잔존 | 레포 README 문제. MDX는 코드 실측 기준으로 작성 |
| `estimator-engine`  | `estimator-manager`에서 참조 0건 (아카이빙된 `tils-commerce`용) | 견적 앱 문서에 포함하지 않음             |
| `dps`           | `typescript` devDependency가 6.x 계열                      | 버전 표기 없이 "TypeScript (strict mode)" 유지 |

---

## 5. 변경 이력

| 날짜       | 내용                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| 2026-07-28 | 사내 로컬 레포 기준 회사 프로젝트 문서 갱신. DPS·DPS Store 현행화(생성형 타입 과장·배치 주기·규모 수치 정정), 장비 클라이언트 4종을 DPS Store 문서에 통합, Estimator 프로젝트 문서 신규 추가 |
