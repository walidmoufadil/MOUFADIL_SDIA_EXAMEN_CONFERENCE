package org.example.keynoteservice.projection;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventhandling.EventHandler;
import org.example.keynoteservice.entity.Keynote;
import org.example.keynoteservice.event.*;
import org.example.keynoteservice.repository.KeynoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class KeynoteProjection {

    @Autowired
    private KeynoteRepository keynoteRepository;

    @EventHandler
    public void on(KeynoteCreatedEvent event) {
        log.info("Processing KeynoteCreatedEvent for keynote: {}", event.getKeynoteId());
        Keynote keynote = Keynote.builder()
                .id(event.getKeynoteId())
                .nom(event.getNom())
                .prenom(event.getPrenom())
                .email(event.getEmail())
                .fonction(event.getFonction())
                .build();
        keynoteRepository.save(keynote);
    }

    @EventHandler
    public void on(KeynoteUpdatedEvent event) {
        log.info("Processing KeynoteUpdatedEvent for keynote: {}", event.getKeynoteId());
        Optional<Keynote> optionalKeynote = keynoteRepository.findById(event.getKeynoteId());
        if (optionalKeynote.isPresent()) {
            Keynote keynote = optionalKeynote.get();
            keynote.setNom(event.getNom());
            keynote.setPrenom(event.getPrenom());
            keynote.setEmail(event.getEmail());
            keynote.setFonction(event.getFonction());
            keynoteRepository.save(keynote);
        }
    }

    @EventHandler
    public void on(KeynoteDeletedEvent event) {
        log.info("Processing KeynoteDeletedEvent for keynote: {}", event.getKeynoteId());
        keynoteRepository.deleteById(event.getKeynoteId());
    }
}

