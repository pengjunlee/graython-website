package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import gray.website.common.entity.GrayLink;
import gray.website.infrastructure.mapper.GrayFolderMapper;
import gray.website.infrastructure.mapper.GrayLinkMapper;
import gray.website.infrastructure.repo.GrayLinkRepo;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 导航内的链接条目表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-10-23 11:36:49
 */
@Service
public class GrayLinkRepoImpl extends ServiceImpl<GrayLinkMapper, GrayLink> implements GrayLinkRepo {

    @Resource
    private GrayLinkMapper linkMapper;
    @Override
    public List<GrayLink> listByUser(Long userId) {
        QueryWrapper<GrayLink> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId);
        return linkMapper.selectList(queryWrapper);
    }
}
