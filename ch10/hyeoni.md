# 10. HTTP/2.0
## 멀티 플렉싱
### 1. 정의
- 여러 데이터 스트림을 하나의 통신 채널로 결합하여 전송하는 기술로, 주로 네트워크 통신과 전송 매체에서 사용됩니다.
- 즉, 여러 데이터 소스를 하나의 물리적 채널에 결합하여 동시에 전송할 수 있게 하고, 이를 통해 채널의 대역폭을 최대한 활용하고 효율적으로 사용할 수 있게 함

### 2. 유형
- 1) 주파수 분할 다중화(FDM, Frequency Division Multiplexing)
    - 각 데이터 스트림이 서로 다른 주파수 대역을 사용하여 동시에 데이터를 전송함
    - 각 스트림은 고유한 주파수 대역을 할당받음
- 2) 시분할 다중화(TDM, Time Division Multiplexing)
    - 각 데이터 스트림이 시간 슬롯을 나누어 사용하여 데이터를 전송함
    - 각 스트림은 순서대로 정해진 시간 동안 채널을 사용함
- 3) 파장 분할 다중화(WDM, Wavelength Division Multiplexing)
    - 광학 통신에서, 파장 분할 다중화는 레이저 빛의 다른 파장(다른 색)을 사용하여 여러 반송파 신호를 단일 광섬유에 적용하는 기술
- 4) 코드 분할 다중화(CDM, Code Division Multiplexing)
    - 각 데이터 스트림이 고유한 코드로 인코딩되어 동시에 전송됨 
    - 수신자는 해당 코드를 사용하여 데이터를 복호화함
- [참고 사진 및 장단점 링크](https://itchipmunk.tistory.com/364)

## 중개 캡슐화 공격(Intermediary Encapsulation Attacks)
### 1. 정의
- HTTP/2.0의 2.0.10 이전 버전에서 발생한 공격으로, 개행 문자(CR, LF) 및 null문자와 같은 특정 문자로 헤더를 조작하여 공격하는 것 [출처 - CVE-2019-19330](https://nvd.nist.gov/vuln/detail/CVE-2019-19330)
- 이 공격은 주로 중간자 공격(Man-in-the-Middle Attack)의 변형으로 볼 수 있음 

## HPACK
- HTTP/2에서 사용되는 헤더 압축 방식
- HPACK은 헤더 필드를 압축하여 네트워크 대역폭을 절약하고, 빠른 성능을 유지하는 데 도움이 됨
- HPACK은 정적 및 동적 테이블을 사용하여 헤더를 압축함
- 정적 테이블에는 표준 HTTP 헤더가 포함되어 있으며, 동적 테이블은 현재 연결에 대한 컨텍스트별 헤더를 저장함
- 새로운 헤더가 전송될 때, HPACK은 이러한 테이블을 참조하여 중복을 최소화하고 필요한 경우 인덱스를 전송함
- HPACK은 Huffman 인코딩을 사용하여 문자열을 압축함
- Huffman 인코딩은 빈번히 사용되는 문자를 짧은 코드로, 드물게 사용되는 문자를 긴 코드로 매핑하여 압축 효율을 높임
- 이러한 방식으로, HPACK은 HTTP/2에서 헤더를 효율적으로 압축하여 빠른 성능과 높은 대역폭 활용률을 제공함
- 참고 링크
    - [참고 1](https://medium.com/geekculture/hpack-header-compression-format-for-http-2-155a0b4934f7)
    - [참고 2](https://httpwg.org/specs/rfc7541.html)
