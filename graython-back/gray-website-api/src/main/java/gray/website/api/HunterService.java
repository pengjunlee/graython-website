package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayJob;
import gray.website.common.entity.GrayMovie;
import gray.website.common.qry.MoviePageQry;
import gray.website.common.qry.SubFolderQry;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HunterService {
    Boolean saveJob(GrayJob grayJob);


    List<GrayJob> listAll();

    Boolean deleteJob(Long id);
}
