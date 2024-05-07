# 웹 서버
## 단일 스레드 웹 서버

- 한번에 하나씩 요청을 처리한다.
- 트랜잭션이 완료되면, 다음 커텍션이 처리된다.
- 성능문제가 발생할 가능성이 매우 높다.

![image](https://github.com/Zero-ToHero/202404-http-perfect-guide/assets/71249347/18503a00-2c9a-4775-8ca8-89271a10fc40)

## Event Loop 기반의 단일 스레드 웹 서버

일반적으로 `Node.js` 는 싱글 스레드(단일 스레드) 기반의 웹서버로 알려져 있다.

그렇다면 이러한 단일 기반 스레드의 웹 서버들은 어떻게 **많은 사용자의 요청을 성능적 제한 없이 처리가 가능한가**

### Node.js

기본적으로 Node.js는 아래와 같은 특징을 가진다.

- **Non-Blocking I/O** : 하나의 요청을 처리하는 동안 다른 요청을 Blocking 하지 않는다.
- **asynchronous** : 비동기적 동작으로 콜백 함수를 실행한다고 이해하면 좋다.(순서의 상관 X)

위와 같은 두 가지 특성을 싱글스레드로 어떻게 처리가 가능한지가 중요하다.

Node.js는 `자바스크립트 엔진`과, 비동기 작업을 처리하는 `libuv`라는 라이브러리로 이루어져 있다.

자바스크립트 엔진엔 `하나의 call stack`이 존재하며, 이 call stack은 **차례대로 실행되기 때문에 비동기적인 처리가 불가능하다.**

이를  C언어 기반으로 작성된 libuv에서 `이벤트 루프`를 제공하기 때문이다. 이는 커널의 멀티 스레드를 이용하며, 최종적으로 Node.js는 `libuv`를 사용하고, 이가 멀티 스레드로 동작하기 때문에 비동기 처리가 가능하다.

![image](https://github.com/Zero-ToHero/202404-http-perfect-guide/assets/71249347/b8f8237c-92c6-4f94-ad4f-0c550db7b68b)

1. 들어온 요청은 `Event Queue` 에 추가된다.
2. 이벤트 루프는 `Event Queue` 를 살펴, 선착순으로 요청을 처리한다.
3. 요청은 `Internal C++ Thread Pool`로 전달 되며, 여러 요청이 처리된다. 동시에 `EventLoop`는 `Queue`에 요청이 있는지 확인하여 `Thread Pool`로 가져온다.
4. 수행을 마치면, `Call back 함수`와 `EventLoop`를 통해 응답을 전달한다.

## 다중 멀티스레드

기본적으로 다중 멀티스레드의 경우 대표적으로 Tomcat이 존재한다. 그럼 Tomcat의 동작 원리에 대해 간단하게 알아보자.

![image](https://github.com/Zero-ToHero/202404-http-perfect-guide/assets/71249347/a26e27bb-4b24-41fa-bc47-65032af3cc0f)

기본적으로 작업이 주어지면 `Thread Pool`실행자에게 전달되고 지정된 `Thread`에 할당 된다. Thread가 작업을 완료하면, 다른 Thread를 요청하며, 사용가능한 Thread가 없을 경우 대기하거나 종료할 수 있다.

Tomcat의 경우 기본적으로 아래와 같은 옵션들이 있으며, 대충이나마 동작을 유추해 볼 수 있다.

- **MaxConnections :** 서버가 요청을 처리할 수있는 `Connection의 수`를 의미(기본값은 8192)
- **AcceptCount :** Connection수가 `MaxConnection`에 도달했을 경우 추가적인 `Connection 요청을 대기시키는 공간(Queue)`입니다.(기본값은 100)
- **MaxThread :** 요청을 처리하는 `Thread`의 최대 수 처리될 수 있는 동시 요청의 최대 수를 결정(기본값은 200)

## 다중 멀티 스레드의 제약과 Reactive
멀티 스레드면 무수한 요청에 대해 동시적으로 처리가 가능한가? `scaleOut` 이 있을 수 있지만, 이는 어디까지나 제한적이다.(비용적 측면)

그렇다면 Spring은 어떻게 이러한 대용량에 대해 방어할 수 있을까? 이는 위의 Node.js와 같은 방식이 해답이 될 수 있다.

![image](https://github.com/Zero-ToHero/202404-http-perfect-guide/assets/71249347/86344ab6-e88a-40d5-a512-8c4361a0cf1c)

Spring도 `EventLoop`를 통한 처리방식이 가능하며, 이를 통해 많은 트래픽에 대해서도 안정적으로 서비스 제공이 가능하다.

### WebFlux & Netty
![image](https://github.com/Zero-ToHero/202404-http-perfect-guide/assets/71249347/1c9411a3-f080-4c5d-b92b-883f0a74dfa6)
