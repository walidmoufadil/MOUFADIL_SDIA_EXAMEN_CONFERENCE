package org.example.keynoteservice.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteKeynoteCommand {
    @TargetAggregateIdentifier
    private Long keynoteId;
}

