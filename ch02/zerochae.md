# URL과 리소스

| 책   | 버스      | 은행계좌 | 사람         | 인터넷 |
|------|-----------|----------|--------------|--------|
| ISBN | 노선 번호 | 계좌번호 | 주민등록번호 | URL    |

- 리소스를 구분하기 위해서 모든 것이 그만의 표준화된 이름을 가지고 있다.
- URL은 인터넷의 리소스를 가리키는 표준이름
- URL은 전자정보 일부를 가리키고 그것이 어디에 있고 어떻게 접근할 수 있는지 알려준다.

## 2.1 인터넷의 리소스 탐색하기

- URL은 브라우저가 정보를 찾는데 필요한 리소스의 위치를 가리킨다.
- URL을 이용해 사람과 앱이 인터넷상의 수십억 개의 리소스를 찾고 사용하며 공유할 수 있다.
- 유저는 브라우저에 URL을 입력하고, 브라우저는 해당 리소스를 찾기 위해 적절한 프로토콜을 사용하여 메시지를 전송한다.
- URL = scheme + host + path (스킴://서버위치/경로)
- scheme(어떻게): URL의 첫부분, 웹 클라이언트가 리소스에 어떻게 접근하는지 알려준다.
- host(어디에): 두번째 부분, 서버의 위치이며 웹 클라이언트가 리소스가 어디에 호스팅 되어 있는지 알려준다.
- path(무엇을): 세번째 부분, 리소스의 경로이며, 서버에 존재하는 로컬 리소스가 요청받은 리소스가 무엇인지 알려준다.
- HTTP 프토콜이 아닌 다른 프로토콜 사용 가능

| mail                       | ftp                   | rtsp                   |
|----------------------------|-----------------------|------------------------|
| 메일                       | 파일 전송             | 실시간 스트리밍        |
| mailto:help@wirebarley.com | ftp://ftp.foo-bar.com | rtsp://www.foo-bar.com |

## 2.1.1 URL이 있기 전 암흑의 시대

- 웹과 URL이 있기 전(태고에..) 데이터 접근 방식이 있었다.
- URL이 있게되어, 여러 과정들이 단축됨
- 브라우저가, 알아서 해주는 영역이 많아서, 유저가 일일히 몰라도 됨

| before               | after                      |
|----------------------|----------------------------|
| ftp.foo-bar.com 접속 | ftp://foo-bar.com/some.xls |
| 로그인               |                            |
| 디렉토리 이동        |                            |
| 바이너리 변환        |                            |
| 다운로드             |                            |

## 2.2 URL 문법

- URL 문법은 스킴에 따라 달라진다.

<스킴>://<사용자이름>:<비밀번호>@<호스트>:<포트>/<경로>;<파라미터>?<질의>#<프래그먼트>

## 2.2.1 스킴: 사용할 프로토콜

- 주어진 리소스에 어떻게 접근할 것 인가

## 2.2.2 호스트와 포트

- 리소스를 호스팅하고 있는 장비와 그 장비 내에서 리소스에 접근할 수 있는 서버의 위치
- 호스트는 접근하려고 하는 리소스를 가지고 있는 인터넷상의 호스트 장비를 가리킨다.
- 포트는 서버가 열어놓은 네트워크 포트

```text
/etc/hosts

##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1 localhost
255.255.255.255 broadcasthost
::1             localhost
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section
```

- http://[::1]:4000
- localhost:4000
- <http://127.0.0.1:4000>

## 2.2.3 사용자 이름과 비밀번호

- 아래는 같은 동작을 한다.
- 출처: <https://stackoverflow.com/questions/10054318/how-do-i-provide-a-username-and-password-when-running-git-clone-gitremote-git>

```sh
git clone git@github.com:username/repository -- SSL 
git clone https://username@github.com/username/repository.git -- 비밀번호 요구
git clone https://token@github.com/username/repository.git -- 비밀번호 요구 
git clone https://username:password@github.com/username/repository.git
git clone https://username:tokenxxxxxxxxxx@github.com/username/repository.git
```

## 2.2.4 경로

- 리소스가 서버에 존재하는 위치
- wirebarley.com/login
- wirebarley.com/signup/complete

## 2.2.5 파라미터

- data uri 에서 사용
- data:mediatype;base64, (data...)
- data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
9TXL0Y4OHwAAAABJRU5E

## 2.2.6 쿼리

- key,value 한쌍 &로 구분

## 2.2.7 프라그먼트

- 리소스의 특정 부분을 가리킨다.
- #{dom id}
- 서버까지 전달되지 않음

## 2.3 단축 URL

- <https://zrr.kr/>
- <https://zerochae.github.io>
- <https://zrr.kr/4igD>

## 2.3.1 상대 URL

## 2.3.2 URL 확장

1. foo 입력
2. `www.` + 검색어 + `.com` 를 붙여서 <www.foo.com> 을 만든다

## 2.4 안전하지 않은 문자

- 데이터 유실 없이 URL을 전송할 수 있어야한다.
- 이스케이프 기능을 추가하여, 인코딩하도록 함

## 2.4.1 URL 문자 집합

- 컴퓨터의 기본 문자 집합 (US ASCII Character Set), 7비트 문자 인코딩 128개

1. 알파벳 (대문자 A-Z 및 소문자 a-z)
2. 숫자 (0-9)
3. 특수 문자: ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~
4. 공백 문자 (스페이스)
5. 제어 문자 (ex: 줄 바꿈, 탭 등)

## 2.4.2 인코딩 체계

- 비 라틴어 계열에서는 US ASCII 를 지원하지 않음
- 이것을 해결하기 위해, 이스케이프 문자열을 통해 인코딩을 한다. (16진 데이터로 표시)

## 2.4.3 문자 제한

- 몇몇 문자는 URL 에서 예약어로 되어있음

1. 공백 문자: URL에 직접적으로 사용할 수 없으며, 보통 "%20"으로 인코딩됩니다.
2. 해시 기호 (#): 주로 URL의 프래그먼트 식별자로 사용되므로, URL에서 직접 사용할 수 없습니다.
3. 물음표 기호 (?): 주소의 쿼리 문자열 시작을 나타내므로 직접 사용할 수 없습니다.
4. 등호 기호 (=): 주로 쿼리 매개변수와 값을 구분하는 데 사용되므로 URL에서 직접 사용할 수 없습니다.
5. 앰퍼샌드 기호 (&): 쿼리 문자열 내에서 여러 매개변수를 구분하는 데 사용되므로 직접 사용할 수 없습니다.
6. 등 기호 (/): 경로 구분자로 사용되며, URL에서 직접 사용할 수 없습니다.
7. 퍼센트 기호 (%): 보통 특수 문자의 인코딩을 표시하는 데 사용되므로 직접 사용할 수 없습니다.

## 2.5 스킴의 바다

- 교재 참고

## 2.6 미래

- URL의 단점: 리소스가 옮겨지면 URL을 더 이상 사용할 수 없음
- 이를 보완하기 위해 URN이 있다. --> 리소스가 이동하여도, 리소스를 가리키는 이름을 제공
- PURL 을 사용하면 URL로 URN의 기능을 제공할 수 있다.

## 2.6.1 지금이 아니면, 언제

- 매우 큰 작업임으로.. 시간이 걸린다
- 한동안 (언제까지..?) URL만 사용하게 될 것
