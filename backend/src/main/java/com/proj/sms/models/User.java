package com.proj.sms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Schema(description = "User entity")
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    @Schema(description = "Unique identifier of the user", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Username for login", example = "john_doe")
    @NotBlank
    @Size(max = 20)
    @Column(nullable = false, length = 20)
    private String username;

    @Schema(description = "Email address of the user", example = "john@example.com")
    @NotBlank
    @Size(max = 50)
    @Email
    @Column(nullable = false, length = 50)
    private String email;

    @Schema(description = "Password", example = "securePassword123")
    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String password;

    @Schema(description = "Role of the user (STUDENT or TEACHER)")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role;

    @OneToMany(mappedBy = "uploadedBy")
    @JsonIgnore // This is the key change
    private List<Material> materials = new ArrayList<>();



    // Constructors
    public User() {}

    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public List<Material> getMaterials() {
        return materials;
    }


    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                '}';
    }
    public enum Role {
        STUDENT,
        TEACHER
    }
}