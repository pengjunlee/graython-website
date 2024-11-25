package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.common.entity.BaseSysParam;
import gray.website.infrastructure.mapper.BaseSysParamMapper;
import gray.website.infrastructure.repo.BaseSysParamRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * <p>
 * 系统参数 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-10-23 10:51:32
 */
@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "blossom")
public class BaseSysParamRepoImpl extends ServiceImpl<BaseSysParamMapper, BaseSysParam> implements BaseSysParamRepo {

    private final BaseSysParamMapper baseSysParamMapper;

    @Override
    public String findByParamName(String paramName) {
        BaseSysParam baseSysParam = baseSysParamMapper.findByParamName(paramName);
        if (Objects.isNull(baseSysParam)) return null;
        return baseSysParam.getParamValue();
    }
}
