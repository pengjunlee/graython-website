# 项目源码

- Github：https://github.com/pengjunlee/graython-website.git
- Gitee：https://gitee.com/pengjunlee/graython-website.git
- Blossom：https://github.com/blossom-editor/blossom

# 部署指引

## 环境准备
本项目后端服务需要用到`Java8`开发环境和`Mysql`数据库，不知道如何安装的朋友可以去问问GPT（国内可以问豆包、KIMI等）。

在开始部署之前，可以在将要部署的服务器上执行 `java -version` 确认好JDK的版本（1.8.*** 版本都可以）。
```bash
# java -version
java version "1.8.0_431"
Java(TM) SE Runtime Environment (build 1.8.0_431-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.431-b10, mixed mode)
```
此外，还要确认好要部署的服务器可以能正常连接到你的Mysql数据库。
确认`Java8`开发环境和`Mysql`数据库都OK的话，接下来就可以开始部署了。

# Jar包获取
Jar包下载地址：
- QQ群共享文件：群号 984110194
- 百度网盘下载: https://pan.baidu.com/s/1UEkdCw5G8v0Itva4OQq5Nw 提取码: nieq

`gray-website-builder.git` 项目文件说明：
- backend-blossom.jar （Blossom可启动Jar）
- graython-website.jar （Website可启动Jar）
- application.yml （Website Jar启动配置文件）
- README.md （帮助说明）

# 启动Blossom
打开一个Bash/Shell窗口，切换到 `gray-website-builder` 文件夹，执行如下命令启动Blossom，代码里面限制了Blossom的启动端口必须是 `9999`，请勿修改。
```bash
java -jar ./backend-blossom.jar --server.port=9999 --spring.datasource.url="jdbc:mysql://[改成你的数据库IP]:3306/[改成你的数据库名]?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8" --spring.datasource.username=[改成你的Blossom数据库用户] --spring.datasource.password=[改成你的数据库密码] --project.iaas.blos.default-path=[改成你的博客图片存放地址] &
```
完整启动命令示例：

```bash
java -jar ./backend-blossom.jar --server.port=9999 --spring.datasource.url="jdbc:mysql://192.168.192.66:3306/test_blossom?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8" --spring.datasource.username=root --spring.datasource.password=Root@123456 --project.iaas.blos.default-path=/Users/pengjunlee/Documents/imgs &
```
若窗口打印出如下信息，则表示启动成功了，此时可以访问 Blossom 管理后台看一下。访问地址 `http://[你的服务器IP]:9999/editor/#/settingindex`，默认用户名/密码: blos/blos 。

```bash
=========================================================================
启动成功 [2024-12-31 11:59:11], 可使用客户端登录, 默认用户名/密码: blos/blos
下载地址: https://github.com/blossom-editor/blossom/releases
文档地址: https://www.wangyunf.com/blossom-doc/index
博客端访问地址: http://IP:端口(域名)/blog/#/home
客户端访问地址: http://IP:端口(域名)/editor/#/settingindex
=========================================================================

```

# 部署Website
## 修改配置
启动Website之前需要先修改`application.yml`配置文件。
```yml
# ━━━━━━━━━━━━━━━━━━━━┫ profile配置 ┣━━━━━━━━━━━━━━━━━━━━━━
website:
  resource:
    # 要管理的资源根目录
    root: [改成你的要管理的资源所在根目录]
    # 每日限制流量，单位M
    limit-size: 1024
  aspose:
    # Aspose 文档转换密钥配置，用于将PPT/Word/Excel转PDF，申请地址：https://dashboard.aspose.cloud/#/
    app-id: [改成你的Aspose id，没有的话可以先空着，不影响启动]
    app-secret: [改成你的Aspose 密钥，没有的话可以先空着，不影响启动]
  blossom:
    service: http://[改成你的服务器IP]:9999
# ━━━━━━━━━━━━━━━━━━━┫ bingo 框架配置 ┣━━━━━━━━━━━━━━━━━━━━━
bingo:
  # ━━━━━━━━━━━━━━┫ helper ┣━━━━━━━━━━━━━━━━━━━━━
  helper:
    enables: caffeine,dynamic_db
  log-sql: true
  # ━━━━━━━━━━━━━━━━┫ dynamic datasource ┣━━━━━━━━━━━━━━━━━━━
  db:
    default:
      name: website
    website:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://[改成你的数据库IP]:3306/[改成你的Website数据库名]?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      username: [改成你的数据库用户]
      password: [改成你的数据库密码]
      slowInterval: '1'
    blossom:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://[改成你的数据库IP]:3306/[改成你的Blossom数据库名，注意与上面启动Blossom时设置的数据库保持一致]?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      username: [改成你的数据库用户]
      password: [改成你的数据库密码]
```

完整配置示例如下：
```yml
# ━━━━━━━━━━━━━━━━━━━━━━━━┫ profile配置 ┣━━━━━━━━━━━━━━━━━━━━━━━━
website:
  resource:
    # 要管理的资源根目录
    root: /Users/pengjunlee/Documents/
    # 每日限制流量，单位M
    limit-size: 1024
  aspose:
    # Aspose 文档转换密钥配置
    app-id: 
    app-secret:
  blossom:
    service: http://localhost:9999
# ━━━━━━━━━━━━━━━━━━━━━━━━┫ bingo 框架配置 ┣━━━━━━━━━━━━━━━━━━━━━━━━
bingo:
  # ━━━━━━━━━━━━━━━━━━━━━━━━┫ helper ┣━━━━━━━━━━━━━━━━━━━━━━━━
  helper:
    enables: caffeine,dynamic_db
  log-sql: true
  # ━━━━━━━━━━━━━━━━━━━━━━━━┫ dynamic datasource ┣━━━━━━━━━━━━━━━━━━━━━━━━
  db:
    default:
      name: website
    website:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://192.168.192.66:3306/test_website?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      username: root
      password: 'Root@123456'
      slowInterval: '1'
    blossom:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://192.168.192.66:3306/test_blossom?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8
      username: root
      password: 'Root@123456'
```

## 启动Website
执行如下命令，启动启动Website。
```bash
java -jar ./graython-website.jar &
```
浏览器输入 `http://[改成你的Blossom服务器IP]:8081/website/` 若页面可以正常访问就代表Website启动成功了。使用Blossom提供的默认用户名/密码登陆即可: blos/blos 。

# 歌曲资源
为了管理方便，歌曲资源未做权限控制，所有用户都可以浏览所有的歌曲。
歌曲文件需按照如下的目录层级存放：`你的要管理的资源所在根目录`/`music`/`男歌手|女歌手|乐团组合｜自定义`/`歌手名`/`专辑名`/`歌曲|歌词|封面`, 歌词优先从歌曲源信息中获取，若获取不到才会获取同目录下同名的歌词文件。

# 其他资源
电影和图片等资源都做了权限控制，每个人只能看到以自己的用户ID命名的文件夹下的资源。完整的资源存放路径如下：`你的要管理的资源所在根目录`/`用户的ID`/`自定义文件夹，支持多级目录`。

> ##red##
> 🔴
：默认用户 `blos` 的ID是1.

# 网站名称
网站默认名称为 `Graython` ，如需修改可以修改Blossom数据库配置，更新完之后重启Blossom即可。
```sql
update base_user_param set param_value = '你的网站名称' where param_name = 'WEB_LOGO_NAME';
```