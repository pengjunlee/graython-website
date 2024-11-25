package gray.website.api.impl;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import gray.bingo.cache.caffeine.CaffeineHelper;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.utils.StringUtil;
import gray.website.api.ResourceService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AuthContext;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayLibrary;
import gray.website.common.entity.GrayResource;
import gray.website.common.qry.ResourcePageQry;
import gray.website.common.qry.VideoExtractQry;
import gray.website.common.rsp.resource.LibraryResourceStatistics;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.repo.GrayCollectionRepo;
import gray.website.infrastructure.repo.GrayFolderRepo;
import gray.website.infrastructure.repo.GrayLibraryRepo;
import gray.website.infrastructure.repo.GrayResourceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {
    private final GrayCollectionRepo grayCollectionRepo;
    private final GrayLibraryRepo grayLibraryRepo;
    private final GrayFolderRepo grayFolderRepo;
    private final GrayResourceRepo grayResourceRepo;

    @Override
    public List<GrayLibrary> listLibrary(Long collectionId) {
        List<GrayLibrary> grayLibraries = grayLibraryRepo.listLibraries(collectionId, AuthContext.getUserId());

        grayLibraries.stream().filter(item -> Objects.nonNull(item.getCover())).forEach(library -> {
            GrayResource grayResource = grayResourceRepo.getById(library.getCover());
            if (Objects.nonNull(grayResource)) library.setCoverUrl(grayResource.getThumbnailUrl());
        });
        return grayLibraries;
    }

    @Override
    public GrayLibrary addLibrary(GrayLibrary grayLibrary) {
        if (StringUtil.isBlank(grayLibrary.getName()) || StringUtil.isBlank(grayLibrary.getFolderName()) || StringUtil.isBlank(grayLibrary.getFolderPath()))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);

        String relativePath = grayLibrary.getFolderPath().replace(ResourceUtil.getUserRootPath(), "");

        // 文件夹树否已经存在
        GrayFolder grayFolder = grayFolderRepo.getByFolderPath(relativePath);
        if (Objects.isNull(grayFolder)) {
            // 创建folder对象
            grayFolder = new GrayFolder(grayLibrary.getFolderName(), relativePath, AuthContext.getUserId());
            grayFolderRepo.save(grayFolder);
        }

        grayLibrary.setFolderId(grayFolder.getId());
        grayLibrary.setUserId(AuthContext.getUserId());
        // 更新
        if (Objects.nonNull(grayLibrary.getId())) {
            grayLibraryRepo.updateById(grayLibrary);
        } else {
            grayLibraryRepo.save(grayLibrary);
        }
        return grayLibrary;
    }

    @Override
    public Boolean deleteLibrary(Long id) {
        return grayLibraryRepo.removeById(id);
    }

    @Override
    public Boolean refreshLibrary(Long id) {
        GrayLibrary grayLibrary = grayLibraryRepo.getById(id);
        if (Objects.isNull(grayLibrary) || Objects.isNull(grayLibrary.getFolderId()))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);
        grayFolderRepo.refresh(grayLibrary.getFolderId());
        return true;
    }

    @Override
    public BingoPageRsp<GrayResource> page(ResourcePageQry resourcePageQry) {
        IPage<GrayResource> page = grayResourceRepo.page(new Page<>(resourcePageQry.getPageNo(), resourcePageQry.getPageSize()), buildPageQueryWrapper(resourcePageQry));
        List<GrayResource> records = page.getRecords();
        records.forEach(item -> {
            // GrayFolder grayFolder = grayFolderRepo.getById(item.getFolderId());
            GrayFolder folder = CaffeineHelper.getWithCache("gray_folder::", item.getFolderId(), 300L, grayFolderRepo::getById);
            item.setFolderPath(folder.getPath());
            item.setFolderName(folder.getName());
        });
        return new BingoPageRsp<>(records, page.getCurrent(), page.getTotal());
    }

    @Override
    public Boolean deleteCollection(Long id) {
        return grayCollectionRepo.removeById(id);
    }

    @Override
    public GrayCollection addCollection(MultipartFile file, GrayCollection grayCollection) {
        if (StringUtil.isBlank(grayCollection.getName()))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);
        grayCollection.setUserId(AuthContext.getUserId());
        // 更新
        if (Objects.nonNull(grayCollection.getId())) {
            grayCollectionRepo.updateById(grayCollection);
        } else {
            grayCollectionRepo.save(grayCollection);
        }

        if (Objects.nonNull(file)) {
            // 保存图片+ 缩略图
            ResourceUtil.saveCollectionCover(file, grayCollection);
        }
        return grayCollection;
    }

    @Override
    public List<GrayCollection> listCollecion() {
        return grayCollectionRepo.list(new QueryWrapper<GrayCollection>().eq("user_id",AuthContext.getUserId()));
    }

    @Override
    public int setLibraryCover(GrayLibrary grayLibrary) {
        return grayLibraryRepo.updateCoverById(grayLibrary.getId(), grayLibrary.getCover());
    }

    @Override
    public Boolean deleteResource(Long id) {
        GrayResource grayResource = grayResourceRepo.getById(id);
        ResourceUtil.deleteResource(grayResource);
        return grayResourceRepo.removeById(id);
    }

    @Override
    public LibraryResourceStatistics statisticsLibrary(ResourcePageQry resourcePageQry) {
        LibraryResourceStatistics result = new LibraryResourceStatistics();
        // 统计未分类的
        long unclassified = grayResourceRepo.count(buildPageQueryWrapper(resourcePageQry));
        result.setUnclassified(unclassified);
        return result;
    }

    @Override
    public Integer classifyResource(GrayResource grayResource) {
        return grayResourceRepo.updateClassificationById(grayResource.getId(), grayResource.getClassification().getValue());
    }

    @Override
    public Boolean extract(VideoExtractQry qry) {
        GrayResource grayResource = grayResourceRepo.getById(qry.getId());

        return null;
    }

    private QueryWrapper<GrayResource> buildPageQueryWrapper(ResourcePageQry resourcePageQry) {
        QueryWrapper<GrayResource> queryWrapper = new QueryWrapper<>();
        if (Objects.nonNull(resourcePageQry.getLibraryId())) {
            GrayLibrary grayLibrary = grayLibraryRepo.getById(resourcePageQry.getLibraryId());
            queryWrapper.eq("folder_id", grayLibrary.getFolderId());
        }else if(Objects.nonNull(resourcePageQry.getCollectionId())){
            List<GrayLibrary> grayLibraries = grayLibraryRepo.listLibraries(resourcePageQry.getCollectionId(), AuthContext.getUserId());
            if (grayLibraries.size() <= 0 ){
                queryWrapper.eq("id", 0);
            }else {
                List<Long> folderIds = grayLibraries.stream().map(GrayLibrary::getFolderId).collect(Collectors.toList());
                queryWrapper.in("folder_id", folderIds);
            }
        }else {
            queryWrapper.eq("user_id", AuthContext.getUserId());
        }

        if (CollectionUtil.isNotEmpty(resourcePageQry.getResourceTypes())) {
            queryWrapper.in("resource_type", resourcePageQry.getResourceTypes());
        }
        if (resourcePageQry.getUnclassified()) {
            queryWrapper.isNull("classification");
        }

        queryWrapper.orderByDesc("id");
        return queryWrapper;
    }
}
