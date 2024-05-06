# 05.웹서버

### 5.2 간단한 펄 웹 서버 부분
#### [코드 원문](https://github.com/soarpenguin/perl-scripts/blob/master/type-o-serve.pl)
#### [소켓 참고 링크](https://www.tutorialspoint.com/perl/perl_socket_programming.htm)
```perl
# Perl 인터프리터(/usr/bin/perl)에 대한 경로를 지정하고 코드의 잠재적인 문제를 디버깅하는 데 도움이 되는 경고(-w)를 활성화함
#!/usr/bin/perl -w

use Socket; # 소켓 기능 관련 모듈
use Carp; # 에러 및 경고 관련 모듈
use FileHandle; # 파일 처리 관련 모듈

# [1. 포트 번호 설정]
# 지정된 포트가 있으면 그 포트 번호를 사용하고, 아니면 8080 사용
$port = (@ARGV ? $ARGV[0] : 8080);

# [2. 로컬 TCP 소켓을 생성하고 연결을 수신하도록 설정]
# 'tcp'라는 프로토콜 이름과 연관된 프로토콜 번호를 가져옴
$proto = getprotobyname('tcp');
# TCP 소켓 S를 생성, PF_INET(IPv4)와 SOCK_STREAM(TCP 연결) 소켓 타입을 사용, 소켓 생성에 실패하면 스크립트 종료됨
socket(S, PF_INET, SOCK_STREAM, $proto) || die;
# 소켓 S에 SO_REUSEADDR 소켓 옵션을 설정하여 소켓을 즉시 재사용할 수 있도록 함, 설정에 실패하면 스크립트 종료됨
setsockopt(S, SOL_SOCKET, SO_REUSEADDR, pack("l", 1)) || die;
# 소켓 S를 지정된 포트($port)에 모든 네트워크 인터페이스 (INADDR_ANY)에 바인딩함, 바인딩에 실패하면 스크립트 종료됨
bind(S, sockaddr_in($port, INADDR_ANY)) || die;
# 소켓 S를 연결 수신 대기 상태로 설정, 최대 대기 큐 길이는 SOMAXCONN(시스템 정의 상수), 설정에 실패하면 스크립트 종료됨
listen(S, SOMAXCONN) || die;

# [3. 메세지 출력]
printf("    <<<Type-O-Serve Accepting on Port %d>>>\n\n",$port);

while (1)
{
    # [4. C와의 연결 기다림]
    # 소켓 S에서 클라이언트 연결 (C)을 수락하고 클라이언트 주소/포트 정보($cport_caddr)를 저장함
    $cport_caddr = accept(C, S);
    # 클라이언트 주소와 포트를 sockaddr 구조체에서 분리하여 개별 변수 ($cport 및 $caddr)에 저장함
    ($cport,$caddr) = sockaddr_in($cport_caddr);
    # 라이언트 소켓 C에서 자동 플러시 모드를 설정하여 데이터가 즉시 클라이언트로 전송되도록 함
    C->autoflush(1);

    # [5. 누구랑 연결됐는지(요청이 왔는지) 출력]
    # gethostbyaddr 함수를 사용하여 클라이언트의 IP 주소 ($caddr)를 호스트 이름 ($cname)으로 해석함
    $cname = gethostbyaddr($caddr,AF_INET);
    printf("    <<<Request From '%s'>>>\n",$cname);

    # [6. 빈 줄까지 요청 메시지를 읽고 화면에 출력]
    # 빈 줄을 만날 때까지 클라이언트 소켓 C에서 데이터를 한 줄씩 읽음
    while ($line = <C>)
    {
        # 클라이언트 요청을 풀력함
		print $line;
        # 현재 줄이 빈줄인지 확인하고, 맞으면 종료
		if ($line =~ /^\r/) { last; }
    }

    # [7. 응답 메시지 프롬프트 및 응답 라인 입력, "."이 나올 때까지 클라이언트에 응답 라인을 보냄]
    # 응답을 입력하고 응답의 끝을 나타내기 위해 마침표 (.)를 입력하라는 메시지를 출력함
    printf("    <<<Type Response Followed by '.'>>>\n");

    # 표준 입력(STDIN)에서 사용자 응답을 한 줄씩 읽음
    while ($line = <STDIN>)
    {
        # 입력된 줄에서 캐리지 리턴 문자(\r, \n) 제거
		$line =~ s/\r//;
		$line =~ s/\n//;
        # 사용자가 입력한 줄이 마침표 (.)로 시작하는지 확인하고, 맞으면 종료
		if ($line =~ /^\./) { last; }
		print C $line . "\r\n";
    }

    # C 닫음
    close(C);
}
```

### 5.4.3 ident를 통해 클라이언트 사용자 알아내기
#### ident 프로토콜
- ident 프로토콜: 특정 TCP 연결의 사용자를 식별하는 데 도움이 되는 인터넷 프로토콜
- 네트워크 관리 및 보안을 지원하기 위해 처음에 설계되었으며, 특정 TCP 연결의 사용자에 대한 정보를 요청하기 위해 서버가 포트(일반적으로 113)에서 클라이언트에 쿼리할 수 있도록 작동함
- 그러나 현대의 개인정보 보호 문제와 남용 가능성으로 인해 무단자에게 사용자 정보를 부적절하게 노출시킬 수 있기 때문에 사용이 감소했으며, 이러한 위험을 완화하기 위해 암호화된 연결 및 엄격한 액세스 제어와 같은 강화된 보안 조치가 권장됨
