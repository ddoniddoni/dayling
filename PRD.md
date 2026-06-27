# PRD.md

# 캐릭터 키우기 WebView 앱 PRD

## 1. 제품 개요

### 프로젝트명

Dayling

### 제품 설명

사용자가 회원가입 후 알을 선택하면 랜덤 캐릭터가 부화하고, 이후 일기 작성과 돌봄 액션을 통해 캐릭터를 성장시키는 아기자기한 3D 캐릭터 육성 앱이다.

앱은 Next.js 기반 웹앱으로 개발하며, 이후 Capacitor WebView를 통해 iOS/Android 앱으로 패키징한다.

---

## 2. 핵심 목표

### MVP 목표

- 회원가입 / 로그인
- 최초 알 선택
- 확률 기반 캐릭터 부화
- 초기 캐릭터 15종
- 캐릭터 등급 시스템
- 캐릭터별 확률표 표시
- 메인 화면 3D 캐릭터 표시
- 터치 드래그 기반 캐릭터 회전
- 일기 작성 기반 경험치 획득
- 3줄 이상 일기 작성 조건
- 레벨업 시스템
- 밥주기 / 물주기 / 쓰다듬기 액션
- 액션별 캐릭터 애니메이션
- 모바일 WebView 대응

---

## 3. 대상 사용자

### 주요 사용자

- 귀여운 캐릭터 키우기 앱을 좋아하는 사용자
- 짧은 일기를 쓰며 캐릭터를 성장시키고 싶은 사용자
- 3D 캐릭터와 상호작용하는 경험을 원하는 사용자

### 사용 환경

- 모바일 브라우저
- iOS WebView
- Android WebView
- 추후 PWA 가능

---

## 4. 핵심 사용자 시나리오

### 시나리오 1: 신규 가입 후 캐릭터 획득

1. 사용자가 회원가입한다.
2. 회원가입 후 로그인 상태가 된다.
3. 사용자는 알 선택 화면으로 이동한다.
4. 사용자는 3개의 알 중 하나를 선택한다.
5. 알이 부화한다.
6. 서버에서 확률에 따라 캐릭터가 결정된다.
7. 사용자는 캐릭터 이름, 등급, 획득 확률을 확인한다.
8. 메인 화면으로 이동한다.

---

### 시나리오 2: 로그인 후 캐릭터 키우기

1. 사용자가 로그인한다.
2. 이미 캐릭터가 있으면 메인 화면으로 이동한다.
3. 중앙에 3D 캐릭터가 크게 표시된다.
4. 사용자가 캐릭터를 드래그하면 캐릭터가 회전한다.
5. 사용자가 밥주기 버튼을 누르면 캐릭터가 먹는 액션을 한다.
6. 사용자가 물주기 버튼을 누르면 캐릭터가 마시는 액션을 한다.
7. 사용자가 쓰다듬기 버튼을 누르면 캐릭터가 기뻐하는 액션을 한다.
8. 사용자가 일기를 작성하면 경험치를 얻는다.
9. 경험치가 충분하면 캐릭터가 레벨업한다.

---

## 5. 캐릭터 시스템

## 5.1 초기 캐릭터 구성

초기 캐릭터는 총 15종이다.

| 등급 | 수량 | 전체 확률 | 캐릭터별 확률 |
|---|---:|---:|---:|
| 일반 | 10종 | 80% | 각 8% |
| 레어 | 3종 | 15% | 각 5% |
| 유니크 | 1종 | 4% | 4% |
| 레전드 | 1종 | 1% | 1% |

---

## 5.2 캐릭터별 확률표

| ID | 이름 | 등급 | 확률 |
|---|---|---|---:|
| common_01 | 몽실이 | COMMON | 8% |
| common_02 | 포리 | COMMON | 8% |
| common_03 | 두두 | COMMON | 8% |
| common_04 | 코코 | COMMON | 8% |
| common_05 | 밀키 | COMMON | 8% |
| common_06 | 뭉치 | COMMON | 8% |
| common_07 | 토리 | COMMON | 8% |
| common_08 | 보리 | COMMON | 8% |
| common_09 | 루루 | COMMON | 8% |
| common_10 | 나나 | COMMON | 8% |
| rare_01 | 반짝토끼 | RARE | 5% |
| rare_02 | 구름냥이 | RARE | 5% |
| rare_03 | 별빛펭귄 | RARE | 5% |
| unique_01 | 달빛여우 | UNIQUE | 4% |
| legendary_01 | 오로라드래곤 | LEGENDARY | 1% |

