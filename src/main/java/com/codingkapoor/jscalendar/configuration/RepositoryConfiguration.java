package com.codingkapoor.jscalendar.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import com.codingkapoor.jscalendar.entity.Year;

@Configuration
public class RepositoryConfiguration extends RepositoryRestMvcConfiguration {
	
	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(Year.class);
	}
	
}
