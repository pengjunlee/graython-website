package gray.website.adapter.config;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.Objects;
import java.util.Properties;

public class WebsiteEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        //自定义配置文件
        String[] profiles = {
                "config/website.properties",
                "config/blossom.yml"
        };

        //循环添加
        for (String profile : profiles) {
            //从classpath路径下面查找文件
            Resource resource = new ClassPathResource(profile);
            //加载成PropertySource对象，并添加到Environment环境中
            environment.getPropertySources().addLast(loadProfiles(resource));
        }
    }

    //加载单个配置文件
    private PropertySource<?> loadProfiles(Resource resource) {
        if (!resource.exists()) {
            throw new IllegalArgumentException("资源" + resource + "不存在");
        }
        if (Objects.requireNonNull(resource.getFilename()).contains(".yml")) {
            return loadYaml(resource);
        } else {
            return loadProperty(resource);
        }
    }

    /**
     * 加载properties格式的配置文件
     *
     * @param resource
     * @return
     */
    private PropertySource loadProperty(Resource resource) {
        try {
            //从输入流中加载一个Properties对象
            Properties properties = new Properties();
            properties.load(resource.getInputStream());
            return new PropertiesPropertySource(Objects.requireNonNull(resource.getFilename()), properties);
        } catch (Exception ex) {
            throw new IllegalStateException("加载配置文件失败" + resource, ex);
        }
    }

    /**
     * 加载yml格式的配置文件
     *
     * @param resource
     * @return
     */
    private PropertySource loadYaml(Resource resource) {
        try {
            YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
            factory.setResources(resource);
            //从输入流中加载一个Properties对象
            Properties properties = factory.getObject();
            return new PropertiesPropertySource(resource.getFilename(), properties);
        } catch (Exception ex) {
            throw new IllegalStateException("加载配置文件失败" + resource, ex);
        }
    }
}
