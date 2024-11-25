package gray.website.api;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface FileService {
    /**
     * 上传图片, 返回url
     */
    String uploadFile(MultipartFile file, String fileName) throws IOException;

    /**
     * 下载图片
     */
    void downloadFile(String fileName, HttpServletRequest request, HttpServletResponse response);

    /**
     * 删除图片
     */
    boolean deleteFile(String fileName);
}
