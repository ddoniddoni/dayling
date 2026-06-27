# TASKS.md

# 캐릭터 키우기 앱 개발 작업 목록

## 0. 개발 원칙

- MVP를 먼저 완성한다.
- 실제 3D 모델이 없어도 placeholder 3D 캐릭터로 진행한다.
- 확률 계산은 반드시 서버에서 한다.
- 일기 경험치 검증은 반드시 서버에서 한다.
- UI는 모바일 WebView 기준으로 만든다.
- 기능별로 작은 단위로 커밋 가능한 구조를 유지한다.

---

## Phase 1. 프로젝트 초기 세팅

### 1-1. Next.js 프로젝트 생성

- [x] Next.js App Router 기반 프로젝트 생성
- [x] TypeScript 설정
- [x] `src/` 디렉토리 구조 사용
- [x] ESLint 설정
- [x] Prettier 설정
- [x] 기본 `README.md` 작성

### 1-2. UI 환경 설정

- [x] Tailwind CSS 설정
- [x] 전역 스타일 파일 구성
- [x] 기본 컬러 토큰 추가
- [x] 모바일 safe-area CSS 추가
- [x] 공통 Button 컴포넌트 생성
- [x] 공통 Card 컴포넌트 생성
- [x] 공통 Modal 컴포넌트 생성
- [x] 공통 Toast 또는 알림 UI 구성

### 1-3. 패키지 설치

- [x] Prisma 설치
- [x] PostgreSQL 드라이버 설정
- [x] Zod 설치
- [x] React Hook Form 설치
- [x] Zustand 설치
- [x] TanStack Query 설치
- [x] three 설치
- [x] @react-three/fiber 설치
- [x] @react-three/drei 설치

---

## Phase 2. 데이터베이스 구성

### 2-1. Prisma 설정

- [x] `prisma/schema.prisma` 생성
- [x] PostgreSQL datasource 설정
- [x] Prisma Client generator 설정
- [x] `.env`에 `DATABASE_URL` 추가
- [x] `src/lib/prisma.ts` 생성

### 2-2. 모델 생성

- [x] User 모델 생성
- [x] CharacterCatalog 모델 생성
- [x] UserCharacter 모델 생성
- [x] EggHatch 모델 생성
- [x] DiaryEntry 모델 생성
- [x] CareActionLog 모델 생성
- [x] Rarity enum 생성
- [x] CareActionType enum 생성

### 2-3. 마이그레이션

- [x] Prisma migration 생성
- [x] DB migration 실행
- [x] Prisma Client 생성 확인

### 2-4. Seed 데이터

- [x] `prisma/seed.ts` 생성
- [x] 초기 캐릭터 15종 데이터 작성
- [x] 일반 10종, 각 8%
- [x] 레어 3종, 각 5%
- [x] 유니크 1종, 4%
- [x] 레전드 1종, 1%
- [x] 확률 합계가 100인지 검증하는 로직 작성
- [x] seed 실행 스크립트 추가
- [x] seed 정상 실행 확인

---

## Phase 3. 인증 구현

### 3-1. 인증 방식 결정

- [x] MVP 인증 방식 선택
- [x] 이메일/비밀번호 회원가입 구현
- [x] 이메일/비밀번호 로그인 구현
- [x] 로그아웃 구현
- [x] 현재 로그인 사용자 조회 유틸 구현

### 3-2. 회원가입 화면

- [x] `/signup` 페이지 생성
- [x] 닉네임 입력 필드 생성
- [x] 이메일 입력 필드 생성
- [x] 비밀번호 입력 필드 생성
- [x] 비밀번호 확인 입력 필드 생성
- [x] 입력값 검증
- [x] 회원가입 성공 시 알 선택 화면으로 이동

### 3-3. 로그인 화면

- [x] `/login` 페이지 생성
- [x] 이메일 입력 필드 생성
- [x] 비밀번호 입력 필드 생성
- [x] 로그인 버튼 생성
- [x] 회원가입 이동 링크 생성
- [x] 로그인 실패 에러 표시
- [x] 로그인 성공 시 캐릭터 보유 여부에 따라 이동

### 3-4. 라우팅 보호

- [x] 로그인하지 않은 사용자는 `/login`으로 이동
- [x] 캐릭터 없는 사용자는 `/onboarding/egg`로 이동
- [x] 캐릭터 있는 사용자는 `/home`으로 이동
- [x] `/` 페이지에서 상태에 따라 자동 리다이렉트

---

## Phase 4. 캐릭터 도메인 로직 구현

### 4-1. 타입 정의

- [x] `src/features/character/character.types.ts` 생성
- [x] Rarity 타입 정의
- [x] CharacterCatalog 타입 정의
- [x] UserCharacter 타입 정의
- [x] CharacterStatus 타입 정의
- [x] CharacterAnimation 타입 정의

