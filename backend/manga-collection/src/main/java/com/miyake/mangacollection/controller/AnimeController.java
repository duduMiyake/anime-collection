package com.miyake.mangacollection.controller;

import com.miyake.mangacollection.dto.MangaResponse;
import com.miyake.mangacollection.service.JikanAnimeService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/animes")
public class AnimeController {
    private final JikanAnimeService jikanService;

    public AnimeController(JikanAnimeService jikanService) {
        this.jikanService = jikanService;
    }

    @GetMapping("/top")
    public List<MangaResponse> getTopAnimes() {
        return jikanService.getTopAnimes();
    }

    @GetMapping("/popular")
    public List<MangaResponse> getPopularAnimes() {
        return jikanService.getPopularAnimes();
    }

    @GetMapping("/seasonal")
    public List<MangaResponse> getSeasonalAnimes() {
        return jikanService.getSeasonalAnimes();
    }

    @GetMapping("/id/{id}")
    public MangaResponse getAnimeById(@PathVariable Long id) {
        return jikanService.getAnimeById(id);
    }

    @GetMapping("/title/{title}")
    public List<MangaResponse> searchAnimeByTitle(@PathVariable String title) {
        return jikanService.searchAnimeByTitle(title);
    }

    @GetMapping("/title/first/{title}")
    public MangaResponse getAnimeByTitle(@PathVariable String title) {
        return jikanService.getAnimeByTitle(title);
    }
}