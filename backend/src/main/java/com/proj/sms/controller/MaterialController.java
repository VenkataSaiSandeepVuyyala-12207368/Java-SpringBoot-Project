package com.proj.sms.controller;

import com.proj.sms.models.Material;
import com.proj.sms.service.MaterialService;
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

    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody Material material) {
        return ResponseEntity.ok(materialService.createMaterial(material));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Material>> getMaterialsBySubject(
            @PathVariable Long subjectId) {
        return ResponseEntity.ok(materialService.getMaterialsBySubject(subjectId));
    }
}