### 4-2. 레벨 유틸

- [x] `src/lib/level.ts` 생성
- [x] `getRequiredExp(level)` 함수 작성
- [x] `applyExp(character, gainedExp)` 함수 작성
- [x] 다중 레벨업 처리
- [x] 테스트 가능한 순수 함수로 작성

### 4-3. 확률 유틸

- [x] `src/lib/probability.ts` 생성
- [x] 확률 합계 검증 함수 작성
- [x] 랜덤 캐릭터 선택 함수 작성
- [x] 누적 확률 방식 구현
- [x] 확률 합계가 100이 아닐 경우 에러 처리

### 4-4. 상태값 유틸

- [x] `clampStatus(value)` 함수 작성
- [x] hunger/hydration/affection/energy 0~100 제한
- [x] 액션별 상태 증가량 정의
- [x] 액션별 애니메이션 매핑 정의
- [x] 액션별 쿨타임 정의

---

## Phase 5. 알 선택 / 부화 구현

### 5-1. 알 선택 페이지

- [x] `/onboarding/egg` 페이지 생성
- [x] `EggSelectView` 컴포넌트 생성
- [x] `EggCard` 컴포넌트 생성
- [x] 알 3개 표시
- [x] 확률표 보기 버튼 생성
- [x] 확률표 모달 생성
- [x] 알 선택 중복 클릭 방지

### 5-2. 확률표 UI

- [ ] 등급별 확률표 표시
- [ ] 캐릭터별 확률표 표시
- [ ] “확률은 서버에서 계산됩니다” 안내 문구 추가
- [ ] 모바일에서 읽기 쉬운 테이블 UI 구성

### 5-3. Hatch API

- [x] `POST /api/hatch` 생성
- [x] 로그인 확인
- [x] eggType request body 검증
- [x] 사용자의 기존 메인 캐릭터 확인
- [x] 중복 부화 방지
- [x] 활성화된 캐릭터 목록 조회
- [x] 확률 합계 검증
- [x] 랜덤 캐릭터 선택
- [x] UserCharacter 생성
- [x] EggHatch 생성
- [x] 결과 반환
- [x] 에러 코드 정리

### 5-4. 부화 애니메이션

- [ ] `HatchAnimation` 컴포넌트 생성
- [ ] 알 흔들림 애니메이션 구현
- [ ] 부화 중 로딩 상태 표시
- [ ] 부화 결과로 자연스럽게 전환

### 5-5. 부화 결과 화면

- [x] `/onboarding/result` 페이지 생성
- [x] 부화된 캐릭터 정보 표시
- [x] 이름 표시
- [x] 등급 표시
- [x] 확률 표시
- [x] “키우러 가기” 버튼 생성
- [x] 결과 정보가 없으면 `/home` 또는 `/onboarding/egg`로 처리

---

## Phase 6. 메인 화면 구현

### 6-1. 홈 페이지

- [ ] `/home` 페이지 생성
- [ ] 로그인 보호 처리
- [ ] 메인 캐릭터 없으면 알 선택으로 이동
- [ ] 캐릭터 정보 API 연동
- [ ] 모바일 화면 기준 레이아웃 구성

### 6-2. 캐릭터 정보 API

- [ ] `GET /api/me/character` 생성
- [ ] 로그인 확인
- [ ] 메인 캐릭터 조회
- [ ] CharacterCatalog 포함 조회
- [ ] requiredExp 계산
- [ ] 상태값 반환
- [ ] 모델 URL 반환
- [ ] 썸네일 URL 반환

### 6-3. 상단 상태바

- [ ] `CharacterStatusBar` 컴포넌트 생성
- [ ] 캐릭터 이름 표시
- [ ] 레벨 표시
- [ ] EXP 표시
- [ ] EXP 진행 바 표시
- [ ] 파스텔 스타일 적용

### 6-4. 하단 돌봄 버튼

- [ ] `CareActionButtons` 컴포넌트 생성
- [ ] 밥주기 버튼
- [ ] 물주기 버튼
- [ ] 쓰다듬기 버튼
- [ ] 일기쓰기 버튼
- [ ] 버튼 클릭 상태 처리
- [ ] 성공/실패 토스트 처리

---

## Phase 7. 3D 캐릭터 구현

### 7-1. 3D 컴포넌트 구조

- [ ] `CharacterCanvas` 컴포넌트 생성
- [ ] `CharacterModel` 컴포넌트 생성
- [ ] Canvas 크기를 중앙 70% 영역에 맞춤
- [ ] Suspense fallback 추가
- [ ] 모바일 터치 이벤트 확인

### 7-2. Placeholder 캐릭터

- [ ] GLB 모델이 없을 때 사용할 기본 3D 캐릭터 생성
- [ ] 둥근 몸통
- [ ] 귀여운 눈
- [ ] 간단한 idle 애니메이션
- [ ] 귀여운 색감 적용
- [ ] 임시 모델이어도 메인 기능 테스트 가능하게 구현

