package com.miyake.mangacollection.model;

import lombok.*;

import java.time.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Manga {
    private Long malId;
    private String title;
    private String titleEnglish;
    private String titleJapanese;
    private String synopsis;
    private String imageUrl;
    private String largeImageUrl;
    private Integer chapters;
    private Integer volumes;
    private String status;
    private LocalDate publishedFrom;
    private LocalDate publishedTo;
    private List<String> genres;
    private Double score;
    private Integer scoredBy;
    private Integer rank;
    private Integer popularity;
    private LocalDateTime lastFetched;
}