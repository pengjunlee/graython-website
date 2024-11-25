package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import gray.website.common.config.LongSerializer;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 资源库表
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:11
 */
@Data
@Accessors(chain = true)
@TableName("gray_library")
public class GrayLibrary implements Serializable {

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
     * 文件夹ID
     */
    @TableField("folder_id")
    private Long folderId;

    /**
     * 合集ID
     */
    @TableField("collection_id")
    private Long collectionId;

    /**
     * 资源库名称
     */
    @TableField("name")
    private String name;

    /**
     * 封面图片ID
     */
    @TableField("cover")
    private Long cover;

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

    @TableField(exist = false)
    private String collectionName;

    @TableField(exist = false)
    private String coverUrl;
}