확률 합계는 반드시 100%여야 한다.

---

## 5.3 캐릭터 등급

### COMMON

- 가장 기본 등급
- 총 10종
- 캐릭터별 8%

### RARE

- 일반보다 희귀한 등급
- 총 3종
- 캐릭터별 5%

### UNIQUE

- 매우 희귀한 등급
- 총 1종
- 캐릭터별 4%

### LEGENDARY

- 가장 희귀한 등급
- 총 1종
- 캐릭터별 1%

---

## 6. 알 선택 / 부화 시스템

## 6.1 알 선택 화면

### 경로

`/onboarding/egg`

### 화면 구성

- 타이틀: “마음에 드는 알을 골라주세요!”
- 알 3개
- 확률표 보기 버튼
- 확률표 모달

### 알 종류

MVP에서는 알 외형만 다르고 확률은 동일하다.

- basic_egg_01
- basic_egg_02
- basic_egg_03

추후 알 종류별 확률 차등 적용 가능.

---

## 6.2 부화 규칙

- 알을 선택하면 즉시 부화가 시작된다.
- 부화 결과는 서버에서 결정한다.
- 클라이언트는 캐릭터 ID를 결정하지 않는다.
- 사용자가 이미 메인 캐릭터를 보유한 경우 추가 부화를 막는다.
- 부화 결과는 `UserCharacter`에 저장한다.
- 부화 이력은 `EggHatch`에 저장한다.

---

## 6.3 부화 결과 화면

### 경로

`/onboarding/result`

### 화면 구성

- 부화된 캐릭터
- 캐릭터 이름
- 캐릭터 등급
- 획득 확률
- “키우러 가기” 버튼

---

## 7. 메인 화면

## 7.1 경로

`/home`

---

## 7.2 레이아웃

메인 화면은 모바일 기준으로 설계한다.

| 영역 | 비율 | 내용 |
|---|---:|---|
| 상단 | 15% | 캐릭터 이름, 레벨, 경험치 바 |
| 중앙 | 70% | 3D 캐릭터 |
| 하단 | 15% | 돌봄 버튼 |

---

## 7.3 상단바

### 표시 정보

- 캐릭터 이름
- 레벨
- 현재 경험치
- 다음 레벨 필요 경험치
- 경험치 진행 바

### 예시

몽실이 Lv. 3  
EXP 45 / 100

---

## 7.4 중앙 3D 캐릭터 영역

### 요구사항

- 캐릭터를 크게 보여준다.
- three.js 기반으로 렌더링한다.
- React Three Fiber를 사용한다.
- 캐릭터는 기본적으로 idle 애니메이션을 반복한다.
- 사용자가 캐릭터를 드래그하면 좌우 회전한다.
- 사용자가 캐릭터를 터치하면 happy 애니메이션을 재생한다.
- GLB/GLTF 모델을 지원한다.
- 모델이 없을 경우 placeholder 3D 캐릭터를 표시한다.
- 모바일 터치 UX를 고려한다.

---

## 7.5 하단 버튼 영역

### 버튼

- 밥주기
- 물주기
- 쓰다듬기
- 일기쓰기

### 버튼별 기능

| 버튼 | 효과 | 애니메이션 |
|---|---|---|
| 밥주기 | hunger 증가 | eat |
| 물주기 | hydration 증가 | drink |
| 쓰다듬기 | affection 증가 | happy |
| 일기쓰기 | 일기 모달 열기 | 없음 |

---

## 8. 경험치 / 레벨 시스템

## 8.1 경험치 획득 조건

경험치는 오직 일기 작성으로만 얻을 수 있다.

### 조건

- 일기는 3줄 이상이어야 한다.
- 빈 줄은 줄 수로 인정하지 않는다.
- 3줄 미만이면 저장 또는 경험치 지급을 막는다.
- 같은 날짜에는 경험치를 1회만 지급한다.
- 같은 날짜에 일기를 추가로 작성할 수는 있지만 경험치는 지급하지 않는다.

---

## 8.2 경험치 지급량

