---
name: start
description: 세션 시작 시 또는 compact 후 프로젝트 문서를 읽어 컨텍스트를 파악합니다.
disable-model-invocation: true
allowed-tools: Bash, Read, Glob
---

# 세션 시작 / 컨텍스트 복구

컨텍스트를 초기화(/clear)한 후 프로젝트 컨텍스트를 빠르게 파악합니다.

## 0단계: 컨텍스트 초기화

먼저 `/clear` 명령을 실행하여 기존 대화 컨텍스트를 초기화합니다.

## 1단계: 프로젝트 규칙 파악

```bash
# claude.md 읽기 (프로젝트 규칙 및 구조)
cat claude.md
```

claude.md에서 확인할 내용:

- 기술 스택 (Next.js 16, React 19, TypeScript 등)
- 디렉토리 구조
- 코딩 컨벤션
- 커밋 규칙 (Conventional Commits)
- 브랜치 전략

## 2단계: 핵심 문서 읽기

### 필수 문서 (항상 읽기)

| 문서        | 내용                    |
| ----------- | ----------------------- |
| `claude.md` | 프로젝트 규칙 및 가이드 |

### 설계 문서 (필요 시 읽기)

```bash
# 설계 문서 목록 확인
ls -la docs/design/
```

| 문서 패턴                   | 내용                   |
| --------------------------- | ---------------------- |
| `docs/design/YYYYMMDD-*.md` | 기능 설계 및 계획 문서 |

### 작업 일지 (필요 시 읽기)

```bash
# 최근 작업 일지 확인
ls -la docs/logs/ | tail -5
```

| 문서 패턴                 | 내용           |
| ------------------------- | -------------- |
| `docs/logs/YYYYMMDD-*.md` | 일별 작업 내역 |

## 3단계: 현재 상태 확인

```bash
# 현재 브랜치 확인
git branch --show-current

# 최근 커밋 확인
git log --oneline -10

# 작업 중인 변경사항 확인
git status
```

## 4단계: 컨텍스트 요약

읽은 내용을 바탕으로 현재 프로젝트 상태를 간략히 요약:

- **프로젝트**: anveloper.github.io (포트폴리오/블로그)
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **현재 브랜치**: (확인 필요)
- **최근 작업**: (커밋 로그 확인)
- **진행 중인 작업**: (git status 확인)
