package gray.website.adapter.controller;

import gray.bingo.common.entity.R;
import gray.website.api.UserService;
import gray.website.common.config.AccessToken;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 用户 前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:05:37
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;


    /**
     * 用户登陆状态检查
     *
     * @return
     */
    @GetMapping("/check")
    public R<AccessToken> check() {
        return R.ok(userService.check());
    }

}