| 조건 | 지급 EXP |
|---|---:|
| 유효한 일기 작성 | 30 |
| 첫 일기 보너스 | 20 |

첫 일기를 3줄 이상 작성한 경우 총 50 EXP를 지급한다.

---

## 8.3 레벨업 공식

다음 레벨 필요 경험치:

```txt
requiredExp = level * 100
```

예시:

| 현재 레벨 | 다음 레벨 필요 EXP |
|---:|---:|
| 1 | 100 |
| 2 | 200 |
| 3 | 300 |
| 4 | 400 |
| 5 | 500 |

---

## 8.4 레벨업 처리

- 경험치가 필요 경험치 이상이면 레벨을 올린다.
- 남은 경험치는 다음 레벨로 이월한다.
- 한 번에 여러 레벨이 오를 수 있게 처리한다.
- 레벨업 시 level-up 애니메이션을 재생한다.

---

## 9. 돌봄 액션 시스템

## 9.1 캐릭터 상태값

| 상태 | 설명 | 범위 | 초기값 |
|---|---|---:|---:|
| hunger | 포만감 | 0~100 | 70 |
| hydration | 수분 | 0~100 | 70 |
| affection | 친밀도 | 0~100 | 50 |
| energy | 에너지 | 0~100 | 80 |

---

## 9.2 액션 효과

| 액션 | 효과 | 애니메이션 | 쿨타임 |
|---|---|---|---:|
| FEED | hunger +15 | eat | 30분 |
| WATER | hydration +15 | drink | 30분 |
| PET | affection +10 | happy | 10분 |
| TOUCH | affection +1 | happy | 10초 |

상태값은 100을 초과할 수 없다.

---

## 9.3 상태 감소

MVP에서는 단순화한다.

하루에 한 번 접속 시 마지막 접속 시간을 기준으로 감소량을 계산한다.

24시간 기준 감소량:

| 상태 | 감소량 |
|---|---:|
| hunger | -10 |
| hydration | -10 |
| affection | -5 |
| energy | -5 |

---

## 10. 3D 캐릭터 요구사항

## 10.1 기술

- three.js
- @react-three/fiber
- @react-three/drei
- GLB / GLTF

---

## 10.2 애니메이션 이름 규칙

GLB 파일 내부 애니메이션 이름은 다음과 같이 통일한다.

- idle
- happy
- eat
- drink
- level-up
- hatch

---

## 10.3 성능 기준

- 모바일 기준 30fps 이상 목표
- 캐릭터 모델 폴리곤 수는 10k~30k 이하 권장
- 텍스처는 1024px 이하 권장
- 그림자는 최소화한다.
- 조명은 AmbientLight + DirectionalLight 중심으로 구성한다.
- 3D Canvas는 필요한 화면에서만 렌더링한다.

---

## 11. 화면 목록

| 화면 | 경로 | 설명 |
|---|---|---|
| 로그인 | `/login` | 이메일/비밀번호 로그인 |
| 회원가입 | `/signup` | 이메일/비밀번호 회원가입 |
| 알 선택 | `/onboarding/egg` | 최초 알 선택 |
| 부화 결과 | `/onboarding/result` | 캐릭터 획득 결과 |
| 메인 | `/home` | 캐릭터 키우기 메인 |
| 랜딩 또는 리다이렉트 | `/` | 로그인 상태에 따라 이동 |

---

## 12. API 요구사항

## 12.1 POST `/api/hatch`

### 목적

알 선택 후 캐릭터를 확률 기반으로 부화시킨다.

### Request

```json
{
  "eggType": "basic_egg_01"
}
```

### Response

```json
{
  "character": {
    "id": "common_01",
    "name": "몽실이",
    "rarity": "COMMON",
    "probability": 8,
    "modelUrl": "/models/characters/common_01.glb",
    "thumbnailUrl": "/images/characters/common_01.png"
  }
}
```

### 처리 규칙

1. 로그인 확인
2. 사용자의 기존 메인 캐릭터 확인
3. 이미 캐릭터가 있으면 에러 반환
4. 활성화된 캐릭터 확률표 조회
5. 확률 합계 100 검증
6. 랜덤 값 생성
7. 확률 구간에 따라 캐릭터 선택
8. UserCharacter 생성
9. EggHatch 생성
10. 결과 반환

---

## 12.2 GET `/api/me/character`

### 목적

