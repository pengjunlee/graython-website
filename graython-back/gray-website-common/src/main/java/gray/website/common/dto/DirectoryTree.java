package gray.website.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gray.bingo.common.utils.ExceptionUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.utils.ResourceUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Stream;


@Data
@Slf4j
public class DirectoryTree {

    private List<DirectoryNode> children = new ArrayList<>();

    @JsonIgnore
    private Map<Path, DirectoryNode> map = new HashMap<>();

    public DirectoryTree(Path path) {
        try (Stream<Path> paths = Files.walk(path)) {
            paths.filter(Files::isDirectory).filter(p -> !(p.equals(path) || p.toString().startsWith(ResourceUtil.getUserRootPath() + WebsiteConst.EXT_SEPARATOR) || p.getFileName().toString().startsWith("."))).forEach(this::createNode);
        } catch (IOException e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }

    private void createNode(Path path) {

        DirectoryNode directoryNode = new DirectoryNode(path.getName(path.getNameCount() - 1).toString(), path.toAbsolutePath().toString());

        // 获取父节点
        DirectoryNode parentNode = map.get(path.getParent());
        if (Objects.isNull(parentNode)) {
            children.add(directoryNode);
        } else {
            parentNode.getChildren().add(directoryNode);
        }
        map.put(path, directoryNode);
    }


//    public static void main(String[] args) {
//        Path startPath = Paths.get("/Users/pengjunlee/Documents");
//        DirectoryTree tree = new DirectoryTree(startPath);
//        tree.getChildren().forEach(DirectoryTree::printTree);
//    }
//
//    private static void printTree(DirectoryNode node) {
//        log.info(node.getPath());
//        for (DirectoryNode child : node.getChildren()) {
//            printTree(child);
//        }
//    }
}
