package org.example.conferenceservice.event.integration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeynoteCreatedIntegrationEvent {
    private Long keynoteId;
    private String nom;
    private String prenom;
    private String email;
    private String fonction;
}

