package gray.website.common.rsp.link;

import gray.website.common.entity.GrayLink;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LinkGroup {
    private String name;

    private List<GrayLink> links;
}
