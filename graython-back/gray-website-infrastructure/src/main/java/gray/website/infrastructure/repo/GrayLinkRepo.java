package gray.website.infrastructure.repo;

import gray.website.common.entity.GrayLink;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 导航内的链接条目表 服务类
 * </p>
 *
 * @author graython
 * @since 2024-10-23 11:36:49
 */
public interface GrayLinkRepo extends IService<GrayLink> {

    List<GrayLink> listByUser(Long userId);
}
