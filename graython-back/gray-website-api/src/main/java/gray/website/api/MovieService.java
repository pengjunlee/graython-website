package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayLink;
import gray.website.common.entity.GrayMovie;
import gray.website.common.qry.MoviePageQry;
import gray.website.common.qry.SubFolderQry;
import gray.website.common.rsp.link.LinkGroup;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MovieService {
    Boolean changeCover(MultipartFile file,Long id);

    Boolean movieRefresh();

    BingoPageRsp<GrayMovie> page(MoviePageQry moviePageQry);

    List<NameValue> categories(SubFolderQry folderQry);

    Boolean m3u8(MoviePageQry moviePageQry);
}
