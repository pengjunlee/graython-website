package gray.website.common.biz.resource;

import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;
import gray.website.common.utils.ResourceUtil;

import java.nio.file.Path;

/**
 * 图片特殊处理实现
 */
public class ImageParticular implements Particular {
    @Override
    public boolean processParticular(Path path, GrayResource resource, GrayFolder folder) {
        // 生成缩略图
        return ResourceUtil.generateThumbnail(path, resource);
    }
}
