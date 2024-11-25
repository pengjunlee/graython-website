package gray.website.infrastructure.mapper;

import gray.website.common.entity.GrayResource;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 资源表（图片、音频、视频、文档） Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-08-29 21:09:34
 */
public interface GrayResourceMapper extends BaseMapper<GrayResource> {

    List<GrayResource> listResources();

    GrayResource random(long folderId);
}
