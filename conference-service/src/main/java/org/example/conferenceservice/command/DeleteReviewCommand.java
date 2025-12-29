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
public class DeleteReviewCommand {
    @TargetAggregateIdentifier
    private Long conferenceId;
    private Long reviewId;
}

