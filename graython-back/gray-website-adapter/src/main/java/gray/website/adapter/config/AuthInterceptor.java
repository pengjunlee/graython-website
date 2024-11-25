package gray.website.adapter.config;

import gray.bingo.common.anno.Anonymous;
import gray.website.api.UserService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AccessToken;
import gray.website.common.config.AuthContext;
import gray.website.common.config.ReadOnly;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

/**
 * 鉴权拦截
 */
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (handler instanceof HandlerMethod) {
            final HandlerMethod handlerMethod = (HandlerMethod) handler;
            final Class<?> clazz = handlerMethod.getBeanType();
            // 判断是否需要进行登录校验
            if (!clazz.isAnnotationPresent(Anonymous.class) && !handlerMethod.hasMethodAnnotation(Anonymous.class)) {
                // 需要登录
                AccessToken accessToken = userService.check();
                if (Objects.isNull(accessToken)) throw new BIZException(BIZErrorCodeEnum.AUTH_ERROR);
                AuthContext.set(accessToken);
                AuthContext.setUserId(accessToken.getUserId());
            }
            AccessToken accessToken = AuthContext.get();
            if (Objects.nonNull(accessToken) && accessToken.getMetadata().get("type").equals("3")){
                if (handlerMethod.hasMethodAnnotation(ReadOnly.class)) {
                    throw new BIZException(BIZErrorCodeEnum.UNSUPPORTED_OPERATION_ERROR);
                }
            }
        }
        return true;
    }
}