현재 로그인 사용자의 메인 캐릭터를 조회한다.

### Response

```json
{
  "character": {
    "id": "user_character_id",
    "catalogId": "common_01",
    "name": "몽실이",
    "rarity": "COMMON",
    "level": 1,
    "exp": 30,
    "requiredExp": 100,
    "hunger": 70,
    "hydration": 70,
    "affection": 50,
    "energy": 80,
    "modelUrl": "/models/characters/common_01.glb",
    "thumbnailUrl": "/images/characters/common_01.png"
  }
}
```

---

## 12.3 POST `/api/diary`

### 목적

일기를 작성하고 조건 충족 시 경험치를 지급한다.

### Request

```json
{
  "content": "오늘은 몽실이에게 밥을 줬다.\n귀엽게 웃었다.\n내일도 같이 놀아야겠다."
}
```

### Response

```json
{
  "diary": {
    "id": "diary_id",
    "lineCount": 3,
    "expGranted": 30
  },
  "character": {
    "level": 1,
    "exp": 60,
    "requiredExp": 100
  },
  "leveledUp": false
}
```

### 처리 규칙

1. 로그인 확인
2. content trim
3. 빈 줄 제외 lineCount 계산
4. lineCount가 3 미만이면 에러 반환
5. 오늘 이미 EXP를 받은 일기가 있는지 확인
6. 경험치 지급 여부 결정
7. 첫 일기 보너스 여부 확인
8. 캐릭터 EXP 증가
9. 레벨업 계산
10. DiaryEntry 저장
11. 결과 반환

---

## 12.4 POST `/api/care`

### 목적

돌봄 액션을 처리한다.

### Request

```json
{
  "actionType": "FEED"
}
```

### Response

```json
{
  "success": true,
  "actionType": "FEED",
  "animation": "eat",
  "character": {
    "hunger": 85,
    "hydration": 70,
    "affection": 50,
    "energy": 80
  }
}
```

### 처리 규칙

1. 로그인 확인
2. 메인 캐릭터 조회
3. actionType 검증
4. 쿨타임 확인
5. 상태값 증가
6. CareActionLog 저장
7. 결과 반환

---

## 13. 데이터베이스 모델

## 13.1 User

사용자 정보.

필드:

- id
- email
- nickname
- createdAt
- updatedAt

관계:

- UserCharacter
- DiaryEntry
- CareActionLog
- EggHatch

---

## 13.2 CharacterCatalog

캐릭터 원본 데이터.

필드:

- id
- name
- rarity
- probability
- modelUrl
- thumbnailUrl
- isActive
- sortOrder
- createdAt
- updatedAt

---

## 13.3 UserCharacter

사용자가 보유한 캐릭터.

필드:

- id
- userId
- characterId
- nickname
- level
- exp
- hunger
- hydration
- affection
- energy
- isMain
- lastCareAt
- createdAt
- updatedAt

---

## 13.4 EggHatch

알 부화 이력.

필드:

- id
- userId
- characterId
- eggType
- rarity
- probability
- randomValue
- createdAt

---

## 13.5 DiaryEntry

일기.

필드:

- id
- userId
- content
- lineCount
- expGranted
- createdAt

---

## 13.6 CareActionLog

돌봄 액션 이력.

필드:

- id
- userId
- characterId
- actionType
- createdAt

---

## 14. 권장 Prisma Schema

