package gray.website.infrastructure.repo;

import com.baomidou.mybatisplus.extension.service.IService;
import gray.website.common.entity.GrayFolder;

/**
 * <p>
 * 文件夹表 服务类
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:10
 */
public interface GrayFolderRepo extends IService<GrayFolder> {

    GrayFolder getByFolderPath(String folderPath);


    void refresh(Long id);
}
