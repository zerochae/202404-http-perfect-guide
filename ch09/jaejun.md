웹 크롤러에게 해당 웹사이트의 크롤링 규칙을 지정한다. 웹사이트 소유자는 robots.txt 파일을 사용하여 웹 크롤러가 특정 페이지를 방문하지 않도록 할 수 있다.

```jsx
# 모든 웹 크롤러에게 적용되는 기본 설정
User-agent: *
Disallow: /private/      # "/private/" 디렉토리의 모든 페이지에 접근을 금지.
Crawl-delay: 10         # 웹 크롤러가 다음 페이지를 방문하기 전에 기다리는 시간 (초 단위)

# 특정 웹 크롤러에게만 적용되는 설정
User-agent: Googlebot
Disallow: /restricted/  # Googlebot에게 "/restricted/" 디렉토리의 모든 페이지에 접근을 금지합니다.

User-agent: Bingbot
Allow: /public/         # Bingbot에게 "/public/" 디렉토리의 모든 페이지에 접근을 허용합니다.

```

1. User-agent: 이 항목은 어떤 웹 크롤러에게 해당 규칙을 적용할지를 지정한다. *는 모든 웹 크롤러를 의미하고, Googlebot이나 Bingbot과 같이 특정 크롤러를 명시할 수도 있다.
2. Disallow: 이 항목은 특정 디렉토리나 파일에 대한 크롤링을 금지한다. 예를 들어, /private/ 디렉토리의 모든 페이지에 대한 접근을 금지하는 설정이다. Allow와 함께 사용하여 특정 디렉토리나 파일에 대한 접근을 허용할 수도 있다.
3. Crawl-delay: 이 항목은 웹 크롤러가 다음 페이지를 방문하기 전에 대기해야 하는 시간을 지정합니다. 이를 통해 웹 서버에 과도한 부하를 주지 않고 크롤러의 속도를 제어할 수 있다.