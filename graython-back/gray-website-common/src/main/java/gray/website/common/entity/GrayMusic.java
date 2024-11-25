package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

import gray.bingo.common.utils.StringUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.utils.ResourceUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 音乐表
 * </p>
 *
 * @author graython
 * @since 2024-11-04 19:04:16
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_music")
public class GrayMusic implements Serializable {

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
     * 文件名称
     */
    @TableField("file_name")
    private String fileName;

    /**
     * 文件夹路径
     */
    @TableField("folder_path")
    private String folderPath;

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
     * 是否喜爱
     */
    @TableField("favorite")
    private YesNoEnum favorite;

    /**
     * 是否在播放列表
     */
    @TableField("playlist")
    private YesNoEnum playlist;

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
     * 音轨号
     */
    @TableField("track_number")
    private Integer trackNumber;

    /**
     * 音轨数
     */
    @TableField("track_total")
    private Integer trackTotal;

    /**
     * 风格
     */
    @TableField("genre")
    private String genre;

    /**
     * 发行日期
     */
    @TableField("release_date")
    private String releaseDate;

    /**
     * 歌词
     */
    @TableField("lyrics")
    private String lyrics;

    /**
     * 最近更新
     */
    @TableField("last_modified")
    private Date lastModified;

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


    public String getPrettySize(){
        if (size < 1024) {
            return size + " B";
        } else if (size < 1024 * 1024) {
            return String.format("%.2f KB", size / 1024.0);
        } else if (size < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", size / (1024.0 * 1024));
        } else {
            return String.format("%.2f GB", size / (1024.0 * 1024 * 1024));
        }
    }

    public String getArtistThumbnail(){
        if (StringUtil.isNotBlank(artist)) {
            return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR + "music" + WebsiteConst.URL_SEPARATOR + artist + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
        }
        return null;
    }

    public String getPreviewUrl() {
        return WebsiteConst.PREVIEW_URL_PATH + WebsiteConst.URL_SEPARATOR + folderPath + WebsiteConst.URL_SEPARATOR + fileName;
    }
}
