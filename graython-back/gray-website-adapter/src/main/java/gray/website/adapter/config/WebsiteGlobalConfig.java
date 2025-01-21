package gray.website.adapter.config;

import gray.website.common.utils.AsposeUtil;
import gray.website.common.utils.ResourceUtil;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class WebsiteGlobalConfig implements InitializingBean {


    @Value("${website.resource.root:/app/data/}")
    private String websiteResourceRoot;

    @Value("${website.aspose.app-id}")
    private String appId;

    @Value("${website.aspose.app-secret}")
    private String appSecret;

    @Override
    public void afterPropertiesSet() throws Exception {
        ResourceUtil.setResourceRootPath(websiteResourceRoot.endsWith(File.separator) ? websiteResourceRoot : websiteResourceRoot + File.separator);
        AsposeUtil.init(appId, appSecret);
    }
}
