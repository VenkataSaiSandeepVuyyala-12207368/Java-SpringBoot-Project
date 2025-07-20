package com.proj.sms.interfaces;

import com.proj.sms.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMaterialId(Long materialId);
    List<Rating> findByUserId(Long userId);
}