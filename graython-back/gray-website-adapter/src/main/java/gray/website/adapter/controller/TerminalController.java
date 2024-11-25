package gray.website.adapter.controller;

import gray.bingo.common.anno.Anonymous;
import gray.bingo.common.entity.R;
import gray.website.api.TerminalService;
import gray.website.common.cmd.BaiduTranslateCmd;
import gray.website.common.rsp.workstation.BaiduTranslateRsp;
import gray.website.common.rsp.workstation.RandomMusicRsp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 终端 前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:05:37
 */
@RestController
@RequestMapping("/terminal")
@RequiredArgsConstructor
@Anonymous
public class TerminalController {

    private final TerminalService terminalService;

    @GetMapping("/bg/random")
    public R<String> randomBg() {
        return R.ok(terminalService.randomBg());
    }

    @GetMapping("/music/random")
    public R<RandomMusicRsp> randomMusic() {
        return R.ok(terminalService.randomMusic());
    }


    @PostMapping("/translate/baidu")
    public R<BaiduTranslateRsp> baiduTranslate(@RequestBody BaiduTranslateCmd baiduTranslateCmd) {
        return R.ok(terminalService.baiduTranslate(baiduTranslateCmd));
    }

}
