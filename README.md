# Peace Watcher web-front-end 
Peace Watcher의 CCTV 관리자 웹페이지인 web-front-end 레포지토리입니다.<br><br>

## 🪧 About Source Code

### 👩‍💻 Prerequisites
Peace-Watcher CCTV 관리자 웹의 프론트 프레임워크는 `Next.js`로, node version 18 이상(18.17.0 추천)이 설치되어있어야 합니다. 
코드를 실행하기 전, 터미널(Mac or Linux) 또는 명령 프롬프트(윈도우)에 하단의 명령어를 통해 필요한 node 버전이 잘 설치되어 있는지 확인해주세요. 
```
node --version
(18 이상의 버전이 나오면 문제 없는 것)
```

### 👩‍💻Tech Stack
- Next.js 
- TypeScript
- Styled-Components
- next-video 

### 🔧 How to Set Up

이 레포지토리는 하단 명령어로 Clone 할 수 있습니다. 
```
git clone https://github.com/peace-watcher/web-front-end.git
```

Clone이 완료된 후에는 다음 명령어를 통해 프로젝트가 위치한 폴더로 이동합니다. 
```
cd web-front-end
```

Peace-Watcher PWA에서는 node 패키지 관리자로 yarn을 사용하고 있으며, node.js 설치 시 함께 자동으로 설치가 되는 npm으로 yarn을 설치할 수 있습니다. 
```
npm install -g yarn
```
이후 yarn이 제대로 설치 되었는지 확인하기 위해 버전 확인을 진행해주세요. 
```
yarn -v
(버전 정보가 나오면 문제 없는 것)
```

이제 하단 명령어로 종속성(Dependency)을 설치해주어야 합니다. 
```
yarn install
```

Peace-watcher에서는 `next-video` 라이브러리를 통해 웹캠에서 들어오는 영상을 대상으로 흉기 난동을 탐지할 수 있게 합니다. 
이를 위해 env 파일 설정이 필요합니다. 
루트 디렉토리(web-front-end)에 `env.local` 파일을 생성하고 해당 내용을 입력해주세요. 
(이 토큰은 일정 기간 이후 만료될 가능성이 있습니다.)
```
MUX_TOKEN_ID=["ba5dcf0c-7bd6-4463-993b-d876bcb50049"]
MUX_TOKEN_SECRET=["Fla5+HPITMYVIOWd9+bNUhhcqjdk3ks6Y84BA0bQYRsU4dZ70SA4GBt2JDLfwSoc67eUT6l1Usn"]
```

### 🚀 How to Run
이제 필요한 모든 절차가 마무리되었습니다. 
하단 명령어를 통해 로컬에서 프로젝트를 실행할 수 있습니다. 
```
yarn dev
```

## 📚 Open Source Projects Used

### 1. Next.js
  - React.js를 기반으로하는 웹 개발 프레임워크
  - React.js 애플리케이션에서 서버 사이드 렌더링을 쉽게 구현할 수 있게 도와주는 라이브러리
  - SSR(Server Side Rendering)을 통해 초기 페이지 로드 속도를 개선하고 검색 엔진 최적화(SEO)를 향상시킬 수 있습니다.
