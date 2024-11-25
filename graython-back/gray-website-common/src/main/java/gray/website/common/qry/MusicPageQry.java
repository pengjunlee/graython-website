package gray.website.common.qry;


import gray.bingo.common.entity.BingoPageQry;
import lombok.Data;

@Data
public class MusicPageQry extends BingoPageQry {

    private String name;

    private String folderPath;

    private Integer favorite;

    private Integer playlist;

    private String artist;
}
