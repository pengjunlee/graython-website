package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 文件夹表
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:10
 */
@Data
@Accessors(chain = true)
@TableName("gray_folder")
public class GrayFolder implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 文件夹名称
     */
    @TableField("name")
    private String name;

    /**
     * 文件夹路径
     */
    @TableField("path")
    private String path;

    /**
     * 用户ID
     */
    @TableField("user_id")
    private Long userId;

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


    public GrayFolder() {
        super();
    }

    public GrayFolder(String name, String path, Long userId) {
        this.name = name;
        this.path = path;
        this.userId = userId;
    }
}
