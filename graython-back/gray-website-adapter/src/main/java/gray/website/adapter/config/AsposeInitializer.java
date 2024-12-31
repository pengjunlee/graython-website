package gray.website.adapter.config;

import gray.bingo.common.utils.StringUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.utils.AsposeUtil;
import gray.website.infrastructure.repo.BaseSysParamRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * Aspose cloud 初始化
 */
@Component
@RequiredArgsConstructor
public class AsposeInitializer implements ApplicationListener<ContextRefreshedEvent> {

    private final BaseSysParamRepo baseSysParamRepo;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // Aspose 文档转换实例初始化
        if (!AsposeUtil.getInitSuccess()) {
            String appId = baseSysParamRepo.findByParamName(WebsiteConst.ASPOSE_APP_ID);
            String appSecret = baseSysParamRepo.findByParamName(WebsiteConst.ASPOSE_APP_SECRET);
            if (StringUtil.isNotBlank(appId) && StringUtil.isNotBlank(appSecret)) {
                AsposeUtil.init(appId, appSecret);
            }
        }

    }
}
