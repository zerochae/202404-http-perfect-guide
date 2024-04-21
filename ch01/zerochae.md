# 1. HTTP 개관

- Hypertext Transfer Protocol
- 전 세계의 웹브라우저, 서버, 웹 어플리케이션은 모두 HTTP를 총해 서로 대화한다. 현대 인터넷의 공용어 이다.

```text
출처: 나무위키

- HTTP

하이퍼텍스트를 빠르게 교환하기 위한 프로토콜의 일종으로, 서버와 클라이언트의 사이에서 어떻게 메시지를 교환할지를 정해 놓은 규칙이다. 
요청(Request)과 응답(Response)으로 구성되어 있으며, 일반적으로 80번 포트를 사용한다.
예를 들면 '클라이언트가 웹 페이지에서 링크가 걸려있는 텍스트를 클릭(요청)하면 링크를 타고 새로운 페이지로 넘어간다(응답)'.
따라서 우리가 사용하는 웹 브라우저에서 인터넷 주소 맨 앞에 들어가는 <http://> 바로 이 프로토콜을 사용해서 정보를 교환하겠다는 표시인 것이다.

- Hyper text

기존의 책과 같은 선형적인 텍스트가 아니라, 
월드 와이드 웹에서 사용되는 하이퍼링크와 하이퍼텍스트를 통해서 이어지는 비선형적인 텍스트가 신개념이라는 의미에서 만들어진 용어이다. 
HTML의 HT가 Hypertext의 줄임말이다. 번역하면 초월 문서라고 할 수 있다. 문서의 범주를 뛰어넘는다는 의미이다.
```

## 1.1 HTTP: 인터넷의 멀티미디어 배달부

- 신뢰성 있는 데이터 전송 프로토콜 사용(HTTPS)
  - HTTPS는 모든 데이터를 암호화된 형태로 전송
  - 제3자가 네트워크를 통해 해당 데이터를 가로챌 수 없음
  - 검색 엔진은 HTTP보다 HTTPS를 먼저 노출한다.
  - 로드 속도도 더 빠르다 (대칭키 암호화와 비대칭키 암호화를 모두 사용하여 빠르고 안정적 이다)
  - SSL/TLS 인증서를 획득하고 유지 관리해야 합니다.

| - | HTTP | HTTPS |
| --------------- | --------------- | --------------- |
| 의미| Hypertext Transfer Protocol | Hypertext Transfer Protocol Secure |
| 기본 프로토콜 | TCP/IP, QUIC | SSL/TLS |
| 포트 | 80 | 443 |
| 용도 | 이전 텍스트 기반 웹 | 최신 웹 |
| 보안 | x | SSL 인증서 사용 |

## 1.2 웹 클라이언트와 서버

- 클라이언트는 서버에 요청을 보내고, 서버는 클라이언트에 응답을 내려준다.
- 클라이언트에서 `/index.html` 요청하면, 서버에서 http 응답에 실어서 클라이언트에 보낸다.

1. 사용자가 웹브라우저 검색창에 <www.google.com> 입력
2. 웹브라우저는 캐싱된 DNS 기록들을 통해 해당 도메인주소와 대응하는 IP주소를 확인
3. 웹브라우저가 HTTP를 사용하여 DNS에게 입력된 도메인 주소를 요청
4. DNS가 웹브라우저에게 찾는 사이트의 IP주소를 응답
5. 웹브라우저가 웹서버에게 IP주소를 이용하여 html문서를 요청
6. 웹어플리케이션서버(WAS)와 데이터베이스에서 우선 웹페이지 작업처리 후, 결과를 웹서버로 전송
7. 웹서버는 웹브라우저에게 html 문서결과를 응답
8. 브라우저 렌더링 ..  DOM TREE 빌드,  CSSOM 빌드, Render TREE 빌드 , Paint ...

## 1.3 리소스

