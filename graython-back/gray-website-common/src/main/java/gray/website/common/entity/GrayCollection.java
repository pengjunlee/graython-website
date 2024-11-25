package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.File;
import java.io.Serializable;
import java.util.Date;

import gray.website.common.cst.WebsiteConst;
import gray.website.common.utils.ResourceUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 资源库合集表
 * </p>
 *
 * @author graython
 * @since 2024-09-10 18:15:58
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_collection")
public class GrayCollection implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 合集名称
     */
    @TableField("name")
    private String name;


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

    public String getThumbnailUrl() {
        return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR + WebsiteConst.COLLECTION_PATH_NAME + WebsiteConst.URL_SEPARATOR + id + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getThumbnailPath() {
        return WebsiteConst.THUMBNAIL_PATH_NAME +  File.separator + WebsiteConst.COLLECTION_PATH_NAME + File.separator + id + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getCoverPath() {
        return ResourceUtil.getResourceRootPath() + WebsiteConst.THUMBNAIL_PATH_NAME + File.separator + WebsiteConst.ORIGINAL_PATH_NAME + File.separator+ WebsiteConst.COLLECTION_PATH_NAME + File.separator + id + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

}
