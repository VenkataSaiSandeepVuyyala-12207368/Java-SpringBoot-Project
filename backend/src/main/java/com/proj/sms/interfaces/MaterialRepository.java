package com.proj.sms.interfaces;

import com.proj.sms.models.Material;
import com.proj.sms.models.Material.MaterialType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByType(MaterialType type);
    List<Material> findBySubjectId(Long subjectId);
    List<Material> findByUploadedById(Long userId);
    // New method for searching by material title
    List<Material> findByTitleContainingIgnoreCase(String title);
    // New method to search by uploader's username
    List<Material> findByUploadedByUsernameContainingIgnoreCase(String username);
}