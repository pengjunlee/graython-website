package gray.website.infrastructure.repo.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.StringUtil;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayMovie;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.qry.SubFolderQry;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.handler.ResourceHandler;
import gray.website.infrastructure.mapper.GrayMovieMapper;
import gray.website.infrastructure.repo.GrayMovieRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * <p>
 * 影视表 服务实现类
 * </p>
 *
 * @author graython
 * @since 2024-10-24 17:04:48
 */
@Service
@RequiredArgsConstructor
public class GrayMovieRepoImpl extends ServiceImpl<GrayMovieMapper, GrayMovie> implements GrayMovieRepo {

    private final GrayMovieMapper movieMapper;

    @Qualifier("resourceBasicAttributeHandler")
    @Resource
    private ResourceHandler resourceBasicAttributeHandler;

    @Override
    public void refresh(Long userId) {
        List<GrayMovie> GrayMovies = movieMapper.selectList(new QueryWrapper<GrayMovie>().eq("user_id", userId));
        Map<String, GrayMovie> movieMap = GrayMovies.stream().collect(Collectors.toMap(GrayMovie::getFileName, GrayMovie -> GrayMovie, (existing, replacement) -> existing));
        String folderPath = ResourceUtil.getUserRootPath() + WebsiteConst.MOVIE_PATH_NAME;
        // 列出文件夹下的所有子文件夹（影片分类文件夹）
        try (Stream<Path> paths = Files.walk(Paths.get(folderPath), 1)) {
            paths.filter(Files::isDirectory).filter(path -> !path.getFileName().toString().startsWith("."))
                    .filter(item -> !folderPath.equals(item.toString()))
                    .forEach(path -> syncFolder(path, userId, movieMap));
        } catch (IOException e) {
            log.error(ExceptionUtil.getMessage(e));
        }

        // 若最终resourceMap还有文件，则代表已删除的文件
        movieMap.forEach((fileName, resource) -> {
            movieMapper.deleteById(resource.getId());
        });
    }

    @Override
    public List<NameValue> categories(SubFolderQry folderQry) {
        List<NameValue> list = new ArrayList<>();
        String rootFolder;
        switch (folderQry.getType()) {
            case 1: {
                // 电影
                rootFolder = ResourceUtil.getUserRootPath() + WebsiteConst.MOVIE_PATH_NAME;
                list = subFolders(Paths.get(rootFolder),1);
                break;
            }
            case 2: {
                // 歌手分类
                rootFolder = ResourceUtil.getResourceRootPath() + WebsiteConst.MUSIC_PATH_NAME;
                list = subFolders(Paths.get(rootFolder),1);
                break;
            }
            case 3: {
                // 歌手列表
                if (StringUtil.isBlank(folderQry.getFolderPath())){
                    rootFolder = ResourceUtil.getResourceRootPath() + WebsiteConst.MUSIC_PATH_NAME;
                    list = subFolders(Paths.get(rootFolder),2);
                }else {
                    rootFolder = ResourceUtil.getResourceRootPath() + folderQry.getFolderPath();
                    list = subFolders(Paths.get(rootFolder),1);
                }
                break;
            }
            case 4: {
                // 歌手专辑
                rootFolder = ResourceUtil.getResourceRootPath() + folderQry.getFolderPath();
                list = subFolders(Paths.get(rootFolder),1);
                break;
            }
            default:
                break;
        }

        return list;
    }

    /**
     * 单个影片分类文件夹同步
     *
     * @param folderPath
     * @param userId
     * @param movieMap
     */
    public void syncFolder(Path folderPath, Long userId, Map<String, GrayMovie> movieMap) {

        // 列出文件夹下的所有子文件（电影）/ 文件夹（电视剧）
        try (Stream<Path> paths = Files.walk(folderPath, 1)) {
            paths.filter(path -> !path.getFileName().toString().startsWith("."))
                    .filter(path -> !folderPath.toString().equals(path.toString()))
                    .forEach(path -> syncFile(path, userId, movieMap));
        } catch (IOException e) {
            log.error(ExceptionUtil.getMessage(e));
        }
    }

    /**
     * 单个影片（电影/连续剧）同步
     *
     * @param filePath
     * @param userId
     * @param movieMap
     */
    private void syncFile(Path filePath, Long userId, Map<String, GrayMovie> movieMap) {
        YesNoEnum series = YesNoEnum.NO;
        if (Files.isDirectory(filePath)) {
            // 电视处理
            series = YesNoEnum.YES;
        }
        String fileName = filePath.getFileName().toString();
        if (null != movieMap && Objects.nonNull(movieMap.get(fileName))) {
            movieMap.remove(fileName);
        } else {
            GrayMovie grayMovie = new GrayMovie();
            grayMovie.setUserId(userId);
            grayMovie.setSeries(series);
            try {
                resourceBasicAttributeHandler.handle(filePath, grayMovie);
            } catch (Exception e) {
                log.error("影片同步失败，filePath = " + filePath.toString());
                log.error(ExceptionUtil.getMessage(e));
            }
        }
    }

    private static List<NameValue> subFolders(Path rootFolder,int depths) {
        int targetDepth = rootFolder.getNameCount() + depths; // 计算目标层级

        // 列出文件夹下的所有子文件（电影）/ 文件夹（电视剧）
        try (Stream<Path> paths = Files.walk(rootFolder, depths)) {
            List<NameValue> list = new ArrayList<>();
            paths.filter(Files::isDirectory).filter(path -> !path.getFileName().toString().startsWith("."))
                    .filter(path -> path.getNameCount() == targetDepth ).forEach(path -> {
                        String name = path.getFileName().toString();
                        String value = path.toString().replace(ResourceUtil.getResourceRootPath(),"");
                        list.add(new NameValue(name,value));
                    });
            return list;
        } catch (IOException e) {
            // log.error(ExceptionUtil.getMessage(e));
        }
        return Collections.EMPTY_LIST;
    }

    public static void main(String[] args) {
        Path path = Paths.get("/Users/pengjunlee/Documents/1/movie");
        List<NameValue> nameValues = subFolders(path, 1);
        System.out.println(nameValues.size());
        System.out.println(nameValues);
    }

}
