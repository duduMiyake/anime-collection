package com.miyake.mangacollection.controller;

import com.miyake.mangacollection.dto.MangaResponse;
import com.miyake.mangacollection.service.JikanAnimeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animes")
public class AnimeController {
    private final JikanAnimeService jikanService;

    public AnimeController(JikanAnimeService jikanService) {
        this.jikanService = jikanService;
    }

    @GetMapping("/top")
    public List<MangaResponse> getTopAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getTopAnimes(page);
    }

    @GetMapping("/top/all")
    public List<MangaResponse> getAllTopAnimes() {
        return jikanService.getAllTopAnimes();
    }

    @GetMapping("/popular")
    public List<MangaResponse> getPopularAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getPopularAnimes(page);
    }

    @GetMapping("/seasonal")
    public List<MangaResponse> getSeasonalAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getSeasonalAnimes(page);
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