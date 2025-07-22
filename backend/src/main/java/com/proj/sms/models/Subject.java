package com.proj.sms.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "Subject entity")
@Entity
@Table(name = "subjects")
public class Subject {

    @Schema(description = "Unique identifier of the subject", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Name of the subject", example = "Mathematics")
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, unique = true)  // Added unique constraint
    private String name;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Material> materials = new ArrayList<>();

    // Required no-arg constructor
    public Subject() {}

    // Convenience constructor for creating subjects
    public Subject(String name) {
        this.name = name;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Material> getMaterials() {
        return materials;
    }
    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}