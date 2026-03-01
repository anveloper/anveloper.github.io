# 2026-02-11 프로젝트 콘텐츠 추가 및 UI 개선

## docs

### 프로젝트 MDX 파일 5건 추가

GitHub 저장소 분석 후 프로젝트 콘텐츠 작성:

| 파일                            | 프로젝트                         | 기간       |
| ------------------------------- | -------------------------------- | ---------- |
| `20220622-ssafit.mdx`           | SSAFIT (피트니스 웹 앱)          | 2022.05~06 |
| `20220826-your-seasons.mdx`     | 당신의 계절 (퍼스널 컬러 진단)   | 2022.07~08 |
| `20221007-readme-nft.mdx`       | README (NFT 게임 플랫폼)         | 2022.08~10 |
| `20221121-naya.mdx`             | NAYA (소개 카드 관리)            | 2022.10~11 |
| `20230227-simple-thumbnail.mdx` | Simple Thumbnail (썸네일 생성기) | 2023.02    |

## refactor

### 기술 스택 갱신

GitHub 프로필 README 기준으로 홈페이지·Skills 페이지 기술 스택 동기화:

- Frontend: React, TypeScript 레벨 3 상향, Tailwind CSS 추가
- Backend: Prisma 3, Spring Boot·JPA 2 상향, Redis·Kafka 추가
- DevOps: AWS·Caddy·MySQL 레벨 2, Naver Cloud 추가
- Tools: IntelliJ IDEA·Figma·Notion 추가

### 홈페이지 프로젝트 4건 추가

NAYA, README, 당신의 계절, SSAFIT을 홈페이지 Projects 섹션에 추가

## fix

### posts, projects 목록 반응형 개선

- 모바일: 날짜·제목 세로 배치, 콘텐츠 마진 제거
- sm 이상: 날짜·제목 가로 배치, ml-24 들여쓰기
