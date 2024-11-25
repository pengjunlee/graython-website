-- 导出  表 website.gray_collection 结构
CREATE TABLE IF NOT EXISTS `gray_collection` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '用户ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '合集名称',
  `create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) COMMENT='资源库合集表';

-- 导出  表 website.gray_folder 结构
CREATE TABLE IF NOT EXISTS `gray_folder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '用户ID',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件夹名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件夹路径',
  `resource_count` bigint(20) NOT NULL DEFAULT 0 COMMENT '资源总数',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uniq_path` (`path`) USING BTREE
)  COMMENT='文件夹表';

-- 导出  表 website.gray_library 结构
CREATE TABLE IF NOT EXISTS `gray_library` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `folder_id` bigint(20) DEFAULT NULL COMMENT '文件夹ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `collection_id` bigint(20) DEFAULT NULL COMMENT '集合ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源库名称',
  `cover` bigint(20) DEFAULT NULL COMMENT '封面ID',
  `create_time` datetime DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) COMMENT='资源库表';

-- 导出  表 website.gray_link 结构
CREATE TABLE IF NOT EXISTS `gray_link` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '描述',
  `url` varchar(255) DEFAULT NULL COMMENT '地址',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `group_type` int(4) DEFAULT NULL COMMENT '分组',
  `create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) COMMENT='导航内的链接条目表';

-- 导出  表 website.gray_movie 结构
CREATE TABLE IF NOT EXISTS `gray_movie` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(50) DEFAULT NULL COMMENT '电影名称',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `file_name` varchar(50) DEFAULT NULL COMMENT '文件名称',
  `folder_name` varchar(50) DEFAULT NULL COMMENT '文件夹名称',
  `md5` char(32) DEFAULT NULL COMMENT 'MD5',
  `ext` char(8) DEFAULT NULL COMMENT '文件后缀',
  `size` bigint(20) NOT NULL DEFAULT 0 COMMENT '文件大小',
  `duration` decimal(7,2) NOT NULL DEFAULT 0.00 COMMENT '持续时长',
  `mime_type` char(50) DEFAULT NULL COMMENT '文件的MIME类型',
  `width` int(10) DEFAULT NULL COMMENT '宽度',
  `height` int(10) DEFAULT NULL COMMENT '高度',
  `series` char(1) NOT NULL DEFAULT '0' COMMENT '是否连续剧',
  `create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uniq_index_md5` (`md5`) USING BTREE,
  KEY `index_user_folder` (`user_id`,`folder_name`) USING BTREE
) COMMENT='影视表';

-- 导出  表 website.gray_music 结构
CREATE TABLE IF NOT EXISTS `gray_music` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `file_name` varchar(50) DEFAULT NULL COMMENT '文件名称',
  `folder_path` varchar(50) DEFAULT NULL COMMENT '文件夹路径',
  `md5` char(32) DEFAULT NULL COMMENT 'MD5',
  `ext` char(8) DEFAULT NULL COMMENT '文件后缀',
  `size` bigint(20) NOT NULL DEFAULT 0 COMMENT '文件大小',
  `duration` decimal(7,2) NOT NULL DEFAULT 0.00 COMMENT '持续时长',
  `mime_type` char(50) DEFAULT NULL COMMENT '文件的MIME类型',
  `favorite` char(1) DEFAULT '0' COMMENT '是否喜欢',
  `playlist` char(1) DEFAULT '0' COMMENT '是否在播放列表',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `artist` varchar(50) DEFAULT NULL COMMENT '艺术家',
  `album` varchar(50) DEFAULT NULL COMMENT '专辑',
  `track_number` int(11) DEFAULT NULL COMMENT '音轨号',
  `track_total` int(11) DEFAULT NULL COMMENT '音轨数',
  `genre` varchar(16) DEFAULT NULL COMMENT '风格',
  `release_date` varchar(16) DEFAULT NULL COMMENT '发行日期',
  `lyrics` text DEFAULT NULL COMMENT '歌词',
  `last_modified` datetime NOT NULL COMMENT '最近更新',
  `create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_folder_path` (`folder_path`) USING BTREE
) COMMENT='音乐表';


-- 导出  表 website.gray_resource 结构
CREATE TABLE IF NOT EXISTS `gray_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `folder_id` bigint(20) DEFAULT NULL COMMENT '所属文件夹ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件名',
  `md5` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'MD5',
  `ext` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件后缀',
  `size` bigint(20) NOT NULL DEFAULT 0 COMMENT '文件大小',
  `duration` decimal(7,2) NOT NULL DEFAULT 0.00 COMMENT '持续时长',
  `mime_type` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件的MIME类型',
  `resource_type` int(4) DEFAULT NULL COMMENT '资源类型',
  `classification` int(4) DEFAULT NULL COMMENT '资源分类',
  `thumbnail` int(1) DEFAULT 0 COMMENT '是否生成缩略图',
  `thumbnail_width` int(10) DEFAULT NULL COMMENT '缩略图宽度',
  `thumbnail_height` int(10) DEFAULT NULL COMMENT '缩略图高度',
  `width` int(10) DEFAULT NULL COMMENT '原图宽度',
  `height` int(10) DEFAULT NULL COMMENT '原图高度',
  `page_count` int(10) DEFAULT NULL COMMENT '文档总页数',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `artist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '艺术家',
  `album` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '专辑',
  `last_modified` timestamp(3) NOT NULL COMMENT '最近更新',
  `create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) COMMENT='资源表（图片、音频、视频、文档）';