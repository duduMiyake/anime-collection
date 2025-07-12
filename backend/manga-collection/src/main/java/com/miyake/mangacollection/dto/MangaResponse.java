package com.miyake.mangacollection.dto;

import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class MangaResponse {
    private Long id;
    private String title;
    private String titleEnglish;
    private String titleJapanese;
    private String synopsis;
    private String imageUrl;
    private String largeImageUrl;
    private Integer chapters;
    private Integer volumes;
    private String status;
    private Double score;
    private Integer scoredBy;
    private Integer rank;
    private Integer popularity;
    private List<String> genres;

    public MangaResponse(JikanMangaDto dto) {
        this.id = dto.getMalId();
        this.title = dto.getTitle();
        this.titleEnglish = dto.getTitleEnglish();
        this.titleJapanese = dto.getTitleJapanese();
        this.synopsis = dto.getSynopsis();
        this.imageUrl = dto.getImages().get("jpg").get("image_url");
        this.largeImageUrl = dto.getImages().get("jpg").get("large_image_url");
        this.chapters = dto.getChapters();
        this.volumes = dto.getVolumes();
        this.status = dto.getStatus();
        this.score = dto.getScore();
        this.scoredBy = dto.getScoredBy();
        this.rank = dto.getRank();
        this.popularity = dto.getPopularity();
        this.genres = dto.getGenres().stream()
                .map(genre -> genre.getName())
                .collect(Collectors.toList());
    }
}