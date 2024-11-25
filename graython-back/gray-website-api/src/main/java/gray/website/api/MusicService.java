package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayMovie;
import gray.website.common.entity.GrayMusic;
import gray.website.common.qry.MoviePageQry;
import gray.website.common.qry.MusicPageQry;
import gray.website.common.qry.SubFolderQry;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MusicService {
    Boolean musicRefresh(String folderPath);

    List<GrayMusic> listMusic(SubFolderQry subFolderQry);

    Boolean likeMusic(Long id);

    Boolean playlistAddMusic(Long id);

    BingoPageRsp<GrayMusic> page(MusicPageQry musicPageQry);

    List<GrayMusic> randomMusic(Integer size);

    Boolean addMusician(MultipartFile file, GrayCollection obj);

    Boolean refreshLyric();
}
