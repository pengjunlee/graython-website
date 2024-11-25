package gray.website.common.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DirectoryNode {
    private String name;
    private String path;
    private List<DirectoryNode> children = new ArrayList<>();

    public DirectoryNode(String name,String path) {
        this.name = name;
        this.path = path;
        this.children = new ArrayList<>();
    }

    public void addChild(DirectoryNode child) {
        children.add(child);
    }

}
