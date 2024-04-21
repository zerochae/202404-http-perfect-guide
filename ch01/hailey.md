# HTTP 개관
http란 : 클라이언트와 서버 사이에 문서를 주고받기 위해 사용되는 프로토콜(통신규약) => 약속

1. REQUEST : 클라이언트에서 서버로 요청을 보냄
2. RESPONSE : 서버에서 클라이언트로 응답을 보냄
3. TCP/IP 를 통해 네트워크를 보냄
   1. 메시지 전송 전 클라이언트와 서버 사이에 TCP/IP 커넥션이 연결 돼 있어야함

## 요청
1. URI 를 사용해서 원하는 리소스를 지목
  - URL 
    - 가장 흔한 형태의 리소스 식별자
    - 특정 서버의 리소스에 대한 구체적인 **위치**를 서술
    - 스킴(프로토콜 서술) + 인터넷 주소 + 리소스
    ![img_1.png](img_1.png)
  - URN
    - 리소스의 위치에 영향을 받지 않는 유일무이한 이름
2. HTTP 메서드 사용
- GET
- POST
- DELETE
- PUT
- HEAD : 헤더만 보내라
3. 메세지 보냄
```
   GET https://www.naver.com HTTP/1.1						// 시작줄
   User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...			// 헤더
   Upgrade-Insecure-Requests: 1
```
- 시작줄 : 어떤 요청을 보낼지
- 헤더 : 키-값 으로 구성
- 본문 : 옵셔널

## 응답
1. HTTP Status 코드 사용
- 200
- 300
- 400
2. 메세지 수신
```
HTTP/1.1 200 OK		          // 시작줄
Connection: keep-alive	            // 헤더
Content-Encoding: gzip												 
Content-Length: 35653
Content-Type: text/html;

<!DOCTYPE html><html lang="ko" >    //본문
```

## 웹 구성 요소
1. proxy 
- 클라이언트와 서버 사이에 위치
- 클라이언트의 모든 HTTP 요청을 받아 서버에 전달
- 보안을 위해 사용
2. 캐시
- 자주 사용되는 데이터를 저장해두는 proxy 서버
- 성능 향상을 위해 사용
3. 게이트웨이
- 서버들의 중개자
- 다른 네트워크로 들어가기 위한 관문
- HTTP 트랙픽을 다른 프로토콜로 변환하기 위해 사용
4. 터널
- 커넥션 사이에 raw 데이터를 그대로 전달해주는 HTTP 애플리케이션
- 비 HTTP 데이터를 하나 이상의 HTTP 연결을 통해 그대로 전송해주기 위해 사용
5. 에이전트
- 웹 요청은 만드는 모든 종류의 애플리케이션