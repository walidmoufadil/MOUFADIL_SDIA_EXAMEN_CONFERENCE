package org.example.keynoteservice.service;

import org.example.keynoteservice.dto.KeynoteResponseDTO;

import java.util.List;

public interface IKeynoteQueryService {
    List<KeynoteResponseDTO> getKeynotes();
    KeynoteResponseDTO getKeynoteById(Long id);
}

