package gray.website.infrastructure.repo;

import gray.website.common.entity.GrayResource;
import com.baomidou.mybatisplus.extension.service.IService;
import gray.website.common.enums.ClassificationEnum;

import java.util.List;

/**
 * <p>
 * 资源表（图片、音频、视频、文档） 服务类
 * </p>
 *
 * @author graython
 * @since 2024-08-29 21:00:20
 */
public interface GrayResourceRepo extends IService<GrayResource> {

    List<GrayResource> listResources();

    Integer updateClassificationById(Long id, Integer classification);

}
