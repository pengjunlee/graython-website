package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.config.AccessToken;
import gray.website.common.entity.GrayCollection;
import gray.website.common.entity.GrayLink;
import gray.website.common.entity.User;
import gray.website.common.qry.UserPageQry;
import gray.website.common.rsp.link.LinkGroup;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LinkService {

    GrayLink addLink(MultipartFile file, GrayLink grayLink);

    List<GrayLink> listLink(Integer groupType);

    List<LinkGroup> groupLink();

    Boolean deleteLink(Long id);
}
