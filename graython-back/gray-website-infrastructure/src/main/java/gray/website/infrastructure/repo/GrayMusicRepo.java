package gray.website.infrastructure.repo;

import gray.website.common.entity.GrayMusic;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 音乐表 服务类
 * </p>
 *
 * @author graython
 * @since 2024-11-04 19:04:16
 */
public interface GrayMusicRepo extends IService<GrayMusic> {

    Boolean refresh(String folderPath);

    Boolean likeMusic(Long id);

    Boolean playlistAddMusic(Long id);

    List<GrayMusic> randomMusic(int i);
}
