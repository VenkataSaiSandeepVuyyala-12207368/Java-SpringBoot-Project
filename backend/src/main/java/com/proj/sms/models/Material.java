package com.proj.sms.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Educational material resource")
@Entity
@Table(name = "materials")
public class Material {
    @Schema(description = "Unique identifier of the material", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Title of the material", example = "Introduction to Spring Boot")
    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String title;

    @Schema(description = "Description of the material", example = "Basic concepts of Spring Boot framework")
    @Column(columnDefinition = "TEXT")
    private String description;

    @Schema(description = "URL to access the material", example = "https://example.com/material.pdf")
    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String url;

    @Schema(description = "Type of the material")
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MaterialType type;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User uploadedBy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({"materials"})
    private Subject subject;

    // Constructors
    public Material() {}

    public Material(String title, String description, String url, MaterialType type) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.type = type;
    }
    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public MaterialType getType() {
        return type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public Subject getSubject() {
        return subject;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setType(MaterialType type) {
        this.type = type;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
    @Override
    public String toString() {
        return "Material{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", type=" + type +
                ", createdAt=" + createdAt +
                ", uploadedBy=" + uploadedBy +
                ", subject=" + subject +
                '}';
    }

    public enum MaterialType {
        GOOGLE_DRIVE,
        YOUTUBE,
        WEBSITE,
        OTHER
    }
}