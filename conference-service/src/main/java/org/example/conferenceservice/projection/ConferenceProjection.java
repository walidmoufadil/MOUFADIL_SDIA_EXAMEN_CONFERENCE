package org.example.conferenceservice.projection;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventhandling.EventHandler;
import org.example.conferenceservice.entity.Conference;
import org.example.conferenceservice.entity.Review;
import org.example.conferenceservice.event.*;
import org.example.conferenceservice.repository.ConferenceRepository;
import org.example.conferenceservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class ConferenceProjection {

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @EventHandler
    public void on(ConferenceCreatedEvent event) {
        log.info("Processing ConferenceCreatedEvent for conference: {}", event.getConferenceId());
        Conference conference = Conference.builder()
                .id(event.getConferenceId())
                .titre(event.getTitre())
                .type(event.getType())
                .date(event.getDate())
                .duree(event.getDuree())
                .nombreInscrits(event.getNombreInscrits())
                .score(event.getScore())
                .keynoteId(event.getKeynoteId())
                .build();
        conferenceRepository.save(conference);
    }

    @EventHandler
    public void on(ConferenceUpdatedEvent event) {
        log.info("Processing ConferenceUpdatedEvent for conference: {}", event.getConferenceId());
        Optional<Conference> optionalConference = conferenceRepository.findById(event.getConferenceId());
        if (optionalConference.isPresent()) {
            Conference conference = optionalConference.get();
            conference.setTitre(event.getTitre());
            conference.setDuree(event.getDuree());
            conference.setNombreInscrits(event.getNombreInscrits());
            conference.setScore(event.getScore());
            conference.setKeynoteId(event.getKeynoteId());
            conferenceRepository.save(conference);
        }
    }

    @EventHandler
    public void on(ConferenceDeletedEvent event) {
        log.info("Processing ConferenceDeletedEvent for conference: {}", event.getConferenceId());
        conferenceRepository.deleteById(event.getConferenceId());
    }

    @EventHandler
    public void on(ReviewAddedEvent event) {
        log.info("Processing ReviewAddedEvent for conference: {}", event.getConferenceId());
        Optional<Conference> optionalConference = conferenceRepository.findById(event.getConferenceId());
        if (optionalConference.isPresent()) {
            Conference conference = optionalConference.get();
            Review review = Review.builder()
                    .id(event.getReviewId())
                    .date(event.getDate())
                    .commentaire(event.getCommentaire())
                    .conference(conference)
                    .build();
            conference.addReview(review);
            conferenceRepository.save(conference);
        }
    }

    @EventHandler
    public void on(ReviewDeletedEvent event) {
        log.info("Processing ReviewDeletedEvent for conference: {}", event.getConferenceId());
        Optional<Review> optionalReview = reviewRepository.findById(event.getReviewId());
        if (optionalReview.isPresent()) {
            reviewRepository.deleteById(event.getReviewId());
        }
    }
}

