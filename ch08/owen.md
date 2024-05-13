# 통합점: 게이트웨이, 터널, 릴레이

## 초창기 Interface CGI

시간이 흐를수록 초기 웹의 정적페이지 제공에서 유저의 이름을 웹 페이지에 나타내고 싶거나 서버에서 정보를 가공하여 유저의 요청에 동적으로 콘텐츠를 만들어주고 싶은 다양한 요구사항(동적 페이지)이 생기기 시작함.

이를 위해 CGI(Common Gateway Interface)가 등장했으며, 이는 정적 콘텐츠 뿐만 아니라 사용자의 동적 요청을 CGI규격을 준수한 프로그램에서 처리하고 그 결과를 HTML로 생성할 수 있게됨.

이런 CGI의 동작방식은 **클라이언트의 요청이 있을 때 마다 독립적인 프로세스를 생성 한다는 특이점**이 있다. 이는 다르게 말하면 하나의 요청에 대해 하나의 자바 프로세스가 동작하는 것이며, 결국 이는 요청이 많아질수록 시스템에 부하가 발생하는 `성능적 비용`이 발생한다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/665f9d4c-d514-409d-90e9-99682ca7cc56/Untitled.png)

## 대안

이 문제 해결을 위해 **Fast CGI**가 개발되었으며, 이는 데몬으로 동작함으로써 새로운 프로세스를 만들고 제거하면서 생기는 성능 저하 문제를 해결함. 가령 PHP의 경우 FastCGI 모드로 동작이 가능한. `PHP-FPM(FastCGI Process Manager)` 가 있음.

다른 방법으로는 **WSGI(Web Server GateWay Interface)** 가 있으며, 파이썬의 경우 데몬 방식에도 `mod_wsgi` 모듈을 사용한다. **mod_wsgi 모듈**은 위에서처럼 **웹 서버 내장 방식**으로도, **별도의 데몬 방식**으로도 실행이 가능하다.(ASGI도 있음)

<aside>
⚠️ WSGI

WSGI는 웹서버와 파이썬으로 작성된 웹 응용 프로그램 간의 표준 **인터페이스**를 말한다**.**

</aside>

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/dde9438a-651b-4a69-a6b8-92fda2cedba0/Untitled.png)

이후 애플리케이션을 별도의 데몬으로 처리하는 방식이 발전함에 따라 애플리케이션 전용 데몬인 웹 애플리케이션 서버 방식으로 발전했다.(**WAS 방식)

JAVA**에선 Servlet이 등장하였으며, 웹 서버와 같은 프로세스 속에서 콘텐츠를 생성하는 프로그램이 작동하기 때문에 CGI처럼 새로운 프로세스를 매번 실행할 필요가없어서, 비교적 빠른 속도를 갖춤.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/bba3e91b-be48-4468-acd3-9cffc94c7030/Untitled.png)

기본적으로 `Servlet` 은 `CGI` 와 기술 체계가 매우 유사하다. `CGI` 가 기존 요청에 대해 프로그램을 실행하는 방식이라면, `Servlet` 는 요청별로 새로운 `Servlet` 을 실행하는 방식이다. 단, `Servlet` 은 컨테이너를 통해 개별적으로 `Servlet` 의 생명주기를 관리한다는 점이 다르다.
