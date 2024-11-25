package gray.website.adapter.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import gray.bingo.common.utils.DateUtil;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class MybatisMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        // 插入时的填充策略
        this.strictInsertFill(metaObject, "createTime", Date.class, DateUtil.now());
        this.strictInsertFill(metaObject, "updateTime", Date.class,DateUtil.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        // 更新时的填充策略
        this.strictUpdateFill(metaObject, "updateTime", Date.class, DateUtil.now());
    }
}
