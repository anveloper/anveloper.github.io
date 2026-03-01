# 블로그 포스트 콘텐츠 보강

> 작업일: 2026-02-12

## docs

### Next.js 16 업그레이드 가이드 포스트 보강

- `20260202-nextjs-16-upgrade-guide.mdx`: 전면 재작성 (~180줄 → ~523줄)
  - 사전 준비(의존성 정리) 섹션 추가
  - Next.js 15 주요 변경사항 6개 항목 보강 (Async Request API, codemod, proxy.ts 등)
  - Next.js 16 주요 변경사항 10개 항목 보강 (ESLint, Turbopack, React 19 등)
  - dps 프로젝트 실제 커밋 분석 기반 코드 예시 추가

### 8개 블로그 포스트 도입부 배경 정보 추가

웹 조사 기반으로 각 포스트 앞부분에 기술적 배경/컨텍스트 섹션 추가

| 포스트                                                | 추가 내용                                                                         |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| `20260202-prisma-7-upgrade-guide.mdx`                 | Prisma 7 개요 (Rust Engine 제거, 90% 번들 감소, ESM 전용, 5→6→7 변경 흐름)        |
| `20260112-multi-tenant-saas-architecture.mdx`         | AWS SaaS Lens의 Silo/Pool/Bridge 모델, Shopify 사례                               |
| `20260114-caddy-multi-tenant-ssl.mdx`                 | Caddy 자동 HTTPS, On-Demand TLS, ACME 프로토콜, Nginx 비교                        |
| `20260129-node-based-page-builder.mdx`                | 페이지 빌더 3가지 패턴 (블록/컴포넌트/노드트리), Gutenberg·Builder.io·Notion 사례 |
| `20260209-langgraph-multi-agent-workflow.mdx`         | LangGraph StateGraph, MoA 패턴, 멀티에이전트 트렌드                               |
| `20260210-pgvector-two-stage-search-optimization.mdx` | pgvector 소개, HNSW vs IVFFlat, halfvec, v0.8.0 반복 스캐닝                       |
| `20260211-xml-data-pipeline-for-ai-search.mdx`        | RAG 파이프라인 = 비정형 ETL, 전통 ETL vs RAG ETL                                  |
| `20260212-fastapi-sse-streaming-ai-generation.mdx`    | SSE vs WebSocket, AI 스트리밍 사실상 표준                                         |
