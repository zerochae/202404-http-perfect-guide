웹 서버는 HTTP 요청을 처맇고 응답을 제공한다.

하드웨어, 소프트웨어 혹은 두 개가 같이 동작하는 것을 의미할 수 있다.

- 하드웨어
    - 웹 서버는 웹 서버의 소프트웨어와 website의 컴포넌트 파일들을 저장하는 컴퓨터이다.
    - 웹 서버는 인터넷에 연결되어 웹에 연결된 다른 기기들이 웹 서버의 데이터(컴포넌트 파일들)를 주고받을 수 있도록 한다.
- 소프트 웨어
    - 소프트웨어 측면에서, 웹 서버는 기본적으로 웹 사용자가 어떻게 호스트 파일들에 접근하는지를 관리합니다.
    
- 정적 컨텐츠
    - 정적 콘텐츠는 서버에 미리 저장되어 있고, 요청 시에 변하지 않는 콘텐츠
    - 주로 HTML 파일, CSS 스타일 시트, JavaScript 파일, 이미지 파일, 비디오 파일
    - 클라이언트로부터 요청이 오면 서버는 해당 파일을 그대로 전송하여 클라이언트에게 제공
- 동적 컨텐츠
    - 동적 콘텐츠는 요청에 따라 생성되거나 변경되는 콘텐츠
    - 주로 사용자의 상호작용에 따라 생성되는 콘텐츠나 데이터베이스로부터 가져온 정보
    - 동적 콘텐츠는 서버 측의 프로그램이나 스크립트를 통해 생성
    - nginx(리버스 프록시)
    

보통 웹서브는 동적 컨텐츠를 처리하는 데 도 사용하지만, 이러한 처리는 주로 백엔드 서버나 웹 애플리케이션 서버에 의해 담당된다.

웹 서버는 주로 리벅스 프록시를 통해 백엔드 서버로 전달하고, 정적 콘텐츠를 직접 제공하는 역할을 한다,

- WEB(**Web Server)**
    - 소프트웨어와 하드웨어로 구분된다.
    - 웹 브라우저 클라이언트로부터 HTTP 요청을 받아 정적인 컨텐츠를 제공(html, jpeg, css)
    - WAS를 거치지 않고 바로 자원을 제공
    - 동적인 컨텐츠 제공을 위한 요청 전달
    - 요청을 WAS 에게 보내고 WAS가 처리한 결과를 클라이언트에게 전달
- WAS(**Web Application Server**)
    - DB조회나 다양한 로직 처리를 요규하는 동적인 컨텐츠를 제공하기 위해 만들어진 서버
    - 웹 컨테이너, 서블릿 컨테이너라고 불린다
    - 웹 애플리케이션을 실행하기 위한 환경을 제공하며 (JSP, Servlet)

- ApacheTomcat
    - Java 웹 애플리케이션 실행 환경
    - 서블릿 및 JSP 지원
    - 웹 애플리케이션 배포 및 관리(WAR

![webserver-vs-was2.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bf36ad3-0719-431a-b1e2-3f429aeb690d/5ecb1c44-f709-47aa-92bc-4aa39a352f20/webserver-vs-was2.png)

- spring 내부구조
    - 톰캣은 WAS로써 미들웨어역할을 하지만 아파치의 일부분 기능을 서비스(httpd(웹서비스 데몬) native 모듈 포함)하고있어 Web Server역할도 수행할 수 있다.
    - 요청에 대한 웹페이지나 결과값을 동적으로 생성 해주기 위한 역할을 수행하는 자바 프로그램
    - SpringMVC에서는 DispatcherServlet이라는 FrontController 역할을 수행하는 Servlet이 존재하여 요청을 다른 컨트롤러에게 위임하는 방식으로 처리
    - Root WebApplicationContext는 Service, datasource,repositories 들을 포함하고 있는 Context이고 Servlet WebApplicationContext는 RootWebApplicationContext를 상속받아 구현된 Context로 주로 Controller, Intercepter, ViewResolver, HandlerMapping 등 과 같은 빈들이 존재한다.
        - HandlerMapping : 요청을 분석하여 맵핑된 Controller확인
        - HandlerAdapter : Controller 에게 요청을 보내는 역할
        - ViewResolver : Controller 에서 view를 return시 해당 view를 찾아 리턴해주는 역할
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bf36ad3-0719-431a-b1e2-3f429aeb690d/6bb4ac26-f69e-44ae-bae6-6f9286f63120/Untitled.png)