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
public class CreateKeynoteCommand {
    @TargetAggregateIdentifier
    private Long keynoteId;
    private String nom;
    private String prenom;
    private String email;
    private String fonction;
}

