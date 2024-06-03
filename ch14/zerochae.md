# 보안 HTTP

- HTTPS는 클라이언트와 서버 간의 통신을 암호화하여 중간에서 데이터를 가로채는 것을 방지
- SSL 핸드셰이크는 HTTPS 연결을 설정하는 초기 단계로, 클라이언트와 서버가 서로를 인증하고 암호화 매개변수를 설정하는 과정.

## 핸드셰이크 과정

1. 프로토콜 버전 번호 교환: 클라이언트와 서버가 사용할 SSL/TLS 프로토콜 버전을 교환
2. 암호화 방식 협상: 클라이언트와 서버가 사용할 암호화 알고리즘을 선택
3. 서버 인증서 교환: 서버는 자신의 인증서를 클라이언트에게 보내어 신뢰성을 증명
4. 세션 키 생성: 클라이언트와 서버는 대칭 키를 생성하여 이후 통신을 암호화

## SSL 인증서 생성

### CLI

```sh
openssl req -nodes -new -x509 -keyout ./ch14/ssl.key -out ./ch14/ssl.cert
```

1. req:  인증서 서명 요청(CSR, Certificate Signing Request)을 생성
2. -nodes: "No DES"의 약자로, 개인 키를 암호화하지 않음을 의미(암호화하면 비밀번호 입력해야함)
3. -new: 새 인증서 서명 요청(CSR)을 생성
4. -x509: CSR 대신 자체 서명된 인증서를 생성
5. -keyout ssl.key: ssl.key 파일에 저장
6. -out ssl.cert: 생성된 인증서를 ssl.cert 파일에 저장

### 추가 입력 정보

- 국가 이름 (2자리 코드)
- 주 또는 도
- 도시
- 조직 이름
- 조직 단위 이름
- 일반 이름 (서버의 도메인 이름)
- 이메일 주소

```js
const https = require("https");
const fs = require("fs");

// SSL 인증서 로드
const options = {
  key: fs.readFileSync("./ch14/ssl.key"),
  cert: fs.readFileSync("./ch14/ssl.cert"),
};

// HTTPS 서버 생성
https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello, HTTPS!\n");
  })
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  });
```
