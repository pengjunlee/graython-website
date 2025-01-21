# Dockerfile
```bash
# 指定构建的基础镜像
FROM eclipse-temurin:8-jre

# 安装supervisor用来管理多进程
RUN apt-get update && apt-get install -y supervisor

# 切换工作目录
WORKDIR /app

# 将Blossom和Website可执行Jar包复制到镜像内
COPY backend-blossom.jar /app/blossom/blossom.jar
COPY graython-website.jar /app/website/website.jar

# 将supervisor配置复制到镜像内
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# blossom暴露9999端口，website暴露7777端口
EXPOSE 9999 7777

# 通过supervisor启动进行
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
```

# 镜像构建&推送
```bash
# 构建镜像
sudo docker build -t graython-website .
# 登陆docker hub
docker login
# 给镜像打标
docker tag graython-website:latest graython/graython-website:latest
# 推送镜像到 Docker Hub
docker push graython/graython-website:latest
```
# 启动镜像
## 不带Mysql配置
```yml
version: "3.8"
services:
  graython-web:
    image: graython-website:latest
    container_name: graython-website
    volumes:
      # 【需修改】
      # 将冒号(:)前的部分改成你运行 docker 的设备的某个路径，不要修改冒号后面的内容。
      # 如果是windows环境，可以使用/c/mnt/green/blossom/img/来指定磁盘
      # blossom 上传图片的存储路径，不要修改冒号后面的内容。
      - /Users/pengjunlee/Documents/img/:/home/bl/
      # website要管理的资源根路径，不要修改冒号后面的内容。
      - /Users/pengjunlee/Documents/:/app/data/
    environment:
      # Blossom MySQL数据库配置
      SPRING_DATASOURCE_URL: jdbc:mysql://192.168.192.66:3306/test_blossom?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: Root@123456
      # Website MySQL数据库配置
      WEBSITE_DATASOURCE_URL: jdbc:mysql://192.168.192.66:3306/test_website?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      WEBSITE_DATASOURCE_USERNAME: root
      WEBSITE_DATASOURCE_PASSWORD: Root@123456
    ports:
      # Blossom 对外暴露的9999端口（不要更改）
      - "9999:9999"
      # Website 对外暴露的7777端口,不要修改冒号后面的内容。
      - "7777:7777"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9999/sys/alive"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
    restart: always
```

## 带Mysql配置
在docker-compose.yaml所在目录下创建一个数据库初始化脚本 init-db.sql。
```sql
CREATE DATABASE IF NOT EXISTS blossom;
CREATE DATABASE IF NOT EXISTS website;
```

```yml
version: "3.8"

networks:
  graython-net:
    driver:
      bridge

services:
  graython-web:
    image: graython-website:latest
    container_name: graython-website
    volumes:
      # 【需修改】
      # 将冒号(:)前的部分改成你运行 docker 的设备的某个路径，不要修改冒号后面的内容。
      # 如果是windows环境，可以使用/c/mnt/green/blossom/img/来指定磁盘
      - /Users/pengjunlee/Documents/img/:/home/bl/
      - /Users/pengjunlee/Documents/:/app/data/
    environment:
      # Blossom 数据库配置
      SPRING_DATASOURCE_URL: jdbc:mysql://graython-mysql:3306/blossom?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 123456
      # Website 数据库配置
      WEBSITE_DATASOURCE_URL: jdbc:mysql://graython-mysql:3306/website?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      WEBSITE_DATASOURCE_USERNAME: root
      WEBSITE_DATASOURCE_PASSWORD: 123456

    ports:
      - "9999:9999"
      - "7777:7777"
    networks:
      - graython-net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9999/sys/alive"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
    restart: always
    depends_on:
      graython-mysql:
        condition: service_healthy
  graython-mysql:
    image: mysql:8.0.31
    container_name: graython-mysql
    restart: on-failure:3
    volumes:
      # 挂载初始化脚本
      - ./init-db.sql:/docker-entrypoint-initdb.d/init-db.sql  
      # 【需修改】将冒号(:)前的部分改成你运行 docker 的设备的某个路径，不要修改冒号后面的内容。  
      - /Users/pengjunlee/Documents/mysql/data:/var/lib/mysql
      - /Users/pengjunlee/Documents/mysql/log:/var/log/mysql
      - /Users/pengjunlee/Documents/mysql/mysql-files/log:/var/lib/mysql-files
    environment:
      # 【可选修改】这个改了上方的黄色部分也要修改。需要与 services.blossom.environment.SPRING_DATASOURCE_PASSWORD 相同 
      MYSQL_ROOT_PASSWORD: 123456
      LANG: C.UTF-8
      TZ: Asia/Shanghai
    ports:
      - "3306:3306"
    networks:
      - graython-net
    healthcheck:
      # 【可选修改】如果修改了上方的数据库密码「MYSQL_ROOT_PASSWORD」，下方的 -p 后的密码也要修改 
      test: ["CMD", "mysqladmin", "-uroot", "-p123456", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 3s
      retries: 12
```

使用如下命令启动：
```bash
docker compose -f docker-compose.yaml up -d
# 如果命令无效，可使用下方命令尝试
docker-compose -f docker-compose.yaml up -d
```

# 访问地址
- http://localhost:7777/website/
- http://localhost:7777/website/#/Collection
- http://localhost:7777/station/
- http://localhost:9999/editor/#/settingindex