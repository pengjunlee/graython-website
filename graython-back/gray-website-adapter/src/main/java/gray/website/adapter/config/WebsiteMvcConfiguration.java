package gray.website.adapter.config;

import gray.website.common.utils.ResourceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.*;

import java.io.File;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
@EnableWebMvc
public class WebsiteMvcConfiguration implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;

    private final CustomResourceResolver customResourceResolver;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedOriginPatterns("*")
                .allowedMethods("*");

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册自定义的拦截器，并指定拦截的路径
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")    // 你要拦截的路径，比如所有请求
                .excludePathPatterns("/thumbnail/**", "/preview/**", "/website/**", "/station/**", "/error");  // 排除 /thumbnail/** 路径
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5174"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    /**
     * 页面映射
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/website/").setViewName("forward:/website/index.html");
        registry.addViewController("/station/").setViewName("forward:/station/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //配置本地一个目录，以/docs开头进行访问里面的文件
        registry.addResourceHandler("/thumbnail/**")
                .addResourceLocations("file:" + ResourceUtil.getResourceRootPath() + ".thumbnail" + File.separator);
        registry.addResourceHandler("/preview/**")
                .addResourceLocations("file:" + ResourceUtil.getResourceRootPath()).setCachePeriod(3600)
                .resourceChain(true).addResolver(customResourceResolver); // 使用自定义处理器
        registry.addResourceHandler("/website/**")
                .addResourceLocations("classpath:/static/website/")
                .setCacheControl(CacheControl.maxAge(48, TimeUnit.HOURS).cachePublic());
        registry.addResourceHandler("/station/**")
                .addResourceLocations("classpath:/static/station/")
                .setCacheControl(CacheControl.maxAge(48, TimeUnit.HOURS).cachePublic());
    }

}