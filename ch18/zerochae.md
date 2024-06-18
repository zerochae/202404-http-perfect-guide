# 웹 호스팅

- NPM에 라이브러리 업로드하는 과정을 살펴보겠습니다.
- NPM (<https://npmjs.com)>에 내가 만든 패키지를 업로드하면, 다른 사용자들이 이를 이용할 수 있다.
- NPM은 이 패키지를 호스팅하고 배포하는 역할을 한다.
- NPM 서버에 호스팅되어, 이 패키지(라이브러리)를 검색하고 설치할 수 있음

```bash
λ npm info react

react@18.3.1 | MIT | deps: 1 | versions: 1823
React is a JavaScript library for building user interfaces.
https://reactjs.org/

keywords: react

dist
.tarball: https://registry.npmjs.org/react/-/react-18.3.1.tgz  # <-- 호스팅된 URL
.shasum: 49ab892009c53933625bd16b2533fc754cab2891
.integrity: sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==
.unpackedSize: 318.1 kB

dependencies:
loose-envify: ^1.1.0

maintainers:
- gnoff <jcs.gnoff@gmail.com>
- fb <opensource+npm@fb.com>
- sophiebits <npm@sophiebits.com>
- react-bot <react-core@meta.com>

dist-tags:
beta: 19.0.0-beta-26f2496093-20240514                 experimental: 0.0.0-experimental-107a2f8c3e-20240617  next: 19.0.0-rc-107a2f8c3e-20240617
canary: 19.0.0-rc-107a2f8c3e-20240617                 latest: 18.3.1                                        rc: 19.0.0-rc-107a2f8c3e-20240617

published a month ago by react-bot <react-core@meta.com>
```

## package.json 생성

```bash
# CLI
λ mkdir npm-pub-test
λ npm init -y

# OUTPUT message
Wrote to /Users/kwon-gray/Dev/npm-pub-test/package.json:

{
  "name": "npm-pub-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## npm login

```bash
λ npm login
λ npm whoami  # zerochae
```

## npm publish

```bash
λ npm publish

npm notice
npm notice 📦  npm-pub-test@1.0.0
npm notice === Tarball Contents ===
npm notice 95B  index.js
npm notice 226B package.json
npm notice === Tarball Details ===
npm notice name:          npm-pub-test
npm notice version:       1.0.0
npm notice filename:      npm-pub-test-1.0.0.tgz
npm notice package size:  343 B
npm notice unpacked size: 321 B
npm notice shasum:        db5a272c4966424891d56fa0e8731a746017e8ce
npm notice integrity:     sha512-vlgsgOIrxAvdI[...]59SGbD5zKWQiQ==
npm notice total files:   2
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
npm ERR! code E403
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/npm-pub-test - Package name too similar to existing package npm_pub_test; try renaming your package to '@zerochae/npm-pub-test' and publishing with 'npm publish --access=public' instead
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy, or
npm ERR! 403 on a server you do not have access to.

npm ERR! A complete log of this run can be found in: /Users/kwon-gray/.npm/_logs/2024-06-18T08_10_34_765Z-debug-0.log

# package를 rename 해라 --> '@zerochae/npm-pub-test'
# public으로 업로드 해라 --> npm publish --access=public   
```

## package.json 수정

```json
{
  "name": "@zerochae/npm-pub-test",
  "version": "1.0.1",
  ...
}
```

## npm publish 2

```bash
λ npm publish --access=public

npm notice
npm notice 📦  @zerochae/npm-pub-test@1.0.1
npm notice === Tarball Contents ===
npm notice 95B  index.js
npm notice 236B package.json
npm notice === Tarball Details ===
npm notice name:          @zerochae/npm-pub-test
npm notice version:       1.0.1
npm notice filename:      zerochae-npm-pub-test-1.0.1.tgz
npm notice package size:  351 B
npm notice unpacked size: 331 B
npm notice shasum:        0498b924d5ac1b089cf7e807df982224f1e7405f
npm notice integrity:     sha512-HcnP5CxXyf9Wu[...]en0Qoaivj7iSQ==
npm notice total files:   2
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ @zerochae/npm-pub-test@1.0.1
```

## npm info

```bash
λ npm info @zerochae/npm-pub-test

@zerochae/npm-pub-test@1.0.1 | ISC | deps: none | versions: 1

dist
.tarball: https://registry.npmjs.org/@zerochae/npm-pub-test/-/npm-pub-test-1.0.1.tgz # <<- NPM에 호스팅된 URL
.shasum: 0498b924d5ac1b089cf7e807df982224f1e7405f
.integrity: sha512-HcnP5CxXyf9Wuv6Ri/mg73N741rHBr3mQ+bxtsljMT+vOPExHVuFGy5egHXK05adrZWRjluKMen0Qoaivj7iSQ==
.unpackedSize: 331 B

maintainers:
- zerochae <zerochae@kakao.com>

dist-tags:
latest: 1.0.1

published just now by zerochae <zerochae@kakao.com>
```

## http GET .tarball

```bash
λ http GET https://registry.npmjs.org/@zerochae/npm-pub-test/-/npm-pub-test-1.0.1.tgz 

HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 8
CF-Cache-Status: HIT
CF-Ray: 8959d931de4b316a-ICN
Cache-Control: public, must-revalidate, max-age=31557600
Connection: keep-alive
Content-Length: 351
Content-Type: application/octet-stream
ETag: "08566dd2b244ed602fbc07be1bafd7a7"
Last-Modified: Tue, 18 Jun 2024 08:16:20 GMT
Server: cloudflare
Vary: Accept-Encoding

+-----------------------------------------+
| NOTE: binary data not shown in terminal |
+-----------------------------------------+
```
