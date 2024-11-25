package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import gray.bingo.common.utils.ExceptionUtil;
import gray.website.common.config.AuthContext;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.handler.ResourceHandler;
import gray.website.infrastructure.mapper.GrayFolderMapper;
import gray.website.infrastructure.mapper.GrayResourceMapper;
import gray.website.infrastructure.repo.GrayFolderRepo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * <p>
 * 文件夹表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-08-27 19:27:10
 */
@Service
public class GrayFolderRepoImpl extends ServiceImpl<GrayFolderMapper, GrayFolder> implements GrayFolderRepo {

    @Resource
    private GrayFolderMapper grayFolderMapper;

    @Resource
    private GrayResourceMapper grayResourceMapper;

    @Qualifier("resourceBasicAttributeHandler")
    @Resource
    private ResourceHandler resourceBasicAttributeHandler;


    @Override
    public GrayFolder getByFolderPath(String folderPath) {
        return grayFolderMapper.selectOne(new QueryWrapper<GrayFolder>().eq("path", folderPath));
    }

    @Override
    // @Async("singleThreadTaskExecutor")
    public void refresh(Long id) {
        GrayFolder grayFolder = grayFolderMapper.selectById(id);
        if (Objects.isNull(grayFolder)) return;

        // 查出数据库中文件夹下的所有文件
        List<GrayResource> grayResources = grayResourceMapper.selectList(new QueryWrapper<GrayResource>().eq("folder_id", grayFolder.getId()));
        Map<String, GrayResource> resourceMap = grayResources.stream().collect(Collectors.toMap(GrayResource::getName, grayResource -> grayResource, (existing, replacement) -> existing));

        // 列出文件夹下的所有文件
        try (Stream<Path> paths = Files.walk(Paths.get(ResourceUtil.getUserRootPath() + grayFolder.getPath()), 1)) {
            paths.filter(Files::isRegularFile).forEach(path -> syncFile(path, grayFolder, resourceMap));
        } catch (IOException e) {
            log.error(ExceptionUtil.getMessage(e));
        }

        // 若最终resourceMap还有文件，则代表已删除的文件
        resourceMap.forEach((fileName, resource) -> {
            grayResourceMapper.deleteById(resource.getId());
        });
    }

    private void syncFile(Path path, GrayFolder grayFolder, Map<String, GrayResource> resourceMap) {

        // 忽略点开头点系统隐藏文件
        String fileName = path.getFileName().toString();
        if (fileName.startsWith(".")) return;

        GrayResource grayResource = resourceMap.get(fileName);
        if (Objects.nonNull(grayResource)) {
            resourceMap.remove(grayResource.getName());
        } else {
            grayResource = new GrayResource();
            grayResource.setUserId(AuthContext.getUserId());
        }
        try {
            resourceBasicAttributeHandler.handle(path, grayResource, grayFolder);
        } catch (Exception e) {
            log.error("文件更新失败，path = " + path.toString());
            log.error(ExceptionUtil.getMessage(e));
        }


    }
}