### 7-3. GLB 모델 로딩

- [ ] `useGLTF`로 모델 로딩
- [ ] modelUrl props 사용
- [ ] 모델 scale 조정
- [ ] 모델 position 조정
- [ ] 모델 rotation 조정
- [ ] 로딩 실패 시 placeholder 표시

### 7-4. 캐릭터 회전

- [ ] 드래그로 캐릭터 좌우 회전
- [ ] 모바일 touch drag 지원
- [ ] 너무 빠른 회전 방지
- [ ] 터치와 드래그 구분
- [ ] 기본 idle 상태 유지

### 7-5. 애니메이션

- [ ] idle 애니메이션 기본 재생
- [ ] happy 애니메이션 재생
- [ ] eat 애니메이션 재생
- [ ] drink 애니메이션 재생
- [ ] level-up 애니메이션 재생
- [ ] 액션 애니메이션 종료 후 idle 복귀
- [ ] GLB 애니메이션이 없으면 placeholder 애니메이션 사용

---

## Phase 8. 돌봄 액션 구현

### 8-1. Care API

- [ ] `POST /api/care` 생성
- [ ] 로그인 확인
- [ ] request body 검증
- [ ] actionType 검증
- [ ] 메인 캐릭터 조회
- [ ] 최근 액션 로그 조회
- [ ] 쿨타임 검증
- [ ] 상태값 증가
- [ ] 상태값 0~100 제한
- [ ] CareActionLog 생성
- [ ] 업데이트된 캐릭터 반환

### 8-2. Feed 액션

- [ ] FEED action 구현
- [ ] hunger +15
- [ ] 30분 쿨타임
- [ ] eat 애니메이션 반환
- [ ] 성공 토스트 표시

### 8-3. Water 액션

- [ ] WATER action 구현
- [ ] hydration +15
- [ ] 30분 쿨타임
- [ ] drink 애니메이션 반환
- [ ] 성공 토스트 표시

### 8-4. Pet 액션

- [ ] PET action 구현
- [ ] affection +10
- [ ] 10분 쿨타임
- [ ] happy 애니메이션 반환
- [ ] 성공 토스트 표시

### 8-5. Touch 액션

- [ ] TOUCH action 구현
- [ ] affection +1
- [ ] 10초 쿨타임
- [ ] happy 애니메이션 반환
- [ ] 캐릭터 터치 시 호출
- [ ] 실패해도 UX가 불편하지 않게 처리

---

## Phase 9. 일기 / 경험치 구현

### 9-1. 일기 UI

- [ ] `DiaryModal` 컴포넌트 생성
- [ ] `DiaryForm` 컴포넌트 생성
- [ ] textarea 생성
- [ ] 현재 줄 수 표시
- [ ] 3줄 이상 조건 표시
- [ ] 3줄 미만이면 제출 버튼 비활성화
- [ ] 작성 중 안내 문구 표시

### 9-2. 줄 수 계산

- [ ] 빈 줄 제외 lineCount 계산 함수 작성
- [ ] 클라이언트에서 실시간 줄 수 표시
- [ ] 서버에서도 동일 기준 검증
- [ ] 공백만 있는 줄은 제외

### 9-3. Diary API

- [ ] `POST /api/diary` 생성
- [ ] 로그인 확인
- [ ] content 검증
- [ ] lineCount 검증
- [ ] 메인 캐릭터 조회
- [ ] 오늘 EXP 지급 여부 확인
- [ ] 첫 일기 여부 확인
- [ ] EXP 지급량 계산
- [ ] 레벨업 처리
- [ ] DiaryEntry 생성
- [ ] 캐릭터 업데이트
- [ ] 결과 반환

### 9-4. 경험치 UI 반영

- [ ] 일기 작성 성공 시 EXP 업데이트
- [ ] 레벨업 시 레벨 업데이트
- [ ] EXP bar 애니메이션
- [ ] 레벨업 모달 또는 토스트 표시
- [ ] level-up 캐릭터 애니메이션 재생

---

## Phase 10. 모바일 WebView 대응

### 10-1. 모바일 레이아웃

- [ ] 360px 너비에서도 UI 확인
- [ ] 390px 너비에서도 UI 확인
- [ ] 430px 너비에서도 UI 확인
- [ ] 하단 버튼 터치 영역 확인
- [ ] 화면 높이가 작은 기기 대응
- [ ] safe-area inset 적용

### 10-2. 터치 UX

- [ ] 캐릭터 드래그 부드럽게 동작
- [ ] 버튼 연속 클릭 방지
- [ ] 터치 피드백 추가
- [ ] 스크롤과 3D 드래그 충돌 방지
- [ ] 모바일 브라우저 확대/축소 이슈 확인

