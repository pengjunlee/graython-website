package gray.website.adapter.controller;


import gray.bingo.common.entity.R;
import gray.bingo.common.utils.RandomUtil;
import gray.bingo.common.utils.TimeUtil;
import gray.website.api.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    @Qualifier("localFileService")
    private FileService fileService;

    /**
     * 批量上传
     */
    @RequestMapping("/uploadList")
    public R<List<String>> uploadList(@RequestParam("files") List<MultipartFile> files,@RequestParam(value = "params",required = false) String params) throws IOException {
        List<String> urlList = new ArrayList<>(files.size());
        for (MultipartFile file : files) {
            String url = fileService.uploadFile(file, params);
            urlList.add(url);
        }
        return R.ok(urlList);
    }

    /**
     * 上传接口
     */
    @RequestMapping("/upload")
    public R<String> upload(@RequestParam("image") MultipartFile file,@RequestParam(value = "params",required = false) String params) throws IOException {
        String url = fileService.uploadFile(file, TimeUtil.currentTimeMillis()
                + "-" + file.getOriginalFilename());
        return R.ok(url);
    }

    /**
     * 下载接口
     */
    @RequestMapping("/download/{fileName}")
    public void download(@PathVariable("fileName") String fileName, HttpServletRequest request, HttpServletResponse response) {
        fileService.downloadFile(fileName, request, response);
    }

    /**
     * 删除接口
     */
    @RequestMapping("/delete")
    public R<Boolean> deleteFile(@RequestParam String fileName) {
        boolean flag = fileService.deleteFile(fileName);
        return R.ok(flag);
    }
}
