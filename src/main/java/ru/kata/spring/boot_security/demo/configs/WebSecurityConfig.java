package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.thymeleaf.spring5.SpringTemplateEngine;
import ru.kata.spring.boot_security.demo.service.UserService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final SuccessUserHandler successUserHandler;
    private final UserService userService;

    public WebSecurityConfig(SuccessUserHandler successUserHandler, UserService userService) {
        this.successUserHandler = successUserHandler;
        this.userService = userService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .and()
                .formLogin()
                .loginPage("/login")
                .successHandler(successUserHandler)
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and()
                .csrf().disable();

    }

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userService);
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}