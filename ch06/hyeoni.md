# 06. 프락시

### 6.6.2 TRACE 메서드 관련
#### TRACE
- TRACE: Client - Server Side 간 Loop back Test 를 수행하여 프록시 흐름에 유용한 디버깅 메커니즘을 제공함
- TRACE는 XST(Cross-site Tracing) 공격에 취약하다고 함

#### XST(Cross-site Tracing)
- XST공격 : HTTP TRACE 메소드를 지원하는 웹 서버를 대상으로 TRACE 요청을 보내서 사용자의 중요한 쿠키 값을 탈취하는 공격임
- HTTP TRACE 응답에는 인증 데이터 및 HTTP 쿠키 내용을 포함한 모든 HTTP 헤더가 포함되어 있음
- HTTPOnly 플래그가 설정되어 있어도 TRACE 메서드를 사용할 수 있으면 쿠키 정보를 획득할 수 있음
 
- [참고 링크](https://www.radware.com/cyberpedia/application-security/cross-site-tracing-xst/)

+ 아이폰에서는 개인 정보를 보호하려고 `크로스 사이트 추적 방지` 기능이 기본적으로 설정되어 있음
