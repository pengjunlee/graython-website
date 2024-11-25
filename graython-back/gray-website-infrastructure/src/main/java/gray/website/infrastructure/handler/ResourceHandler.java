package gray.website.infrastructure.handler;

import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayMovie;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayResource;

import java.nio.file.Path;
import java.util.Objects;

/**
 * 抽象处理者，定义职责的接口，也就是处理请求的接口
 */

public abstract class ResourceHandler {

    /**
     * 持有后继的处理者对象
     */
    protected ResourceHandler successor = null;

    /**
     * 赋值方法，设置后继的处理者对象
     *
     * @param successor 后继的处理者对象
     */
    public void setSuccessor(ResourceHandler successor) {
        this.successor = successor;
    }

    public void handle(Path path, GrayResource resource, GrayFolder folder) {
        boolean success = this.processResource(path, resource, folder);
        if (success && Objects.nonNull(this.successor)) this.successor.handle(path, resource, folder);
    }

    public void handle(Path path, GrayMovie movie) {
        boolean success = this.processMovie(path, movie);
        if (success && Objects.nonNull(this.successor)) this.successor.handle(path, movie);
    }

    public void handle(Path path, String folderPath, GrayMusic music) {
        boolean success = this.processMusic(path, folderPath, music);
        if (success && Objects.nonNull(this.successor)) this.successor.handle(path, folderPath, music);
    }

    /**
     * 处理资源的方法
     *
     * @param path     文件路径
     * @param resource 资源对象
     * @param folder   文件夹对象
     */
    protected abstract boolean processResource(Path path, GrayResource resource, GrayFolder folder);

    protected abstract boolean processMovie(Path path, GrayMovie movie);

    protected abstract boolean processMusic(Path path, String folderPath, GrayMusic music);
}