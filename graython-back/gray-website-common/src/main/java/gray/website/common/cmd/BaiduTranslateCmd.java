package gray.website.common.cmd;

import lombok.Data;

@Data
public class BaiduTranslateCmd {

    private String word;

    private String from;

    private String to;
}
