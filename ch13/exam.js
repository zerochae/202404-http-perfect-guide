const crypto = require("crypto");

// 난스 생성
function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

// 해시 생성 (다이제스트)
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
