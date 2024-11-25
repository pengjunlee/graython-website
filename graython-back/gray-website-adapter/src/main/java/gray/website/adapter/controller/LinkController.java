package gray.website.adapter.controller;

import gray.bingo.common.Enums.base.BaseIntEnum;
import gray.bingo.common.Enums.base.EnumOption;
import gray.bingo.common.anno.Anonymous;
import gray.bingo.common.entity.R;
import gray.bingo.common.utils.JsonUtil;
import gray.website.api.LinkService;
import gray.website.common.config.ReadOnly;
import gray.website.common.entity.GrayLink;
import gray.website.common.enums.LinkGroupEnum;
import gray.website.common.rsp.link.LinkGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * 导航内的链接条目表 前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-10-23 11:36:49
 */
@RestController
@RequestMapping("/link")
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    /**
     * 新建链接
     *
     * @return
     */
    @PostMapping("/add")
    @ReadOnly
    public R<GrayLink> addLink(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("entity") String grayLink) {
        return R.ok(linkService.addLink(file, JsonUtil.toObj(grayLink, GrayLink.class)));
    }

    /**
     * 获取链接列表
     *
     * @return
     */
    @GetMapping("/list/{groupType}")
    public R<List<GrayLink>> listLink(@PathVariable(name = "groupType") Integer groupType) {
        return R.ok(linkService.listLink(groupType));
    }

    /**
     * 获取链接列表
     *
     * @return
     */
    @GetMapping("/group")
    public R<List<LinkGroup>> groupLink() {
        return R.ok(linkService.groupLink());
    }

    /**
     * 获取分组类型列表
     *
     * @return
     */
    @GetMapping("/groups")
    @Anonymous
    public R<List<EnumOption<Integer>>> groups() {
        return R.ok(BaseIntEnum.toList(LinkGroupEnum.class));
    }

    /**
     * 删除网址
     *
     * @return
     */
    @PostMapping("/delete/{id}")
    @ReadOnly
    public R<Boolean> deleteCollection(@PathVariable(name = "id") Long id) {
        return R.ok(linkService.deleteLink(id));
    }
}
