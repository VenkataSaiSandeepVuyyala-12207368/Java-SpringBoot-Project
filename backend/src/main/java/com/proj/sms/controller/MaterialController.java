package com.proj.sms.controller;

import com.proj.sms.models.Material;
import com.proj.sms.models.Material.MaterialType;
import com.proj.sms.service.MaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    // Create Material
    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody Material material) {
        Material createdMaterial = materialService.createMaterial(material);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMaterial);
    }

    // Get All Materials
    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials() {
        return ResponseEntity.ok(materialService.getAllMaterials());
    }

    // Get Material by ID
    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.getMaterialById(id));
    }

    // Get Materials by Type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Material>> getMaterialsByType(@PathVariable MaterialType type) {
        return ResponseEntity.ok(materialService.getMaterialsByType(type));
    }

    // Get Materials by Subject ID
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Material>> getMaterialsBySubjectId(@PathVariable Long subjectId) {
        return ResponseEntity.ok(materialService.getMaterialsBySubjectId(subjectId));
    }

    // Get Materials by Uploader ID
    @GetMapping("/uploader/{userId}")
    public ResponseEntity<List<Material>> getMaterialsByUploaderId(@PathVariable Long userId) {
        return ResponseEntity.ok(materialService.getMaterialsByUploaderId(userId));
    }

    // Update Material
    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(
            @PathVariable Long id,
            @RequestBody Material materialDetails) {
        return ResponseEntity.ok(materialService.updateMaterial(id, materialDetails));
    }

    // Delete Material
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }
}