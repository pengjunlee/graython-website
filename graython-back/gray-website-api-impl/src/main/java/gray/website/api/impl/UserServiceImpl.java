package gray.website.api.impl;


import cn.hutool.core.util.ObjUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import gray.bingo.cache.caffeine.CaffeineHelper;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.utils.JwtUtil;
import gray.bingo.common.utils.RequestUtil;
import gray.bingo.common.utils.StringUtil;
import gray.bingo.common.utils.security.RSAUtil;
import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.UserService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AccessToken;
import gray.website.common.entity.User;
import gray.website.common.qry.UserPageQry;
import gray.website.infrastructure.remote.BlossomClient;
import gray.website.infrastructure.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website-server")
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    private final BlossomClient blossomClient;

    @SneakyThrows
    @Override
    public User login(String name, String password) {
        User user = userRepo.getByName(name);
        String encrypted = RSAUtil.encrypt(password,"").toString();
        if (!ObjUtil.isNull(user) && encrypted.equals(user.getPassword())) {
            HttpServletResponse response = RequestUtil.getResponse();
            String token = JwtUtil.sign(name);
            response.addHeader(JwtUtil.AUTH_HEADER, JwtUtil.AUTH_PREFIX + token);
            cacheUserWithToken(token, user);
            return user;
        }
        throw new BIZException(BIZErrorCodeEnum.AUTH_ERROR);
    }

    @Override
    public User getUserFromToken(String token) {
        return (User) CaffeineHelper.get(token);
    }

    @Override
    public void cacheUserWithToken(String newToken, User loginUser) {
        CaffeineHelper.set(newToken, loginUser, 10, TimeUnit.MINUTES);
    }

    @Override
    public void logout() {

    }

    @Override
    public BingoPageRsp<User> page(UserPageQry userPageQry) {
        IPage<User> page = userRepo.page(new Page<>(userPageQry.getPageNo(), userPageQry.getPageSize()), new QueryWrapper<>());
        return new BingoPageRsp<>(page.getRecords(), page.getCurrent(), page.getTotal());
    }

    @Override
    public User current() {
        String token = RequestUtil.getRequest().getHeader(JwtUtil.AUTH_HEADER);
        if (StringUtil.isBlank(token)) throw new BIZException(BIZErrorCodeEnum.AUTH_ERROR);
        token  = token.replace(JwtUtil.AUTH_PREFIX,"");
        return getUserFromToken(token);
    }

    @SneakyThrows
    @Override
    public User register(String username, String password) {
        User user = userRepo.getByName(username);
        if(ObjUtil.isNotNull(user)) throw new BIZException(BIZErrorCodeEnum.AUTH_ERROR);
        userRepo.save(user);
        return user;

    }

    @Override
    public AccessToken check() {
        return blossomClient.checkLoginStatus();
    }
}
