package gray.website.common.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author graython
 * @since 2024-12-22 18:27:34
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("gray_job")
public class GrayJob implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 公司
     */
    @TableField("company")
    private String company;

    /**
     * 职位ID
     */
    @TableField("unique_id")
    private Long uniqueId;

    /**
     * 职位名称
     */
    @TableField("name")
    private String name;

    /**
     * 链接
     */
    @TableField("url")
    private String url;

    /**
     * 工作城市
     */
    @TableField("city")
    private String city;

    /**
     * 部门
     */
    @TableField("dept")
    private String dept;

    /**
     * 需求数
     */
    @TableField("head_count")
    private String headCount;

    /**
     * 经验
     */
    @TableField("experience")
    private String experience;

    /**
     * 学历
     */
    @TableField("degree")
    private String degree;

    /**
     * 详情
     */
    @TableField("detail")
    private String detail;
}
