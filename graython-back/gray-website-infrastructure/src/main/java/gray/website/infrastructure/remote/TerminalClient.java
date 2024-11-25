package gray.website.infrastructure.remote;

import gray.bingo.common.utils.StringUtil;
import gray.bingo.common.utils.http.JdkHttpUtil;
import gray.website.common.cmd.BaiduTranslateCmd;
import gray.website.common.rsp.workstation.BaiduTranslateRsp;
import gray.website.common.rsp.workstation.MusicListRsp;
import gray.website.common.rsp.workstation.RandomBgRsp;
import gray.website.infrastructure.mapper.GrayResourceMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class TerminalClient {

    private static final String API_URL = "https://fanyi-api.baidu.com/api/trans/vip/translate";
    private static final String APP_ID = "20240729002111390";
    private static final String SECRET_KEY = "UTYkmh7r1rw8Q5UHJr94";

    public RandomBgRsp randomBg() throws Exception {
        return JdkHttpUtil.doGet("http://api.btstu.cn/sjbz/api.php?lx=dongman&format=json", RandomBgRsp.class);
    }

    public MusicListRsp musicList() throws Exception {
        return JdkHttpUtil.doGet("https://api.wer.plus/api/wytop?spm=5176.28103460.0.0.48b23da2t7fb4k", MusicListRsp.class);
    }


    public BaiduTranslateRsp baiduTranslate(BaiduTranslateCmd baiduTranslateCmd) throws Exception {
        String query = baiduTranslateCmd.getWord();
        String salt = Long.toString(System.currentTimeMillis());
        String sign = makeSign(APP_ID, query, salt, SECRET_KEY);
        String from = StringUtil.isNotBlank(baiduTranslateCmd.getFrom()) ? baiduTranslateCmd.getFrom() : "auto";
        String to = StringUtil.isNotBlank(baiduTranslateCmd.getFrom()) ? baiduTranslateCmd.getTo() : "auto";
        String url = API_URL + "?q=" + URLEncoder.encode(query, StandardCharsets.UTF_8.name()) +
                "&from=" + from +
                "&to=" + to +
                "&appid=" + APP_ID +
                "&salt=" + salt +
                "&sign=" + sign;
        return JdkHttpUtil.doGet(url, BaiduTranslateRsp.class);
    }

    private static String makeSign(String appid, String query, String salt, String secretKey) throws NoSuchAlgorithmException, NoSuchAlgorithmException {
        String signStr = appid + query + salt + secretKey;
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digest = md.digest(signStr.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : digest) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
