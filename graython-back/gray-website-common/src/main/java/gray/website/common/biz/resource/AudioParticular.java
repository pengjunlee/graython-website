package gray.website.common.biz.resource;

import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;
import gray.website.common.utils.ResourceUtil;

import java.nio.file.Path;

/**
 * 音频特殊处理实现
 */
public class AudioParticular implements Particular {
    @Override
    public boolean processParticular(Path path, GrayResource resource, GrayFolder folder) {
        // 音频时长
        return ResourceUtil.updateAudioInfo(path, resource);
    }
}
