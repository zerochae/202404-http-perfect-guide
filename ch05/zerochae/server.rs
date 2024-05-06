use std::io::{Read, Write};
use std::net::{TcpListener};

fn main() {
    let port = std::env::args()
        .nth(1)
        .unwrap_or_else(|| "8080".to_string());
    let listener = TcpListener::bind(format!("127.0.0.1:{}", port)).expect("Failed to bind port");

    println!("<<<Type-O-Serve Accepting on Port {}>>>\n", port);

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                println!("<<<Request From '{}'\n>>>", stream.peer_addr().unwrap());

                let mut buffer = [0; 1024];
                stream.read(&mut buffer).unwrap();

                let request = String::from_utf8_lossy(&buffer[..]);
                println!("{}", request);

                println!("<<<Type Response Followed by '.'>>>");
                let mut response = String::new();
                loop {
                    let mut input = String::new();
                    std::io::stdin().read_line(&mut input).unwrap();
                    response.push_str(&input);
                    if input.trim() == "." {
                        break;
                    }
                }

                stream.write_all(response.as_bytes()).unwrap();
            }
            Err(e) => {
                eprintln!("Failed to accept connection: {}", e);
            }
        }
    }
}
