package com.miyake.animecollection.model;

import lombok.*;

import java.time.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anime {
    private Integer malId;
    private Integer episodes;
    private String title;
    private String titleEnglish;
    private String titleJapanese;
    private String synopsis;
    private String imageUrl;
    private String largeImageUrl;
    private String trailer;
    private String status;
    private LocalDate publishedFrom;
    private LocalDate publishedTo;
    private List<String> genres;
    private Double score;
    private Integer scoredBy;
    private String source;
    private String studios;
    private Integer rank;
    private String rating;
    private Integer popularity;
    private LocalDateTime lastFetched;

}