package gray.website.adapter;

import gray.bingo.mybatis.generator.BingoMybatisGenerator;
import gray.bingo.mybatis.generator.BingoMybatisGeneratorConfig;

public class MybatisGenerator {

    public static void main(String[] args) {
        // 数据库url
        final String DB_URL = "jdbc:mysql://192.168.192.66:3306/workstation?useUnicode=true&characterEncoding=UTF8&autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&serverTimezone=Asia/Shanghai";
        // 数据库用户名
        final String USERNAME = "root";
        // 数据库密码
        final String PASSWORD = "Root@123456";
        // 需要生成代码的数据表
        String[] tableNames = {"gray_job"};
        BingoMybatisGeneratorConfig generatorConfig = BingoMybatisGeneratorConfig.build4MultiModule()
                .dataSource(DB_URL, USERNAME, PASSWORD)
                .author("graython")
                .entity("gray-website-common", "gray.website.common.entity")
                .mapper("gray-website-infrastructure", "gray.website.infrastructure.mapper")
                .service("gray-website-infrastructure", "gray.website.infrastructure.repo", "gray-website-infrastructure", "gray.website.infrastructure.repo.impl","Repo")
                .controller("gray-website-adapter", "gray.website.adapter.controller")
                .build();

//        BingoPlusConfig generatorConfig = BingoPlusConfig.build4SingleModule()
//                .author("graython")
//                .enableSwagger(false)
//                .packageName("gray.website.infrastructure")
//                .enableService(true)
//                .enableController(true)
//                .build();
        BingoMybatisGenerator.generate(tableNames, generatorConfig);
    }
}
