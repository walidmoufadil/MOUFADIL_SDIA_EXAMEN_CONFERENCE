package org.example.keynoteservice.service;

import lombok.extern.slf4j.Slf4j;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.example.keynoteservice.command.*;
import org.example.keynoteservice.dto.KeynoteRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
public class KeynoteCommandServiceImpl implements IKeynoteCommandService {

    @Autowired
    private CommandGateway commandGateway;

    @Override
    public void createKeynote(KeynoteRequestDTO keynoteDTO) {
        Long keynoteId = ThreadLocalRandom.current().nextLong(1, Long.MAX_VALUE);

        CreateKeynoteCommand command = CreateKeynoteCommand.builder()
                .keynoteId(keynoteId)
                .nom(keynoteDTO.getNom())
                .prenom(keynoteDTO.getPrenom())
                .email(keynoteDTO.getEmail())
                .fonction(keynoteDTO.getFonction())
                .build();

        commandGateway.sendAndWait(command);
        log.info("Keynote created with ID: {}", keynoteId);
    }

    @Override
    public void updateKeynote(Long id, KeynoteRequestDTO keynoteDTO) {
        UpdateKeynoteCommand command = UpdateKeynoteCommand.builder()
                .keynoteId(id)
                .nom(keynoteDTO.getNom())
                .prenom(keynoteDTO.getPrenom())
                .email(keynoteDTO.getEmail())
                .fonction(keynoteDTO.getFonction())
                .build();

        commandGateway.sendAndWait(command);
        log.info("Keynote updated with ID: {}", id);
    }

    @Override
    public void deleteKeynote(Long id) {
        DeleteKeynoteCommand command = DeleteKeynoteCommand.builder()
                .keynoteId(id)
                .build();

        commandGateway.sendAndWait(command);
        log.info("Keynote deleted with ID: {}", id);
    }
}

