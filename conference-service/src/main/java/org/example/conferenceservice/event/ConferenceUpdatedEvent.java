package org.example.conferenceservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConferenceUpdatedEvent {
    private Long conferenceId;
    private String titre;
    private Double duree;
    private int nombreInscrits;
    private Double score;
    private Long keynoteId;
}

