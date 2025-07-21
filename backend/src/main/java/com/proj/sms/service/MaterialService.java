package com.proj.sms.service;

import com.proj.sms.interfaces.MaterialRepository;
import com.proj.sms.models.Material;
import com.proj.sms.models.Material.MaterialType;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    // CREATE
    public Material createMaterial(Material material) {
        // In a real app, you would set the uploader and subject from the security context or request DTO
        return materialRepository.save(material);
    }

    // READ (Single)
    public Material getMaterialById(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));
    }

    // READ (All)
    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    // READ (By Type)
    public List<Material> getMaterialsByType(MaterialType type) {
        return materialRepository.findByType(type);
    }

    // READ (By Subject ID)
    public List<Material> getMaterialsBySubjectId(Long subjectId) {
        return materialRepository.findBySubjectId(subjectId);
    }

    // READ (By Uploader ID)
    public List<Material> getMaterialsByUploaderId(Long userId) {
        return materialRepository.findByUploadedById(userId);
    }

    // UPDATE
    public Material updateMaterial(Long id, Material materialDetails) {
        Material material = getMaterialById(id);
        material.setTitle(materialDetails.getTitle());
        material.setDescription(materialDetails.getDescription());
        material.setUrl(materialDetails.getUrl());
        material.setType(materialDetails.getType());
        // The subject and uploader are generally not changed after creation
        return materialRepository.save(material);
    }

    // DELETE
    public void deleteMaterial(Long id) {
        if (!materialRepository.existsById(id)) {
            throw new RuntimeException("Material not found with id: " + id);
        }
        materialRepository.deleteById(id);
    }
}