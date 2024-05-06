package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	port := "8080"

	if len(os.Args) > 1 {
		port = os.Args[1]
	}

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		os.Exit(1)
	}
	defer listener.Close()

	fmt.Printf("<<<Type-O-Serve Accepting on Port %s>>>\n\n", port)

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting: ", err.Error())
			os.Exit(1)
		}

		fmt.Printf("<<<Request From '%s'>>>\n", conn.RemoteAddr())

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()

	reader := bufio.NewReader(conn)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading:", err.Error())
			return
		}
		fmt.Print(line)

		fmt.Println("<<<Type Response Followed by '.'>>>")

		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			text := scanner.Text()
			if text == "." {
				break
			}
			fmt.Fprintln(conn, text)
		}
	}
}
