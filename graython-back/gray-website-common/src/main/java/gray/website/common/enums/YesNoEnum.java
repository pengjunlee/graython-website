package gray.website.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import gray.bingo.common.Enums.base.BaseIntEnum;
import lombok.AllArgsConstructor;

/**
 * 资源类型枚举
 */
@AllArgsConstructor
public enum YesNoEnum implements BaseIntEnum {

    NO(0, "否"),
    YES(1, "是"),
    ;

    @EnumValue
    private final Integer value;

    @JsonValue
    private final String name;

    @Override
    public Integer getValue() {
        return value;
    }

    @Override
    public String getName() {
        return name;
    }
}
