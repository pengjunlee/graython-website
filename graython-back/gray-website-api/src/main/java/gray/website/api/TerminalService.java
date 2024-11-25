package gray.website.api;

import gray.website.common.cmd.BaiduTranslateCmd;
import gray.website.common.rsp.workstation.BaiduTranslateRsp;
import gray.website.common.rsp.workstation.RandomMusicRsp;

public interface TerminalService {

    String randomBg();

    RandomMusicRsp randomMusic();

    BaiduTranslateRsp baiduTranslate(BaiduTranslateCmd baiduTranslateCmd);
}
