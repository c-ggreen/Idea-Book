package com.chadwick.ideabookdb.repository;

import com.chadwick.ideabookdb.model.Idea;
import org.springframework.data.repository.CrudRepository;

public interface IdeaRepository extends CrudRepository<Idea, Long> {
}
