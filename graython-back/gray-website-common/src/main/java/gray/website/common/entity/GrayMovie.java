package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.*;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.dto.NameValue;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.utils.ResourceUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.File;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 影视表
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_movie")
public class GrayMovie implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 电影/文件名称
     */
    @TableField("file_name")
    private String fileName;

    /**
     * 文件夹名称
     */
    @TableField("folder_name")
    private String folderName;

    /**
     * 文件夹路径
     */
    @TableField("title")
    private String title;

    /**
     * MD5
     */
    @TableField("md5")
    private String md5;

    /**
     * 文件后缀
     */
    @TableField("ext")
    private String ext;

    /**
     * 文件大小
     */
    @TableField("size")
    private Long size;

    /**
     * 持续时长
     */
    @TableField("duration")
    private BigDecimal duration;

    /**
     * 文件的MIME类型
     */
    @TableField("mime_type")
    private String mimeType;

    /**
     * 缩略图宽度
     */
    @TableField("width")
    private Integer width;

    /**
     * 缩略图高度
     */
    @TableField("height")
    private Integer height;

    /**
     * 是否是连续剧
     */
    @TableField("series")
    private YesNoEnum series;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    @TableField(exist = false)
    private List<NameValue> files;

    public String getCoverUrl() {
        return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR + WebsiteConst.MOVIE_PATH_NAME + WebsiteConst.URL_SEPARATOR + userId + WebsiteConst.URL_SEPARATOR + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getCoverPath() {
        return WebsiteConst.THUMBNAIL_PATH_NAME +  File.separator + WebsiteConst.MOVIE_PATH_NAME + File.separator + userId + File.separator + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getPreviewUrl() {
        return WebsiteConst.PREVIEW_URL_PATH + userId + WebsiteConst.URL_SEPARATOR + WebsiteConst.MOVIE_PATH_NAME + WebsiteConst.URL_SEPARATOR + folderName + WebsiteConst.URL_SEPARATOR + fileName;
    }
}
