package com.proj.sms.service;

import com.proj.sms.interfaces.SubjectRepository;
import com.proj.sms.models.Subject;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    // CREATE
    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    // READ (Single)
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
    }

    // READ (All)
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    // ✅ ADD THIS METHOD
    // READ (Search by Name)
    public List<Subject> searchSubjectsByName(String keyword) {
        return subjectRepository.findByNameContainingIgnoreCase(keyword);
    }

    // UPDATE
    public Subject updateSubject(Long id, Subject subjectDetails) {
        Subject subject = getSubjectById(id);
        subject.setName(subjectDetails.getName());
        return subjectRepository.save(subject);
    }

    // DELETE
    public void deleteSubject(Long id) {
        Subject subject = getSubjectById(id);
        subjectRepository.delete(subject);
    }

    public boolean existsByName(String name) {
        return subjectRepository.existsByName(name);
    }
}