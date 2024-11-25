package gray.website.infrastructure.repo;

import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayMovie;
import com.baomidou.mybatisplus.extension.service.IService;
import gray.website.common.qry.SubFolderQry;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 影视表 服务类
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
public interface GrayMovieRepo extends IService<GrayMovie> {

    void refresh(Long userId);

    List<NameValue> categories(SubFolderQry folderQry);

    public void syncFolder(Path path, Long userId, Map<String, GrayMovie> movieMap);
}
