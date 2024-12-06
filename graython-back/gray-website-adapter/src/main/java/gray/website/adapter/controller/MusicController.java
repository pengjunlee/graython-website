package gray.website.adapter.controller;

import gray.bingo.common.anno.Anonymous;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.entity.R;
import gray.bingo.common.utils.JsonUtil;
import gray.website.api.MusicService;
import gray.website.common.config.ReadOnly;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayMusic;
import gray.website.common.qry.MusicPageQry;
import gray.website.common.qry.SubFolderQry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * 音乐表 前端控制器
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;


    /**
     * 查询某个文件夹下所有歌曲列表
     * @param subFolderQry
     * @return
     */
    @PostMapping("/list")
    public R<List<GrayMusic>> listMusic(@RequestBody SubFolderQry subFolderQry) {
        return R.ok(musicService.listMusic(subFolderQry));
    }

    /**
     * 歌曲喜欢或者取消喜欢
     * @param id
     * @return
     */
    @GetMapping("/like/{id}")
    @ReadOnly
    public R<Boolean> likeMusic(@PathVariable Long id) {
        return R.ok(musicService.likeMusic(id));
    }

    /**
     * 歌曲添加到播放列表或者从播放列表移除
     * @param id
     * @return
     */
    @GetMapping("/playlist/add/{id}")
    @ReadOnly
    public R<Boolean> playlistAddMusic(@PathVariable Long id) {
        return R.ok(musicService.playlistAddMusic(id));
    }

    /**
     * 专辑数据同步
     * @param subFolderQry
     * @return
     */
    @PostMapping("/refresh")
    @ReadOnly
    public R<Boolean> musicRefresh(@RequestBody SubFolderQry subFolderQry) {
        return R.ok(musicService.musicRefresh(subFolderQry.getFolderPath()));
    }

    /**
     * 分页查询
     *
     * @param musicPageQry
     * @return
     */
    @PostMapping("/page")
    public R<BingoPageRsp<GrayMusic>> page(@RequestBody MusicPageQry musicPageQry) {
        return R.ok(musicService.page(musicPageQry));
    }

    /**
     * 随机获取音乐
     *
     * @return
     */
    @GetMapping("/random/{size}")
    @Anonymous
    public R<List<GrayMusic>> randomMusic(@PathVariable(name = "size") Integer size) {
        return R.ok(musicService.randomMusic(size));
    }

    /**
     * 随机获取音乐
     *
     * @return
     */
    @GetMapping("/lyric/refresh")
    @Anonymous
    public R<Boolean> refreshLyric() {
        return R.ok(musicService.refreshLyric());
    }


    /**
     * 新增歌手头像
     *
     * @return
     */
    @PostMapping(value = "/musician/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ReadOnly
    public R<Boolean> addMusician(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("entity") String grayCollection) {
        return R.ok(musicService.addMusician(file, JsonUtil.toObj(grayCollection, GrayCollection.class)));
    }
}
