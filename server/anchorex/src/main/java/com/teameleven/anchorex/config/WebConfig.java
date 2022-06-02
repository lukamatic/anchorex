package com.teameleven.anchorex.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	private final int webClientPort = 3000;

	// Za svrhe razvoja konfigurisemo dozvolu za CORS kako ne bismo morali
	// @CrossOrigin anotaciju da koristimo nad svakim kontrolerom
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(String.format("https://teameleven-anchorex.herokuapp.com/", webClientPort)).allowedMethods("GET", "POST", "PUT", "DELETE");
	}
}
