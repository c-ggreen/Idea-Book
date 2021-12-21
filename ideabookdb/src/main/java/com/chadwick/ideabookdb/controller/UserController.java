package com.chadwick.ideabookdb.controller;

import com.chadwick.ideabookdb.model.User;
import com.chadwick.ideabookdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public Iterable<User> getItems(){return userService.getItems();}

    @PostMapping
    public User createItem(@RequestBody User item) { return userService.createItem(item);}

    @GetMapping("/{id}")
    public User getItemById(@PathVariable String id) { return userService.getItemByID(id);}

    // update items
    @PatchMapping
    public User updateItem(@RequestBody User item) {
        return userService.updateItems(item);
    }

    // delete items
    @DeleteMapping("/{id}")
    public HttpStatus deleteItem(@PathVariable String id) {
        return userService.deleteItem(id);
    }


}

