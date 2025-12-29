package org.example.conferenceservice.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateConferenceCommand {
    @TargetAggregateIdentifier
    private Long conferenceId;
    private String titre;
    private Double duree;
    private int nombreInscrits;
    private Double score;
    private Long keynoteId;
}

