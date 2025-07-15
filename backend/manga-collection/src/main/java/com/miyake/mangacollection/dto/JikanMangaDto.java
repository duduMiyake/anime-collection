package com.miyake.mangacollection.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class JikanMangaDto {
    private Long malId;
    private Integer episodes;
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

    private String source;

    @JsonProperty("studios")
    private List<Studio> studios;

    private Integer rank;
    private String rating;
    private Integer popularity;
    private List<Genre> genres;

    @JsonProperty("themes")
    private List<Genre> themes;

    @JsonProperty("demographics")
    private List<Genre> demographics;

    @Data
    public static class Genre {
        private String name;
    }

    @Data
    public static class Studio {
        private String name;
    }
}