package com.chadwick.ideabookdb.repository;

import com.chadwick.ideabookdb.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}

