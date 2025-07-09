package com.miyake.mangacollection.controller;

import com.miyake.mangacollection.dto.MangaResponse;
import com.miyake.mangacollection.service.JikanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mangas")
public class MangaController {
    private final JikanService jikanService;

    public MangaController(JikanService jikanService) {
        this.jikanService = jikanService;
    }

    @GetMapping("/top")
    public List<MangaResponse> getTopMangas() {
        return jikanService.getTopMangas();
    }

    @GetMapping("/popular")
    public List<MangaResponse> getPopularMangas() {
        return jikanService.getPopularMangas();
    }

    @GetMapping("/id/{id}")
    public MangaResponse getMangaById(@PathVariable Long id) {
        return jikanService.getMangaById(id);
    }

    @GetMapping("/title/{title}")
    public List<MangaResponse> searchMangaByTitle(@PathVariable String title) {
        return jikanService.searchMangaByTitle(title);
    }
}