---
name: finish
description: 현재 작업을 마무리합니다. 변경사항을 분석하여 문서를 업데이트하고 커밋합니다.
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# 작업 마무리 (기능 구현 → 문서 → 커밋)

## 1단계: 변경사항 분석

```bash
git status
git diff --stat
git diff
```

변경된 파일들을 분석하여:
- 어떤 기능이 추가/수정되었는지 파악
- 관련 문서가 있는지 확인

## 2단계: 문서 업데이트

변경사항이 다음에 해당하면 문서 업데이트:

| 변경 유형 | 문서 위치 |
|----------|----------|
| 새 기능 추가 | `docs/design/YYYYMMDD-*.md` |
| 컴포넌트 구조 변경 | `claude.md` 또는 관련 design 문서 |
| 페이지 추가/수정 | 해당 설계 문서 |
| 설정 변경 | `claude.md` 기술 스택 섹션 |

### 문서 작성 규칙

- 설계 문서: `docs/design/YYYYMMDD-<topic>.md`
- 작업 일지: `docs/logs/YYYYMMDD-<title>.md`
- 기존 문서 수정 시 수정일 명시

## 3단계: 커밋

### 커밋 규칙 (gemini.md 기준)

**Conventional Commits 형식:**
```
<타입>: <제목> (<스코프>)

<본문>

<꼬리말>
```

### 타입

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서만 변경 |
| `style` | 코드 의미에 영향 없는 변경 |
| `refactor` | 리팩토링 |
| `perf` | 성능 개선 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정 등 보조 작업 |

### 제목 규칙

- 명령형 현재 시제 사용
- 첫 글자 소문자
- 끝에 마침표 없음
- 한글로 작성 (파일명, 고유명사 제외)

### 커밋 분리 원칙

- 기능별로 잘게 쪼개서 커밋
- 관련 파일끼리 묶어서 커밋
- 문서는 코드와 함께 또는 별도 커밋

### 커밋 명령 형식

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<type>: <한글 설명>

<필요시 상세 내용>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

## 4단계: 결과 보고

```bash
# 생성된 커밋 확인
git log --oneline -n <count>
```

보고 내용:
- 생성된 커밋 목록
- 업데이트된 문서 목록
- 남은 작업 여부
