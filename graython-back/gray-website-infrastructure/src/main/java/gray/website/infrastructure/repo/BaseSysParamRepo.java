package gray.website.infrastructure.repo;

import gray.website.common.entity.BaseSysParam;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 系统参数 服务类
 * </p>
 *
 * @author graython
 * @since 2024-10-23 10:51:32
 */
public interface BaseSysParamRepo extends IService<BaseSysParam> {

    String findByParamName(String paramName);
}
