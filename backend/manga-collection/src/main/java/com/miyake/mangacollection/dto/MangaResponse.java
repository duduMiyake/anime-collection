package com.miyake.mangacollection.dto;

import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class MangaResponse {
    private Long id;
    private Integer episodes;
    private String title;
    private String titleEnglish;
    private String titleJapanese;
    private String synopsis;
    private String imageUrl;
    private String largeImageUrl;
    private String status;
    private Double score;
    private Integer scoredBy;
    private String source;
    private List<String> studios;
    private Integer rank;
    private String rating;
    private Integer popularity;
    private List<String> genres;
    private List<String> themes;
    private List<String> demographics;

    public MangaResponse(JikanMangaDto dto) {
        this.id = dto.getMalId();
        this.episodes = dto.getEpisodes();
        this.title = dto.getTitle();
        this.titleEnglish = dto.getTitleEnglish();
        this.titleJapanese = dto.getTitleJapanese();
        this.synopsis = dto.getSynopsis();
        this.imageUrl = dto.getImages().get("jpg").get("image_url");
        this.largeImageUrl = dto.getImages().get("jpg").get("large_image_url");
        this.status = dto.getStatus();
        this.score = dto.getScore();
        this.scoredBy = dto.getScoredBy();
        this.source = dto.getSource();
        this.studios = dto.getStudios() != null
                ? dto.getStudios().stream().map(studio -> studio.getName()).collect(Collectors.toList())
                : List.of();
        this.rank = dto.getRank();
        this.rating = dto.getRating();
        this.popularity = dto.getPopularity();
        this.genres = dto.getGenres().stream()
                .map(genre -> genre.getName())
                .collect(Collectors.toList());
        this.themes = dto.getThemes() != null
                ? dto.getThemes().stream().map(genre -> genre.getName()).collect(Collectors.toList())
                : List.of();

        this.demographics = dto.getDemographics() != null
                ? dto.getDemographics().stream().map(genre -> genre.getName()).collect(Collectors.toList())
                : List.of();
    }
}