- 웹 서버는 웹 리소스를 관리
- 주로 정적 파일을 가지고 있다. (HTML, CSS, IMAGE)
  - 동적은 파일은? WAS에서 가지고 있음.. (JS 파일)

## 1.3.1 미디어 타입

- MIME(Multipurpose Internet Mail Extensions)
- MIME 이전에는UUEncode 방식.. 이때는 텍스트(ASCII)만 주고 받았기에 문제가 없었다.
- 바이너리 파일 (음원, 워드, 동영상) 파일이 등장하여, ASCII만으로 전송이 불가함
- 바이너리 파일을 텍스트파일로 인코딩하기 위해 MIME을 사용하게 됨 (파일의 앞부분에 저장함)

```text
mime types

image/gif
image/jpeg
application/batch-smtp
audio/x-dff
video/avi
video/raw

참고: https://www.digipres.org/formats/mime-types/
```

- 헤더의 Content-type을 MIME type 표준으로 작성한다.

## 1.3.2 URI

- URI (Uniform Resource Identifier) - 통합 자원 식별자
  - Uniform: 리소스를 식별하는 통일된 방식
  - Resource: URI로 식별이 가능한 모든 종류의 자원 ( 웹 브라우저 파일 및 그외 리소스 파일)
  - Identifier: 다른 항목과 구분하기 위해 필요한 정보
  - wireblarey.com

## 1.3.3 URL

- URL (Uniform Resource Locator) - 파일 식별자, 리소스의 위치 지정
  - 프로토콜을 포함
  - <https://www.wireblarey.com/login> -> URI도 되고, URL도 된다
  - http:// -> scheme
  - <www.wirebarley.com> -> host
  - /login -> path

- URI가 URL을 포함한다.
- URL은 URI이지만, 모든 URI가 URL인 것은 아니다

## 1.3.4 URN

- URN (Uniform Resource Name) - 통합 자원 이름, 리소스의 이름 부여
- URN은 아직 실험중이랍니다..

## 1.4 트랙잭션

- 클라이언트의 요청, 서버의 응답이 하나의 트랜잭션이다
- 서버에게 어떤 동작을 요청할지를 HTTP 메시지에 담아 보낸다.

## 1.4.1 메서드

- 모든 HTTP 메시지는 한 개의 메서드를 갖는다.
  - GET
  - POST
  - PUT
  - DELETE
  - PATCH
  - HEAD
  - TRACE

## 1.4.2 상태 코드

- 모든 HTTP 응답 메시지는 상태 코드와 함께 반환된다.
  - 200: OK
  - 404: NOT FOUND
  - 500: INTERNAL_SERVER_ERROR

## 1.4.3 웹 페이지는 여러 객체로 이루어질 수 있다

- 애플리케이션은 보통 하나의 작업을 수행하기 위해 여러 HTTP 트랜잭션을 수행한다.
  웹 페이지는 하나의 리소스가 아닌 리소스의 모음이므로, 각각 별개의 HTTP 트랜잭션을 필요로 한다.
- SPA를 말하는건지?

## 1.5 메시지

- 단순한 줄 단위의 문자열

- REQUEST

```http

GET /some/dir/text.txt HTTP/1.0

Accept: text/*
Accept-Language: en, fr
```

- RESPONSE

```http

HTTP/1.0 200 OK 

Content-type: text/plain
Content-length: ..

Hello World!


```

## 1.6 TCP 커넥션

- TCP( Transmission Control Protocol - 전송 제어 프로토콜 )

## 1.6.1 TCP/IP

- 통신의 세부사항은 TCP/IP가 담당한다.

- TCP
  - 오류 없는 데이터 전송
  - 순서에 맞는 전달
  - 조각나지 않는 데이터 스트림
- TCP, IP가 층을 이루는 패킷 교환 네트워크 프로토콜의 집합
- TCP/IP는 각 네트워크와 하드웨어의 특성을 숨기고,
    어떤 종류의 컴퓨터나 네트워크든 서로 신뢰성있는 의사소통 하게 해준다.
