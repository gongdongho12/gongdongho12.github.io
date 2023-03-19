---
emoji: 🧑‍💻🐳
title: 윈도우위에서 나스 돌리기
date: '2023-03-20 12:34:00'
author: 강동호
tags: window docker nas
categories: 윈도우 도커
---

## 작업 개요
일반적으로 개발회사를 입사하게 되면 맥북프로를 받으면서 윈도우와는 결별하게 되는데, 이 남는 윈도우 PC를 유익하게 활용할 방법을 공유

## 윈도우 자동로그인 설정
나스를 켰을때 로그인을 위해 직접 화면을 연결해야 하는 상황을 방지하기 위해 자동로그인을 설정합니다

윈도우 10 2004 버전 이후와 이전으로 나뉘는데 이전 버전이라면 아래와 같습니다.

`Win + R`로 `netplwiz` 를 입력하고 계정을 선택한 뒤 `사용자 이름과 암호를 입력해야 이 컴퓨터를 사용할 수 있음`을 체크합니다

### 만약 체크박스가 보이지 않는다면
`Win + R`로 `regedit` 를 입력한 뒤 레지스트리 편집기가 열리면 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\PasswordLess\Device`을 들어가서 `DevicePasswordLessBuildVersion` 값을 확인합니다

만약 값이 없다면, 새로 생성을 하고 기존에 값이 있다면 16진수 `0x00000002`인 값 데이터를 `2`로 업데이트 합니다

다시 자동로그인 설정으로 들어가게 되면 체크박스가 보이고 이름과 사용자명을 클릭하여 로그인 합니다

## 윈도우 10 FTP 설정
```
FTP 또한 Docker를 활용하여 설정이 가능하지만,
운영체제에서 기본적으로 지원하는 기능을 사용하는 것이 성능적으로 가장 안정적이고
윈도우 파일시스템을 베이스로 전송하기에 좀 더 효율적이다고 판단했습니다
```
윈도우의 검색을 활용하여 `기능`을 검색하면 `Windows 기능 켜기/끄기`를 클릭합니다

우선 선택해 줄 것이 `인터넷 정보 서비스 > FTP 서버 > FTP 서비스` 그리고 `인터넷 정보 서비스 > 웹 관리 도구 > IIS 관리 콘솔`을 체크해 줍니다

두개가 활성화되면 IIS 관리자를 실행합니다

### FTP 사이트 추가
좌측 Desktop 항목에서 `사이트`를 우클릭으로 클릭한 뒤 `FTP 사이트 추가...` 기능을 선택합니다

사이트 정보를 입력하게 되는데 사이트 이름은 그냥 `NAS_FTP`로 지정하고 실제 경로는 지정하고 싶은 디렉토리를 선택합니다
저는 D드라이브의 data 디렉토리를 선택하여 쉐어했습니다
> 추후 영상이나 큰 파일을 쉐어할 수 있도록 큰 사이즈의 볼륨으로 잡아주는 것이 좋은것 같더라구요
> 
> 추가적으로 WSL이 고도화 됨에 따라 여러 윈도우의 볼륨도 타 드라이브를 선택할 수 있습니다

#### 바인딩 및 SSL 설정
바인딩은 모든 대상으로 포트는 기본값인 21로 지정합니다

그리고 항상 FTP가 실행되어야 24시간 활용될 수 있기에 `자동으로 FTP 사이트 시작`을 선택합니다

SSL은 저희가 간의로 사용하기에는 세팅 과정이 더 복잡해질 수 있기에 `SSL 사용 안 함`을 선택하고 다음으로 넘어갑니다

#### 인증 정보 설정
인증은 `기본`을 선택하고 엑세스 허용에 `모든 사용자`를 지정합니다
사용 권한은 `읽기`와 `쓰기` 모두를 체크한 뒤 마무리 합니다

직접 사용자를 만들어 주어야 합니다
윈도우 검색에 `컴퓨터 관리`를 입력한 뒤 좌측 메뉴에서 `컴퓨터 관리 > 시스템 도구 > 로컬 사용자 및 그룹 > 사용자`를 클릭해줍니다

그러면 사용자 목록이 나오게 되고 FTP에서 사용할 사용자를 추가하기 위해, 목록 상자 내에서 마우스를 우클릭하여 `새 사용자` 를 선택합니다

`사용자 이름`은 FTP의 로그인 ID에 해당하고 `전체 이름`은 계정의 고유 키, `암호, 암호 확인`은 FTP의 로그인 비밀번호에 해당하기에 원하는 값을 입력한다

암호 사용 기간 제한 없음을 클릭하여 추후에 만료를 방지한 이후 `만들기`로 생성합니다

#### 방화벽 허용
이후 윈도우 검색에 `Windows Defender`를 검색한 뒤 좌측의 인바운드 규칙을 선택하여 `FTP 서버 보안(FTP SSL 트래픽 인)`, `FTP 서버 수동`, `FTP 서버(FTP 트래픽 인)`을 규칙 사용합니다

#### 서비스 시작
윈도우 검색에 `service`를 검색하여 서비스 앱을 실행합니다

`Microsoft FTP Service`을 우클릭으로 선택한 뒤 `다시 시작`을 클릭하여 이전에 설정했던 내용들을 반영하여 재시작해줍니다

이후 모바일 기기나 PC에서 FTP로 접근해 봅니다
> 저는 주로 PC에서는 [파일질라](https://filezilla-project.org/download.php?type=client)라는 오픈소스 소프트웨어를 추천합니다

## WSL2로 우분투 설치
```
윈도우 위에 서브시스템으로 리눅스를 설치합니다
도커는 리눅스 컨테이너 위에서 실행되기에 WSL2가 가장 합리적인 선택입니다
```

### WSL2 활성화
> 제가 알기로는 WSL2가 윈도우 11버전부터 기본값이 되었는데 윈도우 10 버전에서도 가능할 수 있도록 아래 명령어들을 설명드립니다

`파워쉘`을 관리자 권한으로 실행한 뒤 위에서 아래 명령어를 입력합니다
```ps1
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
재시작 이후 다시 `파워쉘`을 관리자로 실행하여 VM platform 옵션을 활성화 합니다
```ps1
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
다시 재부팅 한뒤 WSL2 서브시스템을 위한 [커널 업데이트를 진행](https://learn.microsoft.com/ko-KR/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)합니다

완료되면 `파워쉘`을 관리자로 실행하여 아래 명령어를 입력하여 WSL2를 기본 버전으로 지정합니다
```ps1
wsl --set-default-version 2
```

### WSL2로 우분투를 설치
[Microsoft Store](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV)에서 `Ubuntu`를 검색한 뒤 설치합니다

자동으로 WSL2 베이스로 설치가 됩니다

## Docker Desktop 설치
WSL 설치가 완료되면 [Docker Desktop](https://www.docker.com/products/docker-desktop/)을 설치합니다 
