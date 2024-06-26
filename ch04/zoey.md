## **4.1 TCP 커넥션**

- 전 세계 모든 HTTP 통신은, 지구상의 컴퓨터와 네트워크 장비에서 널리 쓰이고 있는, 패킷 교환 네트워크 프로토콜들이 계층화된 집합인 TCP/IP를 통해 이루어진다.
- 웹 브라우저가 TCP 커넥션을 통해서 웹 서버에 요청을 보낸다고 해보자.
    - `https://www.naver.com`
    - 브라우저가 `www.naver.com` 라는 호스트 명을 추출한다.
    - 브라우저가 이 호스트 명에 대한 IP 주소를 찾는다.
    - 브라우저가 포트 번호 80을 얻는다.
    - 브라우저가 `223.130.200.236`의 80포트로 TCP 커넥션을 생성한다.
    - 브라우저가 바로 HTTP GET 요청 메세지를 보낸다.
    - 브라우저가 서버에서 온 HTTP 응답 메세지를 읽는다.
    - 브라우저가 커넥션을 끊는다.
    

### **4.1.1 신뢰할 수 있는 데이터 전송 통로인 TCP**

- HTTP 커넥션은 몇몇 사용 규칙을 제외하고는 TCP 커넥션에 불과하다.
- TCP 커넥션의 한쪽에 있는 바이트들은 반대쪽으로 순서에 맞게 정확히 전달된다.

### **4.1.2 TCP 스트림은 세그먼트로 나뉘어 IP 패킷을 통해 전송된다**

- TCP는 **IP 패킷**이라고 불리는 작은 조각을 통해 데이터를 전송한다
- HTTP는 프로토콜 스택에서 최상위 계층이다.
- HTTPS에는 TLS 혹은 SSL이라 불리기도 하며 암호화 계층이 있다.

