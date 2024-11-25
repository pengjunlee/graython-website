package gray.website.infrastructure.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import gray.website.common.entity.GrayLibrary;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 资源库表 Mapper 接口
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:11
 */

public interface GrayLibraryMapper extends BaseMapper<GrayLibrary> {

    List<GrayLibrary> listLibraries(@Param("collectionId") Long collectionId,@Param("userId")Long userId);
}