- HTTP 프로토콜은 TCP 위의 계층이고, HTTP 메시지 전송을 위해 TCP를 사용
- TCP는 IP위의 계층

## 1.6.2 접속, IP주소 그리고 포트번호

- HTTP 클라이언트가 서버에 메시지를 전송하려면, TCP/IP 커넥션을 맺어야한다.
- 이를 위해, IP 주소, 포트번호가 필요하다.

1. 웹 브라우저는 서버의 URL에서 호스트 명을 추출한다.
2. 서버의 호스트 명을 IP로 변환한다.
3. URL에서 포트번호를 추출한다.
4. 웹 서버와 TCP 커넥션을 맺는다.
5. 서버에 HTTP 요청을 보낸다.
6. 서버는 웹 브라우저에 HTTP 응답을 돌려준다.
7. 커넥션이 닫히면, 웹 브라우저는 제문서를 보여준다.

## 1.6.3 텔넷을 이용한 실제 예

- 어떻게 하는지 몰라서 패스.. 교재 참고

```sh
telnet www.wirebarley.com 80
Trying 104.18.11.97...
Connected to www.wirebarley.com.
Escape character is '^]'.
GET /index.html HTTP/1.1
Host: www.wirebarley.com
Connection closed by foreign host.
```

## 프로토콜 버전

- HTTP/0.9: 1991년의 HTTP 프로토타입이다. 오직 GET 메서드만 지원한다. 이는 원래 간단한 HTML 객체를 받아오기 위해 만들어진 것이다.

- HTTP/1.0: 처음으로 널리 쓰이기 시작한 HTTP 버전이다. 버전 번호, HTTP 헤더, 추가 메서드, 멀티미디어 객체 처리를 추가했다. 월드 와이드 웹을 대세로 만들었다. 잘 만들어진 명세는 아니다.

- HTTP/1.0+: 1990년대 중반, 오래 지속되는 keep-alive 커넥션, 가상 호스팅 지원, 프락시 연결 지원을 포함해 많은 기능이 HTTP에 추가되었다.

- HTTP/1.1: HTTP 설게의 구조적 결함 교정, 두드러진 성능 최적화, 잘못된 기능 제거를 하고, 뿐만 아니라 더 복잡해진 웹 애플리케이션과 배포를 지원한다. 이는 현재 HTTP 버전이다.

- HTTP/2.0: HTTP/1.1 성능 문제를 개선하기 위해 구글의 SPDY 프로토콜을 기반으로 설계된 프로토콜이다.

