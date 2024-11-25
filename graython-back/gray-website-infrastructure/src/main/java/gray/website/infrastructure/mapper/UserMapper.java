package gray.website.infrastructure.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import gray.website.common.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 用户 Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:45:18
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
