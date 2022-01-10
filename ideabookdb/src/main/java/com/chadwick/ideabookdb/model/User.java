package com.chadwick.ideabookdb.model;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column
    private String email;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Idea> ideas;

    public User() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Idea> getIdeas() {
        return ideas;
    }

    public void setIdeas(List<Idea> ideas) {
        this.ideas = ideas;
    }


}

