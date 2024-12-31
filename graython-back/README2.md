# gray-website-back

#### 介绍
个人网址后端服务

#### 启动命令
Blossom：
java -jar ./backend-blossom.jar --server.port=9999 --spring.datasource.url="jdbc:mysql://localhost:3306/blossom?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&allowMultiQueries=true&useSSL=false&&serverTimezone=GMT%2B8" --spring.datasource.username=root --spring.datasource.password=Root@123456 --project.iaas.blos.default-path=/mnt/green/blossom/img &

#### 资源存放目录结构

-RESOURCE_ROOT
    - .thumbnail
        - link // 导航网址图标
        - music // 歌手头像
        - user_id 
            - movie // 电影封面海报
        - collection // 合集封面
        - folder_id // 各个资源文件夹下缩略图
        - original // 
            - collection (原图)
    - user_id
        - pdf
        - movie
    - music
        - 男歌手/女歌手/乐团组合
            - 歌手名称
                - 专辑名称
                    - 歌曲
                    - 封面

#### 使用说明
                
1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
