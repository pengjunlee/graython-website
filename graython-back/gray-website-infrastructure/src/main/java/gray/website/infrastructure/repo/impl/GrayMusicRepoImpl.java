package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.FileUtil;
import gray.bingo.common.utils.StringUtil;
import gray.website.common.config.AuthContext;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayMusic;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.handler.ResourceHandler;
import gray.website.infrastructure.mapper.GrayMusicMapper;
import gray.website.infrastructure.repo.GrayMusicRepo;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * <p>
 * 音乐表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-11-04 19:04:16
 */
@Service
@RequiredArgsConstructor
public class GrayMusicRepoImpl extends ServiceImpl<GrayMusicMapper, GrayMusic> implements GrayMusicRepo {

    private final GrayMusicMapper musicMapper;

    @Qualifier("resourceBasicAttributeHandler")
    @Resource
    private ResourceHandler resourceBasicAttributeHandler;
    
    @Override
    @Async("singleThreadTaskExecutor")
    public Boolean refresh(String folderPath) {
        if (StringUtil.isBlank(folderPath)) return false;
        List<GrayMusic> GrayMusics = musicMapper.selectList(new QueryWrapper<GrayMusic>().eq("folder_path", folderPath));
        Map<String, GrayMusic> musicMap = GrayMusics.stream().collect(Collectors.toMap(GrayMusic::getFileName, GrayMusic -> GrayMusic, (existing, replacement) -> existing));
        String rootPath = ResourceUtil.getResourceRootPath() + folderPath;
        // 列出文件夹下的所有子文件
        try (Stream<Path> paths = Files.walk(Paths.get(rootPath), 1)) {
            paths.filter(Files::isRegularFile).filter(path -> !path.getFileName().toString().startsWith("."))
                    .filter(path -> WebsiteConst.AUDIO_EXTENSIONS.contains(FileUtil.getFileExtension(path.getFileName().toString())))
                    .forEach(path -> syncMusic(path, folderPath, AuthContext.getUserId(), musicMap));
        } catch (IOException e) {
            log.error(ExceptionUtil.getMessage(e));
        }

        // 若最终resourceMap还有文件，则代表已删除的文件
        musicMap.forEach((fileName, resource) -> {
            musicMapper.deleteById(resource.getId());
        });
        return true;
    }

    @Override
    public Boolean likeMusic(Long id) {
        return musicMapper.likeMusic(id);
    }

    @Override
    public Boolean playlistAddMusic(Long id) {
        return musicMapper.playlistAddMusic(id);
    }

    @Override
    public List<GrayMusic> randomMusic(int size) {
        return musicMapper.randomMusic(size);
    }

    /**
     * 单个歌曲同步
     *
     * @param filePath
     * @param userId
     * @param musicMap
     */
    private void syncMusic(Path filePath, String folderPath, Long userId, Map<String, GrayMusic> musicMap) {

        String fileName = filePath.getFileName().toString();
        GrayMusic grayMusic = musicMap.get(fileName);
        if (null != musicMap && Objects.nonNull(grayMusic)) {
            musicMap.remove(fileName);
        } else {
            grayMusic = new GrayMusic();
            grayMusic.setUserId(userId);
        }

        try {
            resourceBasicAttributeHandler.handle(filePath,folderPath, grayMusic);
        } catch (Exception e) {
            log.error("影片同步失败，filePath = " + filePath.toString());
            log.error(ExceptionUtil.getMessage(e));
        }
    }
}
