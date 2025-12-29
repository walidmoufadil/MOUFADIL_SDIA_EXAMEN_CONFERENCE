package org.example.conferenceservice.service;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.example.conferenceservice.command.*;
import org.example.conferenceservice.dto.ConferenceRequestDTO;
import org.example.conferenceservice.dto.ReviewRequestDTO;
import org.example.conferenceservice.mapper.ReviewMapper;
import org.example.conferenceservice.repository.ConferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
public class ConferenceCommandServiceImpl implements IConferenceCommandService {

    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private ReviewMapper reviewMapper;

    @Override
    public void createConference(ConferenceRequestDTO conferenceDTO) {
        Long conferenceId = ThreadLocalRandom.current().nextLong(1, Long.MAX_VALUE);

        CreateConferenceCommand command = CreateConferenceCommand.builder()
                .conferenceId(conferenceId)
                .titre(conferenceDTO.getTitre())
                .type(conferenceDTO.getType())
                .date(conferenceDTO.getDate())
                .duree(conferenceDTO.getDuree())
                .nombreInscrits(conferenceDTO.getNombreInscrits())
                .score(conferenceDTO.getScore())
                .keynoteId(conferenceDTO.getKeynoteId())
                .build();

        commandGateway.sendAndWait(command);
        log.info("Conference created with ID: {}", conferenceId);
    }

    @Override
    public void updateConference(Long id, ConferenceRequestDTO conferenceDTO) {
        UpdateConferenceCommand command = UpdateConferenceCommand.builder()
                .conferenceId(id)
                .titre(conferenceDTO.getTitre())
                .duree(conferenceDTO.getDuree())
                .nombreInscrits(conferenceDTO.getNombreInscrits())
                .score(conferenceDTO.getScore())
                .keynoteId(conferenceDTO.getKeynoteId())
                .build();

        commandGateway.sendAndWait(command);
        log.info("Conference updated with ID: {}", id);
    }

    @Override
    public void patchConference(Long id, ConferenceRequestDTO conferenceDTO) {
        // Retrieve existing conference to apply partial update
        var existing = conferenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        String titre = conferenceDTO.getTitre() != null ? conferenceDTO.getTitre() : existing.getTitre();
        Double duree = conferenceDTO.getDuree() != null ? conferenceDTO.getDuree() : existing.getDuree();
        int nombreInscrits = conferenceDTO.getNombreInscrits() != 0 ? conferenceDTO.getNombreInscrits() : existing.getNombreInscrits();
        Double score = conferenceDTO.getScore() != null ? conferenceDTO.getScore() : existing.getScore();
        Long keynoteId = conferenceDTO.getKeynoteId() != null ? conferenceDTO.getKeynoteId() : existing.getKeynoteId();

        UpdateConferenceCommand command = UpdateConferenceCommand.builder()
                .conferenceId(id)
                .titre(titre)
                .duree(duree)
                .nombreInscrits(nombreInscrits)
                .score(score)
                .keynoteId(keynoteId)
                .build();

        commandGateway.sendAndWait(command);
        log.info("Conference patched with ID: {}", id);
    }

    @Override
    public void patchConferenceReviews(Long id, List<ReviewRequestDTO> reviews) {
        if (reviews != null && !reviews.isEmpty()) {
            reviews.forEach(reviewDTO -> {
                Long reviewId = ThreadLocalRandom.current().nextLong(1, Long.MAX_VALUE);
                AddReviewCommand command = AddReviewCommand.builder()
                        .conferenceId(id)
                        .reviewId(reviewId)
                        .date(new Date())
                        .commentaire(reviewDTO.getCommentaire())
                        .build();
                commandGateway.sendAndWait(command);
            });
            log.info("Reviews added to conference with ID: {}", id);
        }
    }

    @Override
    public void deleteReviewFromConference(Long conferenceId, Long reviewId) {
        DeleteReviewCommand command = DeleteReviewCommand.builder()
                .conferenceId(conferenceId)
                .reviewId(reviewId)
                .build();

        commandGateway.sendAndWait(command);
        log.info("Review {} deleted from conference {}", reviewId, conferenceId);
    }

    @Override
    public void deleteConference(Long id) {
        DeleteConferenceCommand command = DeleteConferenceCommand.builder()
                .conferenceId(id)
                .build();

        commandGateway.sendAndWait(command);
        log.info("Conference deleted with ID: {}", id);
    }
}

