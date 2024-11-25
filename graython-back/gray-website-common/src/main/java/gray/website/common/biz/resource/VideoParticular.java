package gray.website.common.biz.resource;

import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;
import gray.website.common.utils.ResourceUtil;

import java.nio.file.Path;

/**
 * 视频特殊处理实现
 */
public class VideoParticular implements Particular {
    @Override
    public boolean processParticular(Path path, GrayResource resource, GrayFolder folder) {
        // 生成缩略图
        return ResourceUtil.updateVideoInfo(path, resource);
    }
}
