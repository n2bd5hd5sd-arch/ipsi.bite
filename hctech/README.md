# (주)에이치씨테크 — HC TECH Inc. 웹사이트

반도체·디스플레이·산업 플랜트용 초고순도(UHP) 피팅·밸브, 계장용 피팅·밸브를 공급하는
(주)에이치씨테크의 기업 웹사이트입니다. **정적 사이트**(HTML/CSS/JS, 빌드 없음)로,
GitHub Pages에서 바로 서비스됩니다.

- 배포: GitHub Pages의 `/hctech/` 경로 (정적 파일, 별도 빌드 없음)
- 언어: 한국어 / English (내비게이션의 `EN·KR` 버튼, 선택은 브라우저에 저장)

## 구조

```
index.html                 단일 페이지 (Hero · About · Products · Capabilities · Location · Contact)
assets/css/style.css       디자인 시스템 (다크 오브시디언 / 프리시전 엔지니어링 톤)
assets/js/main.js          KR·EN 전환, 스크롤 리빌, 제품 필터, 복사·메일 문의, 토스트
assets/img/favicon.svg     파비콘
assets/img/og.png          공유 미리보기 이미지 (1200×630)
robots.txt, sitemap.xml    검색엔진용
```

## 회사 정보 (사이트에 표기된 값)

| 항목 | 값 |
| --- | --- |
| 상호 | (주)에이치씨테크 / HC TECH Inc. |
| 대표 | 고천수 |
| 사업자등록번호 | 129-81-25029 |
| 설립 | 1998.05.08 |
| 주소 | 경기도 화성시 동탄구 동탄산단6길 77 (방교동) 18487 |
| 전화 / 팩스 | 031-378-7507 / 031-378-7505 |
| 이메일 | smkoh@hctech-inc.co.kr |
| 지도 | https://naver.me/5bXc1K2D |
| 파트너십 | BMT(비엠티) SUPERLOK 서울·경기 공식 영업·서비스 파트너 |

## 문의 양식에 대해

서버가 없는 정적 사이트이므로 입력값을 어디에도 저장·전송하지 않습니다.
‘메일로 문의 보내기’는 방문자의 메일 앱에 정리된 내용(`mailto:`)을 열어 주고,
‘내용 복사’는 같은 내용을 클립보드에 담습니다.

## 수정 방법

`index.html`의 각 섹션을 직접 고치면 됩니다. 다국어 문구는 요소의
`data-kr` / `data-en` 속성 두 곳을 함께 바꿔 주세요.

```bash
python3 -m http.server 8000   # 로컬 미리보기 (http://localhost:8000)
```
