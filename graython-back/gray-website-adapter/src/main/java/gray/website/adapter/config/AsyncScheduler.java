package gray.website.adapter.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AsyncScheduler {

    private final CustomResourceResolver customResourceResolver;

    @Async("multiThreadTaskExecutor")
    // 指定每天凌晨0点触发
    @Scheduled(cron = "0 0 0 * * ?")
    public void asyncTask() {
        customResourceResolver.reset();
    }
}
