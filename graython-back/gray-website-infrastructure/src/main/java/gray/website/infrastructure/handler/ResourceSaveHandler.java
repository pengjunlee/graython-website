package gray.website.infrastructure.handler;

import gray.bingo.common.utils.ExceptionUtil;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayMovie;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayResource;
import gray.website.infrastructure.mapper.GrayMovieMapper;
import gray.website.infrastructure.mapper.GrayMusicMapper;
import gray.website.infrastructure.mapper.GrayResourceMapper;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.Resource;
import java.nio.file.Path;
import java.util.Objects;

@Slf4j
public class ResourceSaveHandler extends ResourceHandler {

    @Resource
    private GrayResourceMapper grayResourceMapper;

    @Resource
    private GrayMovieMapper grayMovieMapper;

    @Resource
    private GrayMusicMapper grayMusicMapper;

    @Override
    public boolean processResource(Path path, GrayResource resource, GrayFolder folder) {
        try {
            if (Objects.nonNull(resource.getId())) {
                grayResourceMapper.updateById(resource);
            } else {
                grayResourceMapper.insert(resource);
            }
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    @Override
    protected boolean processMovie(Path path, GrayMovie movie) {
        try {
            grayMovieMapper.insert(movie);
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    @Override
    protected boolean processMusic(Path path, String folderPath, GrayMusic music) {
        try {
            grayMusicMapper.insert(music);
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }
}
