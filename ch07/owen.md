# Overview

Cache란 자주 사용하는 데이터나 값을 미리 복사해 놓는 임시 장소를 가리킨다. 아래와 같은 저장공간 계층 구조에서 확인할 수 있듯이, 캐시는 저장 공간이 작고 비용이 비싼 대신 빠른 성능을 제공한다.

# OS

프로그램 실행시 데이터는 먼저 RAM에 로드되고 CPU는는 프로세스 메모리의 코드 영역에서 프로그램을 실행하려 한다.

CPU는 데이터 처리를 위해 메모리 접근이 필요한 경우 먼저 CPU 내부의 캐시를 검색(L1 -> L2 -> L3)하고 없을 경우 `캐시 미스`가 발생한다.

캐시 미스가 발생하면 데이터를 캐시에 저장하고 이후 프로그램의 실행 진행시 캐시를 먼저 검색하여 데이터를 처리한다. 즉 메모리까지의 접근 시간을 줄여 접근 속도를 빠르게 가져갈 수 있다.

이때 CPU의 내부 캐시에는 계층이 있습니다. 보통 L1, L2, L3 레벨로 구성됩니다.

- 레벨 1 캐시(L1 Cache) : CPU 코어에 가장 가까우며, 빠른 속도로 데이터 접근이 가능.
- 레벨 2 캐시(L2 Cache) : L2 캐시는 L1 캐시보다는 느리지만 큰 용량을 가지고 있다. 여러 개의 코어가 공유하는 경우가 많다.
- 레벨 3 캐시(L3 Cache) : L1, L2보다 더 큰 용량을 가지고 있으며, 여러 개의 코어 또는 캐시를 공유하는 프로세서에서 사용된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/8ae50e19-f2f6-4805-ae58-0d80f14fd4e1/Untitled.png)

# 전략

## 읽기전략

### **1. Look(Read)-Aside 패턴**

일반적으로 '지연로딩'이라고 한다. 가장 일반적인 캐싱 패턴으로 해당 전략의 경우 Applcation이 먼저 캐시에 필요한 데이터를 요청하고, 만일 해당 데이터가 있다면, Cache에서 해당 값을 반환하지만, 없다면, DB에 해당 데이터를 요청하여, 해당 값을 다음 시도를 위해 Cache에 저장하고 호출자인(Client)에 반환하는 방식이다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/b26f4ad5-d36e-4746-81ac-9c4102a38b77/Untitled.png)

### 2. Read Through 패턴

Look-Aside 패턴과 다르게 캐시에서만 데이터를 읽어오는 전략이다.

대부분은 Look-Aside 패턴과 비슷하지만, Cache에 저장하는 주체가 Application냐, DataBase이냐의 관점 차이가 있다.

Look-Aside의 경우 Application에서 캐시 조회후 없으면 DB를 조회하고 해당 값을 Cache에 넣는 구조지만, Read-Through의 경우 없을경우 Cache에서 DataBase를 조회하고, 해당 값을 Cache에 넣는 구조이다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/4518f377-43f0-45ae-9d65-14244e650464/Untitled.png)

## 쓰기전략

### **1. Write Back(Behind) 패턴**

Cache와 동시에 DataBase 동기화를 진행한다.Data insert시에, 바로 DataBase에 저장하는 것이아니라, Cache에 모아둔 상태에서 일정 시간 이후에 배치등의 스케줄링을 통해 DB에 일괄적으로 반영한다. 보통은 쓰기 작업량이 많은 워크로드에 적합하다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/33e907ad-5de4-462d-a948-2ea110cbaa78/Untitled.png)

### **2. Write-Through 패턴**

Write-Back패턴과는 조금은 다른 개념으로 DB와 캐시에 동시적으로 데이터를 저장하는 전략이다.

데이터를 저장시에 캐시에 저장 후 바로 DB에 저장한다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/6026c840-4200-4bc1-bd06-e720396b59b7/Untitled.png)

### **3. Write-Around**

우리가 기존에 하던 방식과 동일하다.(DB 서버에 직접적으로 삽입)

Cache를 따로 갱신하진 않으며, Data를 조회시 캐시에 없을 경우 DataBase와 캐시에 데이터를 저장한다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c77a2c20-9831-4c8a-9134-2d59b9750ec2/5b5198e4-8d5f-4d5b-b458-ec4ae16dffd0/Untitled.png)
