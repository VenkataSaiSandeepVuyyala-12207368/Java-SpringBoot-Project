package com.proj.sms.service;

import com.proj.sms.interfaces.MaterialRepository;
import com.proj.sms.models.Material;
import com.proj.sms.models.Material.MaterialType;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.proj.sms.models.User; // Import User


@Service
public class MaterialService {

    private final MaterialRepository materialRepository;


    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    // CREATE
    public Material createMaterial(Material material, User uploader) {
        material.setUploadedBy(uploader);
        return materialRepository.save(material);
    }
    public List<Material> searchMaterialsByTitle(String title) {
        return materialRepository.findByTitleContainingIgnoreCase(title);
    }
    public List<Material> getMaterialsByUploaderUsername(String username) {
        return materialRepository.findByUploadedByUsernameContainingIgnoreCase(username);
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
    public Material updateMaterial(Long id, Material materialDetails, User currentUser) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));

        if (!material.getUploadedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("User not authorized to update this material");
        }

        material.setTitle(materialDetails.getTitle());
        material.setDescription(materialDetails.getDescription());
        material.setUrl(materialDetails.getUrl());
        material.setType(materialDetails.getType());
        material.setSubject(materialDetails.getSubject());

        return materialRepository.save(material);
    }
    // DELETE
    public void deleteMaterial(Long id, User currentUser) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));

        if (!material.getUploadedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("User not authorized to delete this material");
        }

        materialRepository.delete(material);
    }
}