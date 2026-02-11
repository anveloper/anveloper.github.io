# 2026-02-11 SEO 및 프로젝트 이미지 구현

## feat

### 포스트·프로젝트 SEO 메타데이터

- `app/posts/[slug]/page.tsx`: `generateMetadata` 추가 (title, description, keywords, OG, Twitter)
- `app/projects/[slug]/page.tsx`: `generateMetadata` 추가 (OG 이미지 포함)
- `app/sitemap.ts`: 정적 페이지 + 포스트 + 프로젝트 동적 sitemap 생성
- `app/robots.ts`: robots.txt 생성
- `export const dynamic = "force-static"` 으로 정적 빌드 호환

### 프로젝트 이미지 시스템

- `_projects/index.ts`: `findImage(slug, name)` 헬퍼 추가 (png → jpg → svg 순 탐색)
- `public/images/projects/{slug}/` 디렉토리 구조화 (8개 프로젝트)
- GitHub 저장소에서 실제 아이콘 활용 (naya, readme-nft, your-seasons)
- SVG/PNG 썸네일 1200:630 비율 통일

### 프로젝트 페이지 이미지 연동

- 목록 (`app/projects/page.tsx`): 아이콘 표시, 링크 래핑, hover 효과
- 상세 (`app/projects/[slug]/page.tsx`): 커버 이미지 표시, OG 이미지 연결

## chore

### 포스트 이미지 디렉토리 구조

- `public/images/posts/{slug}/` 디렉토리 생성 (5개 포스트)

## 관련 커밋

- `7878543` feat: 포스트·프로젝트 SEO 메타데이터 및 sitemap, robots.txt 추가
- `e7df0a4` feat: 프로젝트별 썸네일 및 아이콘 이미지 추가
- `01e5ee7` feat: 프로젝트 이미지 자동 탐색 및 페이지 연동
- `1782237` chore: 포스트 이미지 디렉토리 구조 생성
