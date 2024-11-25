package gray.website.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import gray.bingo.common.Enums.base.BaseIntEnum;
import gray.bingo.common.utils.EnumUtil;
import lombok.AllArgsConstructor;

/**
 * 资源分类枚举
 */
@AllArgsConstructor
public enum LinkGroupEnum implements BaseIntEnum {

    PERSONAL_PROJECT(0, "个人项目"),
    AIGC(1, "AIGC"),
    UTILITIES(2, "实用工具"),
    RESOURCE_DOWNLOAD(3, "资源下载"),
    MACBOOK(4, "MacBook"),
    MEDIA_ENTERTAINMENT(5, "影音娱乐"),
    CODE_DESIGN(6, "编程设计"),

    ;

    @EnumValue
    private final Integer value;

    @JsonValue
    private final String name;

    static {
        EnumUtil.getIntMap().put(LinkGroupEnum.class.getSimpleName(), LinkGroupEnum.class);
    }

    @Override
    public Integer getValue() {
        return value;
    }

    @Override
    public String getName() {
        return name;
    }
}
