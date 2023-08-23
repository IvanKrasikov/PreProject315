package ru.kata.spring.boot_security.demo.controller;

import ru.kata.spring.boot_security.demo.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
public class MainController {

    private final UserServiceImpl userService;

    private final RoleServiceImpl roleService;

    public MainController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/")
    public String index() {
        return "login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/user")
    public String user(Model model, Principal principal) {
        model.addAttribute("user", userService.findUserByUsername(principal.getName()));
        return "/user/index";
    }

    @GetMapping("/admin")
    public String admin(Model model, Principal principal) {
        model.addAttribute("user", userService.findUserByUsername(principal.getName()));
        return "/admin/index";
    }

    @GetMapping("/admin/add")
    public String add(Model model, Principal principal) {
        model.addAttribute("user", userService.findUserByUsername(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.findAllRoles());
        return "/admin/add";
    }

    @PostMapping("/admin")
    public String addUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

}
