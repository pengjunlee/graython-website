package gray.website.common.qry;


import gray.bingo.common.entity.BingoPageQry;
import lombok.Data;

@Data
public class SubFolderQry {

    private String folderPath;

    private Integer type;

    private Long userId;
}
