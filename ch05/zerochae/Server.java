import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    public static void main(String[] args) {
        int port = 8080; // 포트 설정
        
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("<<<Type-O-Serve Accepting on Port " + port + ">>>\n");

            while (true) {
                try (Socket clientSocket = serverSocket.accept()) {
                    System.out.println("<<<Request From '" + clientSocket.getInetAddress().getHostName() + "'>>>");

                    BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    String line;
                    while ((line = in.readLine()) != null && !line.isEmpty()) {
                        System.out.println(line);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
