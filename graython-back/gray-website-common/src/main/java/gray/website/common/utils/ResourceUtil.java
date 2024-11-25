package gray.website.common.utils;

import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.FileUtil;
import gray.bingo.common.utils.StringUtil;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AuthContext;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.entity.*;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.enums.YesNoEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.ImageTranscoder;
import org.apache.commons.imaging.Imaging;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.tika.Tika;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.Parser;
import org.apache.tika.parser.audio.AudioParser;
import org.apache.tika.parser.mp3.Mp3Parser;
import org.apache.tika.parser.mp4.MP4Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.gagravarr.tika.FlacParser;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class ResourceUtil {
    private static final ThreadLocal<Tika> THREAD_LOCAL_TIKA = ThreadLocal.withInitial(Tika::new);

    private static String RESOURCE_ROOT_PATH = null;

    public static void setResourceRootPath(String resourceRootPath) {
        RESOURCE_ROOT_PATH = resourceRootPath;
    }

    public static String getResourceRootPath() {
        return RESOURCE_ROOT_PATH;
    }

    public static String getUserRootPath() {
        return RESOURCE_ROOT_PATH + AuthContext.getUserId() + File.separator;
    }

    /**
     * 将 Image 对象转换为 BufferedImage。
     *
     * @param img Image 对象
     * @return BufferedImage 对象
     */
    private static BufferedImage toBufferedImage(Image img) {
        if (img instanceof BufferedImage) {
            return (BufferedImage) img;
        }

        // Create a buffered image with transparency
        BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);

        // Draw the image on to the buffered image
        Graphics2D bGr = bimage.createGraphics();
        bGr.drawImage(img, 0, 0, null);
        bGr.dispose();

        // Return the buffered image
        return bimage;
    }

    /**
     * 删除资源对应的文件
     *
     * @param grayResource
     */
    public static void deleteResource(GrayResource grayResource) {
        if (Objects.isNull(grayResource)) return;
        try {
            // 删除原文件
            if (StringUtil.isNotBlank(grayResource.getFilePath())) {
                FileUtil.deleteFile(Paths.get(getUserRootPath() + grayResource.getFilePath()));
            }
            // 删除缩略图
            if (grayResource.getThumbnail().getValue() == 1) {
                FileUtil.deleteFile(Paths.get(getUserRootPath() + grayResource.getThumbnailPath()));
            }
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }


    /**
     * 更新音频信息
     *
     * @param audioPath
     * @param grayResource
     * @return
     */
    public static boolean updateAudioInfo(Path audioPath, GrayResource grayResource) {
        try {
            Metadata metadata = getMediaMetadata(audioPath, grayResource.getExt());
            // 获取播放时长
            String duration = metadata.get(WebsiteConst.METADATA_NAME_DURATION);
            if (duration != null) {
                // 转换为秒
                BigDecimal seconds = BigDecimal.valueOf(Double.parseDouble(duration));
                grayResource.setDuration(seconds);
            } else {
                log.error("Duration not found.");
            }
            // 歌曲判断
            String title = metadata.get(WebsiteConst.METADATA_NAME_TITLE);
            String artist = metadata.get(WebsiteConst.METADATA_NAME_ARTIST);
            String album = metadata.get(WebsiteConst.METADATA_NAME_ALBUM);
            if (StringUtil.isNotBlank(title)) {
                grayResource.setResourceType(ResourceTypeEnum.MUSIC);
                grayResource.setTitle(title);
                if (StringUtil.isNotBlank(album)) grayResource.setAlbum(album);
                if (StringUtil.isNotBlank(artist)) {
                    grayResource.setArtist(artist);
                    File thumbnail = new File(ResourceUtil.getUserRootPath() + grayResource.getThumbnailPath());
                    if (thumbnail.exists()) grayResource.setThumbnail(YesNoEnum.YES);
                }
            }
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return true;
    }

    /**
     * 更新视频信息
     *
     * @param videoPath
     * @param grayResource
     * @return
     */
    public static boolean updateVideoInfo(Path videoPath, GrayResource grayResource) {

        try {
            Metadata metadata = getMediaMetadata(videoPath, grayResource.getExt());
            String durationStr = metadata.get(WebsiteConst.METADATA_NAME_DURATION); // 使用 XMP metadata 的 duration 属性
            String heightStr = metadata.get(WebsiteConst.METADATA_NAME_HEIGHT); // 使用 XMP metadata 的 ku安度 属性
            String widthStr = metadata.get(WebsiteConst.METADATA_NAME_WIDTH); // 使用 XMP metadata 的 高度 属性
            log.info("文件路径:" + videoPath.toString() + ", duration=" + durationStr + ",widthStr=" + widthStr + ",heightStr=" + heightStr);
            BigDecimal duration = BigDecimal.valueOf(Double.parseDouble(durationStr));
            int originalWidth = Integer.parseInt(widthStr);
            int originalHeight = Integer.parseInt(heightStr);

            // 设置缩略图
            int thumbnailWidth = WebsiteConst.THUMBNAIL_MAX_SIZE;
            int thumbnailHeight = WebsiteConst.THUMBNAIL_MAX_SIZE;
            if (originalHeight > thumbnailHeight || originalWidth > thumbnailWidth) {
                if (originalHeight > originalWidth) {
                    thumbnailWidth = (thumbnailHeight * originalWidth) / originalHeight;  // 根据原始图像比例调整宽度
                } else if (originalWidth > originalHeight) {
                    thumbnailHeight = (thumbnailWidth * originalHeight) / originalWidth;  // 根据原始图像比例调整高度
                }
            } else {
                thumbnailWidth = originalWidth;
                thumbnailHeight = originalHeight;
            }
            // 设置资源对象宽高字段
            grayResource.setThumbnailWidth(thumbnailWidth);
            grayResource.setThumbnailHeight(thumbnailHeight);
            grayResource.setDuration(duration);
            grayResource.setWidth(originalWidth);
            grayResource.setHeight(originalHeight);

            // 默认取视频中间一帧生成缩略图
            String thumbnailPath = getResourceRootPath() + grayResource.getThumbnailPath();
            File file = new File(thumbnailPath);
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            if (file.exists()) {
                file.delete();
            }

            // 保存图像到文件
            boolean saved = extractFrameAtTime(videoPath, thumbnailPath, duration.divide(new BigDecimal(2), RoundingMode.UP).floatValue(), 10);
            if (saved) {
                grayResource.setThumbnail(YesNoEnum.YES);
                return true;
            } else {
                log.error("缩略图保存失败");
            }

        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * 生成PDF缩略图
     *
     * @param path
     * @param grayResource
     * @return
     */
    public static boolean updatePDFInfo(Path path, GrayResource grayResource) {
        try {
            // 加载 PDF 文档
            PDDocument document = PDDocument.load(path.toFile());
            PDFRenderer pdfRenderer = new PDFRenderer(document);

            // 渲染第一页
            BufferedImage image = pdfRenderer.renderImageWithDPI(0, 100); // DPI 设置为 100
            // 获取图像宽高
            int originalWidth = image.getWidth();
            int originalHeight = image.getHeight();
            // 设置缩略图宽度
            int targetWidth = Math.min(WebsiteConst.THUMBNAIL_MAX_SIZE, originalWidth);
            int targetHeight = (int) (originalHeight * ((double) targetWidth / originalWidth));

            // 创建缩略图
            BufferedImage thumbnailImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
            thumbnailImage.getGraphics().drawImage(image.getScaledInstance(targetWidth, targetHeight, BufferedImage.SCALE_SMOOTH), 0, 0, null);

            // 设置资源对象宽高字段
            grayResource.setThumbnailWidth(targetWidth);
            grayResource.setThumbnailHeight(targetHeight);
            grayResource.setWidth(originalWidth);
            grayResource.setHeight(originalHeight);
            grayResource.setPageCount(document.getNumberOfPages());

            String thumbnailPath = getResourceRootPath() + grayResource.getThumbnailPath();
            log.info("生成缩略图：" + thumbnailPath);
            File thumbnailFile = new File(thumbnailPath);
            if (!thumbnailFile.getParentFile().exists()) {
                thumbnailFile.getParentFile().mkdirs();
            }
            // 保存图像到文件
            boolean saved = ImageIO.write(thumbnailImage, WebsiteConst.RESOURCE_EXT_PNG, thumbnailFile);
            if (saved) {
                grayResource.setThumbnail(YesNoEnum.YES);
                return true;
            } else {
                log.error("缩略图保存失败");
            }
            // 关闭文档
            document.close();
        } catch (Exception e) {
            log.error("生成缩略图时出错：" + ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * 更新word信息
     *
     * @param path
     * @param grayResource
     * @return
     */
    public static boolean updateWordInfo(Path path, GrayResource grayResource) {

        try {
            String pdfPath = getUserRootPath() + grayResource.getPdfPath();
            AsposeUtil.convertWord2PDF(path, pdfPath);

            return updatePDFInfo(Paths.get(pdfPath), grayResource);

        } catch (Exception e) {
            log.error("更新word信息出错了：" + ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * 更新ppt信息
     *
     * @param path
     * @param grayResource
     * @return
     */
    public static boolean updatePPTInfo(Path path, GrayResource grayResource) {

        try {
            String pdfPath = getUserRootPath() + grayResource.getPdfPath();
            AsposeUtil.convertPPT2PDF(path, pdfPath);

            return updatePDFInfo(Paths.get(pdfPath), grayResource);
        } catch (Exception e) {
            log.error("更新ppt信息出错了：" + ExceptionUtil.getMessage(e));
        }
        return false;
    }


    /**
     * 生成Excel缩略图
     *
     * @param path
     * @param grayResource
     * @return
     */
    public static boolean updateExcelInfo(Path path, GrayResource grayResource) {

        try {
            String pdfPath = getUserRootPath() + grayResource.getPdfPath();
            AsposeUtil.convertExcel2PDF(path, pdfPath);
            return updatePDFInfo(Paths.get(pdfPath), grayResource);
        } catch (Exception e) {
            log.error("更新ppt信息出错了：" + ExceptionUtil.getMessage(e));
        }
        return false;
    }

    public static boolean generateThumbnail(Path inputImagePath, GrayResource grayResource) {
        try {
            // 读取 图像
            BufferedImage originalImage = null;
            if (WebsiteConst.MIME_TYPE_SVG.equals(grayResource.getMimeType())) {
                originalImage = convertSVGToBufferedImage(inputImagePath);
            } else if (grayResource.getMimeType().endsWith("icon")) {
                originalImage = Imaging.getBufferedImage(inputImagePath.toFile());

            } else {
                originalImage = ImageIO.read(inputImagePath.toFile());
            }
            if (originalImage == null) {
                log.error("无法读取图片，请确保文件是有效的图像:{}", inputImagePath.getFileName());
                return false;
            }
            // 获取图像宽高
            int originalWidth = originalImage.getWidth();
            int originalHeight = originalImage.getHeight();

            // 宽高最大200，超过200等比缩放
//            int thumbnailWidth = WebsiteConst.THUMBNAIL_MAX_SIZE;
//            int thumbnailHeight = WebsiteConst.THUMBNAIL_MAX_SIZE;
//            if (originalHeight > thumbnailHeight || originalWidth > thumbnailWidth) {
//                if (originalHeight > originalWidth) {
//                    thumbnailWidth = (thumbnailHeight * originalWidth) / originalHeight;  // 根据原始图像比例调整宽度
//                } else if (originalWidth > originalHeight) {
//                    thumbnailHeight = (thumbnailWidth * originalHeight) / originalWidth;  // 根据原始图像比例调整高度
//                }
//            } else {
//                thumbnailWidth = originalWidth;
//                thumbnailHeight = originalHeight;
//            }

            int thumbnailWidth = Math.min(WebsiteConst.THUMBNAIL_MAX_SIZE, originalWidth);
            int thumbnailHeight = (int) (originalHeight * ((double) thumbnailWidth / originalWidth));
            // 设置资源对象宽高字段
            grayResource.setThumbnailWidth(thumbnailWidth);
            grayResource.setThumbnailHeight(thumbnailHeight);
            grayResource.setWidth(originalWidth);
            grayResource.setHeight(originalHeight);
            if (hasTransparentBackground(originalImage)) {
                grayResource.setResourceType(ResourceTypeEnum.CUT_OUT);
            }

            // 创建缩略图
            Image thumbnail = originalImage.getScaledInstance(thumbnailWidth, thumbnailHeight, Image.SCALE_SMOOTH);

            BufferedImage bufferedImage = toBufferedImage(thumbnail);

            String thumbnailPath = getResourceRootPath() + grayResource.getThumbnailPath();

            log.info("生成缩略图：" + thumbnailPath);
            File file = new File(thumbnailPath);
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }

            // 保存图像到文件
            boolean saved = ImageIO.write(bufferedImage, WebsiteConst.RESOURCE_EXT_PNG, file);
            if (saved) {
                grayResource.setThumbnail(YesNoEnum.YES);
                return true;
            } else {
                log.error("缩略图保存失败");
            }
        } catch (TranscoderException | IOException e) {
            log.error("生成缩略图时出错：" + ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * 检查图像是否有透明背景。
     *
     * @param image 要检查的图像
     * @return 如果图像有透明背景，则返回 true；否则返回 false
     */
    public static boolean hasTransparentBackground(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        boolean hasTransparency = false;
        for (int y = 0; y < image.getHeight(); y++) {
            for (int x = 0; x < image.getWidth(); x++) {
                int alpha = (image.getRGB(x, y) >> 24) & 0xff;
                if (alpha < 255) { // 透明
                    hasTransparency = true;
                    break;
                }
            }
            if (hasTransparency) break;
        }


        // 如果所有像素的 alpha 通道值都是 255，则图像没有透明背景
        return hasTransparency;
    }

    private static BufferedImage convertSVGToBufferedImage(Path svgFilePath) throws TranscoderException, IOException {

        InputStream svgInputStream = Files.newInputStream(svgFilePath);

        final BufferedImage[] imagePointer = new BufferedImage[1];

        ImageTranscoder transcoder = new ImageTranscoder() {
            @Override
            public BufferedImage createImage(int width, int height) {
                return new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            }

            @Override
            public void writeImage(BufferedImage image, TranscoderOutput output) {
                imagePointer[0] = image;
            }
        };

        TranscoderInput input = new TranscoderInput(svgInputStream);
        transcoder.transcode(input, null);

        return imagePointer[0];
    }

    private static BufferedImage convertSVGToBufferedImage(InputStream svgInputStream) throws TranscoderException, IOException {

        final BufferedImage[] imagePointer = new BufferedImage[1];

        ImageTranscoder transcoder = new ImageTranscoder() {
            @Override
            public BufferedImage createImage(int width, int height) {
                return new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            }

            @Override
            public void writeImage(BufferedImage image, TranscoderOutput output) {
                imagePointer[0] = image;
            }
        };

        TranscoderInput input = new TranscoderInput(svgInputStream);
        transcoder.transcode(input, null);

        return imagePointer[0];
    }

    public static String detectMimeType(Path path) {
        try {
            return THREAD_LOCAL_TIKA.get().detect(Files.newInputStream(path));
        } catch (IOException e) {
            log.error("Failed to detect mime: " + e.getMessage());
        }
        return null;
    }

    private static Metadata getMediaMetadata(Path file, String ext) {
        BodyContentHandler handler = new BodyContentHandler();
        ParseContext context = new ParseContext();
        Metadata metadata = new Metadata();
        try {
            switch (ext) {
                case WebsiteConst.RESOURCE_EXT_MP4:
                    // 使用 MP4 解析器
                    Parser mp4Parser = new MP4Parser();
                    mp4Parser.parse(Files.newInputStream(file.toFile().toPath()), handler, metadata, context);
                    break;
                case WebsiteConst.RESOURCE_EXT_FLAC:
                    Parser flacParser = new FlacParser();
                    flacParser.parse(new BufferedInputStream(Files.newInputStream(file.toFile().toPath())), handler, metadata, context);
                    break;
                case WebsiteConst.RESOURCE_EXT_MP3:
                    Parser mp3Parser = new Mp3Parser();
                    mp3Parser.parse(Files.newInputStream(file.toFile().toPath()), handler, metadata, context);
                    break;
                case WebsiteConst.RESOURCE_EXT_WAV:
                    Parser audioParser = new AudioParser();
                    audioParser.parse(Files.newInputStream(file.toFile().toPath()), handler, metadata, context);
                    break;
                default:

                    Tika tika = new Tika();
                    tika.parse(file, metadata);
                    break;
            }
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        String[] names = metadata.names();
        for (String name : names) {
            log.info(name + ":" + metadata.get(name));
        }
        return metadata;
    }

    /**
     * 验证是否安装ffmpeg
     */
    public static void checkFfmpeg() {
        try {
            Process process = Runtime.getRuntime().exec("ffmpeg -version");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                log.error(line);
            }
            process.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * ffmpeg -i input_video.mp4 -vf "select='between(n,100,200)',setpts=PTS-STARTPTS" -af "aselect='between(n,100,200)',asetpts=PTS-STARTPTS" -c:v copy -c:a copy output_video.mp4
     *
     * @param startFrame
     * @param endFrame
     * @param inputFilePath
     * @param outputFilePath
     * @return
     */

    public static boolean extractBetweenFrame(int startFrame, int endFrame, String inputFilePath, String outputFilePath) {
        // 定义起始帧和结束帧
//        int startFrame = 100;  // 起始帧
//        int endFrame = 200;    // 结束帧
//
//        // 输入和输出文件路径
//        String inputFilePath = "input_video.mp4";
//        String outputFilePath = "output_video.mp4";

        // 构造 FFmpeg 命令，基于帧号截取视频
        String command = String.format(
                "ffmpeg -i %s -vf \"select='between(n,%d,%d)',setpts=PTS-STARTPTS\" -af \"aselect='between(n,%d,%d)',asetpts=PTS-STARTPTS\" -c:v copy -c:a copy %s",
                inputFilePath, startFrame, endFrame, startFrame, endFrame, outputFilePath
        );

        try {
            // 执行 FFmpeg 命令
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();  // 等待命令执行完成
            log.info("视频剪辑成功保存至: " + outputFilePath);
            return true;
        } catch (IOException | InterruptedException e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    public static boolean extractBetweenTime(int startSeconds, int durationSeconds, String inputFilePath, String outputFilePath) {
//        String startTime = "00:00:05";  // 起始时间 (格式: hh:mm:ss)
//        String duration = "00:00:05";   // 视频片段时长
//        String inputFilePath = "input_video.mp4";
//        String outputFilePath = "output_video.mp4";

        // FFmpeg 命令
        String command = String.format(
                "ffmpeg -i %s -ss %s -t %s -c copy %s",
                inputFilePath, formatSeconds(startSeconds), formatSeconds(durationSeconds), outputFilePath
        );

        try {
            // 执行命令
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();
            System.out.println("视频剪辑成功保存至: " + outputFilePath);
            return true;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static String formatSeconds(int totalSeconds) {
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = totalSeconds % 60;

        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

    /**
     * 调用FFmpeg从视频中提取某一时刻的帧图像
     *
     * @param videoFilePath   视频文件路径
     * @param outputImagePath 输出帧图像的路径
     * @param timeInSeconds   想要提取的时间点（秒）
     * @param quality         图片质量 其取值范围是 1 到 31，其中 1 表示最高质量，31 表示最低质量
     * @throws IOException
     * @throws InterruptedException
     */
    public static boolean extractFrameAtTime(Path videoFilePath, String outputImagePath, float timeInSeconds, Integer quality) throws IOException, InterruptedException {
        // FFmpeg 命令
        String[] command = {
                "ffmpeg",
                "-ss", String.valueOf(timeInSeconds),    // 设置时间点
                "-i", videoFilePath.toString(),                     // 输入视频文件
                "-frames:v", "1",                        // 只提取一帧
                "-q:v", Objects.nonNull(quality) ? quality.toString() : "2",                             // 图片质量（数值越低质量越好）
                outputImagePath                          // 输出图像文件
        };

        // 打印执行的命令，方便调试
        log.error("Executing command: " + Arrays.toString(command));

        // 使用 ProcessBuilder 执行命令
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true); // 合并错误流和标准输出流，方便查看输出
        Process process = processBuilder.start();
        int exitCode = process.waitFor(); // 等待进程完成

        if (exitCode == 0) {
            log.error("帧提取成功!");
            return true;
        } else {
            log.error("FFmpeg 命令执行失败，退出代码: " + exitCode);
            return false;
        }
    }

    public static void saveCollectionCover(MultipartFile file, GrayCollection grayCollection) {
        try {
            // 文件存储路径
            String coverPath = grayCollection.getCoverPath();
            Path uploadPath = Paths.get(coverPath);
            // 如果目录不存在，则创建
            if (!Files.exists(uploadPath.getParent())) {
                Files.createDirectories(uploadPath.getParent());
            }
            // 保存文件
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("图片保存成功！");
            // 读取 图像
            BufferedImage originalImage = getBufferedImageByExt(file.getInputStream(), file.getOriginalFilename());
            if (originalImage == null) {
                log.error("无法读取图片，请确保文件是有效的图像:{}", uploadPath.getFileName());
                return;
            }
            // 获取图像宽高
            int originalWidth = originalImage.getWidth();
            int originalHeight = originalImage.getHeight();
            int thumbnailWidth = WebsiteConst.THUMBNAIL_COVER_MAX_SIZE;
            int thumbnailHeight = WebsiteConst.THUMBNAIL_COVER_MAX_SIZE;
            if (originalHeight > thumbnailHeight || originalWidth > thumbnailWidth) {
                if (originalHeight > originalWidth) {
                    thumbnailWidth = (thumbnailHeight * originalWidth) / originalHeight;  // 根据原始图像比例调整宽度
                } else if (originalWidth > originalHeight) {
                    thumbnailHeight = (thumbnailWidth * originalHeight) / originalWidth;  // 根据原始图像比例调整高度
                }
            } else {
                thumbnailWidth = originalWidth;
                thumbnailHeight = originalHeight;
            }

            // 创建缩略图
            Image thumbnail = originalImage.getScaledInstance(thumbnailWidth, thumbnailHeight, Image.SCALE_SMOOTH);

            BufferedImage bufferedImage = toBufferedImage(thumbnail);

            String thumbnailPath = getResourceRootPath() + grayCollection.getThumbnailPath();
            File thumbnailFile = new File(thumbnailPath);
            if (!thumbnailFile.getParentFile().exists()) {
                thumbnailFile.getParentFile().mkdirs();
            }

            // 保存图像到文件
            boolean saved = ImageIO.write(bufferedImage, WebsiteConst.RESOURCE_EXT_PNG, thumbnailFile);
            if (saved) {
                log.info("生成缩略图");
            }
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }


    public static void saveLinkThumbnail(MultipartFile file, GrayLink grayLink) {
        try {

            // 读取 图像
            BufferedImage originalImage = getBufferedImageByExt(file.getInputStream(), file.getOriginalFilename());
            // 获取图像宽高
            int originalWidth = originalImage.getWidth();
            int originalHeight = originalImage.getHeight();
            int thumbnailWidth = WebsiteConst.THUMBNAIL_COVER_MAX_SIZE;
            int thumbnailHeight = WebsiteConst.THUMBNAIL_COVER_MAX_SIZE;
            if (originalHeight > thumbnailHeight || originalWidth > thumbnailWidth) {
                if (originalHeight > originalWidth) {
                    thumbnailWidth = (thumbnailHeight * originalWidth) / originalHeight;  // 根据原始图像比例调整宽度
                } else if (originalWidth > originalHeight) {
                    thumbnailHeight = (thumbnailWidth * originalHeight) / originalWidth;  // 根据原始图像比例调整高度
                }
            } else {
                thumbnailWidth = originalWidth;
                thumbnailHeight = originalHeight;
            }

            // 创建缩略图
            Image thumbnail = originalImage.getScaledInstance(thumbnailWidth, thumbnailHeight, Image.SCALE_SMOOTH);

            BufferedImage bufferedImage = toBufferedImage(thumbnail);

            String thumbnailPath = getResourceRootPath() + grayLink.getCoverPath();
            File thumbnailFile = new File(thumbnailPath);
            if (!thumbnailFile.getParentFile().exists()) {
                thumbnailFile.getParentFile().mkdirs();
            }

            // 保存图像到文件
            boolean saved = ImageIO.write(bufferedImage, WebsiteConst.RESOURCE_EXT_PNG, thumbnailFile);
            if (saved) {
                log.info("生成缩略图");
            }
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }

    private static BufferedImage getBufferedImageByExt(InputStream inputStream, String fileName) {
        BufferedImage originalImage = null;
        // 读取 图像
        try {

            if (fileName.endsWith("svg")) {
                originalImage = convertSVGToBufferedImage(inputStream);
            } else if (fileName.endsWith("icon")) {
                originalImage = Imaging.getBufferedImage(inputStream);
            } else {
                originalImage = ImageIO.read(inputStream);
            }
        } catch (Exception e) {
            log.error("获取BufferedImage异常：" + ExceptionUtil.getMessage(e));
        }
        return originalImage;
    }

    public static Boolean saveMovieCover(MultipartFile file, GrayMovie movie) {
        try {
            // 读取 图像
            BufferedImage originalImage = getBufferedImageByExt(file.getInputStream(), file.getOriginalFilename());
            // 获取图像宽高
            int thumbnailWidth = 270;
            int thumbnailHeight = 400;

            // 创建缩略图
            Image thumbnail = originalImage.getScaledInstance(thumbnailWidth, thumbnailHeight, Image.SCALE_SMOOTH);

            BufferedImage bufferedImage = toBufferedImage(thumbnail);

            String thumbnailPath = getResourceRootPath() + File.separator + movie.getCoverPath();
            File thumbnailFile = new File(thumbnailPath);
            if (!thumbnailFile.getParentFile().exists()) {
                thumbnailFile.getParentFile().mkdirs();
            }

            // 保存图像到文件
            return ImageIO.write(bufferedImage, WebsiteConst.RESOURCE_EXT_PNG, thumbnailFile);
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    public static boolean updateMovieInfo(Path videoPath, GrayMovie movie) {
        if (Objects.equals(YesNoEnum.YES, movie.getSeries()) || movie.getSize() >= 4L * 1024 * 1024 * 1024) return true;
        try {
            Metadata metadata = getMediaMetadata(videoPath, movie.getExt());
            String durationStr = metadata.get(WebsiteConst.METADATA_NAME_DURATION); // 使用 XMP metadata 的 duration 属性
            String heightStr = metadata.get(WebsiteConst.METADATA_NAME_HEIGHT); // 使用 XMP metadata 的 ku安度 属性
            String widthStr = metadata.get(WebsiteConst.METADATA_NAME_WIDTH); // 使用 XMP metadata 的 高度 属性
            log.info("文件路径:" + videoPath.toString() + ", duration=" + durationStr + ",widthStr=" + widthStr + ",heightStr=" + heightStr);
            if (StringUtil.isNotBlank(durationStr)) {
                BigDecimal duration = BigDecimal.valueOf(Double.parseDouble(durationStr));
                movie.setDuration(duration);
                // 保存图像到文件
                String thumbnailPath = getResourceRootPath() + movie.getCoverPath();
                boolean saved = extractFrameAtTime(videoPath, thumbnailPath, duration.divide(new BigDecimal(2), RoundingMode.UP).floatValue(), 10);
                if (!saved) {
                    log.error("缩略图保存失败");
                }
            }

            if (StringUtil.isNotBlank(widthStr) && StringUtil.isNotBlank(heightStr)) {
                int originalWidth = Integer.parseInt(widthStr);
                int originalHeight = Integer.parseInt(heightStr);
                // 设置资源对象宽高字段
                movie.setWidth(originalWidth);
                movie.setHeight(originalHeight);
            }
            return true;

        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    /**
     * /usr/local/bin/N_m3u8DL-RE
     * https://apd-vlive.apdcdn.tc.qq.com/defaultts.tc.qq.com/B_tRCdt2L6hl1ezG-aht1_p5hg6PAeQfQpFEXvTxbBScvLoo3xIMU8-V5xn8XfYeoF/svp_50112/WgLDVs2C1amE-YoPCnucsTeiV5jtowMvcj1Hiu38iSEPrj9mPrnMssQoPActfW0i27PLbhQWoG5eLIaPANll6UgWc9Wa2b2KTKCfYhhubUjxG78nPW72UGnbYr5Ml7zctSxg7DBNs51SRQH3sOaD_OcLtO2zUbLAee9_KzoE7SXSdCEBFMTLwZsgKBvFhF1LFoYfaYfz5y2HdyJlt7Yas32PV4-SrXv1nh36Zn1_oHI9j_mHG2eThA/gzc_1000102_0b53t4aawaaauaabr2dhyjs4bh6dbojqad2a.f322016005.ts.m3u8?ver=4\
     * --save-dir /mnt/green/media/1/movie/喜剧
     * --save-name 夏洛特烦恼
     *
     * @param name
     * @param folderPath
     * @param url
     * @return
     */
    public static Boolean m3u8(String name, String folderPath, String url) {

        String[] command = {
                "/usr/local/bin/N_m3u8DL-RE", url,
                "--save-dir", folderPath,    // 设置时间点
                "--save-name", name
        };

        // 打印执行的命令，方便调试
        log.info("Executing command: " + Arrays.toString(command));

        // 使用 ProcessBuilder 执行命令
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true); // 合并错误流和标准输出流，方便查看输出
        try {
            Process process = processBuilder.start();
            int exitCode = process.waitFor(); // 等待进程完成

            if (exitCode == 0) {
                log.error("m3u8解析成功!");
                return true;
            } else {
                log.error("N_m3u8DL-RE 命令执行失败，退出代码: " + exitCode);

            }
        } catch (Exception e) {
            log.error("N_m3u8DL-RE 命令执行失败: " + ExceptionUtil.getMessage(e));
        }
        return false;
    }

    public static String wrapperResourceUrl(String folderName, String fileName) {
        if (StringUtil.isBlank(folderName) || StringUtil.isBlank(fileName))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);

        return AuthContext.getUserId() + WebsiteConst.URL_SEPARATOR + folderName + WebsiteConst.URL_SEPARATOR + fileName;
    }

    public static String wrapperUserFolder(String folderName) {
        return Optional.ofNullable(folderName).filter(str -> !StringUtil.isBlank(str)).map(str -> getUserRootPath() + folderName + File.separator).orElseThrow(() -> new BIZException(BIZErrorCodeEnum.PARAM_ERROR));
    }

    public static String wrapperDotExt(String ext) {
        return Optional.ofNullable(ext).filter(str -> !StringUtil.isBlank(str)).map(str -> WebsiteConst.EXT_SEPARATOR + ext).orElseThrow(() -> new BIZException(BIZErrorCodeEnum.PARAM_ERROR));
    }

    public static String wrapperFileName(String fileName, String ext) {
        if (StringUtil.isBlank(ext) || StringUtil.isBlank(fileName))
            throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);
        return fileName + WebsiteConst.EXT_SEPARATOR + ext;
    }

    public static String getPathFromUrl(String url) {
        return Optional.ofNullable(url).filter(str -> !StringUtil.isBlank(url)).map(str -> getResourceRootPath() + url.replace(WebsiteConst.URL_SEPARATOR, File.separator)).orElseThrow(() -> new BIZException(BIZErrorCodeEnum.PARAM_ERROR));
    }

    public static void main(String[] args) {
        String input = "/Users/pengjunlee/Documents/music/男歌手/周杰伦/谢霆锋-估计错误.flac";
        String lryricsFromFile = getLyricsFromFile(Paths.get(input));
        System.out.println(lryricsFromFile);
        ;
    }


    public static boolean updateMusicInfo(Path musicPath, GrayMusic music) {
        try {
            Metadata metadata = getMediaMetadata(musicPath, music.getExt());
            String title = metadata.get(WebsiteConst.METADATA_NAME_TITLE);
            String artist = metadata.get(WebsiteConst.METADATA_NAME_ARTIST);
            String album = metadata.get(WebsiteConst.METADATA_NAME_ALBUM);
            String durationStr = metadata.get(WebsiteConst.METADATA_NAME_DURATION); // 使用 XMP metadata 的 duration 属性
            String trackNumber = metadata.get(WebsiteConst.METADATA_NAME_TRACK_NUMBER);
            String trackTotal = metadata.get(WebsiteConst.METADATA_NAME_TRACK_TOTAL);
            String genre = metadata.get(WebsiteConst.METADATA_NAME_GENRE);
            String releaseDate = metadata.get(WebsiteConst.METADATA_NAME_RELEASE_DATE);
            String lyrics = metadata.get(WebsiteConst.METADATA_NAME_LYRICS);

            if (StringUtil.isNotBlank(durationStr)) {
                BigDecimal duration = BigDecimal.valueOf(Double.parseDouble(durationStr));
                music.setDuration(duration);
            }

            if (StringUtil.isNotBlank(trackNumber)) music.setTrackNumber(Integer.valueOf(trackNumber));
            if (StringUtil.isNotBlank(trackTotal)) music.setTrackTotal(Integer.valueOf(trackTotal));

            music.setTitle(title);
            music.setArtist(artist);
            music.setAlbum(album);
            music.setGenre(genre);
            music.setReleaseDate(releaseDate);
            if (StringUtil.isBlank(lyrics)){
                lyrics = getLyricsFromFile(musicPath);
            }
            music.setLyrics(processLyrics(lyrics));

            return true;

        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    public static void saveMusicianAvatar(MultipartFile file, String name) {
        try {
            // 文件存储路径
            String coverPath = getResourceRootPath() + WebsiteConst.THUMBNAIL_PATH_NAME + File.separator + WebsiteConst.MUSIC_PATH_NAME + File.separator + name + WebsiteConst.EXT_SEPARATOR + WebsiteConst.RESOURCE_EXT_PNG;
            Path uploadPath = Paths.get(coverPath);
            // 如果目录不存在，则创建
            if (!Files.exists(uploadPath.getParent())) {
                Files.createDirectories(uploadPath.getParent());
            }
            // 保存文件
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("图片保存成功！");
        } catch (Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }

    private static final Pattern LYRICS_PATTERN = Pattern.compile("\\[(.*?)\\]");
    private static final Pattern LYRICS_TIME_PATTERN = Pattern.compile("(?:\\d{1,2}:)?\\d{1,2}:\\d{1,2}(?:\\.\\d{1,3})?");

    public static String processLyrics(String Lyrics) {
        StringBuilder sb = new StringBuilder();
        TreeMap<Integer, String> map = new TreeMap<>();
        List<String> noTimeList = new ArrayList<>();
        int beginTime  = 0;
        boolean isBegin = false;
        // 将字符串包装为 BufferedReader
        try (BufferedReader reader = new BufferedReader(new StringReader(Lyrics))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 正则表达式匹配 [内容]
                Matcher matcher = LYRICS_PATTERN.matcher(line);

                // 用于存储剩余字符串的起始位置
                int lastMatchEnd = 0;
                List<Integer> timeList = new ArrayList<>();
                while (matcher.find()) {
                    // 获取每个 [] 中的内容
                    String str = matcher.group(1).trim();
                    if (LYRICS_TIME_PATTERN.matcher(str).matches()) {
                        // 是时间

                        if (str.indexOf(".") != -1) {
                            str = str.split("\\.")[0];
                        }
                        String[] strings = str.split(":");

                        // 计算时间
                        int time = 0;
                        for (int i = strings.length - 1, j = 1; i >= 0; i--) {
                            time += Integer.valueOf(strings[i]) * j;
                            j *= 60;
                        }
                        timeList.add(time);
                        if (!isBegin){
                            isBegin = true;
                            beginTime = time;
                        }
                    } else if (!isBegin){
                        // 不是时间
                        noTimeList.add(str);
                    }
                    lastMatchEnd = matcher.end(); // 更新最后匹配结束的位置
                }

                // 提取剩余的字符串（从最后一个匹配结束位置到结尾）
                String remainingString = line.substring(lastMatchEnd).trim();

                if (!timeList.isEmpty()) {
                    timeList.forEach(item -> map.put(item, remainingString));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        //
        if (!noTimeList.isEmpty()){
            double floor = (beginTime - 1) / noTimeList.size();
            double rate = 0;
            for (String str : noTimeList){
                sb.append((int) rate +"::" + str + "\n");
                rate += floor;
            }
        }


        // 输出结果
        for (Map.Entry<Integer, String> entry : map.entrySet()) {
            sb.append(entry.getKey() + "::" + entry.getValue() + "\n");
        }
        return sb.toString();
    }



    public static String getLyricsFromFile(Path musicPath){

        String lrcPath = musicPath.toString().substring(0,musicPath.toString().lastIndexOf(".")+1)+"lrc";
        // 指定文件编码，例如 GBK 或 UTF-8
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(lrcPath), "GBK"))) { // 替换为正确的编码格式
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
