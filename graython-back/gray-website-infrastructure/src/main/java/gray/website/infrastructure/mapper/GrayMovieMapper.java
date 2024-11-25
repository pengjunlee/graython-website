package gray.website.infrastructure.mapper;

import gray.website.common.entity.GrayMovie;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 影视表 Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
public interface GrayMovieMapper extends BaseMapper<GrayMovie> {

    List<String> categories(@Param("userId") Long userId);
}
