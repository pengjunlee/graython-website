package gray.website.common.cst;

import java.util.HashSet;
import java.util.Set;

public class WebsiteConst {
    public static final Set<String> IMAGE_MIMETYPES = new HashSet<String>() {
        {
            add("image/png");
            add("image/jpeg");
            add("image/webp");
            add("image/bmp");
            add("image/svg+xml");
            add("image/x-icon");
            add("image/vnd.microsoft.icon");
            add("image/gif");
            add("image/tiff");
        }
    };

    public static final Set<String> AUDIO_MIMETYPES = new HashSet<String>() {
        {
            add("audio/mpeg");
            add("audio/wav");
            add("audio/ogg");
            add("audio/aac");
            add("audio/vnd.wave");
            add("audio/x-flac");
            add("audio/webm");
        }
    };
    public static final Set<String> PDF_MIMETYPES = new HashSet<String>() {
        {
            add("application/pdf");
        }
    };

    public static final Set<String> WORD_MIMETYPES = new HashSet<String>() {
        {
            add("application/x-tika-msoffice");
        }
    };

    public static final Set<String> EXCEL_MIMETYPES = new HashSet<String>() {
        {
            add("application/x-tika-ooxml");
        }
    };

    public static final Set<String> TEXT_MIMETYPES = new HashSet<String>() {
        {
            add("text/plain");
            add("text/html");
            add("text/css");
            add("text/javascript");
            add("text/csv");
            add("application/pdf");

        }
    };

    public static final Set<String> VIDEO_MIMETYPES = new HashSet<String>() {
        {
            add("video/mp4");
            add("video/x-msvideo");
            add("video/mpeg");
            add("video/ogg");
            add("video/webm");
            add("video/quicktime");
            add("application/x-matroska");

        }
    };

    public static final Set<String> IMAGE_EXTENSIONS = new HashSet<String>() {
        {
            add("png");
            add("jpeg");
            add("webp");
            add("bmp");
            add("svg");
            add("icon");
            add("gif");
        }
    };

    public static final Set<String> AUDIO_EXTENSIONS = new HashSet<String>() {
        {
            add("mp3");
            add("wav");
            add("flac");
        }
    };
    public static final Set<String> PDF_EXTENSIONS = new HashSet<String>() {
        {
            add("pdf");
        }
    };

    public static final Set<String> WORD_EXTENSIONS = new HashSet<String>() {
        {
            add("doc");
            add("docx");
        }
    };

    public static final Set<String> ZIP_EXTENSIONS = new HashSet<String>() {
        {
            add("zip");
            add("rar");
            add("jar");
            add("war");
            add("tar");
            add("7z");
            add("iso");
            add("gz");
            add("apk");
            add("exe");
        }
    };

    public static final Set<String> EXCEL_EXTENSIONS = new HashSet<String>() {
        {
            add("xls");
            add("xlsx");
        }
    };
    public static final Set<String> PPT_EXTENSIONS = new HashSet<String>() {
        {
            add("ppt");
            add("pptx");
        }
    };

    public static final Set<String> DMG_EXTENSIONS = new HashSet<String>() {
        {
            add("dmg");
        }
    };

    public static final Set<String> VIDEO_EXTENSIONS = new HashSet<String>() {
        {
            add("mp4");
            add("mov");
            add("mkv");
        }
    };


    public static final String MIME_TYPE_SVG = "image/svg+xml";

    public static final String MIME_TYPE_APPLICATION_ZIP = "application/zip";


    //    ===================== 扩展名 开始 =====================
    public static final String RESOURCE_EXT_ZIP_DOC = "doc";
    public static final String RESOURCE_EXT_ZIP_DOCX = "docx";
    public static final String RESOURCE_EXT_ZIP_PPT = "ppt";
    public static final String RESOURCE_EXT_ZIP_PPTX = "pptx";

    public static final String RESOURCE_EXT_FLAC = "flac";
    public static final String RESOURCE_EXT_WAV = "wav";
    public static final String RESOURCE_EXT_MP4 = "mp4";
    public static final String RESOURCE_EXT_MP3 = "mp3";
    public static final String RESOURCE_EXT_PDF = "pdf";
    public static final String RESOURCE_EXT_PNG = "png";

    //    ===================== 扩展名 结束 =====================

    //    ===================== metadata 开始 =====================
    public static final String METADATA_NAME_TITLE = "dc:title";
    public static final String METADATA_NAME_ARTIST = "xmpDM:artist";
    public static final String METADATA_NAME_ALBUM = "xmpDM:album";
    public static final String METADATA_NAME_DURATION = "xmpDM:duration";
    public static final String METADATA_NAME_GENRE = "xmpDM:genre";
    public static final String METADATA_NAME_TRACK_NUMBER = "xmpDM:trackNumber";
    public static final String METADATA_NAME_TRACK_TOTAL = "tracktotal";
    public static final String METADATA_NAME_RELEASE_DATE = "xmpDM:releaseDate";
    public static final String METADATA_NAME_LYRICS = "lyrics";


    public static final String METADATA_NAME_HEIGHT = "tiff:ImageLength";
    public static final String METADATA_NAME_WIDTH = "tiff:ImageWidth";


    //    ===================== metadata 结束 =====================
    //    ===================== 文件 开始 =====================
    public static final String THUMBNAIL_PATH_NAME = ".thumbnail";
    public static final String COLLECTION_PATH_NAME = "collection";

    public static final String ORIGINAL_PATH_NAME = "original";

    public static final String MOVIE_PATH_NAME = "movie";

    public static final String MUSIC_PATH_NAME = "music";

    public static final String UPLOAD_PATH_NAME = "upload";

    public static final String URL_SEPARATOR = "/";

    public static final String EXT_SEPARATOR = ".";


    //    ===================== 文件 结束 =====================

    public static final String THUMBNAIL_URL_PATH = "thumbnail";

    public static final String PREVIEW_URL_PATH = "preview/";



    public static final int THUMBNAIL_MAX_SIZE = 200;

    public static final int THUMBNAIL_COVER_MAX_SIZE = 300;






    //    ===================== 普通字符串常量 =====================

    public static final String AUTHORIZATION = "Authorization";
    public static final String ASPOSE_APP_ID = "ASPOSE_APP_ID";
    public static final String ASPOSE_APP_SECRET = "ASPOSE_APP_SECRET";
}
