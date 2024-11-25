package gray.website.common.utils;

import gray.bingo.common.utils.FileUtil;
import gray.website.common.entity.GrayResource;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Objects;

public class Test {

    public static void main(String[] args) {

        // String input = "/Users/pengjunlee/Documents/music/周传雄-割舍.mp3";
        // String input = "/Users/pengjunlee/Documents/music/童年色彩 (Childhood Colors) .mp3";
        String input = "/Users/pengjunlee/Documents/金海心 - 悲伤的秋千.wav";
        // String input = "/Users/pengjunlee/Documents/music/Ambience Grocery Store Bottle Return Machine 01.wav";
       GrayResource resource = new GrayResource();
       resource.setExt("wav");
        ResourceUtil.updateAudioInfo(Paths.get(input),resource);
    }
    /**
     * 调用FFmpeg从视频中提取某一时刻的帧图像
     *
     * @param videoFilePath   视频文件路径
     * @param outputImagePath 输出帧图像的路径
     * @param timeInSeconds   想要提取的时间点（秒）
     * @param quality   图片质量 其取值范围是 1 到 31，其中 1 表示最高质量，31 表示最低质量
     * @throws IOException
     * @throws InterruptedException
     */
    public static void extractFrameAtTime(String videoFilePath, String outputImagePath, float timeInSeconds, Integer quality) throws IOException, InterruptedException {
        // FFmpeg 命令
        String[] command = {
                "ffmpeg",
                "-ss", String.valueOf(timeInSeconds),    // 设置时间点
                "-i", videoFilePath,                     // 输入视频文件
                "-frames:v", "1",                        // 只提取一帧
                "-q:v", Objects.nonNull(quality) ? quality.toString() : "2",                             // 图片质量（数值越低质量越好）
                outputImagePath                          // 输出图像文件
        };

        // 打印执行的命令，方便调试
        System.out.println("Executing command: " + Arrays.toString(command));

        // 使用 ProcessBuilder 执行命令
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true); // 合并错误流和标准输出流，方便查看输出
        Process process = processBuilder.start();
        int exitCode = process.waitFor(); // 等待进程完成

        if (exitCode == 0) {
            System.out.println("帧提取成功!");
        } else {
            System.out.println("FFmpeg 命令执行失败，退出代码: " + exitCode);
        }
    }
}
