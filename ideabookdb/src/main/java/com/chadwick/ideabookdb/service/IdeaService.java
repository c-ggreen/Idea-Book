package com.chadwick.ideabookdb.service;

import com.chadwick.ideabookdb.model.Idea;
import com.chadwick.ideabookdb.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class IdeaService {
    @Autowired
    IdeaRepository idearepository;

    // get all items
    public Iterable<Idea> getItems() {
        return idearepository.findAll();
    }

    // get items by id
    public Idea getItemByID(Long id) {
        return idearepository.findById(id).get();
    }

    // post / create
    public Idea createItem(Idea item) {
        return idearepository.save(item);
    }

    // update our items
    public Idea updateItems(Idea item) {
        return idearepository.save(item);
    }

    // delete items
    public HttpStatus deleteItem(Long id) {
        idearepository.deleteById(id);
        return HttpStatus.OK;
    }
}
