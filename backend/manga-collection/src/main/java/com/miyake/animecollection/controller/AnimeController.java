package com.miyake.animecollection.controller;

import com.miyake.animecollection.dto.AnimeResponse;
import com.miyake.animecollection.service.JikanAnimeService;

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
    public List<AnimeResponse> getTopAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getTopAnimes(page);
    }

    @GetMapping("/top/all")
    public List<AnimeResponse> getAllTopAnimes() {
        return jikanService.getAllTopAnimes();
    }

    @GetMapping("/popular")
    public List<AnimeResponse> getPopularAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getPopularAnimes(page);
    }

    @GetMapping("/seasonal")
    public List<AnimeResponse> getSeasonalAnimes(@RequestParam(defaultValue = "1") int page) {
        return jikanService.getSeasonalAnimes(page);
    }

    @GetMapping("/id/{id}")
    public AnimeResponse getAnimeById(@PathVariable Long id) {
        return jikanService.getAnimeById(id);
    }

    @GetMapping("/title/{title}")
    public List<AnimeResponse> searchAnimeByTitle(@PathVariable String title) {
        return jikanService.searchAnimeByTitle(title);
    }

    @GetMapping("/title/first/{title}")
    public AnimeResponse getAnimeByTitle(@PathVariable String title) {
        return jikanService.getAnimeByTitle(title);
    }
}