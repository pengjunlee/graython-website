package gray.website.common.rsp.workstation;

import cn.hutool.core.collection.CollectionUtil;
import lombok.Data;

import java.util.List;

@Data
public class MusicListRsp {

    /**
     * {
     * "code": 200,
     * "msg": "success",
     * "data": [
     * {
     * "name": "呀瑟呀雷",
     * "mid": "2610649081",
     * "play": "https://music.163.com/song/media/outer/url?id=2610649081"
     * }
     * ]
     * {
     */
    private Integer code;
    private String msg;
    private List<RandomMusicRsp> data;

    public boolean isSuccess(){
        return this.code == 200 && CollectionUtil.isNotEmpty(this.data);
    }

}

