package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayLibrary;
import gray.website.common.entity.GrayResource;
import gray.website.common.qry.ResourcePageQry;
import gray.website.common.qry.VideoExtractQry;
import gray.website.common.rsp.resource.LibraryResourceStatistics;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResourceService {
    List<GrayLibrary> listLibrary(Long collectionId);

    GrayLibrary addLibrary(GrayLibrary grayLibrary);

    Boolean deleteLibrary(Long id);

    Boolean refreshLibrary(Long id);

    BingoPageRsp<GrayResource> page(ResourcePageQry resourcePageQry);

    Boolean deleteCollection(Long id);

    GrayCollection addCollection(MultipartFile file, GrayCollection grayCollection);

    List<GrayCollection> listCollecion();

    int setLibraryCover(GrayLibrary grayLibrary);

    Boolean deleteResource(Long id);

    LibraryResourceStatistics statisticsLibrary(ResourcePageQry resourcePageQry);

    Integer classifyResource(GrayResource grayResource);

    Boolean extract(VideoExtractQry qry);

}
