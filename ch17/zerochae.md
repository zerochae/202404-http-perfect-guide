# 내용 협상과 트랜스코딩

## 내용 협상

- 서버가 클라이언트의 요청에 따라 다양한 응답을 제공
- 우리 서비스는 Lang값을 header에 포함하여 (서로 약속하여), 다양한 응답을 받아 처리하고 있음
- 우리 서비스는 클라이언트 주도 협상

## 클라이언트 주도 협상

```ts
// 클라이언트 주도 협상 예시, event api 호출...

const headers = {
    ...
    "Lang": "ko",
    ...
  };

eventApi.call(headers)
```

```java
// 서버에서 client에서 보낸 lang값을 받아서 처리
  public PageVo<EventListVo> getEventList(String lang, ...) {

    PageVo<Event> eventPageVo = eventReader.findEventList(...);

    // lang값에 따라 다른 List를 return 
    return eventPageVo.map(event -> EventListVo.of(lang));
  }
```

## 서버 주도 협상

```ts
// 서버 주도 협상 예시, event api 호출...

const headers = {
    ... // headers에 lang값이 설정되어 있지 않은상태에서 요청
    // 'Accept-Language': en-US,en;q=0.9 --> 따로 보내지 않아도, 브라우저가 기본값으로 보낸다.
  };

eventApi.call(headers)
```

```java
// 클라이언트가 별도의 언어를 보내지않았지만, 서버가 알아서 보낸다. 
public PageVo<EventListVo> getEventList(String acceptLanguage, ...) {
        Locale defaultLanguage = Locale.ENGLISH

        PageVo<Event> eventPageVo = eventReader.findEventList(...);

        // 언어에 따라 이벤트 목록 변환
        return eventPageVo.map(event -> EventListVo.of(acceptLanguage ?? defaultLanguage);
    }
```
