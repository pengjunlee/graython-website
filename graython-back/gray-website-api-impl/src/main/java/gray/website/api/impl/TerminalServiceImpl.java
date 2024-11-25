package gray.website.api.impl;


import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.TerminalService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.cmd.BaiduTranslateCmd;
import gray.website.common.entity.GrayResource;
import gray.website.common.rsp.workstation.BaiduTranslateRsp;
import gray.website.common.rsp.workstation.MusicListRsp;
import gray.website.common.rsp.workstation.RandomBgRsp;
import gray.website.common.rsp.workstation.RandomMusicRsp;
import gray.website.infrastructure.mapper.GrayResourceMapper;
import gray.website.infrastructure.remote.TerminalClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website-server")
@Slf4j
public class TerminalServiceImpl implements TerminalService {

    @Resource
    private GrayResourceMapper grayResourceMapper;

    private final TerminalClient terminalClient;
    private static final String random_bg_url = "";

    @Override
    public String randomBg() {
        GrayResource grayResource = grayResourceMapper.random(2L);
        return grayResource.getPreviewUrl();
    }

    @Override
    public RandomMusicRsp randomMusic() {
        MusicListRsp musicListRsp = null;
        try {
            musicListRsp = terminalClient.musicList();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (musicListRsp.isSuccess()) {
            List<RandomMusicRsp> data = musicListRsp.getData();
            int index = ThreadLocalRandom.current().nextInt(data.size());
            return data.get(index);
        }
        throw new BIZException(BIZErrorCodeEnum.RESULT_ERROR);
    }

    @Override
    public BaiduTranslateRsp baiduTranslate(BaiduTranslateCmd baiduTranslateCmd) {
        BaiduTranslateRsp baiduTranslateRsp = null;
        try {
            baiduTranslateRsp = terminalClient.baiduTranslate(baiduTranslateCmd);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return baiduTranslateRsp;
    }
}
