package gray.website.common.biz.resource;

import gray.website.common.cst.WebsiteConst;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.utils.ResourceUtil;

import java.nio.file.Path;

/**
 * ZIP特殊处理实现
 */
public class ZIPParticular implements Particular {
    @Override
    public boolean processParticular(Path path, GrayResource resource, GrayFolder folder) {
        boolean result = false;
        if (WebsiteConst.MIME_TYPE_APPLICATION_ZIP.equals(resource.getMimeType())) {
            switch (resource.getExt()) {
                case WebsiteConst.RESOURCE_EXT_ZIP_DOC:
                case WebsiteConst.RESOURCE_EXT_ZIP_DOCX:
                    // 处理 Word
                    resource.setResourceType(ResourceTypeEnum.WORD);
                    result = ResourceUtil.updateWordInfo(path, resource);
                    break;

                case WebsiteConst.RESOURCE_EXT_ZIP_PPT:
                case WebsiteConst.RESOURCE_EXT_ZIP_PPTX:
                    // 处理PPT
                    resource.setResourceType(ResourceTypeEnum.PPT);
                    result = ResourceUtil.updatePPTInfo(path, resource);
                    break;
            }
        }

        return result;
    }
}
