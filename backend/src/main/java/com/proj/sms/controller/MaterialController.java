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
import com.proj.sms.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;

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
    public ResponseEntity<Material> createMaterial(@RequestBody Material material, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Material createdMaterial = materialService.createMaterial(material, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMaterial);
    }

    @Operation(summary = "Search materials by title or uploader username")
    @GetMapping("/search")
    public ResponseEntity<List<Material>> searchMaterials(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String uploader) {
        if (title != null) {
            return ResponseEntity.ok(materialService.searchMaterialsByTitle(title));
        }
        if (uploader != null) {
            return ResponseEntity.ok(materialService.getMaterialsByUploaderUsername(uploader));
        }
        return ResponseEntity.ok(materialService.getAllMaterials());
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
            @PathVariable Long id,
            @RequestBody Material materialDetails,
            HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            Material updatedMaterial = materialService.updateMaterial(id, materialDetails, currentUser);
            return ResponseEntity.ok(updatedMaterial);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }


    @Operation(summary = "Delete a material")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Material deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Material not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            materialService.deleteMaterial(id, currentUser);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}