---
name: analyze-project
description: 다른 디렉토리의 프로젝트를 분석하여 _projects/ 에 MDX 콘텐츠를 작성합니다.
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task
argument-hint: "<프로젝트 경로>"
---

# 프로젝트 분석 및 콘텐츠 작성

분석 대상: `$ARGUMENTS`

## 1단계: 대상 프로젝트 탐색

인자로 전달된 경로의 프로젝트를 전체적으로 탐색합니다.

### 1.1 기본 구조 파악

```bash
# 디렉토리 구조 확인 (2단계 깊이)
ls -la $ARGUMENTS
find $ARGUMENTS -maxdepth 2 -type f | head -50
```

### 1.2 프로젝트 설정 파일 확인

우선순위대로 읽기:

| 파일 | 확인 내용 |
|------|----------|
| `package.json` | 프로젝트명, 설명, 기술 스택, 스크립트 |
| `README.md` | 프로젝트 소개, 기능 설명 |
| `tsconfig.json` / `jsconfig.json` | 언어 설정 |
| `Dockerfile`, `docker-compose.yml` | 배포 환경 |
| `.env.example` | 환경 변수 구성 |
| `build.gradle`, `pom.xml` | Java/Kotlin 프로젝트 |
| `requirements.txt`, `pyproject.toml` | Python 프로젝트 |
| `go.mod` | Go 프로젝트 |

### 1.3 소스코드 구조 분석

```bash
# 주요 소스 디렉토리 파악
ls -la $ARGUMENTS/src/ 2>/dev/null
ls -la $ARGUMENTS/app/ 2>/dev/null
ls -la $ARGUMENTS/lib/ 2>/dev/null
```

핵심 파일 탐색:
- 진입점 파일 (index, main, app)
- 라우팅/API 구조
- 주요 컴포넌트/모듈 구조
- 설정 파일

### 1.4 문서 탐색

```bash
# 문서 파일 찾기
find $ARGUMENTS -name "*.md" -maxdepth 3 | head -20
find $ARGUMENTS/docs -type f 2>/dev/null | head -20
```

## 2단계: 분석 정보 정리

탐색한 내용을 기반으로 다음 항목을 정리합니다:

### 필수 항목

| 항목 | 설명 |
|------|------|
| 프로젝트명 | 공식 이름 |
| 한줄 소개 | 프로젝트 핵심 설명 (1문장) |
| 기술 스택 | 언어, 프레임워크, 라이브러리, DB 등 |
| 주요 기능 | 핵심 기능 3-5개 |
| 프로젝트 구조 | 디렉토리/모듈 구조 요약 |
| 기간 | 개발 기간 (커밋 이력 또는 문서 기반) |

### 선택 항목

| 항목 | 설명 |
|------|------|
| 아키텍처 | 전체 시스템 구조 |
| 담당 역할 | 본인 기여 부분 |
| 성과/결과 | 정량적 성과 |
| 트러블슈팅 | 해결한 주요 문제 |
| GitHub URL | 저장소 링크 |
| Demo URL | 배포 URL |

## 3단계: 사용자 확인

분석 결과를 요약하여 사용자에게 보여주고, 다음을 확인합니다:

- 분석 내용이 정확한지
- 추가/수정할 내용이 있는지
- 강조하고 싶은 포인트가 있는지
- slug 이름 (파일명)

## 4단계: MDX 콘텐츠 작성

`_projects/<slug>.mdx` 파일을 작성합니다.

### Frontmatter 형식

```yaml
---
title: '<프로젝트명>'
date: '<YYYY-MM-DD>'
description: '<한줄 소개>'
tags: ['<기술1>', '<기술2>', ...]
github: '<GitHub URL>'  # 선택
demo: '<Demo URL>'      # 선택
---
```

### 본문 구조

```markdown
# <프로젝트명>

## 개요

<프로젝트 소개 2-3문장>

## 주요 기능

- **기능 1**: 설명
- **기능 2**: 설명
- **기능 3**: 설명

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | ... |
| Backend | ... |
| Database | ... |
| Infra | ... |

## 프로젝트 구조

주요 모듈/디렉토리 구조 설명

## 담당 역할

- 역할 1
- 역할 2

## 트러블슈팅

### 문제 1: <제목>

- **상황**: ...
- **원인**: ...
- **해결**: ...

## 회고

프로젝트를 통해 배운 점, 개선할 점
```

### 작성 규칙

- 한국어로 작성
- 기술 용어는 영문 유지 (React, TypeScript 등)
- 과장 없이 사실 기반으로 작성
- 코드 블록은 실제 프로젝트의 코드 참조
- 불필요한 세부사항 생략, 핵심만 간결하게

## 5단계: 결과 보고

```
생성된 파일: _projects/<slug>.mdx
프로젝트명: <name>
기술 스택: <techs>
```
