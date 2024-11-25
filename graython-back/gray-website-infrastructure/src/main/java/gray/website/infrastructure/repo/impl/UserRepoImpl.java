package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import gray.website.common.entity.User;
import gray.website.infrastructure.mapper.UserMapper;
import gray.website.infrastructure.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:45:18
 */
@Service
@RequiredArgsConstructor
public class UserRepoImpl extends ServiceImpl<UserMapper, User> implements UserRepo {

    private final UserMapper userMapper;
    @Override
    public User getByName(String name) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("name",name));
    }
}
