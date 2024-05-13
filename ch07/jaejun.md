- cache hit : 캐시 스토어(redis)에 데이터가 있을 경우 바로 가져옴 (빠름)
    - 캐시 적중
    - 캐시 재검사 적중
- cache miss : 캐시 스토어(redis)에 데이터가 없을 경우 어쩔수없이 DB에서 가져옴 (느림)
    - 캐시 부적

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bf36ad3-0719-431a-b1e2-3f429aeb690d/4d7b4cc6-3f07-47c6-be01-33a8745e4ccd/Untitled.png)

- 캐시를 사용하기하려면 데이터 정합성 문제가 발생
    - 캐시 읽기 전략(Read Cache Strategy)
    - 캐시 쓰기 전략(Write Cache Strategy)

- 캐시 읽기 전략
    - **Look Aside 패턴**
    - **Read Through 패턴**
- 캐시 쓰기 전략
    - **Write Back 패턴**
    - **Write Through 패턴**
    - **Write Around 패턴**
    
- 캐시 읽기 + 쓰기 전략 조합
    - **Look Aside + Write Around 조합**
    - **Read Through + Write Around 조합**
    - **Read Through + Write Through 조합**
    
- 캐시적용시 주의점
    - 캐시를 구성할 때 기본 만료 정책을 설정해야 한다(TTL)
    - 캐시 서버가 죽어도 서버의 영향이 없어야 한다.
    - 캐시는 휘발성이므로, 중요한 정보 민감한 정보는 자제한다.
- [https://inpa.tistory.com/entry/REDIS-📚-캐시Cache-설계-전략-지침-총정리](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EC%BA%90%EC%8B%9CCache-%EC%84%A4%EA%B3%84-%EC%A0%84%EB%9E%B5-%EC%A7%80%EC%B9%A8-%EC%B4%9D%EC%A0%95%EB%A6%AC)

---

**HTTP 서버 재검사**

- **Last-Modified**
    - 소스의 마지막 갱신 시각으로 검증
- **If-Modified-Since**
    - 리소스의 식별자를 기준으로 검증
- **ETag / If-None-Match**
    - 앞서 설명한 방법은 밀리 세컨드 단위로 시각을 설정할 수 없다는 한계점이 존재
    - 특정 버전의 리소스를 식별하기 위해 사용하는 식별자

캐시 제어

- **no-cache**
    - 리소스에 대한 캐시를 생성하지만, 리소스를 요청할 때 원 서버에 항상 캐시 유효성 검증
- **no-store**
    - no-store 는 리소스에 대한 캐시를 생성하지 않음