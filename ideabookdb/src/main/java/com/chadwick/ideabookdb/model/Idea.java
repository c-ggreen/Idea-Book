package com.chadwick.ideabookdb.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "Idea")
public class Idea implements Serializable {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column(columnDefinition = "text")
    private String text;
    @Column
    private boolean isActive = true;
    @Column
    private String timestamp;

//    @Column
//    @CreationTimestamp
//    private LocalDateTime timestamp;
//    @Column
//    @UpdateTimestamp
//    private LocalDateTime updatedTimestamp;

    //    @JsonFormat(pattern = "MMM dd yyyy hh:mm a")
//    private LocalDateTime timestamp = LocalDateTime.now();
    public Idea() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    //    public LocalDateTime getUpdatedTimestamp() {
//        return updatedTimestamp;
//    }
//
//    public void setUpdatedTimestamp(LocalDateTime updatedTimestamp) {
//        this.updatedTimestamp = updatedTimestamp;
//    }
}

