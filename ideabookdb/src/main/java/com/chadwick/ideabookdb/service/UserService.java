package com.chadwick.ideabookdb.service;

import com.chadwick.ideabookdb.model.User;
import com.chadwick.ideabookdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userrepository;

    // get all items
    public Iterable<User> getItems() {
        return userrepository.findAll();
    }

    // get items by id
    public User getItemByID(String id) {
        return userrepository.findById(id).get();
    }

    // post / create
    public User createItem(User item) {
        return userrepository.save(item);
    }

    // update our items
    public User updateItems(User item) {
        return userrepository.save(item);
    }

    // delete items
    public HttpStatus deleteItem(String id) {
        userrepository.deleteById(id);
        return HttpStatus.OK;
    }
}

