package com.proj.sms.service;

import com.proj.sms.models.Material;
import com.proj.sms.interfaces.MaterialRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    public List<Material> getMaterialsBySubject(Long subjectId) {
        return materialRepository.findBySubjectId(subjectId);
    }
}