package gray.website.common.biz.resource;

import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayResource;

import java.nio.file.Path;

public interface Particular {


    /**
     * 处理资源的方法
     *
     * @param path     文件路径
     * @param resource 资源对象
     * @param folder   文件夹对象
     */
    boolean processParticular(Path path, GrayResource resource, GrayFolder folder);

}
