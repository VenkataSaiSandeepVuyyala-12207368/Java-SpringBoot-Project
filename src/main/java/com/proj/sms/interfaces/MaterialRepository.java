package com.proj.sms.interfaces;

import com.proj.sms.models.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    // For inner enum, use Material.MaterialType
    List<Material> findByType(Material.MaterialType type);

    // Other methods remain the same
    List<Material> findBySubjectId(Long subjectId);
    List<Material> findByUploadedById(Long userId);
}