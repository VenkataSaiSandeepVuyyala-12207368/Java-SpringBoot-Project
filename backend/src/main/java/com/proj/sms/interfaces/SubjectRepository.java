package com.proj.sms.interfaces;

import com.proj.sms.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    boolean existsByName(String name);
    List<Subject> findByNameContainingIgnoreCase(String keyword);
}