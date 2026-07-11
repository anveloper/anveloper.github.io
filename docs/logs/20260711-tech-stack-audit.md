# 20260711 - 프로젝트 기술스택 구현 실재성 검증

## docs

- 등록된 12개 프로젝트 레포를 `gh`로 전수 클론해, 기재된 기술스택이 실제 코드로 import·설정·호출까지 되는지 대조 검증
  - "의존성에 존재"만으로 판정하지 않고 소스 grep으로 실사용 확인
  - 9개 프로젝트는 전 항목 실구현·버전 정합, 4개에서 부적절 항목 정정
- 검증 문서 추가: `docs/design/20260711-tech-stack-implementation-audit.md` (12개 판정표·근거·변경 이력)

### 정정 내역

- **NAYA**: NFC 태그 쓰기가 화면/매니페스트만 있고 쓰기 API(`NfcAdapter`/`Ndef*`) 사용 0건 → NFC 서술 전면 제거(공유 채널 = QR·카카오·Instagram 스토리). Kalendar 라이브러리는 gradle 선언만·미사용 → "자체 구현"으로 정정
- **DPS**: `shadcn/ui` 허위(components.json·CVA 부재), `Radix UI` 전이 의존성만 → UI 스택을 `clsx + tailwind-merge`로 정정
- **DPS Store**: PWA `sw.js`에 오프라인 캐싱 전략 부재 → "서비스 워커 등록(즉시 활성화)"로 완화
- **당신의 계절**: Emotion 직접 import 0건(MUI 경유) → "Material UI (Emotion 엔진)"으로 정정

### 정정하지 않고 기록만 (허위 아님/확증 불가)

- MySQL "8.0" 버전(SSAFIT·계절): 코드에 버전 핀 없음이나 사실상 8.x
- 딸깍톤 Discord 봇/gh CLI: 레포 밖 외부 에이전트가 소비하는 API는 실재
- Reciflow 프론트 스택: MDX가 별도 레포로 명시
