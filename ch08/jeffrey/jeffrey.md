# 08. 통합점: 게이트웨이, 터널, 릴레이

# REST vs SOAP

SOAP는 프로토콜이고, REST는 아키텍처 스타일이다.<br>
이 두 방식은 서로 다르게 구성되고, 서로 다르게 기능하며, 서로 다른 상황에서 사용된다.

## REST

- URL 형식
    - **HTTP 메서드**와 **URI**만으로 원하는 데이터를 표현할 수 있다.

    | CRUD | Method | URI |
    | --- | --- | --- |
    | Create | POST | https://api.test.com/v1/images |
    | Read | GET | https://api.test.com/v1/images |
    | Read | GET | https://api.test.com/v1/images/1 |
    | Update | PUT | https://api.test.com/v1/images/2 |
    | Update | PATCH | https://api.test.com/v1/images/3 |
    | Delete | DELETE | https://api.test.com/v1/images/4 |
- REST API의 요청과 응답은 `HTTP 프로토콜을 기반`으로 하며, 자원을 표현하는 데에는 **URI를 사용**하고, 헤더에는 **메타데이터가 포함된다**.
    - 다양한 형식이 사용될 수 있는데, 일반적으로는 간결한 JSON이 쓰인다.

- REST API Request의 기본적인 구조
    
    ```sql
    GET /api/user/123456 HTTP/1.1
    Host: www.test.com
    Authorization: Basic base64EncodedCredentials
    ```
    
    - `HTTP 메서드`인 GET은 사용자 정보를 요청하는 것을 나타낸다.
    - `/api/user/123456`는 요청하는 자원의 URI를 나타낸다.
    - `헤더`에는 인증 정보가 포함된다.

- REST API Response의 기본적인 구조
    
    ```sql
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "UserID": 11111111,
        "Name": "jeffrey kim",
        "Email": "jeffrey.kim@abcd.com"
    }
    ```
    
    - `HTTP 상태 코드`인 200은 요청이 성공했음을 나타낸다.
    - `Content-Type 헤더`는 응답의 데이터 형식을 정의
    - `Body`에는 JSON 형식으로 사용자 정보가 포함.
- **data driven**으로 데이터 중심적인 접근 방식을 채택하며, **대상이 어느 자원인가에 대해 중점**을 둔다.
    - Resource Oriented Architecture로도 불린다.
- **stateless**하다. (상태를 유지하지 않음)
- 경량화되어 있기 때문에 IoT, 모바일 서비스, 서버리스 컴퓨팅과 같이 보다 새로운 컨텍스트에 이상적이다.
- **간단한 인증 및 권한 부여 메커니즘을 필요로 하는 경우에 적합**할 수 있으며, 메시지 레벨에서의 보안 기능을 제공하지 않기 때문에, 보다 엄격한 보안 요구사항을 충족하기 위해서는 **추가적인 보안 레이어를 구현해야 할 수도 있다**
- **HATEOAS(Hypermedia As The Engine Of Application State) 원칙**이 권장된다.

### **HATEOAS(Hypermedia As The Engine Of Application State)**

- API를 실제로 `RESTful`하게 만드는 REST Appilcation Architecture의 제약 조건
- 기본적으로 요청에 대해 서버는 응답에 데이터만 클라이언트에게 보내는데,
HATEOAS를 사용하면 **응답에 데이터뿐만 아니라 해당 데이터와 관련된 요청에 필요한 URI(다음 페이지 링크 등)를 응답에 포함하여 반환**
- REST API를 사용하는 **클라이언트가 전적으로 서버와 동적인 상호작용이 가능하도록 해준다**.
- REST 성숙도 모델
    
    ![Untitled](./Untitled.png)
    
    - 레벨 0 : API 구현은 HTTP 프로토콜을 사용하지만 전체 기능을 활용하지는 않는다. 또한 리소스에 대한 고유 주소는 제공되지 않는다.
    `method: POST URI: /movie`
    - 레벨 1 : 리소스에 대한 고유 식별자가 있지만 리소스에 대한 각 작업에는 고유한 URL이 있다.
        
        `method: POST URI: /movie/1/delete`
        
    - 레벨 2 :  동작을 설명하는 동사 대신 HTTP 메소드를 사용한다.
        
        `method: DELETE URI: /movie/1`
        
    - 레벨 3 : HATEOAS가 도입되었다. 간단히 말해서 **리소스에 `하이퍼미디어`를 도입**하며, 이를 통해 가능한 작업에 대해 알려주는 응답에 **링크를 배치**할 수 있으므로 API를 통해 탐색할 수 있는 가능성이 추가된다.
        
        `method: DELETE URI: /movie/1`
        

