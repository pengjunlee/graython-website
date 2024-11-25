package gray.website.infrastructure.mapper;

import gray.website.common.entity.BaseSysParam;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * 系统参数 Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-10-23 10:51:32
 */
public interface BaseSysParamMapper extends BaseMapper<BaseSysParam> {

    BaseSysParam findByParamName(@Param("paramName") String paramName);
}
