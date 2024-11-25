package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import gray.website.common.entity.GrayResource;
import gray.website.common.enums.ClassificationEnum;
import gray.website.infrastructure.mapper.GrayResourceMapper;
import gray.website.infrastructure.repo.GrayResourceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 资源表（图片、音频、视频、文档） 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-08-29 21:00:20
 */
@Service
@RequiredArgsConstructor
public class GrayResourceRepoImpl extends ServiceImpl<GrayResourceMapper, GrayResource> implements GrayResourceRepo {

    private final GrayResourceMapper grayResourceMapper;

    @Override
    public List<GrayResource> listResources() {
        return null;
    }

    @Override
    public Integer updateClassificationById(Long id, Integer classification) {
        UpdateWrapper<GrayResource> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id); // 指定更新条件

        // 设置需要更新的字段
        return grayResourceMapper.update(new GrayResource(), updateWrapper.set("classification", classification));
    }
}
