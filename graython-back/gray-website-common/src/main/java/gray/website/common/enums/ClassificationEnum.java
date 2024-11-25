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
public enum ClassificationEnum implements BaseIntEnum {

    LANDSCAPE(0, "风景"),
    ARCHITECTURE(1, "建筑"),
    PEOPLE(2, "人物"),
    GOODS(3, "物品"),
    TECHNOLOGY(4, "科技"),
    ART(5, "艺术"),
    ANIMALS(6, "动物"),
    HUMANITY(7, "人文"),
    ANIME(8, "动漫"),
    OTHER(9, "其他"),
    ;

    @EnumValue
    private final Integer value;

    @JsonValue
    private final String name;

    static {
        EnumUtil.getIntMap().put(ClassificationEnum.class.getSimpleName(), ClassificationEnum.class);
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
