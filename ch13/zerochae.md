# 다이제스트 인증

## 난스

### 개념

- number used once
- 단 한 번만 사용되는 임의의 숫자
- 보안 프로토콜에서 재전송 공격 방지

### 생성 및 사용

- 서버는 클라이언트에게 인증 요청 시 난스 전송
- 클라이언트는 이 난스를 사용하여 해시 값을 생성, 이를 서버에 전송하여 인증을 수행

### 난스 재사용 전략

- 사전 인가: 클라이언트가 미리 난스를 알고 있어 서버가 다시 요청하기 전에 인증을 완료할 수 있도록 함
- 제한된 난스 재사용: 일정 시간 또는 횟수 내에서 동일한 난스를 재사용
- 동기화된 난스 생성: 클라이언트와 서버가 시간에 따라 동기화된 난스를 생성

### 보안 고려사항

- 난스의 만료 시간 관리
- 재전송 공격 방지를 위한 고유 난스 사용
- 난스의 저장 및 관리 방식

```js
// exam.js

const crypto = require("crypto");

// 난스 생성 함수
function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

// 해시 생성 함수
function createHash(username, password, realm, nonce, method, uri) {
  const ha1 = crypto.createHash("md5").update(`${username}:${realm}:${password}`).digest("hex");
  const ha2 = crypto.createHash("md5").update(`${method}:${uri}`).digest("hex");
  return crypto.createHash("md5").update(`${ha1}:${nonce}:${ha2}`).digest("hex");
}

// 예제 데이터
const username = "user";
const password = "pass";
const realm = "example.com";
const nonce = generateNonce();
const method = "GET";
const uri = "/protected/resource";

// 해시 값 생성
const responseHash = createHash(username, password, realm, nonce, method, uri);

console.log(`Nonce: ${nonce}`);
console.log(`Response Hash: ${responseHash}`);
```
