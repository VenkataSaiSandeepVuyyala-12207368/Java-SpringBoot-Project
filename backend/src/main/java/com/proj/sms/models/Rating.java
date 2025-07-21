package com.proj.sms.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;

    // Constructors
    public Rating() {}

    public Rating(Integer score, User user, Material material) {
        this.score = score;
        this.user = user;
        this.material = material;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Integer getScore() {
        return score;
    }

    public User getUser() {
        return user;
    }

    public Material getMaterial() {
        return material;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", score=" + score +
                ", userId=" + (user != null ? user.getId() : null) +
                ", materialId=" + (material != null ? material.getId() : null) +
                '}';
    }
}