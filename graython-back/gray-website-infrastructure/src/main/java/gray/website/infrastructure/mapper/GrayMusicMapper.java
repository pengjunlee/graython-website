package gray.website.infrastructure.mapper;

import gray.website.common.entity.GrayMusic;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 音乐表 Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-11-04 19:04:16
 */
public interface GrayMusicMapper extends BaseMapper<GrayMusic> {

    Boolean likeMusic(@Param("id") Long id);

    Boolean playlistAddMusic(@Param("id") Long id);

    List<GrayMusic> randomMusic(@Param("size") int size);
}
