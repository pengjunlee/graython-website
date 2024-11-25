package gray.website.common.rsp.workstation;

import lombok.Data;

import java.util.ArrayList;

@Data
public class BaiduTranslateRsp {

    /**
     * {
     * "from": "zh",
     * "to": "en",
     * "trans_result": [
     * {
     * "src": "你好",
     * "dst": "Hello"
     * }
     * ]
     * }
     */

    private String from;

    private String to;

    private ArrayList<TranslateResult> trans_result;

    @Data
    private static class TranslateResult {
        private String src;
        private String dst;
    }

}
