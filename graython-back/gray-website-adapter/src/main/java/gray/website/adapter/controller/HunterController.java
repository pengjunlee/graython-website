package gray.website.adapter.controller;

import gray.bingo.common.anno.Anonymous;
import gray.bingo.common.entity.R;
import gray.website.api.HunterService;
import gray.website.common.config.ReadOnly;
import gray.website.common.entity.GrayJob;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 猎头前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-10-23 11:36:49
 */
@RestController
@RequestMapping("/hunter")
@RequiredArgsConstructor
public class HunterController {

    private final HunterService hunterService;

    /**
     * 新建职位
     *
     * @return
     */
    @PostMapping(value = "/job/add")
    @Anonymous
    public R<Boolean> addJob(@RequestBody GrayJob grayJob) {
        return R.ok(hunterService.saveJob(grayJob));
    }

    @GetMapping(value = "/job/list")
    @Anonymous
    public R<List<GrayJob>> listJob() {
        return R.ok(hunterService.listAll());
    }


    /**
     * 删除职位
     *
     * @return
     */
    @PostMapping("/job/delete/{id}")
    public R<Boolean> deleteJob(@PathVariable(name = "id") Long id) {
        return R.ok(hunterService.deleteJob(id));
    }

}
