package org.example.keynoteservice.eventhandler;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.eventhandling.EventHandler;
import org.example.keynoteservice.event.integration.ConferenceCreatedIntegrationEvent;
import org.example.keynoteservice.event.integration.ConferenceDeletedIntegrationEvent;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ConferenceIntegrationEventHandler {

    @EventHandler
    public void on(ConferenceCreatedIntegrationEvent event) {
        log.info("Received ConferenceCreatedIntegrationEvent from conference-service: {}", event.getConferenceId());
        // Peut être utilisé pour mettre en cache ou mettre à jour des données locales
    }

    @EventHandler
    public void on(ConferenceDeletedIntegrationEvent event) {
        log.info("Received ConferenceDeletedIntegrationEvent from conference-service: {}", event.getConferenceId());
        // Peut être utilisé pour nettoyer des données locales
    }
}