![Untitled](./Untitled%201.png)

- 요즘 대부분의 프로젝트는 레벨 2를 사용하여 작성되지만, 완벽한 RESTful API를 원한다면 `HATEOAS`를 고려해야한다.
- `application/hal+json HATEOAS` 응답 형태
    
    ```json
    {
        "id": 100,
        "subject": "제목",
        "content": "내용"
        "_links": {
    		"self": {
    			"href": "https://test.com/api/contents/100"
    		},
    		"next": {
    			"href": "https://test.com/api/contents/101"
			},
    		"like": {
    			"href": "https://test.com/api/contents/likes"
    		},
			"comment": {
    			"href": "https://test.com/api/contents/100/comments" 
    		},
    		"home": {
    			"href": "https://test.com/"
		    }
        }
    }
    ```
    
- **리소스** : 일반적인 데이터 필드에 해당 (id, subject, content)
- **링크** : 하이퍼미디어로 보통 `_self` 필드가 링크 필드가 된다.
- [https://grapeup.com/blog/how-to-build-hypermedia-api-with-spring-hateoas/#](https://grapeup.com/blog/how-to-build-hypermedia-api-with-spring-hateoas/#)

## SOAP

- URL 형식
    - https://api.test.com/image
- JSON에 비해 장황한 **XML**을 사용할 것을 규정
    - 같은 요청과 응답에 있어서, 보내고 받는 **데이터의 분량이 REST 보다 크다.**
- 메시지 송수신 시 헤더와 바디의 **인코딩/디코딩 과정이 필수**
- Request를 아래처럼 긴 분량으로 작성해서 보내야 하기에, 이를 body에 담아 보낼 수 있도록 `POST`가 주로 사용된다.
    - POST로 거의 전송하기에 캐싱이 어렵다.

- SOAP Request의 기본적인 구조
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:example="http://www.example.com">
        <soap:Header>
            <example:Authentication>
                <example:Username>myName</example:Username>
                <example:Password>123456</example:Password>
            </example:Authentication>
        </soap:Header>
        <soap:Body>
            <example:GetUserInfo>
                <example:UserID>11111111</example:UserID>
            </example:GetUserInfo>
        </soap:Body>
    </soap:Envelope>
    ```
    
    - **`<soap:Envelope>`** : SOAP 메시지의 시작을 나타냄
    - **`<soap:Header>`**  : SOAP 메시지의 헤더 부분을 정의
    - **`<soap:Body>` :** SOAP 메시지의 바디 부분을 정의
    - **`<example:Authentication>`** : 사용자 인증 정보를 포함
    - **`<example:GetUserInfo>`** : 사용자 정보를 요청하는 메시지.
        - `GetUserInfo` 처럼 무엇을 하는 것인지 동사를 포함한 문장들로 나타낸다

- SOAP Response의 기본적인 구조
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:example="http://www.example.com">
        <soap:Header>
            <example:ResponseHeader>
                <example:StatusCode>200</example:StatusCode>
                <example:StatusMessage>Success</example:StatusMessage>
            </example:ResponseHeader>
        </soap:Header>
        <soap:Body>
            <example:UserInfoResponse>
                <example:UserID>11111111</example:UserID>
                <example:Name>jeffrey kim</example:Name>
                <example:Email>jeffrey.kim@abcd.com</example:Email>
                <!-- 다른 사용자 정보들 -->
            </example:UserInfoResponse>
        </soap:Body>
    </soap:Envelope>
    ```
    
    - **`<soap:Envelope>`** : SOAP 메시지의 시작을 나타냄
    - **`<soap:Header>`** : 메시지의 헤더 부분을 정의
    - **`<soap:Body>`** : 메시지의 바디 부분을 정의
    - **`<example:ResponseHeader>`** : 응답의 상태 코드와 메시지를 포함
    - **`<example:UserInfoResponse>`** : 사용자 정보를 포함하는 응답 메시지
        - **`UserInfoResponse`** 요청 결과를 나타낸다.

- SOAP는 **function driven**으로 기능 중심적인 접근 방식을 채택하며, 어느 `서비스`를 요청하는지 메시지에 표현한다.
    - 메시지 기반의 프로토콜
    - 원격 프로시저 호출(Remote Procedure Call, RPC)을 사용하여 함수 호출과 같은 작업을 수행
- 필요에 따라 상태를 유지할 수 있다.
    - 여러 단계의 작업에서, **이전 단계의 상태를 기억해야 하는 트랜잭션 작업에서 선호**된다.
- 금융 거래, 의료 정보 시스템, 정부 서비스 등 높은 보안 수준을 요구하는 서비스에 사용된다.
    - WS-Security와 같은 표준 보안 메커니즘을 사용하여 보안을 강화할 수 있다.
    - 보안을 강화하기 위한 다양한 확장 기능과 표준을 제공
    - 메시지 레벨에서 보안을 제공하기 때문에 보다 세밀한 보안 요구사항을 충족할 수 있다.

### WSDL(Web Services Description Language)

- 웹 서비스의 기능과 구조를 설명하는 XML 기반의 문서
- SOAP를 사용하기 위해서 어떤 메시지를 어떤 타입으로 주고받아야하는가에 대한 명세서라고도 볼 수 있다.
- 일반적으로 `SOAP`을 사용하여 **웹 서비스 간의 통신을 수행**하고, `WSDL`을 사용하여 **웹 서비스의 인터페이스를 설명**한다.
- `SOAP`은 **데이터를 교환하는 프로토콜**이고, `WSDL`은 **해당 서비스가 무엇을 할 수 있는지를 정의하는 메타데이터 언어**
- 클라이언트가 웹 서비스와 **상호 작용하기 위해 필요한 정보를 제공**한다.
    
    여기에는 서비스가 제공하는 `작업(operation)`, `메시지 형식(message format)`, `프로토콜 및 위치(endpoint) 정보` 등이 포함된다.
    
- 구성요소
    1. **타입(Type)**: 서비스에서 사용되는 **데이터 형식을 정의**. XML 스키마(XSD)를 사용하여 데이터 형식을 정의할 수 있다.
    2. **메시지(Message)**: 서비스에서 주고받는 **메시지의 구조를 정의**. 이는 데이터 요소들의 컨테이너 역할을 한다.
    3. **포트 타입(Port Type)**: 서비스에서 제공하는 **작업(operation)의 집합을 정의**. 포트 타입은 작업(operation)과 메시지(message) 간의 관계를 정의한다.
    4. **바인딩(Binding)**: 실제로 **서비스와 클라이언트 간의 통신 방법을 정의**. 바인딩은 포트 타입과 프로토콜 정보(HTTP, SOAP 등)를 결합한다.
    5. **서비스(Service)**: **서비스의 엔드포인트(endpoint)를 정의**하고, 해당 엔드포인트가 사용할 바인딩을 지정.
- WSDL 문서는 **서비스 제공자가 작성**하며, 클라이언트는 이를 사용하여 서비스에 대한 정보를 이해하고 상호 작용할 수 있다. WSDL은 SOAP 기반의 웹 서비스에서 특히 널리 사용되며, 서비스의 API와 같은 역할을 한다.
- WSDL은 웹 서비스의 `계약`으로 볼 수 있다. 클라이언트는 WSDL을 통해 서비스의 제공되는 기능, 요청과 응답의 구조, 통신 프로토콜 등에 대한 정보를 파악하고 서비스와 상호 작용할 수 있다.

---

## 릴레이 vs 프록시

릴레이와 프록시는 비슷한 개념으로 간주될 수 있지만, 목적과 사용 방법에서 약간의 차이가 있다.

- 릴레이는 데이터를 한 지점에서 다른 지점으로 전달하는 `중계 역할`을 한다.
    - 보통 네트워크에서 릴레이는 **데이터를 전달하는 데 사용**된다.
    - 클라이언트가 직접 통신할 수 없는 서버 간 통신이나 통신이 차단된 네트워크를 통해 통신해야 할 때 유용하다.
    - 릴레이는 데이터 패킷을 받아들여 목적지로 중계한다.

- 종종 프록시는 릴레이의 하위 집합으로 간주될 수 있지만, 그 역할과 목적에서 약간의 차이가 있다.

|  | 프록시 | 릴레이 |
| --- | --- | --- |
| 기능 수행 | 주로 특정 프로토콜(HTTP, FTP 등)을 통해 트래픽을 필터링하거나 제어하기 위해 사용 | 데이터를 전달하기 위해 중개자로서의 역할을 수행 |
| 역할 및 목적 | 클라이언트와 서버 간의 중계 역할을 하여 요청과 응답을 중간에 가로채고 수정할 수 있다. | 데이터 전송을 중계하거나 두 시스템 간의 연결을 관리하는 데 사용.<br>주로 중간에 데이터를 가로채거나 수정하지 않고 데이터를 전달하는 데 초점이 있다. |

릴레이는 프록시와 유사하지만 더 일반적으로는 **두 시스템 간의 통신을 조정하거나 중계하는 데 사용**된다.