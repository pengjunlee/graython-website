package gray.website.api.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import gray.bingo.common.entity.BingoPageRsp;
import gray.bingo.common.utils.ExceptionUtil;
import gray.bingo.common.utils.FileUtil;
import gray.bingo.common.utils.StringUtil;
import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.MovieService;
import gray.website.common.config.AccessToken;
import gray.website.common.config.AuthContext;
import gray.website.common.cst.WebsiteConst;
import gray.website.common.dto.NameValue;
import gray.website.common.entity.GrayMovie;
import gray.website.common.enums.YesNoEnum;
import gray.website.common.qry.MoviePageQry;
import gray.website.common.qry.SubFolderQry;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.repo.GrayMovieRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website")
@Slf4j
public class MovieServiceImpl implements MovieService {

    private final GrayMovieRepo movieRepo;

    @Override
    public Boolean changeCover(MultipartFile file, Long id) {
        GrayMovie movie = movieRepo.getById(id);

        // 更新
        if (Objects.nonNull(movie)) {
            // 保存图片+ 缩略图
            return ResourceUtil.saveMovieCover(file, movie);
        }
        return false;
    }

    @Override
    public Boolean movieRefresh() {
        movieRepo.refresh(AuthContext.getUserId());
        return true;
    }

    @Override
    public BingoPageRsp<GrayMovie> page(MoviePageQry moviePageQry) {
        IPage<GrayMovie> page = movieRepo.page(new Page<>(moviePageQry.getPageNo(), moviePageQry.getPageSize()), buildPageQueryWrapper(moviePageQry));
        List<GrayMovie> records = page.getRecords();
        records.stream().filter(item -> Objects.equals(YesNoEnum.YES, item.getSeries())).forEach(item -> {
            // 电视剧处理
            List<NameValue> list = new ArrayList<>();
            Path path = Paths.get(ResourceUtil.getUserRootPath() + "movie" + File.separator + item.getFolderName() + File.separator + item.getFileName());
            try (Stream<Path> paths = Files.walk(path, 1)) {
                paths.filter(Files::isRegularFile).filter(p -> !p.getFileName().toString().startsWith("."))
                        .filter(p -> WebsiteConst.VIDEO_EXTENSIONS.contains(FileUtil.getFileExtension(p.getFileName().toString())))
                        .forEach(p -> {
                            String fileName = p.getFileName().toString();
                            String name = fileName.substring(0, fileName.lastIndexOf("."));
                            list.add(new NameValue(name, fileName));
                        });
            } catch (IOException e) {
                log.error(ExceptionUtil.getMessage(e));
            }
            Collections.sort(list);
            item.setFiles(list);
        });
        return new BingoPageRsp<>(records, page.getCurrent(), page.getTotal());
    }

    @Override
    public List<NameValue> categories(SubFolderQry folderQry) {
        folderQry.setUserId(AuthContext.getUserId());
        return movieRepo.categories(folderQry);

    }

    @Override
    public Boolean m3u8(MoviePageQry moviePageQry) {
        AccessToken accessToken = AuthContext.get();
        if (Objects.nonNull(accessToken)) {
            String moviePath = ResourceUtil.wrapperUserFolder(WebsiteConst.MOVIE_PATH_NAME) + moviePageQry.getFolderName() + File.separator + ResourceUtil.wrapperFileName(moviePageQry.getName(), WebsiteConst.RESOURCE_EXT_MP4);
            File file = new File(moviePath);
            if (file.exists()) return false;
            boolean ret = ResourceUtil.m3u8(moviePageQry.getName(), file.getParentFile().getAbsolutePath(), moviePageQry.getUrl());
            movieRepo.syncFolder(Paths.get(moviePath), accessToken.getUserId(), null);
            return ret;
        }
        return false;
    }


    private QueryWrapper<GrayMovie> buildPageQueryWrapper(MoviePageQry moviePageQry) {
        QueryWrapper<GrayMovie> queryWrapper = new QueryWrapper<>();
        if (StringUtil.isNotBlank(moviePageQry.getName())) {
            queryWrapper.like("file_name", moviePageQry.getName());
        }
        if (StringUtil.isNotBlank(moviePageQry.getFolderName())) {
            queryWrapper.eq("folder_name", moviePageQry.getFolderName());
        }

        queryWrapper.eq("user_id", AuthContext.getUserId());
        queryWrapper.orderByAsc("id");
        return queryWrapper;
    }
}
