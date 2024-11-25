package gray.website.common.qry;


import gray.bingo.common.entity.BingoPageQry;
import lombok.Data;

@Data
public class MoviePageQry extends BingoPageQry {

    private String name;

    private String folderName;

    private String url;
}
