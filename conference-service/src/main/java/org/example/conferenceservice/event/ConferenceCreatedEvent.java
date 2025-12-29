package org.example.conferenceservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.conferenceservice.entity.TypeConference;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConferenceCreatedEvent {
    private Long conferenceId;
    private String titre;
    private TypeConference type;
    private Date date;
    private Double duree;
    private int nombreInscrits;
    private Double score;
    private Long keynoteId;
}

