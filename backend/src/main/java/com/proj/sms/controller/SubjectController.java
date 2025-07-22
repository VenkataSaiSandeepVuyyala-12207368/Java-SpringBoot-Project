package com.proj.sms.controller;

import com.proj.sms.models.Subject;
import com.proj.sms.service.SubjectService;
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
@RequestMapping("/api/subjects")
@Tag(name = "Subject Management", description = "Endpoints for managing subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @Operation(summary = "Create a new subject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Subject created successfully"),
            @ApiResponse(responseCode = "400", description = "Subject name already exists")
    })
    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        if (subjectService.existsByName(subject.getName())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subjectService.createSubject(subject));
    }

    @Operation(summary = "Get a subject by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Subject found"),
            @ApiResponse(responseCode = "404", description = "Subject not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubject(
            @Parameter(description = "ID of subject to be retrieved") @PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    @Operation(summary = "Get all subjects or search by keyword")
    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects(
            @Parameter(description = "Keyword to search subjects by name")
            @RequestParam(required = false) String keyword) {

        if (keyword != null && !keyword.isEmpty()) {
            return ResponseEntity.ok(subjectService.searchSubjectsByName(keyword));
        }
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @Operation(summary = "Update a subject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Subject updated successfully"),
            @ApiResponse(responseCode = "404", description = "Subject not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(
            @Parameter(description = "ID of subject to be updated") @PathVariable Long id,
            @RequestBody Subject subjectDetails) {
        return ResponseEntity.ok(subjectService.updateSubject(id, subjectDetails));
    }

    @Operation(summary = "Delete a subject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Subject deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Subject not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(
            @Parameter(description = "ID of subject to be deleted") @PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}