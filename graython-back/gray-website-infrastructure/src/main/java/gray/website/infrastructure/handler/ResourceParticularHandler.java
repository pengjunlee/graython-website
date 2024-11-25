package gray.website.infrastructure.handler;

import gray.website.common.biz.resource.Particular;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayMovie;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayResource;
import gray.website.common.utils.ResourceUtil;

import java.nio.file.Path;
import java.util.Objects;

public class ResourceParticularHandler extends ResourceHandler {
    public ResourceParticularHandler(ResourceHandler successor) {
        this.successor = successor;
    }

    @Override
    public boolean processResource(Path path, GrayResource resource, GrayFolder folder) {
        if (Objects.isNull(resource.getResourceType())) return true;
        Particular particular = resource.getResourceType().getParticular();
        if (Objects.nonNull(particular)) return particular.processParticular(path, resource, folder);
        return true;
    }

    @Override
    protected boolean processMovie(Path path, GrayMovie movie) {
        return ResourceUtil.updateMovieInfo(path, movie);
    }

    @Override
    protected boolean processMusic(Path path, String folderPath, GrayMusic music) {
          return ResourceUtil.updateMusicInfo(path, music);
    }


}
