package org.example.conferenceservice.event.integration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeynoteDeletedIntegrationEvent {
    private Long keynoteId;
}

