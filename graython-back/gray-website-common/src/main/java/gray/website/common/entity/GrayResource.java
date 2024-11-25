package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.*;
import gray.bingo.common.utils.StringUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.enums.ClassificationEnum;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.utils.ResourceUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.File;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

/**
 * <p>
 * 资源表（图片、音频、视频、文档）
 * </p>
 *
 * @author graython
 * @since 2024-08-29 21:00:20
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_resource")
public class GrayResource implements Serializable {

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
     * 所属文件夹ID
     */
    @TableField("folder_id")
    private Long folderId;

    /**
     * 文件名
     */
    @TableField("name")
    private String name;

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
     * 资源类型
     */
    @TableField("resource_type")
    private ResourceTypeEnum resourceType;

    /**
     * 资源分类
     */
    @TableField("classification")
    private ClassificationEnum classification;

    /**
     * 是否生成缩略图
     */
    @TableField("thumbnail")
    private YesNoEnum thumbnail;

    /**
     * 缩略图宽度
     */
    @TableField("thumbnail_width")
    private Integer thumbnailWidth;

    /**
     * 缩略图高度
     */
    @TableField("thumbnail_height")
    private Integer thumbnailHeight;

    /**
     * 原图宽度
     */
    @TableField("width")
    private Integer width;

    /**
     * 原图高度
     */
    @TableField("height")
    private Integer height;

    /**
     * 文档总页数
     */
    @TableField("page_count")
    private Integer pageCount;

    /**
     * 标题
     */
    @TableField("title")
    private String title;

    /**
     * 艺术家
     */
    @TableField("artist")
    private String artist;

    /**
     * 专辑
     */
    @TableField("album")
    private String album;

    /**
     * 最近更新
     */
    @TableField("last_modified")
    private Timestamp lastModified;

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
    private String folderName;

    @TableField(exist = false)
    private String folderPath;


    public String getThumbnailUrl() {
        if (0 == thumbnail.getValue()) return null;
        if (Objects.equals(resourceType,ResourceTypeEnum.MUSIC) && StringUtil.isNotBlank(artist)) {
            return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR + "music" + WebsiteConst.URL_SEPARATOR + artist + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
        }
        return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR  + folderId + WebsiteConst.URL_SEPARATOR + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getThumbnailPath() {
        if (Objects.equals(resourceType,ResourceTypeEnum.MUSIC) && StringUtil.isNotBlank(artist)) {
            return WebsiteConst.THUMBNAIL_PATH_NAME + File.separator + "music" + File.separator + artist + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
        }
        return WebsiteConst.THUMBNAIL_PATH_NAME + File.separator + folderId + File.separator + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getPdfPath() {
        return WebsiteConst.RESOURCE_EXT_PDF + File.separator + folderId + File.separator + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PDF);
    }

    public String getPdfUrl() {
        if (Objects.equals(ResourceTypeEnum.WORD.getValue(), resourceType.getValue()) || Objects.equals(ResourceTypeEnum.PPT.getValue(), resourceType.getValue()) || Objects.equals(ResourceTypeEnum.EXCEL.getValue(), resourceType.getValue())) {
            return WebsiteConst.PREVIEW_URL_PATH + userId + WebsiteConst.URL_SEPARATOR + WebsiteConst.RESOURCE_EXT_PDF + WebsiteConst.URL_SEPARATOR + folderId + WebsiteConst.URL_SEPARATOR + md5 + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PDF);
        }
        return null;
    }

    public String getPreviewUrl() {
        return WebsiteConst.PREVIEW_URL_PATH + userId + WebsiteConst.URL_SEPARATOR + folderPath + WebsiteConst.URL_SEPARATOR + name;
    }



    public String getFilePath() {
        return folderPath + WebsiteConst.URL_SEPARATOR + name;
    }

}
