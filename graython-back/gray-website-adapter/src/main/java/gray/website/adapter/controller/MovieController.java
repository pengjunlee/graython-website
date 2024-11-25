package gray.website.adapter.controller;

import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.entity.R;
import gray.website.api.MovieService;
import gray.website.common.config.ReadOnly;
import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayMovie;
import gray.website.common.qry.MoviePageQry;
import gray.website.common.qry.SubFolderQry;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * 影视表 前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("/cover")
    @ReadOnly
    public R<Boolean> changeCover(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("id") String idStr) {
        return R.ok(movieService.changeCover(file, Long.valueOf(idStr)));
    }

    @GetMapping("/refresh")
    @ReadOnly
    public R<Boolean> movieRefresh() {
        return R.ok(movieService.movieRefresh());
    }

    @PostMapping("/categories")
    public R<List<NameValue>> categories(@RequestBody SubFolderQry folderQry) {
        return R.ok(movieService.categories(folderQry));
    }

    /**
     * 分页查询
     *
     * @param moviePageQry
     * @return
     */
    @PostMapping("/page")
    public R<BingoPageRsp<GrayMovie>> page(@RequestBody MoviePageQry moviePageQry) {
        return R.ok(movieService.page(moviePageQry));
    }

    @PostMapping("/m3u8")
    @ReadOnly
    public R<Boolean> m3u8(@RequestBody MoviePageQry moviePageQry) {
        return R.ok(movieService.m3u8(moviePageQry));
    }
}
