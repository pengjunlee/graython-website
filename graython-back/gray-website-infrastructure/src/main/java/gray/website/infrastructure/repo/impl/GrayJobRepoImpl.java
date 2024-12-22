package gray.website.infrastructure.repo.impl;

import gray.website.common.entity.GrayJob;
import gray.website.infrastructure.mapper.GrayJobMapper;
import gray.website.infrastructure.repo.GrayJobRepo;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-12-22 18:27:34
 */
@Service
public class GrayJobRepoImpl extends ServiceImpl<GrayJobMapper, GrayJob> implements GrayJobRepo {

}
