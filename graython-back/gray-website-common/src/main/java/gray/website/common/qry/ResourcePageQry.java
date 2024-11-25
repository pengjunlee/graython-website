package gray.website.common.qry;


import gray.bingo.common.entity.BingoPageQry;
import lombok.Data;

import java.util.List;

@Data
public class ResourcePageQry extends BingoPageQry {

    private List<Integer> resourceTypes;

    private Long collectionId;

    private Long libraryId;

    private Boolean unclassified = false;

}
