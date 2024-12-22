package gray.website.api.impl;


import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.HunterService;
import gray.website.common.entity.GrayJob;
import gray.website.infrastructure.repo.GrayJobRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website")
@Slf4j
public class HunterServiceImpl implements HunterService {

    private final GrayJobRepo jobRepo;

    @Override
    public Boolean saveJob(GrayJob grayJob) {
        // 更新
        if (Objects.nonNull(grayJob.getId())) {
            jobRepo.updateById(grayJob);
        } else {
            jobRepo.save(grayJob);
        }
        return true;
    }

    @Override
    public List<GrayJob> listAll() {
        return jobRepo.list();
    }

    @Override
    public Boolean deleteJob(Long id) {
        return jobRepo.removeById(id);
    }
}
