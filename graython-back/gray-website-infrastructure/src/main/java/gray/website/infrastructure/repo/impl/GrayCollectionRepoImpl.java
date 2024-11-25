package gray.website.infrastructure.repo.impl;

import gray.website.common.entity.GrayCollection;
import gray.website.infrastructure.mapper.GrayCollectionMapper;
import gray.website.infrastructure.repo.GrayCollectionRepo;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 资源库合集表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-09-10 18:15:58
 */
@Service
public class GrayCollectionRepoImpl extends ServiceImpl<GrayCollectionMapper, GrayCollection> implements GrayCollectionRepo {

}
