package gray.website.infrastructure.handler;

import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.FileUtil;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.entity.GrayFolder;
import gray.website.common.entity.GrayMovie;
import gray.website.common.entity.GrayMusic;
import gray.website.common.entity.GrayResource;
import gray.website.common.enums.ResourceTypeEnum;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.utils.ResourceUtil;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.sql.Timestamp;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
public class ResourceBasicAttributeHandler extends ResourceHandler {

    public ResourceBasicAttributeHandler(ResourceHandler successor) {
        this.successor = successor;
    }

    @Override
    public boolean processResource(Path path, GrayResource resource, GrayFolder folder) {
        try {
            String fileName = path.getFileName().toString();
            if (fileName.startsWith(".")) return false;
            String mimeType = ResourceUtil.detectMimeType(path);
            //String mimeType = Files.probeContentType(path);
            // 获取文件的基本属性
            BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
            long millis = attrs.lastModifiedTime().toMillis();
            if (Objects.isNull(resource.getId()) || millis != resource.getLastModified().getTime()) {
                // 新文件或者最后修改时间有变化，更新文件
                resource.setLastModified(new Timestamp(millis));
                resource.setSize(attrs.size());
                resource.setMd5(FileUtil.calculateMD5(path));
                resource.setMimeType(mimeType);
                if (Objects.isNull(resource.getId())) {
                    // 新文件赋值
                    resource.setFolderId(folder.getId());
                    resource.setName(fileName);
                    resource.setExt(FileUtil.getFileExtension(fileName));
                }
                ResourceTypeEnum resourceTypeEnum = decideResourceType(resource.getExt(), mimeType);
                if (Objects.isNull(resourceTypeEnum)) throw new BIZException(BIZErrorCodeEnum.UNKNOWN_RES_TYPE_ERROR);
                resource.setResourceType(resourceTypeEnum);
                return true;
            }
        } catch (
                Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }



    @Override
    protected boolean processMovie(Path path, GrayMovie movie) {
        try {
            String fileName = path.getFileName().toString();
            Path filePath = null;
            if (Objects.equals(YesNoEnum.YES, movie.getSeries())) {
                // 电视
                try (Stream<Path> paths = Files.walk(path, 1)) {
                    List<Path> files = paths.filter(Files::isRegularFile).filter(item -> !item.getFileName()
                            .toString().startsWith("."))
                            .filter(item -> WebsiteConst.VIDEO_EXTENSIONS.contains(FileUtil.getFileExtension(item.getFileName().toString())))
                            .collect(Collectors.toList());
                    if (files.isEmpty()) return false;
                    movie.setSize((long) files.size());
                    filePath = files.get(0);
                } catch (IOException e) {
                    log.error(ExceptionUtil.getMessage(e));
                }
                movie.setTitle(fileName);

            } else {
                filePath = path;
                movie.setTitle(fileName.substring(0, fileName.lastIndexOf(WebsiteConst.EXT_SEPARATOR)));
                // 获取文件的基本属性
                BasicFileAttributes attrs = Files.readAttributes(filePath, BasicFileAttributes.class);
                movie.setSize(attrs.size());
            }
            String mimeType = ResourceUtil.detectMimeType(filePath);


            String fileExtension = FileUtil.getFileExtension(filePath.getFileName().toString());
            ResourceTypeEnum resourceTypeEnum = decideResourceType(fileExtension, mimeType);

            if (!Objects.equals(ResourceTypeEnum.VIDEO, resourceTypeEnum)) return false;


            movie.setMd5(FileUtil.calculateMD5(filePath));
            movie.setMimeType(mimeType);
            movie.setFolderName(path.getParent().getFileName().toString());
            movie.setFileName(fileName);
            movie.setExt(fileExtension);
            return true;
        } catch (
                Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    @Override
    protected boolean processMusic(Path path, String folderPath, GrayMusic music) {
        try {
            String fileName = path.getFileName().toString();
            if (fileName.startsWith(".")) return false;
            String mimeType = ResourceUtil.detectMimeType(path);
            //String mimeType = Files.probeContentType(path);
            // 获取文件的基本属性
            BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
            long millis = attrs.lastModifiedTime().toMillis();
            if (Objects.isNull(music.getId()) || millis != music.getLastModified().getTime()) {
                // 新文件或者最后修改时间有变化，更新文件
                music.setLastModified(new Timestamp(millis));
                music.setSize(attrs.size());
                music.setMd5(FileUtil.calculateMD5(path));
                music.setMimeType(mimeType);
                if (Objects.isNull(music.getId())) {
                    // 新文件赋值
                    music.setFolderPath(folderPath);
                    music.setFileName(fileName);
                    music.setExt(FileUtil.getFileExtension(fileName));
                }
                return true;
            }
        } catch (
                Exception e) {
            log.error(ExceptionUtil.getMessage(e));
        }
        return false;
    }

    private ResourceTypeEnum decideResourceType(String fileExt, String mimeType) {

        ResourceTypeEnum resourceTypeEnum = Stream.of(
                        new AbstractMap.SimpleEntry<>(WebsiteConst.IMAGE_MIMETYPES, ResourceTypeEnum.IMAGE),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.PDF_MIMETYPES, ResourceTypeEnum.PDF),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.AUDIO_MIMETYPES, ResourceTypeEnum.AUDIO),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.VIDEO_MIMETYPES, ResourceTypeEnum.VIDEO)

                )
                .filter(entry -> entry.getKey().contains(mimeType)) // Replace with your `type`
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse(null);
        if (Objects.nonNull(resourceTypeEnum)) return resourceTypeEnum;
        resourceTypeEnum = Stream.of(
                        new AbstractMap.SimpleEntry<>(WebsiteConst.IMAGE_EXTENSIONS, ResourceTypeEnum.IMAGE),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.PDF_EXTENSIONS, ResourceTypeEnum.PDF),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.WORD_EXTENSIONS, ResourceTypeEnum.WORD),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.EXCEL_EXTENSIONS, ResourceTypeEnum.EXCEL),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.PPT_EXTENSIONS, ResourceTypeEnum.PPT),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.DMG_EXTENSIONS, ResourceTypeEnum.DMG),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.ZIP_EXTENSIONS, ResourceTypeEnum.ZIP),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.AUDIO_EXTENSIONS, ResourceTypeEnum.AUDIO),
                        new AbstractMap.SimpleEntry<>(WebsiteConst.VIDEO_EXTENSIONS, ResourceTypeEnum.VIDEO)

                )
                .filter(entry -> entry.getKey().contains(fileExt)) // Replace with your `type`
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse(null);
        return resourceTypeEnum;
    }
}
