package org.example.keynoteservice.service;

import org.example.keynoteservice.dto.KeynoteRequestDTO;

public interface IKeynoteCommandService {
    void createKeynote(KeynoteRequestDTO keynote);
    void updateKeynote(Long id, KeynoteRequestDTO keynote);
    void deleteKeynote(Long id);
}

