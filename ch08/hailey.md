# 통합점: 게이트웨이, 터널, 릴레이

## MAC Address (Media Access Control address)
- 인터넷을 할 수 있는 이더넷 기반 기기에는 모두 다 하나씩 할당되어 있는 고유한 ID
- PC의 랜카드나 스마트폰의 와이파이 모듈에도 1대씩 할당
- 맥 주소 확인
  - ifconfig | grep "ether"
  - 시스템 설정 -> 네트워크 -> 고급 -> 하드웨서 -> MAC 주

## SSL (SECURE SOCKETS LAYER)
- 웹사이트와 브라우저 사이(또는 두 서버 사이)에 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 표준 기술
- https로 시작하는 웹사이트는 SSL/TSL 이라는 보안 프로토콜을 사용하고 있는 것
- 443 포트를 기본으로 사용하는 TCP 기반의 프로토콜
- SSL 핸드셰이크를 수행
![image](https://github.com/hwyi21/202404-http-perfect-guide/assets/58624211/1f452219-2dbd-43e3-8acd-197f1b4e3397)
1. 어떤 방식으로 데이터를 주고 받을 지 협상
2. SSL 세션 생성 후 데이터 전송
3. 세션 종료