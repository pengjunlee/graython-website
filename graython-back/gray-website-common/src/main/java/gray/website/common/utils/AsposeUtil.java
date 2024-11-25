package gray.website.common.utils;

import com.aspose.cloud.cells.api.CellsApi;
import com.aspose.cloud.cells.request.PutConvertWorkbookRequest;
import com.aspose.slides.api.SlidesApi;
import com.aspose.slides.model.*;
import com.aspose.words.cloud.ApiClient;
import com.aspose.words.cloud.api.WordsApi;
import com.aspose.words.cloud.model.requests.ConvertDocumentRequest;
import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.FileUtil;
import gray.bingo.common.utils.StringUtil;
import gray.website.common.entity.GrayResource;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

@Slf4j
public class AsposeUtil {

    private static SlidesApi slidesApi;
    private static WordsApi wordsApi;
    private static CellsApi cellsApi;

    @Getter
    private static Boolean initSuccess = false;

    public static void init(String appId, String appSecret) {
        if (StringUtil.isBlank(appId) || StringUtil.isBlank(appSecret)) {
            log.error("Aspose 初始化异常：appId 和 appSecret 不能为空!");
            return;
        }
        try {
            slidesApi = new SlidesApi(appId, appSecret);
            wordsApi = new WordsApi(new ApiClient(appId, appSecret, null));
            cellsApi = new CellsApi(appId, appSecret);
            initSuccess = true;
        } catch (Exception e) {
            log.error("Aspose 初始化异常：" + ExceptionUtil.getMessage(e));
        }
    }

    /**
     * Upload the local PPTX file to Aspose Cloud Storage
     *
     * @param savePath
     * @param pptxFilePath
     * @return
     */
    public static boolean uploadFile(Path pptxFilePath, String savePath) {
        try {
            slidesApi.uploadFile(savePath, Files.readAllBytes(pptxFilePath), null);
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }


    /**
     * Convert the uploaded PPTX to PDF
     */
    public static boolean convertPPT2PDF(Path pptxFilePath, String pdfSavePath) {
        try {
            File pdfFile = slidesApi.convert(Files.readAllBytes(pptxFilePath), ExportFormat.PDF, null, null, null, null, null);
            FileUtil.saveFileToPath(pdfFile, pdfSavePath);
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * Convert the uploaded DOCX to PDF
     */
    public static boolean convertWord2PDF(Path wordFilePath, String pdfSavePath) {
        try {
            ConvertDocumentRequest convertRequest = new ConvertDocumentRequest(Files.readAllBytes(wordFilePath), "pdf", null, null, null, null, null, null, null, null);
            byte[] bytes = wordsApi.convertDocument(convertRequest);
            try (FileOutputStream fos = new FileOutputStream(pdfSavePath)) {
                fos.write(bytes);
            }
            ;
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }


    /**
     * Convert the uploaded EXCEL to PDF
     */
    public static boolean convertExcel2PDF(Path excelFilePath, String pdfSavePath) {
        try {
            HashMap<String, File> fileMap = new HashMap<>();
            fileMap.put("input.xlsx", excelFilePath.toFile());
            PutConvertWorkbookRequest request = new PutConvertWorkbookRequest();
            request.setFile(fileMap);
            request.setFormat("pdf");
            File response = cellsApi.putConvertWorkbook(request);
            FileUtil.saveFileToPath(response, pdfSavePath);
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * Convert the uploaded PPTX to PDF
     */
    public static boolean genPptThumbnail(Path pptxFilePath, String pngSavePath, GrayResource grayResource) {
        try {
            String remoteSavePath = System.currentTimeMillis() + "." + FileUtil.getFileExtension(pptxFilePath.toString());
            uploadFile(pptxFilePath, remoteSavePath);
            ExportOptions options = new ImageExportOptions();
            File downloadSlide = slidesApi.downloadSlide(remoteSavePath, 1, SlideExportFormat.PNG, options, null, null, null, null, null, null);
            FileUtil.saveFileToPath(downloadSlide, pngSavePath);
            // 将幻灯片保存为图像
            BufferedImage originalImage = ImageIO.read(downloadSlide);

            // 设置资源对象宽高字段
            grayResource.setThumbnailWidth(originalImage.getWidth());
            grayResource.setThumbnailHeight(originalImage.getHeight());
            grayResource.setWidth(originalImage.getWidth());
            grayResource.setHeight(originalImage.getHeight());

            Slides slidesInfo = slidesApi.getSlides(remoteSavePath, null, null, null);
            grayResource.setPageCount(slidesInfo.getSlideList().size());
            return true;
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

}
