package gray.website.adapter.controller;

import gray.bingo.common.anno.Anonymous;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 前端静态资源控制器
 * </p>
 *
 * @author graython
 * @since 2024-03-11 17:05:37
 */
@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetsController {

    @GetMapping("/{fileName}")
    @Anonymous
    public ResponseEntity<Resource> getAssets(@PathVariable(name = "fileName") String fileName) {
        try {
            Resource resource = new ClassPathResource("assets/" + fileName);
            if (resource.exists() || resource.isReadable()) {
                MediaType contentType = MediaType.APPLICATION_OCTET_STREAM;
                if (fileName.endsWith(".css")) {
                    contentType = new MediaType("text", "css");
                } else if (fileName.endsWith(".js")) {
                    contentType = new MediaType("application", "javascript");
                } else if (fileName.endsWith(".mp4")) {
                    contentType = MediaType.parseMediaType("video/mp4");
                }
                return ResponseEntity.ok()
                        .contentType(contentType)
                        .contentLength(resource.contentLength())
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
