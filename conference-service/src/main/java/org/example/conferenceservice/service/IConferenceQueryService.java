package org.example.conferenceservice.service;

import org.example.conferenceservice.dto.ConferenceResponseDTO;

import java.util.List;

public interface IConferenceQueryService {
    List<ConferenceResponseDTO> getConferences();
    ConferenceResponseDTO getConferenceById(Long id);
}

