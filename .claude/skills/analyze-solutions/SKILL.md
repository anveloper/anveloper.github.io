---
name: analyze-solutions
description: 알고리즘 풀이 레포지토리의 커밋을 분석하여 _solutions/ 에 MDX 콘텐츠를 자동 생성합니다.
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, WebFetch, WebSearch, AskUserQuestion
argument-hint: "<레포지토리 경로 또는 GitHub URL> [--after=YYYY-MM-DD] [--before=YYYY-MM-DD]"
---

# 알고리즘 풀이 분석 및 MDX 생성

분석 대상: `$ARGUMENTS`

## 0단계: 인자 파싱

`$ARGUMENTS`에서 다음을 추출합니다:

- **레포지토리 경로**: 로컬 경로 또는 GitHub URL
- **--after**: 시작 날짜 (선택, 기본값: 없음)
- **--before**: 종료 날짜 (선택, 기본값: 없음)

### GitHub URL 판별 규칙

다음 패턴 중 하나에 해당하면 GitHub URL로 간주:
- `https://github.com/<owner>/<repo>`
- `github.com/<owner>/<repo>`
- `<owner>/<repo>` (슬래시 1개, 로컬 경로에 해당하는 파일/디렉토리가 없는 경우)

### GitHub URL인 경우

```bash
REPO_DIR=$(mktemp -d /tmp/analyze-solutions-XXXXXX)
gh repo clone <owner>/<repo> "$REPO_DIR"
```

### 로컬 경로인 경우

- 인자를 그대로 레포지토리 경로로 사용

> 이하 단계에서 `$REPO_PATH`는 위에서 결정된 실제 경로를 의미합니다.

## 1단계: 레포지토리 구조 파악

```bash
# 디렉토리 구조 확인
ls -la $REPO_PATH
find $REPO_PATH -maxdepth 2 -type d | head -30
```

- `implements/` 하위 디렉토리 구조 파악
- 파일명 패턴 확인: `{platform}-{number}.{ext}` 또는 유사 패턴
- README 등에서 플랫폼별 디렉토리 구조 확인

## 2단계: 커밋에서 변경 파일 추출

```bash
# 기간 필터 적용
git -C $REPO_PATH log \
  --after="$AFTER_DATE" --before="$BEFORE_DATE" \
  --name-only --pretty=format:"---COMMIT---%H %ai" \
  -- "implements/"
```

- `implements/` 하위 파일만 대상으로 추출
- 커밋 날짜와 변경된 파일 목록을 매핑
- 동일 파일이 여러 커밋에서 변경된 경우, 최신 커밋 날짜 사용

## 3단계: 기존 MDX와 대조하여 중복 제거

```bash
# 기존 _solutions/ 파일 목록 확인
ls _solutions/*.mdx 2>/dev/null
```

- slug 기준(`boj-1234`, `programmers-42586` 등)으로 이미 존재하는 풀이 스킵
- 새로 생성할 파일 목록 정리 후 사용자에게 보고

## 4단계: 사용자 확인

분석 결과를 사용자에게 보여줍니다:

- 새로 추가할 풀이 목록 (파일명, 플랫폼, 문제 번호)
- 이미 존재하여 스킵하는 풀이 목록
- 계속 진행할지 확인

## 5단계: 배치 처리 (10개 단위)

각 문제에 대해 다음을 수행합니다:

### 5.1 솔루션 코드 읽기

```bash
# 솔루션 파일 내용 읽기
cat $REPO_PATH/implements/<platform>/<filename>
```

### 5.2 문제 URL 결정

| 플랫폼 | URL 패턴 |
|--------|----------|
| BOJ | `https://www.acmicpc.net/problem/{number}` |
| Programmers | WebSearch로 `programmers {문제명}` 검색하여 URL 확보 |

### 5.3 문제 정보 추출

WebFetch로 문제 페이지에서:
- 문제 제목
- 난이도 (BOJ: solved.ac 티어)
- 문제 요약 (1-2줄)

BOJ 난이도 조회:
```
https://solved.ac/api/v3/problem/show?problemId={number}
```

### 5.4 MDX 파일 생성

파일명: `_solutions/YYYYMMDD-{platform}-{number}.mdx`

#### Frontmatter

```yaml
---
title: "BOJ 1000 - A+B"
date: "2026-02-18"
description: "두 정수를 입력받아 합을 출력하는 기본 입출력 문제"
tags: ["구현", "수학"]
platform: "boj"
problem_number: "1000"
problem_url: "https://www.acmicpc.net/problem/1000"
difficulty: "브론즈 V"
language: "python"
---
```

#### 본문 템플릿

```markdown
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
```

### 5.5 배치 완료 확인

10개 처리 완료 후 사용자에게:
- 생성된 파일 목록 보고
- 남은 문제 수 안내
- 계속 진행할지 확인

## 6단계: 정리 및 결과 보고

GitHub URL로 클론한 경우 임시 디렉토리를 삭제합니다:

```bash
# GitHub 클론인 경우에만 실행
rm -rf $REPO_DIR
```

최종 결과:

```
=== Solutions 분석 완료 ===
생성된 파일: N개
스킵된 파일: M개 (이미 존재)
생성 목록:
  - _solutions/YYYYMMDD-boj-1000.mdx
  - _solutions/YYYYMMDD-boj-1001.mdx
  ...
```

## 작성 규칙

- 한국어로 작성
- 코드 블록의 언어 태그는 실제 풀이 언어에 맞춤
- 풀이 설명은 간결하게 핵심 아이디어 위주로 작성
- 문제 요약은 저작권을 고려하여 1-2줄로 제한
- 복잡도 분석은 시간·공간 복잡도 모두 기재
