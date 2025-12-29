package org.example.keynoteservice.service;

import lombok.extern.slf4j.Slf4j;
import org.example.keynoteservice.dto.KeynoteResponseDTO;
import org.example.keynoteservice.entity.Keynote;
import org.example.keynoteservice.mapper.KeynoteMapper;
import org.example.keynoteservice.repository.KeynoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class KeynoteQueryServiceImpl implements IKeynoteQueryService {

    @Autowired
    private KeynoteRepository keynoteRepository;

    @Autowired
    private KeynoteMapper keynoteMapper;

    @Override
    public List<KeynoteResponseDTO> getKeynotes() {
        log.info("Fetching all keynotes from read model");
        List<Keynote> keynotes = keynoteRepository.findAll();
        return keynotes.stream()
                .map(keynoteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public KeynoteResponseDTO getKeynoteById(Long id) {
        log.info("Fetching keynote with ID: {}", id);
        Keynote keynote = keynoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Keynote not found"));
        return keynoteMapper.toDTO(keynote);
    }
}

