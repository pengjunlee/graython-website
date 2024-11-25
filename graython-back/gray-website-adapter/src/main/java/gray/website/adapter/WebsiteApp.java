package gray.website.adapter;

import gray.bingo.starter.BingoStarter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * @作者 graython
 * @版本 1.0
 * @日期 2024-01-28 13:01
 */
@EnableAsync
@SpringBootApplication(scanBasePackages = {"gray.website","gray.bingo"})
@MapperScan(basePackages = {"gray.website.infrastructure.mapper"})
public class WebsiteApp extends BingoStarter {

    public static void main(String[] args) {
        run(WebsiteApp.class, args);
    }
}
