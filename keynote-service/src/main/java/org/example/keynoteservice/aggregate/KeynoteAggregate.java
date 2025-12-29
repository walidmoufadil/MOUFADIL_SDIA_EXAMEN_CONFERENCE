package org.example.keynoteservice.aggregate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.example.keynoteservice.command.*;
import org.example.keynoteservice.event.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeynoteAggregate {
    @AggregateIdentifier
    private Long keynoteId;
    private String nom;
    private String prenom;
    private String email;
    private String fonction;

    @CommandHandler
    public KeynoteAggregate(CreateKeynoteCommand command) {
        AggregateLifecycle.apply(KeynoteCreatedEvent.builder()
                .keynoteId(command.getKeynoteId())
                .nom(command.getNom())
                .prenom(command.getPrenom())
                .email(command.getEmail())
                .fonction(command.getFonction())
                .build());
    }

    @CommandHandler
    public void handle(UpdateKeynoteCommand command) {
        AggregateLifecycle.apply(KeynoteUpdatedEvent.builder()
                .keynoteId(command.getKeynoteId())
                .nom(command.getNom())
                .prenom(command.getPrenom())
                .email(command.getEmail())
                .fonction(command.getFonction())
                .build());
    }

    @CommandHandler
    public void handle(DeleteKeynoteCommand command) {
        AggregateLifecycle.apply(KeynoteDeletedEvent.builder()
                .keynoteId(command.getKeynoteId())
                .build());
    }

    // Event handlers
    @EventSourcingHandler
    public void on(KeynoteCreatedEvent event) {
        this.keynoteId = event.getKeynoteId();
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        this.email = event.getEmail();
        this.fonction = event.getFonction();
    }

    @EventSourcingHandler
    public void on(KeynoteUpdatedEvent event) {
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        this.email = event.getEmail();
        this.fonction = event.getFonction();
    }

    @EventSourcingHandler
    public void on(KeynoteDeletedEvent event) {
        AggregateLifecycle.markDeleted();
    }
}

