package gray.website.api.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.utils.StringUtil;
import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.MusicService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AuthContext;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayMusic;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.qry.MusicPageQry;
import gray.website.common.qry.SubFolderQry;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.repo.GrayMusicRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website")
@Slf4j
public class MusicServiceImpl implements MusicService {

    private final GrayMusicRepo musicRepo;

    @Override
    public Boolean musicRefresh(String folderPath) {
        return musicRepo.refresh(folderPath);
    }

    @Override
    public List<GrayMusic> listMusic(SubFolderQry subFolderQry) {
        return musicRepo.list(new QueryWrapper<GrayMusic>().eq("folder_path", subFolderQry.getFolderPath()));
    }

    @Override
    public Boolean likeMusic(Long id) {
        return musicRepo.likeMusic(id);

    }

    @Override
    public Boolean playlistAddMusic(Long id) {
        return musicRepo.playlistAddMusic(id);
    }

    @Override
    public BingoPageRsp<GrayMusic> page(MusicPageQry musicPageQry) {
        IPage<GrayMusic> page = musicRepo.page(new Page<>(musicPageQry.getPageNo(), musicPageQry.getPageSize()), buildPageQueryWrapper(musicPageQry));
        List<GrayMusic> records = page.getRecords();
        return new BingoPageRsp<>(records, page.getCurrent(), page.getTotal());
    }

    @Override
    public List<GrayMusic> randomMusic(Integer size) {
        if (Objects.isNull(size) || size <= 0) size = 5;
        return musicRepo.randomMusic(5);
    }

    @Override
    public Boolean addMusician(MultipartFile file, GrayCollection grayCollection) {
        if (StringUtil.isBlank(grayCollection.getName()))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);
        if (Objects.nonNull(file)) {
            // 保存图片+ 缩略图
            ResourceUtil.saveMusicianAvatar(file, grayCollection.getName());
        }
        return true;
    }

    @Override
    public Boolean refreshLyric() {
        List<GrayMusic> list = musicRepo.list();
        list.forEach(item -> {
            if (item.getId() < 1363 ){
                String lyricsFromFile = item.getLyrics();
                if (StringUtil.isBlank(lyricsFromFile)){
                    lyricsFromFile = ResourceUtil.getLyricsFromFile(Paths.get(ResourceUtil.getResourceRootPath() + item.getFolderPath() + File.separator + item.getFileName()));
                }
                if (StringUtil.isNotBlank(lyricsFromFile)){
                    UpdateWrapper<GrayMusic> updateWrapper = new UpdateWrapper<GrayMusic>().eq("id", item.getId()).set("lyrics", ResourceUtil.processLyrics(lyricsFromFile));
                    musicRepo.update(updateWrapper);
                }
            }
        });
        return true;
    }


    private QueryWrapper<GrayMusic> buildPageQueryWrapper(MusicPageQry musicPageQry) {
        QueryWrapper<GrayMusic> queryWrapper = new QueryWrapper<>();
        if (StringUtil.isNotBlank(musicPageQry.getName())) {
            queryWrapper.like("title", musicPageQry.getName());
        }
        if (StringUtil.isNotBlank(musicPageQry.getFolderPath())) {
            queryWrapper.eq("folder_path", musicPageQry.getFolderPath());
        }
        if (Objects.nonNull(musicPageQry.getFavorite()) && Objects.equals(YesNoEnum.YES.getValue(), musicPageQry.getFavorite())) {
            queryWrapper.eq("favorite", musicPageQry.getFavorite());
        }

        if (Objects.nonNull(musicPageQry.getPlaylist()) && Objects.equals(YesNoEnum.YES.getValue(), musicPageQry.getPlaylist())) {
            queryWrapper.eq("playlist", musicPageQry.getPlaylist());
        }
        return queryWrapper;
    }


}
