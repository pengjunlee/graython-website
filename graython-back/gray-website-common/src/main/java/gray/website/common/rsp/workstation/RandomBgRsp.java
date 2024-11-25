package gray.website.common.rsp.workstation;

import gray.bingo.common.utils.StringUtil;
import lombok.Data;

@Data
public class RandomBgRsp {

    /**
     * https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json
     * <p>
     * {
     * "code": "200",
     * "imgurl": "https://img.btstu.cn/api/images/5e747f7375e0c.jpg",
     * "width": "1920",
     * "height": "1080"
     * }
     */

    private static final String SUCCESS_CODE = "200";
    private String code;
    private String imgurl;

    private String width;

    private String height;

    public Boolean isSuccess() {
        return SUCCESS_CODE.equals(this.code) && StringUtil.isNotBlank(this.imgurl);
    }
}