![image](https://github.com/heeom/202404-http-perfect-guide/assets/64389364/55b33b03-8ebb-4509-9a20-f3dc6bc64164)


- HTTP 메세지를 전송하고자 할 경우,TCP 커넥션을 통해서 메세지 데이터의 내용을 순서대로 보낸다.
- TCP는 **세그먼트**라는 단위로 데이터 스트림을 잘게 나누고 → TCP 세그먼트를 **IP 패킷**이라고 불리는 **봉투**에 담아서 → 인터넷을 통해 데이터를 전달한다.
- IP 패킷에 포함 되는 항목
    - IP 패킷 헤더 (20byte)
    - TCP 세그먼트 헤더 (20byte)
    - TCP 데이터 조각
    

### **4.1.3 TCP 커넥션 유지하기**

- 컴퓨터는 항상 TCP 커넥션을 여러 개 가지고 있다. TCP는 포트 번호를 통해서 이런 여러 개의 커넥션을 유지한다.
- TCP 커넥션은 **4가지 값**으로 식별한다.
    1. 발신지 IP 주소
    2. 발신지 포트
    3. 수신지 IP 주소
    4. 수신지 포트
    - 4가지 값으로 유일한 커넥션을 생성하며, 4가지 커넥션 구성요소를 똑같이 가리키고 있는 커넥션은 있을 수 없다.

## **4.2 TCP의 성능에 대한 고려**

- HTTP는 TCP 바로 위에 있는 계층이므로, TCP의 성능이 문제가 될 경우 HTTP 트렌젝션 성능에 영향을 준다.

### 4.2.1 HTTP 트랜잭션 지연

![image](https://github.com/heeom/202404-http-perfect-guide/assets/64389364/eddebe3b-ceb4-4db9-9a72-67fb3407b862)


- 대부분의 HTTP 지연은 **TCP 네트워크 지연** 때문에 발생한다.
- 트랜잭션을 처리하는 시간은TCP 커넥션을 설정하고, 요청을 전송하고, 응답 메세지를 보내는 것에 비하면 상당히 짧다**.**
- HTTP 트랜잭션을 지연시키는 원인
    - 클라이언트는 URI에서 웹 서버의 IP 주소와 포트 번호를 알아내야 하는데, 만약 호스트에 방문한 적이 없으면 DNS 인프라를 사용하여 IP 주소로 변환하는데 수십 초의 시간이 걸릴 것이다
    - 클라이언트는 TCP 커넥션 요청을 서버에게 보내고 서버가 커넥션 허가 응답을 회신하기를 기다린다. → 새로운 TCP 커넥션에서 항상 발생
    - 커넥션이 맺어지면 클라이언트는 HTTP 요청을 새로 생성된 TCP 파이프를 통해 전송한다. 웹 서버는 데이터가 도착하는 데로 TCP 커넥션에서 요청 메시지를 읽고 처리한다. 요청 메시지가 인터넷을 통해 전달되고 서버에 의해서 처리되는 데 까지는 시간이 소요된다. 웹 서버가 HTTP 응답을 보내는 것 역시 시간이 소요된다.

### **4.2.2 성능 관련 중요 요소**

- 성능에 영향을 주는 TCP 관련 지연들
    - TCP 커넥션의 핸드셰이크 설정
    - 인터넷의 혼잡을 제어하기 위한 TCP의 느린 시작(slow-start)
    - 데이터를 한데 모아 한 번에 전송하기 위한 네이글(nagle) 알고리즘
    - TCP의 편승(piggyback) 확인 응답(acknowledgment)을 위한 확인응답 지연 알고리즘
    - TIME_WAIT 지연과 포트 고갈

### **4.2.3 TCP 커넥션 핸드셰이크 지연**

- 어떤 데이터를 전송하든 새로운 TCP 커넥션을 열 때면, TCP 소프트웨어는 커넥션을 맺기 위한 조건을 맞추기 위해 연속으로 IP 패킷을 교환한다. 작은 크기의 데이터 전송에 커넥션이 사용된다면 이런 패킷 교환은 HTTP 성능을 크게 저하시킬 수 있다.
- TCP 커넥션이 핸드셰이크를 하는 순서

![image](https://github.com/heeom/202404-http-perfect-guide/assets/64389364/5a010f33-436f-49ef-ab4a-039c0d5e73b9)


1. 클라이언트는 새로운 TCP 커넥션을 생성하기 위해 작은 TCP 패킷을 서버에게 보낸다.
    - 그 패킷은 `SYN`(**syn**chronize sequence numbers)라는 특별한 flag를 가진다.
    - **커넥션 생성 요청**이라는 뜻
2. 서버가 그 커넥션을 받으면 몇 가지 커넥션 매개변수를 산출하고 커넥션 요청이 받아들여졌음을 의미하는 `SYN` + `ACK`(acknowledgment) flag를 포함한 TCP 패킷을 클라이언트에게 보낸다.
3. 마지막으로 클라이언트는 커넥션이 잘 맺어졌음을 알리기 위해서 서버에게 다시 확인 응답 신호를 보낸다. `ACK`

→ HTTP 트랜잭션이 아주 큰 데이터를 주고받지 않는 평범한 경우에는, SYN/SYN+ACK 핸드셰이크가 눈에 띄는 지연을 발생시킨다. 크기가 작은 HTTP 트랜잭션은 50% 이상의 시간을 TCP를 구성하는 데 쓴다.

### **4.2.4 확인응답 지연**

- 인터넷 자체가 패킷 전송을 완벽히 보장하지는 않기 때문에, TCP는 성공적인 데이터 전송을 보장하기 위해서 자체적인 확인 체계를 가진다.
- TCP 세그먼트는 **순번**과 **데이터 무결성 체크섬**을 가진다.
- 각 세그먼트의 수신자는 세그먼트를 온전히 받으면 작은 확인응답 패킷`ACK`을 송신자에게 반환한다.
- 만약 송신자가 특정 시간 안에 확인응답 메시지를 받지 못하면 패킷이 파기되었거나 오류가 있는 것으로 판단하고 데이터를 다시 전송한다.
- **송출 데이터 패킷에 같이 보내자**
    - 확인 응답은 그 크기가 작기 때문에 TCP는 같은 방향으로 송출되는 데이터 패킷에 확인 응답을 편승(piggyback)시켜서 데이터를 전송할 때 같이 보낸다.
- **지연 발생하는 이유**
    - HTTP 동작 방식(요청, 응답)은 확인 응답이 송출 데이터 패킷에 편승할 기회를 감소시킨다.
    - 편승할 패킷을 찾으려고 하면, 해당 방향으로 송출될 패킷이 많지 않기 때문에,확인 응답 지연으로 인한 지연이 자주 발생한다.

### **4.2.5 TCP 느린 시작**

- TCP 느린 시작은 TCP가 한 번에 전송할 수 있는 패킷의 수를 제한한다.
- 패킷이 성공적으로 전달되는 각 시점에 송신자는 추가로 2개의 패킷을 더 전송할 수 있는 권한을 얻는다. `혼잡 윈도를 연다(opening the congestion window)`
- HTTP 트랜잭션에서 전송할 데이터의 양이 많으면 모든 패킷을 한 번에 전송할 수 없다.한 개의 패킷만 전송하고 확인 응답을 기다렸다 받으면, 2개의 패킷을 보낼 수 있고, 그 패킷 각각에 대한 확인 응답을 받으면 총 4개의 패킷을 보낼 수 있게 된다.
- 혼잡제어 기능 때문에 튜닝된 커넥션이 새로운 커넥션보다 더 빠르다.

### **4.2.6 네이글(Nagle) 알고리즘과 TCP_NODELAY**

- 네이글 알고리즘은 작은 패킷들을 하나로 묶어서 전송함으로써 네트워크 대역폭을 효율적으로 사용하려는 목적을 가진다.
- 작은 데이터 조각들을 모아 하나의 패킷으로 만들어 보내므로 전송 효율을 높일 수 있지만, 작은 패킷들의 지연을 유발할 수 있다.
    - 크기가 작은 HTTP 메세지는 패킷을 채우지 못해, 앞으로 생길지 생기지 않을지 모르는 추가적인 데이터를 기다리며 지연될 것이다.
    - 확인 응답 지연과 함께 쓰일 경우 비효율적이다.
    - HTTP 스택에 `TCP_NODELAY` 파라미터 값을 설정하여 네이글 알고리즘을 비활성화하기도 한다.
    

### **4.2.7 TIME_WAIT의 누적과 포트 고갈**

- TCP 커넥션의 엔드포인트에서 TCP 커넥션을 끊으면, 엔드포인트에서 커넥션의 IP 주소와 포트 번호를 메모리의 작은 제어영역(control block)에 기록해 놓는다.
- 이 정보는 같은 주소와 포트 번호를 사용하는 새로운 TCP 커넥션이 일정 시간 동안에는 생성되지 않게 하기 위한 것이다.
    - 보통 세그먼트의 최대 생명주기에 두 배 정도이며 보통 2분 정도
- 이전 커넥션과 관련된 패킷이 이전 커넥션과 같은 주소와 포트 번호를 가진 새로운 커넥션에 삽입되는 문제를 방지한다. (중복 패킷 생성 방지)

### **4.3 HTTP 커넥션 관리**

### **4.3.1 흔히 잘못 이해하는 Connection 헤더**

- 클라이언트와 서버 사이에는 프록시 서버, 캐시서버 등과 같은 중개 서버가 있고, HTTP 메세지는 클라이언트에서 서버까지 중개서버들을 거치면서 전달된다.
- 어떤 경우에는 두 개의 인접한 HTTP 앱이현재 맺고 있는 커넥션에만 적용될 옵션을 지정해야 할 때가 있다. 이때 HTTP Connection 헤더를 사용하면 맺고 있는 커넥션에만 Connection 헤더 값을 적용 가능하다.
    - Connection 헤더에 전달되는 3가지 종류 토큰
        - HTTP 헤더 필드 명
            - 해당 커넥션에만 적용되는 헤더들
            - 커넥션 토큰이 HTTP 헤더 필드 명을 가지고 있으면, 해당 필드들은 현재 커넥션만을 위한 정보이므로 다음 커넥션에 전달하면 안 된다. (다음 hop으로 전달되는 시점에 삭제되어야 함)
        - 임시적인 토큰 값
            - 커넥션에 대한 비표준 옵션을 의미한다.
        - close 값
            - 커넥션이 작업이 완료되면 종료되어야 함을 의미한다.
            

### **4.3.2 순차적인 트랜잭션 처리에 의한 지연**

- 커넥션 관리가 제대로 이루어지지 않으면 TCP 성능이 매우 안 좋아질 수 있다
- 예를 들어 3개의 이미지가 있는 웹페이지에 접근한다고 해보자.
    - HTML (1) + 이미지(3) → 4개의 HTTP 트랜잭션 생성해야한다.
    - 4개 HTTP 트랜잭션이 새로운 커넥션을 열어야하면 → 커넥션을 맺는데 발생하는 지연과 함께 느린 시작 지연이 발생할 것이다.
    
- HTTP 커넥션의 성능을 향상시킬 수 있는 여러 최신 기술이 있다.
    - 병렬(parallel) 커넥션
        - 여러 개의 TCP 커넥션을 통한 동시 HTTP 요청
    - 지속(persistent) 커넥션
        - 커넥션을 맺고 끊는 데서 발생하는 지연을 제거하기 위한 TCP 커넥션의 재활용
    - 파이프라인(pipelined) 커넥션
        - 공유 TCP 커넥션을 통한 병렬 HTTP 요청
    - 다중(multiplexed) 커넥션
        - 요청과 응답들에 대한 중재
    

## **4.5 지속 커넥션**

- HTTP/1.1을 지원하는 기기는 처리가 완료된 후에도 TCP 커넥션을 유지하여 앞으로 있을 HTTP 요청에 재사용할 수 있다.
- 지속 커넥션은 처리가 완료된 후에도 계속 연결된 상태로 있는 TCP 커넥션을 말한다.
- 비지속 커넥션은 각 처리가 끝날 때마다 커넥션을 끊지만, 지속 커넥션은 클라이언트나 서버가 커넥션을 끊기 전까지는 트랜잭션 간에도 커넥션을 유지한다.
- 해당 서버에 이미 맺어져 있는 지속 커넥션을 재사용함으로써, 커넥션을 맺기 위한 준비작업에 따르는 시간을 절약할 수 있다. 게다가 이미 맺어져 있는 커넥션은 TCP의 느린 시작으로 인한 지연을 피함으로써 더 빠르게 데이터를 전송할 수 있다.

### **4.5.1 지속 커넥션 vs 병렬 커넥션**

- 지속 커넥션은 병렬 커넥션에 비해 몇 가지 장점이 있다.
    - 커넥션을 맺기 위한 사전 작업과 지연을 줄여주고, 튜닝된 커넥션을 유지하며, 커넥션의 수를 줄여준다
    

### 지속 커넥션 타입

- HTTP/1.0+ keep-alive 커넥션
- HTTP/1.1 '지속' 커넥션

### HTTP/1.0+ keep-alive 커넥션

- Keep-alive 동작
    - keep-alive 커넥션을 구현한 클라이언트는 커넥션을 유지하기 위해서 요청에 Connection: Keep-Alive 헤더를 포함시킨다.
    - 이 요청을 받은 서버는 그다음 요청도 이 커넥션을 통해 받고자 한다면, 응답 메시지에 같은 헤더를 포함시켜 응답한다.
    - 응답에 Connection: Keep-Alive 헤더가 없으면, 클라이언트는 서버가 keep-alive를 지원하지 않으며, 응답 메시지가 전송되고 나면 서버 커넥션을 끊을 것이라 추정한다.
    - Client → Connection : keep-Alive 헤더 → Server
    - Client ← Connection : keep-Alive 헤더 ← Server
- Keep-Alive 옵션
    
    ```json
    Connection: Kepp-Alive
    Keep-Alive: max=5, timeout=120 
    // max : 커넥션이 몇 개의 HTTP 트랜잭션을 처리할 때까지 유지될 것인지를 의미
    // timeout : 커넥션이 얼마간 유지될 것인지를 의미
    ```
    
    - 서버가 약 5개의 추가 트랜잭션이 처리될 동안 커넥션을 유지하거나, 2분 동안 커넥션을 유지하라는 내용의 Keep-Alive 응답 헤더
