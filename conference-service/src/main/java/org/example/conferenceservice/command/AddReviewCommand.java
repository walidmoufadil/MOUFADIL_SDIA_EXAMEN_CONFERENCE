package org.example.conferenceservice.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddReviewCommand {
    @TargetAggregateIdentifier
    private Long conferenceId;
    private Long reviewId;
    private Date date;
    private String commentaire;
}

