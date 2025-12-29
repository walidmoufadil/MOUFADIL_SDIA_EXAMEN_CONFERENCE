package org.example.conferenceservice.service;

import lombok.extern.slf4j.Slf4j;
import org.example.conferenceservice.dto.ConferenceResponseDTO;
import org.example.conferenceservice.entity.Conference;
import org.example.conferenceservice.mapper.ConferenceMapper;
import org.example.conferenceservice.repository.ConferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ConferenceQueryServiceImpl implements IConferenceQueryService {

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private ConferenceMapper conferenceMapper;

    @Override
    public List<ConferenceResponseDTO> getConferences() {
        log.info("Fetching all conferences from read model");
        List<Conference> conferences = conferenceRepository.findAll();
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ConferenceResponseDTO getConferenceById(Long id) {
        log.info("Fetching conference with ID: {}", id);
        Conference conference = conferenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conference not found"));
        return conferenceMapper.toDTO(conference);
    }
}

