package org.example.keynoteservice.web;

import org.example.keynoteservice.dto.KeynoteRequestDTO;
import org.example.keynoteservice.dto.KeynoteResponseDTO;
import org.example.keynoteservice.service.IKeynoteCommandService;
import org.example.keynoteservice.service.IKeynoteQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/keynotes")
public class KeynoteController {
    @Autowired
    private IKeynoteCommandService keynoteCommandService;

    @Autowired
    private IKeynoteQueryService keynoteQueryService;

    @GetMapping()
    public List<KeynoteResponseDTO> getKeynotes() {
       return keynoteQueryService.getKeynotes();
    }
    @GetMapping("{id}")
    public KeynoteResponseDTO getKeynoteById(@PathVariable Long id) {
       return keynoteQueryService.getKeynoteById(id);
    }
    @PostMapping("create")
    public void createKeynote(@RequestBody KeynoteRequestDTO keynote) {
       keynoteCommandService.createKeynote(keynote);
    }
    @PutMapping("{id}")
    public void updateKeynote(@PathVariable Long id, @RequestBody KeynoteRequestDTO keynote) {
       keynoteCommandService.updateKeynote(id, keynote);
    }
    @DeleteMapping("delete/{id}")
    public void deleteKeynote(@PathVariable Long id) {
       keynoteCommandService.deleteKeynote(id);
    }
}
