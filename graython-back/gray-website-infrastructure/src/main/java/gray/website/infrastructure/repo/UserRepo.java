package gray.website.infrastructure.repo;


import com.baomidou.mybatisplus.extension.service.IService;
import gray.website.common.entity.User;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:45:18
 */
public interface UserRepo extends IService<User> {

    User getByName(String name);
}
