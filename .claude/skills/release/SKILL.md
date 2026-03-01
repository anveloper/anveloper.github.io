---
name: release
description: develop → main PR을 생성합니다. 미커밋 변경사항 정리, 문서 동기화, 원격 푸시, PR 생성까지 한 번에 수행합니다.
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# develop → main 릴리스 PR 생성

## 1단계: 미커밋 변경사항 정리 (finish)

```bash
git status
git diff --stat
git diff
```

미커밋 변경사항이 있으면:

- 변경된 파일을 분석하여 기능별로 분류
- 기능별로 묶어서 커밋 (Conventional Commits)
- 변경사항이 없으면 이 단계 건너뜀

### 커밋 규칙

- 형식: `<타입>: <한글 설명> (<스코프>)`
- 타입: feat, fix, docs, style, refactor, perf, test, chore
- 첫 글자 소문자, 마침표 없음
- 기능별로 잘게 쪼개서 커밋

## 2단계: 원격 브랜치 동기화

로컬 브랜치가 원격과 다를 수 있으므로, 비교 전 반드시 fetch:

```bash
git fetch origin main develop
```

**중요**: 이후 모든 비교는 `origin/main`을 기준으로 합니다 (로컬 `main` 사용 금지).

## 3단계: 문서 동기화 (sync-docs)

origin/main과 develop 사이의 모든 커밋을 대상으로 문서 동기화:

```bash
# origin/main 이후 develop 커밋 조회
git log origin/main..develop --oneline
git log origin/main..develop --stat
```

### 문서 필요 여부 판단

| 변경 유형               | 문서 필요 | 대상 문서                       |
| ----------------------- | --------- | ------------------------------- |
| 새 페이지/컴포넌트 추가 | O         | `claude.md` 또는 `docs/design/` |
| 컴포넌트 구조 변경      | O         | `claude.md` 디렉토리 구조       |
| 새 훅/유틸 추가         | O         | `claude.md` 디렉토리 구조       |
| 설정/패키지 변경        | O         | `claude.md` 기술 스택           |
| 버그 수정 / 스타일 변경 | X         | -                               |

### 기존 문서 확인

```bash
ls -la docs/design/
ls -la docs/logs/
```

- 이미 문서화된 내용은 건너뜀
- 누락된 내용만 추가/수정
- 작업 일지: `docs/logs/YYYYMMDD-<title>.md`

### 문서 변경사항 커밋

```bash
git add <변경된 문서 파일들>
git commit -m "docs: <한글 설명>"
```

## 4단계: 원격 develop 푸시

```bash
# 원격과 동기화 상태 확인
git status
git log origin/develop..develop --oneline

# 푸시할 커밋이 있으면 푸시
git push -u origin develop
```

## 5단계: PR 생성

### 변경 범위 분석

```bash
# origin/main과 develop 사이의 커밋 (반드시 origin/main 사용)
git log origin/main..develop --oneline

# 변경 파일 통계
git diff origin/main...develop --stat
```

모든 커밋을 분석하여 PR 본문 작성에 활용합니다.

### PR 제목 규칙

- 형식: `develop → main: <설명>`
- 한글로 작성
- 변경 범위를 명확히 표현
- 예: `develop → main: 헤더 개선, 포스트 추가 및 반응형 레이아웃`

### PR 본문 템플릿

`.github/PULL_REQUEST_TEMPLATE.md`을 따릅니다:

```markdown
## Summary

- 변경 사항 1-3줄 요약 (전체 커밋 기반)

## Changes

### 기능

- feat 커밋 기반 정리

### 스타일

- style 커밋 기반 정리

### 기타

- docs, refactor, chore 등 기타 커밋 정리

## Test plan

- [ ] `pnpm build` 성공
- [ ] `pnpm lint` 성공
- [ ] 개발 서버 정상 동작 확인
- [ ] 주요 페이지 렌더링 확인

## Screenshots

## Notes
```

### PR 생성 명령

```bash
gh pr create --base main --head develop \
  --title "develop → main: <설명>" \
  --body "$(cat <<'EOF'
<본문>
EOF
)"
```

**주의사항:**

- Claude 협력 문구 제외
- HEREDOC으로 본문 전달

## 6단계: 결과 보고

- 정리된 커밋 목록 (1단계)
- 동기화된 문서 목록 (3단계)
- 푸시 결과 (4단계)
- PR URL (5단계)
