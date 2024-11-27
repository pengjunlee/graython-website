package gray.website.adapter.config;

import gray.bingo.common.utils.RequestUtil;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Component
public class CustomResourceResolver implements ResourceResolver {
    @Value("${website.resource.limit-size: 1024 }")
    private Long limitSize;

    private final AtomicLong totalResponseSize = new AtomicLong(0);


    @Override
    public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {

        if (totalResponseSize.get() > limitSize * 1024 * 1024)
            throw new BIZException(BIZErrorCodeEnum.RATE_LIMIT_ERROR);
        // 调用链中的下一个解析器来获取资源
        Resource resource = chain.resolveResource(request, requestPath, locations);

        HttpServletResponse response = RequestUtil.getResponse();
        if (resource != null) {
            // 统计资源大小
            try {
                long contentLength = resource.contentLength();
                log.info("Response size: " + contentLength + " bytes");
                totalResponseSize.addAndGet(contentLength);
                // 将大小加入到响应的 header 中（可选）
                response.setHeader("Content-Length", String.valueOf(contentLength));
            } catch (IOException e) {
                // 处理异常，可能是文件不存在或无法读取
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        }
        return resource;
    }

    @Override
    public String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
        // 调用链中的下一个解析器来获取 URL 路径
        return chain.resolveUrlPath(resourcePath, locations);
    }

    public void reset() {
        totalResponseSize.set(0);
    }
}
