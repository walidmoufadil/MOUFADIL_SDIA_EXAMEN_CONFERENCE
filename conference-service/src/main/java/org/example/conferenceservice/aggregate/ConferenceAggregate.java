package org.example.conferenceservice.aggregate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.example.conferenceservice.command.*;
import org.example.conferenceservice.entity.TypeConference;
import org.example.conferenceservice.event.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConferenceAggregate {
    @AggregateIdentifier
    private Long conferenceId;
    private String titre;
    private TypeConference type;
    private Date date;
    private Double duree;
    private int nombreInscrits;
    private Double score;
    private Long keynoteId;
    private List<Long> reviewIds = new ArrayList<>();

    @CommandHandler
    public ConferenceAggregate(CreateConferenceCommand command) {
        AggregateLifecycle.apply(ConferenceCreatedEvent.builder()
                .conferenceId(command.getConferenceId())
                .titre(command.getTitre())
                .type(command.getType())
                .date(command.getDate())
                .duree(command.getDuree())
                .nombreInscrits(command.getNombreInscrits())
                .score(command.getScore())
                .keynoteId(command.getKeynoteId())
                .build());
    }

    @CommandHandler
    public void handle(UpdateConferenceCommand command) {
        AggregateLifecycle.apply(ConferenceUpdatedEvent.builder()
                .conferenceId(command.getConferenceId())
                .titre(command.getTitre())
                .duree(command.getDuree())
                .nombreInscrits(command.getNombreInscrits())
                .score(command.getScore())
                .keynoteId(command.getKeynoteId())
                .build());
    }

    @CommandHandler
    public void handle(DeleteConferenceCommand command) {
        AggregateLifecycle.apply(ConferenceDeletedEvent.builder()
                .conferenceId(command.getConferenceId())
                .build());
    }

    @CommandHandler
    public void handle(AddReviewCommand command) {
        AggregateLifecycle.apply(ReviewAddedEvent.builder()
                .conferenceId(command.getConferenceId())
                .reviewId(command.getReviewId())
                .date(command.getDate())
                .commentaire(command.getCommentaire())
                .build());
    }

    @CommandHandler
    public void handle(DeleteReviewCommand command) {
        AggregateLifecycle.apply(ReviewDeletedEvent.builder()
                .conferenceId(command.getConferenceId())
                .reviewId(command.getReviewId())
                .build());
    }

    // Event handlers
    @EventSourcingHandler
    public void on(ConferenceCreatedEvent event) {
        this.conferenceId = event.getConferenceId();
        this.titre = event.getTitre();
        this.type = event.getType();
        this.date = event.getDate();
        this.duree = event.getDuree();
        this.nombreInscrits = event.getNombreInscrits();
        this.score = event.getScore();
        this.keynoteId = event.getKeynoteId();
        this.reviewIds = new ArrayList<>();
    }

    @EventSourcingHandler
    public void on(ConferenceUpdatedEvent event) {
        this.titre = event.getTitre();
        this.duree = event.getDuree();
        this.nombreInscrits = event.getNombreInscrits();
        this.score = event.getScore();
        this.keynoteId = event.getKeynoteId();
    }

    @EventSourcingHandler
    public void on(ConferenceDeletedEvent event) {
        AggregateLifecycle.markDeleted();
    }

    @EventSourcingHandler
    public void on(ReviewAddedEvent event) {
        this.reviewIds.add(event.getReviewId());
    }

    @EventSourcingHandler
    public void on(ReviewDeletedEvent event) {
        this.reviewIds.remove(event.getReviewId());
    }
}

