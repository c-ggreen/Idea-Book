package com.chadwick.ideabookdb.controller;

import com.chadwick.ideabookdb.model.Idea;
import com.chadwick.ideabookdb.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/idea")
public class IdeaController {
    @Autowired
    IdeaService ideaservice;

    // get all items
    @GetMapping
    public Iterable<Idea> getItems(){
        return ideaservice.getItems();
    }

    // create item
    @PostMapping
    public Idea createItem(@RequestBody Idea item) {
        return ideaservice.createItem(item);
    }

    // get item by id
    @GetMapping("/{id}")
    public Idea getItemById(@PathVariable Long id) {
        return ideaservice.getItemByID(id);
    }

    // update items
    @PatchMapping
    public Idea updateItem(@RequestBody Idea item) {
        return ideaservice.updateItems(item);
    }

    // delete items
    @DeleteMapping("/{id}")
    public HttpStatus deleteItem(@PathVariable Long id) {
        return ideaservice.deleteItem(id);
    }
}
