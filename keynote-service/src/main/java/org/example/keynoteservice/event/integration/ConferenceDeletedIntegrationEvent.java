package org.example.keynoteservice.event.integration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConferenceDeletedIntegrationEvent {
    private Long conferenceId;
}

