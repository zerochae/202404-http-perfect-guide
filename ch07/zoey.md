# 8. 캐시

캐시의 유효기간 

<img width="415" alt="image" src="https://github.com/heeom/202404-http-perfect-guide/assets/64389364/1a0355fa-329d-4ea0-ab83-f6a251333813">

- Cache-Control 헤더의 max-age값
    - `max-age=<seconds>`
    - 클라이언트가 캐시된 리소스를 보관할 수 있는 최대 시간
    - `max-age=3600` 이면 해당 리소스의 유효기간이 1시간
- Expires 헤더
    - 캐시된 리소스의 만료 날짜 (GMT/UTC 형식으로 설정)
- max-age와 Expires 둘 다 설정되어 있는 경우에는 Cache-Control 헤더의 max-age값을 우선적으로 사용해서 캐시의 유효기간을 결정하고 Expires 값은 무시된다.
