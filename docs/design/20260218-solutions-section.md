# Solutions 섹션 설계

## 개요

알고리즘 문제 풀이 콘텐츠를 `_posts`, `_projects`와 별도로 관리하기 위한 `_solutions` 섹션.
외부 알고리즘 풀이 레포지토리의 커밋을 분석하여 MDX 콘텐츠를 자동 생성하는 Claude Code 스킬 포함.

## 디렉토리 구조

```
_solutions/              # 풀이 MDX 파일
  index.ts               # 콘텐츠 로더 (getAllSolutions, getSolutionBySlug)
  YYYYMMDD-boj-1234.mdx  # 풀이 파일 예시
app/solutions/
  page.tsx               # 목록 페이지
  [slug]/page.tsx        # 상세 페이지
.claude/skills/
  analyze-solutions/     # 분석 스킬
    SKILL.md
```

## 파일명 규칙

- 형식: `YYYYMMDD-{platform}-{number}.mdx`
- slug: `{platform}-{number}` (날짜 접두사 제거)
- 예시: `20260218-boj-1000.mdx` → slug: `boj-1000`

## Frontmatter 스키마

```yaml
---
title: "BOJ 1000 - A+B" # 필수: 플랫폼 + 번호 + 제목
date: "2026-02-18" # 필수: 작성/풀이 날짜
description: "문제 한줄 설명" # 필수: 요약
tags: ["구현", "수학"] # 필수: 알고리즘 분류
platform: "boj" # 필수: boj | programmers
problem_number: "1000" # 필수: 문제 번호/ID
problem_url: "https://..." # 필수: 원본 문제 URL
difficulty: "브론즈 V" # 선택: 난이도
language: "python" # 필수: 풀이 언어
---
```

### 플랫폼 값

| 값            | 설명             | URL 패턴                                   |
| ------------- | ---------------- | ------------------------------------------ |
| `boj`         | 백준 온라인 저지 | `https://www.acmicpc.net/problem/{number}` |
| `programmers` | 프로그래머스     | 검색으로 확보                              |

## 페이지 접근

- `/solutions` — 풀이 목록 (날짜 내림차순)
- `/solutions/{slug}` — 풀이 상세 (MDX 렌더링 + TOC)
- 네비게이션 헤더에는 포함하지 않음 (URL 직접 접근)

## 분석 스킬 사용법

```bash
# 로컬 레포지토리 분석
/analyze-solutions /path/to/algorithm-repo

# GitHub 레포지토리 분석
/analyze-solutions anveloper/algorithm-study

# 기간 필터 적용
/analyze-solutions anveloper/algorithm-study --after=2026-01-01 --before=2026-02-28
```

### 워크플로우

1. 레포지토리 경로 결정 (로컬/GitHub)
2. `implements/` 하위 변경 파일 추출 (git log)
3. 기존 `_solutions/` MDX와 대조하여 중복 제거
4. 10개 단위 배치 처리
   - 솔루션 코드 읽기
   - 문제 URL·제목·난이도 추출 (WebFetch/API)
   - MDX 파일 생성
5. 배치 완료 후 사용자 확인
6. 완료 시 결과 보고

## 본문 템플릿

````markdown
## 문제

[BOJ 1000 - A+B](https://www.acmicpc.net/problem/1000)

> 문제 요약 (1-2줄)

## 풀이

접근 방식과 핵심 아이디어 설명

## 코드

\```python

# 솔루션 코드

\```

## 복잡도

- 시간: O(...)
- 공간: O(...)
````
