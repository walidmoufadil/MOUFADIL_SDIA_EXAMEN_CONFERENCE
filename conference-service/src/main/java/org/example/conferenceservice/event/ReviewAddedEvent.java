package org.example.conferenceservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAddedEvent {
    private Long conferenceId;
    private Long reviewId;
    private Date date;
    private String commentaire;
}

