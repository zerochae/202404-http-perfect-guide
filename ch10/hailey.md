# HTTP/2.0

HTTP/2.0의 기본 목표는 요청과 응답 멀티플렉싱을 통하여 레이턴시를 줄이고,
HTTP header필드를 압축하여 프로토콜 오버헤드를 최소화하며,
요청 우선순위와 서버푸시기능을 지원하는것이다.

- 멀티플렉싱 
  - 하나의 통신 채널로 여러개의 데이터를 동시에 보내는 것
  - HTTP/1.1 의 경우 요청은 반드시 순차적으로 서버에서 처리돼 브라우저로 전달
- 레이턴시(회전 지연) : 응답을 받아야만 그 다음 요청을 보낼 수 있음

- 헤더 필드 압축
  - 아래 이미지와 같이 중복 요청을 보내게 되는 경우 중복된 헤더에 내용은 보내지 않음
  - 중복된 헤더는 index값만 전송하고 중복되지 않은 Header 정보의 값은 호프만 인코딩(Huffman Encoding) 기법을 사용하는 HPACK 압축 방식으로 인코딩 처리 하여 전송
  - 호프만 인코딩 : https://post.naver.com/viewer/postView.nhn?volumeNo=20402243&memberNo=10728965
  ![image](https://github.com/hwyi21/202404-http-perfect-guide/assets/58624211/5b1c69d7-9585-4705-9eed-12a9cce60c5c)

- 서버푸시 
  - HTTP 2.0 버전에 주요한 특징
  - 클라이언트 요청이 없어도 서버가 클라이언트로 데이터를 전달할 수 있는 방식
  - 이미지, javascript 등 서버에 요청할 것이 명확한 데이터들에 대해 미리 클라이언트에 내려 줌

https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-HTTP-20-%ED%86%B5%EC%8B%A0-%EA%B8%B0%EC%88%A0-%EC%9D%B4%EC%A0%9C%EB%8A%94-%ED%99%95%EC%8B%A4%ED%9E%88-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90