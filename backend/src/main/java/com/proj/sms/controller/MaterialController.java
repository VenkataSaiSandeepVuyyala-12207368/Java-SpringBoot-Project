package com.proj.sms.controller;

import com.proj.sms.models.Material;
import com.proj.sms.models.Material.MaterialType;
import com.proj.sms.service.MaterialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@Tag(name = "Material Management", description = "Endpoints for managing educational materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @Operation(summary = "Create a new material")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Material created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody Material material) {
        Material createdMaterial = materialService.createMaterial(material);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMaterial);
    }

    @Operation(summary = "Get all materials")
    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials() {
        return ResponseEntity.ok(materialService.getAllMaterials());
    }

    @Operation(summary = "Get a material by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Material found"),
            @ApiResponse(responseCode = "404", description = "Material not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(
            @Parameter(description = "ID of material to be retrieved") @PathVariable Long id) {
        return ResponseEntity.ok(materialService.getMaterialById(id));
    }

    @Operation(summary = "Get materials by type")
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Material>> getMaterialsByType(
            @Parameter(description = "Type of material to filter by") @PathVariable MaterialType type) {
        return ResponseEntity.ok(materialService.getMaterialsByType(type));
    }

    @Operation(summary = "Get materials by subject ID")
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Material>> getMaterialsBySubjectId(
            @Parameter(description = "Subject ID to filter materials") @PathVariable Long subjectId) {
        return ResponseEntity.ok(materialService.getMaterialsBySubjectId(subjectId));
    }

    @Operation(summary = "Get materials by uploader ID")
    @GetMapping("/uploader/{userId}")
    public ResponseEntity<List<Material>> getMaterialsByUploaderId(
            @Parameter(description = "User ID of the uploader") @PathVariable Long userId) {
        return ResponseEntity.ok(materialService.getMaterialsByUploaderId(userId));
    }

    @Operation(summary = "Update a material")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Material updated successfully"),
            @ApiResponse(responseCode = "404", description = "Material not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(
            @Parameter(description = "ID of material to be updated") @PathVariable Long id,
            @RequestBody Material materialDetails) {
        return ResponseEntity.ok(materialService.updateMaterial(id, materialDetails));
    }

    @Operation(summary = "Delete a material")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Material deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Material not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(
            @Parameter(description = "ID of material to be deleted") @PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }
}