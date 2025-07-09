package com.miyake.mangacollection.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class JikanMangaDto {
    private Long malId;
    private String title;

    @JsonProperty("title_english")
    private String titleEnglish;

    @JsonProperty("title_japanese")
    private String titleJapanese;

    private String synopsis;

    @JsonProperty("images")
    private Map<String, Map<String, String>> images;

    private Integer chapters;
    private Integer volumes;
    private String status;
    private Double score;

    @JsonProperty("scored_by")
    private Integer scoredBy;

    private Integer rank;
    private Integer popularity;
    private List<Genre> genres;

    @Data
    public static class Genre {
        private String name;
    }
}