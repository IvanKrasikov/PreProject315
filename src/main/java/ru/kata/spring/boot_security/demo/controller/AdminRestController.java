package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<?> editUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
