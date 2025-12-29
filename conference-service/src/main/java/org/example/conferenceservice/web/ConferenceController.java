package org.example.conferenceservice.web;

import org.example.conferenceservice.dto.ConferenceRequestDTO;
import org.example.conferenceservice.dto.ConferenceResponseDTO;
import org.example.conferenceservice.dto.ReviewRequestDTO;
import org.example.conferenceservice.service.IConferenceCommandService;
import org.example.conferenceservice.service.IConferenceQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
public class ConferenceController {
    @Autowired
    private IConferenceCommandService conferenceCommandService;

    @Autowired
    private IConferenceQueryService conferenceQueryService;

    @GetMapping()
    public List<ConferenceResponseDTO> getConferences() {
      return conferenceQueryService.getConferences();
    }
    @GetMapping("/{id}")
    public ConferenceResponseDTO getConferenceById(@PathVariable Long id) {
      return conferenceQueryService.getConferenceById(id);
    }
    @PostMapping("create")
    public void createConference(@RequestBody ConferenceRequestDTO conference) {
      conferenceCommandService.createConference(conference);
    }
    @PutMapping("/{id}")
    public void updateConference(@PathVariable Long id, @RequestBody ConferenceRequestDTO conference) {
      conferenceCommandService.updateConference(id, conference);
    }
    @PatchMapping("{id}")
    public void patchConference(@PathVariable Long id, @RequestBody ConferenceRequestDTO conference) {
      conferenceCommandService.patchConference(id, conference);
    }
    @PatchMapping("/{id}/reviews")
    public void patchConferenceReviews(@PathVariable Long id, @RequestBody List<ReviewRequestDTO> reviews) {
        conferenceCommandService.patchConferenceReviews(id, reviews);
    }
    @DeleteMapping("/{conferenceId}/reviews/{reviewId}")
    public void deleteReviewFromConference(@PathVariable Long conferenceId, @PathVariable Long reviewId) {
      conferenceCommandService.deleteReviewFromConference(conferenceId, reviewId);
    }
    @DeleteMapping("/{id}")
    public void deleteConference(@PathVariable Long id) {
      conferenceCommandService.deleteConference(id);
    }
}