### 10-3. 성능

- [ ] 3D Canvas가 필요할 때만 렌더링되는지 확인
- [ ] 불필요한 리렌더링 제거
- [ ] 모델 로딩 fallback 확인
- [ ] 모바일에서 30fps 이상 목표
- [ ] 이미지와 모델 경량화 고려

---

## Phase 11. Capacitor 준비

### 11-1. Capacitor 설치

- [ ] Capacitor 설치
- [ ] iOS 플랫폼 추가
- [ ] Android 플랫폼 추가
- [ ] WebView 설정
- [ ] 앱 이름 설정
- [ ] 앱 아이콘 및 스플래시 추후 준비

### 11-2. WebView 확인

- [ ] 원격 Next.js URL 로드 방식 검토
- [ ] 로컬 빌드 로드 방식 검토
- [ ] iOS safe-area 확인
- [ ] Android 뒤로가기 처리 검토
- [ ] 로그인 세션 유지 확인

---

## Phase 12. QA 체크리스트

### 인증 QA

- [ ] 회원가입이 된다.
- [ ] 로그인된다.
- [ ] 로그아웃된다.
- [ ] 로그인하지 않고 `/home` 접근 시 막힌다.
- [ ] 로그인 후 캐릭터가 없으면 알 선택으로 이동한다.
- [ ] 로그인 후 캐릭터가 있으면 메인으로 이동한다.

### 부화 QA

- [ ] 알 3개가 표시된다.
- [ ] 확률표가 표시된다.
- [ ] 알 선택 시 부화 API가 호출된다.
- [ ] 캐릭터가 랜덤으로 지급된다.
- [ ] 지급 결과가 DB에 저장된다.
- [ ] 부화 이력이 DB에 저장된다.
- [ ] 같은 유저가 최초 부화를 다시 할 수 없다.
- [ ] 확률 합계가 100이 아니면 에러 처리된다.

### 메인 QA

- [ ] 캐릭터 이름이 표시된다.
- [ ] 레벨이 표시된다.
- [ ] EXP bar가 표시된다.
- [ ] 중앙에 3D 캐릭터가 표시된다.
- [ ] 캐릭터를 드래그하면 회전한다.
- [ ] 캐릭터를 터치하면 반응한다.
- [ ] 하단 버튼이 정상 표시된다.

### 돌봄 QA

- [ ] 밥주기가 동작한다.
- [ ] 밥주기 시 hunger가 증가한다.
- [ ] 밥주기 시 eat 애니메이션이 재생된다.
- [ ] 물주기가 동작한다.
- [ ] 물주기 시 hydration이 증가한다.
- [ ] 물주기 시 drink 애니메이션이 재생된다.
- [ ] 쓰다듬기가 동작한다.
- [ ] 쓰다듬기 시 affection이 증가한다.
- [ ] 쓰다듬기 시 happy 애니메이션이 재생된다.
- [ ] 쿨타임 중에는 중복 실행이 막힌다.

### 일기 QA

- [ ] 일기 모달이 열린다.
- [ ] 3줄 미만이면 제출할 수 없다.
- [ ] 빈 줄은 줄 수에서 제외된다.
- [ ] 3줄 이상이면 저장된다.
- [ ] 첫 일기 작성 시 50 EXP가 지급된다.
- [ ] 일반 유효 일기 작성 시 30 EXP가 지급된다.
- [ ] 같은 날짜에는 EXP가 1회만 지급된다.
- [ ] 경험치가 충분하면 레벨업한다.
- [ ] 레벨업 시 애니메이션 또는 토스트가 표시된다.

### 모바일 QA

- [ ] iPhone 크기에서 레이아웃이 깨지지 않는다.
- [ ] Android 크기에서 레이아웃이 깨지지 않는다.
- [ ] safe-area가 적용된다.
- [ ] 하단 버튼이 잘 눌린다.
- [ ] 3D 캐릭터 드래그가 자연스럽다.
- [ ] WebView에서 스크롤 문제가 없다.

---

## Phase 13. MVP 완료 후 정리

- [ ] 사용하지 않는 코드 제거
- [ ] 타입 정리
- [ ] 공통 유틸 정리
- [ ] 에러 메시지 정리
- [ ] README 업데이트
- [ ] 실행 방법 문서화
- [ ] 환경변수 예시 파일 작성
- [ ] 추후 기능 TODO 정리

---

## Codex 시작 명령 예시

Codex에게 처음 요청할 때는 아래처럼 요청한다.

```txt
Read AGENTS.md, PRD.md, and TASKS.md first.

Then implement the MVP step by step.

Start with project setup, database schema, seed data, authentication, hatch flow, main screen, diary EXP system, care actions, and 3D placeholder character.

Do not add advanced features until the MVP checklist in TASKS.md is completed.
```
