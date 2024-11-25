package gray.website.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import gray.bingo.common.Enums.base.BaseIntEnum;
import gray.website.common.biz.resource.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 资源类型枚举
 */
@AllArgsConstructor
public enum ResourceTypeEnum implements BaseIntEnum {

    IMAGE(0, "图片", new ImageParticular()),
    VIDEO(1, "视频", new VideoParticular()),
    AUDIO(2, "音频", new AudioParticular()),
    CUT_OUT(3, "免抠图", null),

    PDF(4, "PDF", new PDFParticular()),

    WORD(5, "WORD", new WordParticular()),

    PPT(6, "PPT", new PPTParticular()),

    EXCEL(7, "EXCEL", new ExcelParticular()),

    DMG(8, "DMG", null),

    MUSIC(9, "歌曲", new AudioParticular()),

    ZIP(10, "压缩包", null),
    OTHER(99, "未知", null),
    ;

    @EnumValue
    private final Integer value;

    @JsonValue
    private final String name;

    @Getter
    private final Particular particular;

    @Override
    public Integer getValue() {
        return value;
    }

    @Override
    public String getName() {
        return name;
    }


}
