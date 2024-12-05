package gray.website.adapter.controller;


import gray.bingo.common.Enums.base.BaseIntEnum;
import gray.bingo.common.Enums.base.EnumOption;
import gray.bingo.common.anno.Anonymous;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.entity.R;
import gray.bingo.common.utils.JsonUtil;
import gray.website.api.ResourceService;
import gray.website.common.config.ReadOnly;
import gray.website.common.dto.DirectoryNode;
import gray.website.common.dto.DirectoryTree;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayLibrary;
import gray.website.common.entity.GrayResource;
import gray.website.common.enums.ClassificationEnum;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.qry.ResourcePageQry;
import gray.website.common.qry.VideoExtractQry;
import gray.website.common.rsp.resource.LibraryResourceStatistics;
import gray.website.common.utils.ResourceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.List;

/**
 * <p>
 * 文件资源控制器
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:05:37
 */
@RestController
@RequestMapping("/resource")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    /**
     * 获取目录列表
     *
     * @return
     */
    @GetMapping("/directories")
    public R<List<DirectoryNode>> directories() {
        return R.ok(new DirectoryTree(Paths.get(ResourceUtil.getUserRootPath())).getChildren());
    }

    /**
     * 获取资源类型列表
     *
     * @return
     */
    @GetMapping("/types")
    @Anonymous
    public R<List<EnumOption<Integer>>> types() {
        return R.ok(BaseIntEnum.toList(ResourceTypeEnum.class));
    }


    /**
     * 获取资源分类列表
     *
     * @return
     */
    @GetMapping("/classifications")
    @Anonymous
    public R<List<EnumOption<Integer>>> classifications() {
        return R.ok(BaseIntEnum.toList(ClassificationEnum.class));
    }

    /**
     * 获取资源库列表
     *
     * @return
     */
    @GetMapping("/library/list/{collectionId}")
    public R<List<GrayLibrary>> listLibrary(@PathVariable(name = "collectionId") Long collectionId) {
        return R.ok(resourceService.listLibrary(collectionId));
    }

    /**
     * 新建资源库
     *
     * @return
     */
    @PostMapping(value = "/library/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ReadOnly
    public R<GrayLibrary> addLibrary(@RequestBody GrayLibrary grayLibrary) {
        return R.ok(resourceService.addLibrary(grayLibrary));
    }

    /**
     * 更新资源库封面
     *
     * @return
     */
    @PostMapping("/library/cover")
    @ReadOnly
    public R<Integer> setLibraryCover(@RequestBody GrayLibrary grayLibrary) {
        return R.ok(resourceService.setLibraryCover(grayLibrary));
    }

    /**
     * 更新资源分类
     *
     * @return
     */
    @PostMapping("/classify")
    @ReadOnly
    public R<Integer> classify(@RequestBody GrayResource grayResource) {
        return R.ok(resourceService.classifyResource(grayResource));
    }

    /**
     * 删除资源库
     *
     * @return
     */
    @PostMapping("/library/delete/{id}")
    @ReadOnly
    public R<Boolean> deleteLibrary(@PathVariable(name = "id") Long id) {
        return R.ok(resourceService.deleteLibrary(id));
    }


    /**
     * 资源库统计
     *
     * @return
     */
    @PostMapping("/library/statistics")
    public R<LibraryResourceStatistics> statisticsLibrary(@RequestBody ResourcePageQry resourcePageQry) {
        return R.ok(resourceService.statisticsLibrary(resourcePageQry));
    }

    /**
     * 删除资源
     *
     * @return
     */
    @PostMapping("/delete/{id}")
    @ReadOnly
    public R<Boolean> deleteResource(@PathVariable(name = "id") Long id) {
        return R.ok(resourceService.deleteResource(id));
    }

    /**
     * 同步资源库
     *
     * @return
     */
    @PostMapping("/library/refresh/{id}")
    @ReadOnly
    public R<Boolean> refreshLibrary(@PathVariable(name = "id") Long id) {
        return R.ok(resourceService.refreshLibrary(id));
    }

    /**
     * 分页查询 资源
     *
     * @param resourcePageQry
     * @return
     */
    @PostMapping("/page")
    public R<BingoPageRsp<GrayResource>> page(@RequestBody ResourcePageQry resourcePageQry) {
        return R.ok(resourceService.page(resourcePageQry));
    }

    /**
     * 获取资源合集列表
     *
     * @return
     */
    @GetMapping("/collection/list")
    public R<List<GrayCollection>> listCollection() {
        return R.ok(resourceService.listCollecion());
    }

    /**
     * 新建资源合集
     *
     * @return
     */
    @PostMapping(value = "/collection/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ReadOnly
    public R<GrayCollection> addCollection(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("entity") String grayCollection) {
        return R.ok(resourceService.addCollection(file, JsonUtil.toObj(grayCollection, GrayCollection.class)));
    }

    /**
     * 删除资源合集
     *
     * @return
     */
    @PostMapping("/collection/delete/{id}")
    @ReadOnly
    public R<Boolean> deleteCollection(@PathVariable(name = "id") Long id) {
        return R.ok(resourceService.deleteCollection(id));
    }

    /**
     * 提取视频片段
     *
     * @return
     */
    @PostMapping("/extract")
    @ReadOnly
    public R<Boolean> extract(@RequestBody VideoExtractQry qry) {
        return R.ok(resourceService.extract(qry));
    }
}
