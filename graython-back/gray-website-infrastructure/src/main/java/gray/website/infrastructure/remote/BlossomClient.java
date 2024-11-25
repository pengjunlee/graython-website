package gray.website.infrastructure.remote;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import gray.bingo.cache.caffeine.CaffeineHelper;
import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.JsonUtil;
import gray.bingo.common.utils.RequestUtil;
import gray.bingo.common.utils.StringUtil;
import gray.bingo.common.utils.http.JdkHttpUtil;
import gray.website.common.config.AccessToken;
import gray.website.common.cst.WebsiteConst;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class BlossomClient {

    @Value("${website.blossom.service}")
    private String blossomServiceLocation;


    public AccessToken checkLoginStatus() {
        String token = RequestUtil.getHeaderValue(WebsiteConst.AUTHORIZATION);
        if (StringUtil.isBlank(token)) return null;
        Object o = CaffeineHelper.get(token);
        if (Objects.nonNull(o)) return (AccessToken) o;
        Map<String, String> headers = new HashMap<String, String>() {
            {
                put(WebsiteConst.AUTHORIZATION, RequestUtil.getHeaderValue(WebsiteConst.AUTHORIZATION));
                put("Content-Type", "application/json");
            }
        };
        try {
            String tokenStr = JdkHttpUtil.doGet(blossomServiceLocation + "/check", headers);
            // 创建 ObjectMapper 实例
            ObjectMapper objectMapper = new ObjectMapper();

            // 将 JSON 字符串转换为 JsonNode 对象
            JsonNode jsonNode = objectMapper.readTree(tokenStr);

            // 获取 'data' 字段的值
            String data = jsonNode.get("data").toString();
            AccessToken accessToken = JsonUtil.toObj(data, AccessToken.class);
            CaffeineHelper.set(token, accessToken, 30, TimeUnit.MINUTES);
            return accessToken;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return null;
    }
}
