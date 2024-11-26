package gray.website.api.impl;


import gray.bingo.common.utils.StringUtil;
import gray.bingo.mybatis.datasource.BingoDatasource;
import gray.website.api.LinkService;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import gray.website.common.config.AuthContext;
import gray.website.common.entity.GrayLink;
import gray.website.common.rsp.link.LinkGroup;
import gray.website.common.utils.ResourceUtil;
import gray.website.infrastructure.repo.GrayLinkRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@BingoDatasource(dbName = "website")
@Slf4j
public class LinkServiceImpl implements LinkService {

    private final GrayLinkRepo linkRepo;

    @Override
    public GrayLink addLink(MultipartFile file, @Valid GrayLink grayLink) {
        grayLink.setUserId(AuthContext.getUserId());

        // 更新
        if (Objects.nonNull(grayLink.getId())) {
            linkRepo.updateById(grayLink);
        } else {
            if (StringUtil.isBlank(grayLink.getCover()) && Objects.isNull(file))
                throw new BIZException(BIZErrorCodeEnum.PARAM_ERROR);
            linkRepo.save(grayLink);
        }

        if (Objects.nonNull(file)) {
            // 保存缩略图
            ResourceUtil.saveLinkThumbnail(file, grayLink);
        }
        return grayLink;
    }

    @Override
    public List<GrayLink> listLink(Integer groupType) {
        List<GrayLink> grayLinks = linkRepo.listByUser(AuthContext.getUserId());
        if (groupType == -1) {
            return grayLinks;
        }
        return grayLinks.stream().filter(item -> Objects.equals(groupType, item.getGroupType().getValue())).collect(Collectors.toList());
    }

    @Override
    public List<LinkGroup> groupLink() {
        List<GrayLink> grayLinks = linkRepo.listByUser(AuthContext.getUserId());
        List<LinkGroup> groupList = grayLinks.stream().collect(Collectors.groupingBy(GrayLink::getGroupType))
                .entrySet()
                .stream()
                .map(entry -> new LinkGroup(entry.getKey().getName(), entry.getKey().getValue(), entry.getValue()))
                .collect(Collectors.toList());
       groupList.sort(new Comparator<LinkGroup>() {
           @Override
           public int compare(LinkGroup o1, LinkGroup o2) {
               return o1.getOrder() - o2.getOrder();
           }
       });
        return groupList;
    }


        @Override
    public Boolean deleteLink(Long id) {
        return linkRepo.removeById(id);
    }
}
