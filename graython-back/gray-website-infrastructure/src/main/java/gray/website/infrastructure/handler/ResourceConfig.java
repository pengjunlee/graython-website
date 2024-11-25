package gray.website.infrastructure.handler;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResourceConfig {

    @Bean(name = "resourceSaveHandler")
    public ResourceHandler resourceSaveHandler() {
        return new ResourceSaveHandler();
    }

    @Bean(name = "resourceParticularHandler")
    public ResourceHandler resourceParticularHandler(@Qualifier("resourceSaveHandler") ResourceHandler resourceSaveHandler) {
        return new ResourceParticularHandler(resourceSaveHandler);
    }

    @Bean(name = "resourceBasicAttributeHandler")
    public ResourceHandler resourceBasicAttributeHandler(@Qualifier("resourceParticularHandler") ResourceHandler resourceParticularHandler) {
        return new ResourceBasicAttributeHandler(resourceParticularHandler);
    }


}