```sh
curl https://www.wirebarley.com --verbose
Host www.wirebarley.com:443 was resolved.
* IPv6: (none)
* IPv4: 104.18.11.97, 104.18.10.97
*   Trying 104.18.11.97:443...
* Connected to www.wirebarley.com (104.18.11.97) port 443
* ALPN: curl offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / x25519 / id-ecPublicKey
* ALPN: server accepted h2
* Server certificate:
*  subject: CN=wirebarley.com
*  start date: Mar  9 08:56:11 2024 GMT
*  expire date: Jun  7 08:56:10 2024 GMT
*  subjectAltName: host "www.wirebarley.com" matched cert's "*.wirebarley.com"
*  issuer: C=US; O=Let's Encrypt; CN=E1
*  SSL certificate verify ok.
*   Certificate level 0: Public key type EC/prime256v1 (256/128 Bits/secBits), signed using ecdsa-with-SHA384
*   Certificate level 1: Public key type EC/secp384r1 (384/192 Bits/secBits), signed using ecdsa-with-SHA384
*   Certificate level 2: Public key type EC/secp384r1 (384/192 Bits/secBits), signed using ecdsa-with-SHA384
* using HTTP/2
* [HTTP/2] [1] OPENED stream for https://www.wirebarley.com/
* [HTTP/2] [1] [:method: GET]
* [HTTP/2] [1] [:scheme: https]
* [HTTP/2] [1] [:authority: www.wirebarley.com]
* [HTTP/2] [1] [:path: /]
* [HTTP/2] [1] [user-agent: curl/8.7.1]
* [HTTP/2] [1] [accept: */*]
> GET / HTTP/2
> Host: www.wirebarley.com
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
< HTTP/2 200
< date: Sun, 21 Apr 2024 14:59:05 GMT
< content-type: text/html; charset=utf-8
< x-powered-by: Next.js
< cache-control: private, no-cache, no-store, max-age=0, must-revalidate
< vary: Accept-Encoding
< cf-cache-status: DYNAMIC
< strict-transport-security: max-age=15552000; includeSubDomains; preload
< server: cloudflare
< cf-ray: 877e3c65df358548-HKG
<

http https://www.wirebarley.com --header
HTTP/1.1 200 OK
CF-Cache-Status: DYNAMIC
CF-RAY: 877e3a002edc310f-ICN
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Sun, 21 Apr 2024 14:57:27 GMT
Server: cloudflare
Strict-Transport-Security: max-age=15552000; includeSubDomains; preload
Transfer-Encoding: chunked
vary: Accept-Encoding
x-powered-by: Next.js

curl https://www.wirebarley.com --verbose --http1.1
* Host www.wirebarley.com:443 was resolved.
* IPv6: (none)
* IPv4: 104.18.11.97, 104.18.10.97
*   Trying 104.18.11.97:443...
* Connected to www.wirebarley.com (104.18.11.97) port 443
* ALPN: curl offers http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / x25519 / id-ecPublicKey
* ALPN: server accepted http/1.1
* Server certificate:
*  subject: CN=wirebarley.com
*  start date: Mar  9 08:56:11 2024 GMT
*  expire date: Jun  7 08:56:10 2024 GMT
*  subjectAltName: host "www.wirebarley.com" matched cert's "*.wirebarley.com"
*  issuer: C=US; O=Let's Encrypt; CN=E1
*  SSL certificate verify ok.
*   Certificate level 0: Public key type EC/prime256v1 (256/128 Bits/secBits), signed using ecdsa-with-SHA384
*   Certificate level 1: Public key type EC/secp384r1 (384/192 Bits/secBits), signed using ecdsa-with-SHA384
*   Certificate level 2: Public key type EC/secp384r1 (384/192 Bits/secBits), signed using ecdsa-with-SHA384
* using HTTP/1.x
> GET / HTTP/1.1
> Host: www.wirebarley.com
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
< HTTP/1.1 200 OK
< Date: Sun, 21 Apr 2024 15:04:27 GMT
< Content-Type: text/html; charset=utf-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< x-powered-by: Next.js
< Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
< vary: Accept-Encoding
< CF-Cache-Status: DYNAMIC
< Strict-Transport-Security: max-age=15552000; includeSubDomains; preload
< Server: cloudflare
< CF-RAY: 877e44434951306e-ICN
<
```

## 1.8 웹의 구성요소

웹 애플리케이션(웹 브라우저와 웹 서버)이 기본적인 트랜잭션을 구현하기 위해 어떻게 메시지를 주고받는지에 중점을 둔다.
인터넷과 상호작용할 수 있는 웹 애플리케이션은 많다.

- 프록시: 클라이언트와 서버 사이에 위치한 HTTP 중개자
- 캐시: 많이 찾는 웹 페이지를 클라이언트 가까이에 보관하는 HTTP 창고
- 게이트웨이: 다른 애플리케이션과 연결된 특별한 웹 서버
- 터널: 단순히 HTTP 통신을 전달하기만 하는 특별한 프록시
- 에이전트: 자동화된 HTTP 요청을 만드는 준지능적 웹 클라이언트
