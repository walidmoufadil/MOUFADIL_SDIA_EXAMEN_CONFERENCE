package org.example.conferenceservice.eventhandler;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventhandling.EventHandler;
import org.example.conferenceservice.event.integration.KeynoteCreatedIntegrationEvent;
import org.example.conferenceservice.event.integration.KeynoteDeletedIntegrationEvent;
import org.example.conferenceservice.event.integration.KeynoteUpdatedIntegrationEvent;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class KeynoteIntegrationEventHandler {

    @EventHandler
    public void on(KeynoteCreatedIntegrationEvent event) {
        log.info("Received KeynoteCreatedIntegrationEvent from keynote-service: {}", event.getKeynoteId());
        // Peut être utilisé pour mettre en cache ou mettre à jour des données locales
    }

    @EventHandler
    public void on(KeynoteUpdatedIntegrationEvent event) {
        log.info("Received KeynoteUpdatedIntegrationEvent from keynote-service: {}", event.getKeynoteId());
        // Peut être utilisé pour mettre en cache ou mettre à jour des données locales
    }

    @EventHandler
    public void on(KeynoteDeletedIntegrationEvent event) {
        log.info("Received KeynoteDeletedIntegrationEvent from keynote-service: {}", event.getKeynoteId());
        // Peut être utilisé pour nettoyer des données locales
    }
}

