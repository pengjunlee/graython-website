package gray.website.infrastructure.repo;

import com.baomidou.mybatisplus.extension.service.IService;
import gray.website.common.entity.GrayLibrary;

import java.util.List;

/**
 * <p>
 * 资源库表 服务类
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:11
 */
public interface GrayLibraryRepo extends IService<GrayLibrary> {

    List<GrayLibrary> listLibraries(Long collectionId,Long userId);

    int updateCoverById(Long id, Long cover);
}
