# API 문서

## 요청 경로 관련(필독)

http://localhost:5000 을 base url로 설정해주세요.

ex) [GET] http://localhost:5000/live-event

## Http status code 관련(필독)

* 요청 성공시 `POST` 요청의 경우는 `201`, 나머지는 `200`을 반환합니다.
* 요청 실패시 
  * `404` - 해당 리소스를 찾을 수 없습니다.
  * `400` - request body가 잘못되었습니다. response body에서 원인을 확인 할 수 있습니다.

## 1. GET /live-event
- ### Description
  모든 이벤트 리스트를 가져옵니다.
- ### Request parameter
  None
- ### Response

  |Field name|Type|Description|
  | ---------- | ---------- | ----------------------------------------- |
  |liveEvents|LiveEvent[]|모든 이벤트 리스트를 가져옵니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    liveEvents: [{
      id: string,
      title: string,
      status: "scheduled" | "live" | "finished",
      productIds: number[],
    }]
  }
  ```

  
## 2. GET /live-event/:id/products
- ### Description
  이벤트 id로 검색된 상품 리스트를 가져오기 위한 api입니다.
- ### Request parameter
  |Field name |Type |Description|  
  | ---------- | ---------- | ----------------------------------------- |  
  |id|string|이벤트의 id 값입니다.|
  
- ### Response
  | Field name | Type       | Description                               |
  | ---------- | ---------- | ----------------------------------------- |
  |products |Product[] |id로 검색된 이벤트의 상품 리스트입니다. |
  ```typescript
  HTTP/1.1 200 OK
  {
    products: [{
          id: string,
          name: string,
          thumbnail: string,
          price: number
      }]
  }
  ```
## 3. POST /live-event 
- ### Description
  새로운 이벤트를 등록하기 위한 api입니다.
- ### Request parameter
  None
- ### Request body
  | Field name | Type       | Description                               |
    | ---------- | ---------- | ----------------------------------------- |
  | title      | string     | 이벤트의 제목입니다.                      |
  | status     | LiveStatus | 이벤트의 상태입니다.                      |
  | productIds | number[]   | 이벤트가 보유중인 상품의 id 리스트입니다. |
- ### Response

  ```typescript
  HTTP/1.1 201 Created
  {
      id : string,
      title : string,
      status : "scheduled" | "live" | "finished",
      productIds : number[],
  }
  ```

## 4. PATCH /live-event/:id
- ### Description
  이벤트 정보 수정을 위한 api입니다.
  
- ### Request parameter
  |Field name|Type|Description|
  | ---------- | ---------- | ----------------------------------------- |
  |id|string|이벤트의 id 값입니다.|
  
- ### Request body
  
  | Field name | Type       | Description                               |
  | ---------- | ---------- | ----------------------------------------|
  | title      | string     | 이벤트의 제목입니다.                      |
  | status     | LiveStatus | 이벤트의 상태입니다.                      |
  | productIds | number[]   | 이벤트가 보유중인 상품의 id 리스트입니다. |
  
  ### Response
  None
  ```typescript
  HTTP/1.1 200 OK
  ```

## 5. DELETE /live-event/:id
- ### Description
  이벤트를 삭제하기 위한 api 입니다.
- ### Request parameter
  |Field name|Type|Description|
    | ---------- | ---------- | ----------------------------------------- |
  |id|string|이벤트의 id 값입니다.|
- ### Response
  None
  ```typescript
  HTTP/1.1 200 OK
  ```
## 6. GET /product/:id
- ### Description
  특정 상품의 정보를 가져오기 위한 api 입니다.
- ### Request parameter
  |Field name|Type|Description|
      | ---------- | ---------- | ----------------------------------------- |
  |id|string|상품의 id 입니다.|

- ### Response
  |Field name|Type|Description|  
    | ---------- | ---------- | ----------------------------------------- |
  |id|string|상품의 id 값입니다.|
  |name|string|상품의 이름입니다.|
  |thumbnail|string|상품의 썸네일 주소입니다.|
  |price|number|상품의 가격입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
      id: string,
      name: string,
      thumbnail: string,
      price: number
  }
  ```
## 7. GET /product
- ### Description
  특정 상품의 정보를 가져오기 위한 api 입니다.
- ### Request parameter
  |Field name|Type|Description|
        | ---------- | ---------- | ----------------------------------------- |
  |id|string|상품의 id 입니다.|

- ### Response
  
  |Field name|Type|Description|  
      | ---------- | ---------- | ----------------------------------------- |
  |id|string|상품의 id 값입니다.|
  |name|string|상품의 이름입니다.|
  |thumbnail|string|상품의 썸네일 주소입니다.|
  |price|number|상품의 가격입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
      id: string,
      name: string,
      thumbnail: string,
      price: number
  }
  ```
