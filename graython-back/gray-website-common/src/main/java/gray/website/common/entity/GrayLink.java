package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.File;
import java.io.Serializable;
import java.util.Date;

import gray.bingo.common.utils.StringUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.enums.LinkGroupEnum;
import gray.website.common.utils.ResourceUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * <p>
 * 导航内的链接条目表
 * </p>
 *
 * @author graython
 * @since 2024-10-23 11:36:49
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_link")
public class GrayLink implements Serializable {

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
     * 名称
     */
    @NotBlank(message = "名称不能为空！")
    @TableField("name")
    private String name;

    /**
     * 描述
     */

    @NotBlank(message = "描述不能为空！")
    @TableField("remark")
    private String remark;

    /**
     * 地址
     */
    @NotBlank(message = "地址不能为空！")
    @TableField("url")
    private String url;

    /**
     * 封面
     */
    @TableField("cover")
    private String cover;

    /**
     * 分组
     */

    @NotNull(message = "分组不能为空！")
    @TableField("group_type")
    private LinkGroupEnum groupType;

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

    public String getCoverUrl() {
        if (StringUtil.isNotBlank(cover)) return cover;
        return WebsiteConst.THUMBNAIL_URL_PATH + WebsiteConst.URL_SEPARATOR + "link" + WebsiteConst.URL_SEPARATOR + id + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

    public String getCoverPath() {
        return WebsiteConst.THUMBNAIL_PATH_NAME + File.separator + "link" + File.separator + id + ResourceUtil.wrapperDotExt(WebsiteConst.RESOURCE_EXT_PNG);
    }

}
