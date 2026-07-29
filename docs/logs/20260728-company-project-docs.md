# 20260728 - 회사 프로젝트 문서 로컬 레포 기준 갱신

## docs

- 사내 PC의 `~/Workspace` 로컬 레포(오늘자 작업 트리)를 직접 대조해 회사 프로젝트 문서를 현행화
  - 7/11 기술스택 검증은 `gh repo clone` 스냅샷 기준이었고, 이번은 사내 레포 최신 코드 기준
  - 검증 문서 추가: `docs/design/20260728-company-project-docs-refresh.md`
- 사내 조직 레포 15개 중 문서화 대상 7개를 확인하고, 장비 3종·데스크톱 앱은 DPS Store 종속 클라이언트로 판단해 통합 서술

### DPS (`20240801-dps.mdx`)

- 배치 스케줄러 표를 `batch.cron.mjs` 실제 등록 기준 16종으로 교체 (승인·결제·메일 매 1분, 정산 매 1시간 등)
- 주문 14단계 상태 머신·상태 그룹·발주 실패 4회 재시도 제한 추가
- 외부 연동 확장 반영: 레드프린팅·와우프레스 자동 발주, 고도몰, Cafe24 멀티샵·ScriptTag, 스마트스토어 커머스 ID, Jarvis SSO, 파일봇
- 공급사 오픈 API·관리자 대시보드 절 신설
- 규모 수치 실측 반영: 202 페이지 / 265 route / Prisma 71+3 모델 / admin 20 모듈
- PM2 Blue-Green 무중단 배포와 배치 프로세스 분리 명시
- 담당 역할을 커밋 저자 기준(8,922 중 4,528)으로 조정

### DPS Store (`20260108-dps-store.mdx`)

- **정정**: 생성형(GENERATIVE)을 "AI 자동 페이지 생성" → "타입 선택지·렌더링 분기만 있는 확장 슬롯"으로 수정 (AI 의존성·호출 코드 0건, 렌더링은 자유형과 동일 경로)
- 고객 인증 절 신설: 소셜 로그인 3종, 게스트 세션(Server Action 발급·정책 양방향 동기화·식별자 노출 차단)
- Innopay 간편결제 및 주문 취소 시 결제 자동 취소 추가
- 주문 항목별 제작 상태 분리, 자동 구매확정, 고객 이미지 QR 업로드 추가
- 출력 큐를 3종(`ReceiptPrintQueue`/`GarmentPrintQueue`/`MugTransferPrintQueue`)으로 명시하고 작업자 게이팅 출력 반영
- "장비 클라이언트(별도 레포 4종)" 절 신설 — equip-sync l/g/m + dps-store-desktop 구현 상세
- 스탬프 집계의 Jarvis 라이브러리 연동·다중 디자인 분해·미분류 집계 추가
- 규모 수치 갱신(42 모델 / 124 route), 기술 스택에 Python·Electron·QR·sharp·Innopay 반영

### Estimator (`20260422-estimator-manager.mdx`, 신규)

- `estimator-manager` 레포 기준 신규 프로젝트 문서 작성 (최초 커밋일 2026-04-22)
- display/purchase 이중 상품 구조·해시 세션·임베드 6슬롯 아키텍처 서술 (mermaid 다이어그램 포함)
- 옵션·가격 엔진, 주문 운영 표면, 분할배송·퀵, 월결제 후불, Jarvis 디자인 연동, 대용량 저장소, MES 게이트웨이 정리
- 코드 실측 규모표(커밋 1,472 / PR 357 / 모델 94 / 관리자 15화면) 및 **범위 경계**(미구현 항목) 명시
- 사내 계약·거래처 관련 내용은 포트폴리오 문서에서 제외
- 이미지 디렉토리 생성: `public/images/projects/estimator-manager/`

### 기재하지 않은 항목

- KICC 키오스크 단말 연동: 기획 문서만 있고 코드 0건
- `estimator-engine`: `estimator-manager`에서 참조 0건(아카이빙된 `tils-commerce`용)이라 견적 앱 문서에 미포함
