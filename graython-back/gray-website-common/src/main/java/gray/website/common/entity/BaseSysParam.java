package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 系统参数
 * </p>
 *
 * @author graython
 * @since 2024-10-23 10:51:32
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("base_sys_param")
public class BaseSysParam implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 参数ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 参数名称
     */
    @TableField("param_name")
    private String paramName;

    /**
     * 参数值
     */
    @TableField("param_value")
    private String paramValue;

    /**
     * 参数说明
     */
    @TableField("param_desc")
    private String paramDesc;

    /**
     * 开放状态 [YesNo]
     */
    @TableField("open_state")
    private Integer openState;

    @TableField("cre_time")
    private Date creTime;

    @TableField("upd_time")
    private Date updTime;
}
