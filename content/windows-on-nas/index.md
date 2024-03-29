---
emoji: 🧑‍💻🐳
title: 윈도우에서 NAS 돌리기
date: '2023-03-20 12:34:00'
author: 강동호
tags: window docker nas
categories: 윈도우 도커
---

## 작업 개요
일반적으로 개발회사를 입사하게 되면 맥북프로를 받으면서 윈도우와는 결별하게 되는데    
남는 윈도우 PC를 유익하게 활용할 방법을 공유합니다

## 윈도우 원격 데스크탑 설정
> Windows Pro 라이센스 한정 (프로 라이센스가 아니라도 [설정할 방법](https://www.lainyzine.com/ko/article/how-to-use-remote-desktop-in-windows-10-home-with-rdp-wrapper/)은 있으나 조금 더 복잡해 집니다)

저는 이 설정이후로는 메인 장비에서 원격 데스크탑만 연결해서 작업했을 정도로 윈도우로 나스를 쓴다면 필연적인 기능입니다   
시X로지에서도 웹 상에서 GUI 인터페이스인 점이 가장 큰 장점인데 애초에 GUI를 윈도우와 동일하게 따라올 수 있는 기능은 없다고 생각하고

특히 동일 네트워크상에서의 커넥션은 매끄럽게 원격을 진행할 수 있습니다

1. 설정 `Win + I`을 실행하고 왼쪽 메뉴에서 `시스템`을 클릭합니다
2. 목록에서 `원격 테스크톱`을 선택합니다
![시스템 > 원격 데스크탑](imgs/system-remote-desktop.png)
3. 내부에서 원격 데스크톱 박스의 토글버튼을 클릭하여 활성화합니다
![원격 데스크톱 토글](imgs/toggle-remote-desktop.png)
4. 이후 윈도우 검색에서 `제어판`을 실행합니다
5. 제어판에서 `시스템 및 보안` 항목에 들어가 `시스템 > 원격 엑세스 허용`을 클릭해 줍니다
6. 나온 팝업에서 `이 컴퓨터에 대한 원격 지원 연결 허용`을 체크하고 원격 데스크톱 상자에서는 `이 컴퓨터에 대한 원격 연결 허용`과 `네트워크 수준 인증을 사용하여 원격 데스크톱을 실행하는 컴퓨터에서만 연결 허용(권장)`을 체크하고 확인 버튼을 클릭합니다
7. 이제는 원격으로 접속할 컴퓨터에서 `Win + S`키를 눌러 `원격 데스크톱 연결`을 검색해 실행합니다
![원격 데스크톱 연결](imgs/remote-desktop-connect.png)
1. 연결할 컴퓨터의 이름(아이피나 도메인주소)을 입력하고 사용자 이름(Microsoft 계정인 경우 자격증명으로 로그인)를 입력하여 로그인합니다
2.  정상적으로 접속되면 완료
![원격 데스크톱 연결 결과](imgs/remote-desktop-result.png)
1.  연결 속도가 느린 경우 [이 글](https://m.blog.naver.com/toruin84/222875583683)을 참조해 주세요

## 윈도우 자동로그인 설정
나스를 켰을때 로그인을 위해 직접 화면을 연결해야 하는 상황을 방지하기 위해 자동로그인을 설정합니다    
윈도우 10 2004 버전 이후와 이전으로 나뉘는데 이전 버전이라면 아래와 같습니다.    
`Win + R`로 `netplwiz` 를 입력하고 계정을 선택한 뒤 `사용자 이름과 암호를 입력해야 이 컴퓨터를 사용할 수 있음`을 체크합니다
![사용자 이름과 암호를 입력해야 이 컴퓨터를 사용할 수 있음](imgs/user-account-check.png)

### 만약 체크박스가 보이지 않는다면
`Win + R`로 `regedit` 를 입력한 뒤 레지스트리 편집기가 열리면 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\PasswordLess\Device`을 들어가서 `DevicePasswordLessBuildVersion` 값을 확인합니다
![레지스트리 편집기](imgs/registry-allow-user.png)

만약 값이 없다면, 새로 생성을 하고 기존에 값이 있다면 16진수 `0x00000002`인 값 데이터를 `2`로 업데이트 합니다
![레지스트리 값 2로](imgs/change-registry-value-two.png)

다시 자동로그인 설정으로 들어가게 되면 체크박스가 보이고 이름과 사용자명을 클릭하여 로그인 합니다 **(맨 위 사진 그대로)**

## 윈도우 10 FTP 설정
```
FTP 또한 Docker를 활용하여 설정이 가능하지만,
운영체제에서 기본적으로 지원하는 기능을 사용하는 것이 성능적으로 가장 안정적이고
윈도우 파일시스템을 베이스로 전송하기에 좀 더 효율적이다고 판단했습니다
```
윈도우의 검색을 활용하여 `기능`을 검색하면 `Windows 기능 켜기/끄기`를 클릭합니다
![윈도우 기능 켜기/끄기](imgs/search-windows-function.png)

우선 선택해 줄 것이 `인터넷 정보 서비스 > FTP 서버 > FTP 서비스` 그리고 `인터넷 정보 서비스 > 웹 관리 도구 > IIS 관리 콘솔`을 체크해 줍니다
![FTP 및 IIS 활성화](imgs/windows-function-ftp-and-iis.png)

두개가 활성화되면 IIS 관리자를 실행합니다
![IIS 관리자 검색](imgs/search-iis.png)

### FTP 사이트 추가
좌측 Desktop 항목에서 `사이트`를 우클릭으로 클릭한 뒤 `FTP 사이트 추가...` 기능을 선택합니다
![FTP 사이트 추가](imgs/add-ftp.png)

사이트 정보를 입력하게 되는데 사이트 이름은 그냥 `NAS_FTP`로 지정하고 실제 경로는 지정하고 싶은 디렉토리를 선택합니다
저는 D드라이브의 data 디렉토리를 선택하여 쉐어했습니다
> 추후 영상이나 큰 파일을 쉐어할 수 있도록 큰 사이즈의 볼륨으로 잡아주는 것이 좋은것 같더라구요
> 
> 추가적으로 WSL이 고도화 됨에 따라 여러 윈도우의 볼륨도 타 드라이브를 선택할 수 있습니다
![FTP 생성 모달1](imgs/add-ftp-step1.png)

#### 바인딩 및 SSL 설정
바인딩은 모든 대상으로 포트는 기본값인 21로 지정합니다

그리고 항상 FTP가 실행되어야 24시간 활용될 수 있기에 `자동으로 FTP 사이트 시작`을 선택합니다

SSL은 저희가 간의로 사용하기에는 세팅 과정이 더 복잡해질 수 있기에 `SSL 사용 안 함`을 선택하고 다음으로 넘어갑니다
![FTP 생성 모달2](imgs/add-ftp-step2.png)

#### 인증 정보 설정
인증은 `기본`을 선택하고 엑세스 허용에 `모든 사용자`를 지정합니다
사용 권한은 `읽기`와 `쓰기` 모두를 체크한 뒤 마무리 합니다

직접 사용자를 만들어 주어야 합니다
윈도우 검색에 `컴퓨터 관리`를 입력한 뒤 좌측 메뉴에서 `컴퓨터 관리 > 시스템 도구 > 로컬 사용자 및 그룹 > 사용자`를 클릭해줍니다

그러면 사용자 목록이 나오게 되고 FTP에서 사용할 사용자를 추가하기 위해, 목록 상자 내에서 마우스를 우클릭하여 `새 사용자` 를 선택합니다

`사용자 이름`은 FTP의 로그인 ID에 해당하고 `전체 이름`은 계정의 고유 키, `암호, 암호 확인`은 FTP의 로그인 비밀번호에 해당하기에 원하는 값을 입력한다

암호 사용 기간 제한 없음을 클릭하여 추후에 만료를 방지한 이후 `만들기`로 생성합니다
![FTP 생성 모달3](imgs/add-ftp-step3.png)

#### 방화벽 허용
이후 윈도우 검색에 `고급 보안이 포함된 Windows Defender 방화벽`를 검색하여 실행합니다
![고급 보안이 포함된 Windows Defender 방화벽](imgs/search-windows-defender-advaced.png)
좌측의 인바운드 규칙을 선택하여 `FTP 서버 보안(FTP SSL 트래픽 인)`, `FTP 서버 수동`, `FTP 서버(FTP 트래픽 인)`을 규칙 사용합니다
![방화벽 FTP 허용](imgs/windows-defender-ftp-allow-all.png)

#### 서비스 시작
윈도우 검색에 `service`를 검색하여 서비스 앱을 실행합니다
![서비스 검색](imgs/search-service.png)

`Microsoft FTP Service`을 우클릭으로 선택한 뒤 꺼져있다면 `시작`을 이미 실행되어있다면 `다시 시작`을 클릭하여 이전에 설정했던 내용들을 반영하여 재시작해줍니다
![FTP 서비스 시작](imgs/service-ftp-start.png)

이후 모바일 기기나 PC에서 FTP로 접근해 봅니다
> 저는 주로 PC에서는 [파일질라](https://filezilla-project.org/download.php?type=client)라는 오픈소스 소프트웨어를 추천합니다
![FTP 실제 연결](imgs/ftp-real-connect.png)

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
![파워쉘 WSL2](imgs/powershell-with-wsl2.png)

### WSL2로 우분투를 설치
[Microsoft Store](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV)에서 `Ubuntu`를 검색한 뒤 설치합니다
![MS스토어 우분투](imgs/ms-store-ubuntu.png)

자동으로 WSL2 베이스로 설치가 됩니다

## Docker Desktop 설치
WSL 설치가 완료되면 [Docker Desktop](https://www.docker.com/products/docker-desktop/)을 설치합니다
![도커 데스크탑 설치](imgs/visit-dockerdesktop-install.png)

## 도커를 통해 HTTPS 사용하기
사용할 서비스는 [acme-companion](https://github.com/nginx-proxy/acme-companion)    
위 이미지는 nginx 이미지에 acme 인증서를 연결하여 HTTP 연결을 HTTPS 연결로 커넥팅 해주는 기능을 포함하고 있다    
따라서 acme 인증서를 별도로 실행해 주어야 합니다
![acme-companion](imgs/acme-companion.png)

### nginx 인증서 프록시 컨테이너
리버스 프록시로 80, 443번 포트를 연결해준다
```bash
docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume certs:/etc/nginx/certs \
    --volume vhost:/etc/nginx/vhost.d \
    --volume html:/usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    nginxproxy/nginx-proxy
```

### 인증서 업데이터 볼륨 컨테이너
아래 명령어에서 `[본인 이메일 주소]`는 본인 이메일로 업데이트 해주는 것이 중요하다 (인증서 만료 체크용)    
`--volumes-from`을 통해서 위에 생성한 `nginx-proxy`에 연결하여 let's encrypt 인증서를 볼륨으로 매핑해준다
```bash
docker run --detach \
    --name nginx-proxy-acme \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --volume acme:/etc/acme.sh \
    --env "DEFAULT_EMAIL=[본인 이메일 주소]" \
    nginxproxy/acme-companion
```
![Nginx Proxy with acme](imgs/docker-nginx-proxy-with-acme.png)

## 도메인의 서브도메인으로 와일드카드 등록하기
저는 서비스중에 인지도 있는 서비스를 추천합니다
- 국내 [**dnszi**](https://dnszi.com/)
- 글로벌 [**cloudflare**](https://www.cloudflare.com/)
을 추천드립니다

저는 그래도 글로벌한 **CloudFlare**를 추천드립니다    
`dns 설정 > Add record`를 이용하여 추가하면 되는데 제 나스의 subdomain은 `*.remote.[내 도메인 주소]`의 구조로 지정했습니다    
그리고 본인의 아이피오하 Proxy 없이 DNS Only로 지정하여 추가하면 아래와 같은 형태가 노출됩니다
> ![cloudflare-dns](imgs/cloudflare-dns.png)

## Portainer 설치 from Ubuntu with WSL2
> Portainer는 도커를 웹 상에서 관리할 수 있는 서비스이다
> 시X로지도 되는 기능을 손쉽게 WSL 위에 설치해본다

[참고(Portainer CE with Docker on WSL)](https://docs.portainer.io/start/install-ce/server/docker/wsl)

1. Ubuntu on WSL을 `Win + S`늘 누르고 `Ubuntu`를 검색하여 실행한다
2. 도커볼륨을 생성한다
```bash
docker volume create portainer_data
```
1. Portainer의 이미지를 다운받아 실행한다
   1. 먼저 아래 명령어에서 `[원하는 도메인 주소]`
```bash
docker run -d -p 8000:8000 -p 9000:9000 \
      --name portainer \
      -e "VIRTUAL_HOST=[원하는 도메인 주소]" \
      -e "VIRTUAL_PORT=9000" \
      -e "LETSENCRYPT_HOST=[원하는 도메인 주소]" \
      -e "LETSENCRYPT_EMAIL=[본인 이메일 주소]" \
      --restart=always \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v portainer_data:/data \
      portainer/portainer-ce:latest
```
![create portainer](imgs/create_portainer.png)
1. [https://localhost:9000](https://localhost:9000)링크에 접속한 뒤 확인해본다
![portainer local](imgs/portainer-local.png)
2. 추가적으로 세팅이 끝나면 본인이 입력한 도메인 주소로 접속해본다\
![portainer remote](imgs/remote-portainer.png)

# 부록
### 윈도우에서 Cron 기능 활용하기
파워쉘이나 윈도우 배치파일을 윈도우 기본기능인 `작업 스케쥴러`에 등록할 수 있습니다    
https://docs.active-directory-wp.com/Usage/How_to_add_a_cron_job_on_Windows/Scheduled_tasks_and_cron_jobs_on_Windows/index.html    
이 기능을 활용하면 특정 시간대에 도커 재시작 등의 명령을 줄 수 있습니다

### 토렌트 서버 추가하기
[**Qbitorrent 이미지**](https://hub.docker.com/r/linuxserver/qbittorrent)를 사용해서 올리겠습니다    
이번에도 HTTPS 연결을 위해 추가적인 환경변수를 입력하겠습니다    
아래와 같이 `WEBUI_PORT`와 `VIRTUAL_PORT`값은 같아야 합니다
```bash
docker run -d \
  --name=torrent \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Seoul \
  -e WEBUI_PORT=8888 \
  -e "VIRTUAL_HOST=[원하는 도메인 주소]" \
  -e "VIRTUAL_PORT=8888" \
  -e "LETSENCRYPT_HOST=[원하는 도메인 주소]" \
  -e "LETSENCRYPT_EMAIL=[본인 이메일 주소]" \
  -p 8888:8888 \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -v [원하는 WSL 내 config 경로]:/config \
  -v [원하는 WSL 내 downloads 경로]:/downloads \
  --restart always \
  linuxserver/qbittorrent:latest
```
![torrent 설치](imgs/ubuntu-install-torrent.png)

#### WSL 내의 마운트 경로란?
WSL 인스턴스 내에서 `/mnt/d/` 의 구조로 접근하게 되면 **D드라이브**에 접근 가능하다
![WSL 마운트 경로](imgs/wsl-mount-path.png)

### 마인크래프트 서버 추가하기
[**mincraft server 이미지**](https://hub.docker.com/r/itzg/minecraft-server)를 사용해서 올리겠습니다
```bash
docker run -d -it --name mincraft \
  -v [원하는 WSL 내 config 경로]:/data \
  -p 25565:25565 \
  -e EULA=TRUE \
  -e MEMORY=2G \
  itzg/minecraft-server
```

### 마크 백업 기능
아래 명령어는 /backups 폴더에 tar파일로 매일(1d)마다 백업합니다
```bash
docker run \
-e SRC_DIR=/backups \
-e BACKUP_INTERVAL=1d \
--name=mcbackup itzg/mc-backup
```

추가적으로 고급 세팅을 위해서는 [이 글](https://jizard.tistory.com/455)을 참고해주시면 감사하겠습니다

### Docker CI/CD 추천 툴
[Coolify](https://coolify.io/)
[CapRover · Free and Open Source PaaS!](https://caprover.com/)

# 결론
**NAS(Network Attached Storage)는 사서 쓰세요**    
그래도 본인이 진성 공돌이라면 내 입맛대로 구성할 수 있다는 점의 매력을 느낄 수 있을 것이고    
성능이 꽤 준수한 개발 서버로 손쉽게 둔갑할 수 있을겁니다

#### 참고자료
위 글을 작성하기 위해 참고한 글입니다
- [윈도우 10 FTP 서버 설정](https://takim0070.tistory.com/10)
- [윈도우11. 원격으로 컴퓨터를 사용하는 방법. 원격 데스크톱.](https://onna.kr/982)
- [Mount And Access Hard Drives In Windows Subsystem For Linux (WSL)](https://linuxnightly.com/mount-and-access-hard-drives-in-windows-subsystem-for-linux-wsl/)
- [Windows 2019 서버 FTP 글자 깨짐 현상 해결 방법](https://darkdoyo.tistory.com/56)
- [[Synology NAS] 도커 (Docker)로 게임 서버 구축하기 #3 - 마인크래프트 자바 에디션 spigot 서버](https://qzqz.tistory.com/812)
- [도커 Docker 에 큐빗토렌트 qBittorrent 다운로드 서버 만들기 - 우분투](https://comeinsidebox.com/ubuntu-docker-qbittorrent-server/)