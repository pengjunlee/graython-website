package gray.website.adapter.config;

import gray.bingo.common.utils.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Slf4j
@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;


    @Autowired
    public DatabaseInitializer(@Qualifier("WebsiteJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void checkAndCreateTables() {

        // 检查表是否存在的SQL语句，假设表名为your_table_name
        String checkTableSql = "SHOW TABLES LIKE 'gray_music'";
        List<String> tables = jdbcTemplate.query(checkTableSql, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int rowNum) throws SQLException {
                return resultSet.getString(1);
            }
        });
        if (tables.isEmpty()) {
            log.info("website tables init...");
            try {
                // 读取SQL脚本文件
                ClassPathResource resource = new ClassPathResource("config/website.sql");
                BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
                String line;
                StringBuilder sql = new StringBuilder();
                while ((line = reader.readLine()) != null) {
                    if (!line.startsWith("--")) {
                        sql.append(line);
                    }
                }
                reader.close();
                log.info(sql.toString());
                // 执行SQL脚本
                String[] sqlStatements = sql.toString().split(";");
                for (String statement : sqlStatements) {
                    if (!statement.trim().isEmpty()) {
                        jdbcTemplate.execute(statement);
                    }
                }

            } catch (IOException e) {
                log.error(ExceptionUtil.getMessage(e));
            }
        }
    }

    @Override
    public void run(String... args) throws Exception {
        checkAndCreateTables();
    }
}