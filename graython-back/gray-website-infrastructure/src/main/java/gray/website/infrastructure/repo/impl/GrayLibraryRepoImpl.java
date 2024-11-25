package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import gray.website.common.entity.GrayLibrary;
import gray.website.infrastructure.mapper.GrayLibraryMapper;
import gray.website.infrastructure.repo.GrayLibraryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 资源库表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:11
 */
@Service
@RequiredArgsConstructor
public class GrayLibraryRepoImpl extends ServiceImpl<GrayLibraryMapper, GrayLibrary> implements GrayLibraryRepo {

    private final GrayLibraryMapper grayLibraryMapper;

    @Override
    public List<GrayLibrary> listLibraries(Long collectionId,Long userId) {
        return grayLibraryMapper.listLibraries(collectionId,userId);
    }

    @Override
    public int updateCoverById(Long id, Long cover) {
        UpdateWrapper<GrayLibrary> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id); // 指定更新条件

        // 设置需要更新的字段
        return grayLibraryMapper.update(new GrayLibrary(), updateWrapper.set("cover", cover));
    }
}