```prisma
model User {
  id              String          @id @default(cuid())
  email           String          @unique
  nickname        String
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  characters      UserCharacter[]
  diaryEntries    DiaryEntry[]
  careActionLogs  CareActionLog[]
  eggHatches      EggHatch[]
}

model CharacterCatalog {
  id              String          @id
  name            String
  rarity          Rarity
  probability     Float
  modelUrl        String
  thumbnailUrl    String
  isActive        Boolean         @default(true)
  sortOrder       Int             @default(0)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  userCharacters  UserCharacter[]
  eggHatches      EggHatch[]
}

model UserCharacter {
  id              String           @id @default(cuid())
  userId          String
  characterId     String
  nickname        String?
  level           Int              @default(1)
  exp             Int              @default(0)
  hunger          Int              @default(70)
  hydration       Int              @default(70)
  affection       Int              @default(50)
  energy          Int              @default(80)
  isMain          Boolean          @default(true)
  lastCareAt      DateTime         @default(now())
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  user            User             @relation(fields: [userId], references: [id])
  character       CharacterCatalog @relation(fields: [characterId], references: [id])

  @@index([userId])
  @@index([characterId])
}

model EggHatch {
  id              String           @id @default(cuid())
  userId          String
  characterId     String
  eggType         String
  rarity          Rarity
  probability     Float
  randomValue     Float
  createdAt       DateTime         @default(now())

  user            User             @relation(fields: [userId], references: [id])
  character       CharacterCatalog @relation(fields: [characterId], references: [id])

  @@index([userId])
  @@index([characterId])
}

model DiaryEntry {
  id              String           @id @default(cuid())
  userId          String
  content         String
  lineCount       Int
  expGranted      Int              @default(0)
  createdAt       DateTime         @default(now())

  user            User             @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
}

model CareActionLog {
  id              String           @id @default(cuid())
  userId          String
  characterId     String
  actionType      CareActionType
  createdAt       DateTime         @default(now())

  user            User             @relation(fields: [userId], references: [id])

  @@index([userId, characterId, actionType, createdAt])
}

enum Rarity {
  COMMON
  RARE
  UNIQUE
  LEGENDARY
}

enum CareActionType {
  FEED
  WATER
  PET
  TOUCH
}
```

---

## 15. 권장 폴더 구조

```txt
src/
  app/
    layout.tsx
    page.tsx
    login/
      page.tsx
    signup/
      page.tsx
    onboarding/
      egg/
        page.tsx
      result/
        page.tsx
    home/
      page.tsx
    api/
      hatch/
        route.ts
      diary/
        route.ts
      care/
        route.ts
      me/
        character/
          route.ts

  components/
    auth/
    character/
    diary/
    egg/
    ui/

  features/
    character/
    diary/
    care/
    hatch/

  lib/
    auth.ts
    db.ts
    prisma.ts
    probability.ts
    level.ts
    validators.ts

  store/

  styles/

prisma/
  schema.prisma
  seed.ts

public/
  models/
    characters/
  images/
    characters/
```

---

## 16. UI 디자인 방향

### 톤앤매너

- 아기자기함
- 귀여움
- 부드러움
- 따뜻함
- 파스텔
- 둥근 형태
- 모바일 친화적

### 색상 예시

- Background: #fff8f0
- Primary: #ff9fb2
- Secondary: #ffd6a5
- Accent: #bde0fe
- Success: #caffbf
- Text: #3a2e2e

### 문구 예시

- “마음에 드는 알을 골라주세요!”
- “알이 꿈틀꿈틀 움직이고 있어요!”
- “새로운 친구가 태어났어요!”
- “오늘의 일기를 쓰면 경험치가 올라가요.”
- “3줄 이상 작성하면 캐릭터가 성장해요!”
- “몽실이가 밥을 맛있게 먹었어요.”
- “레벨업! 더 가까워졌어요.”

---

## 17. MVP 완료 기준

MVP는 다음 조건을 모두 만족해야 완료로 본다.

- 회원가입 가능
- 로그인 가능
- 로그인 상태 유지 가능
- 캐릭터가 없는 사용자는 알 선택으로 이동
- 캐릭터가 있는 사용자는 메인으로 이동
- 알 선택 시 서버에서 캐릭터 부화
- 확률표 표시
- 부화 결과 저장
- 중복 최초 부화 방지
- 메인 화면에서 캐릭터 표시
- 3D placeholder 또는 GLB 캐릭터 표시
- 캐릭터 드래그 회전 가능
- 밥주기 액션 가능
- 물주기 액션 가능
- 쓰다듬기 액션 가능
- 일기 작성 가능
- 3줄 이상 검증 가능
- 일기 작성 시 경험치 증가
- 하루 1회 경험치 제한
- 레벨업 가능
- 모바일 화면에서 자연스럽게 사용 가능

---

## 18. 추후 확장 기능

MVP 이후 추가 가능 기능:

- 캐릭터 추가
- 캐릭터 진화
- 캐릭터 스킨
- 알 종류별 확률 차등
- 아이템
- 상점
- 출석 보상
- 광고 보상
- 친구 방문
- 랭킹
- 푸시 알림
- 도감 시스템
- 캐릭터 감정 시스템
- 방 꾸미기
