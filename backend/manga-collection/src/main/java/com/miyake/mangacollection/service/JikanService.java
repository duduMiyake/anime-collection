package com.miyake.mangacollection.service;

import com.miyake.mangacollection.dto.JikanMangaDto;
import com.miyake.mangacollection.dto.MangaResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class JikanService {
    private final RestTemplate restTemplate;
    private static final String JIKAN_API = "https://api.jikan.moe/v4";

    public JikanService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MangaResponse> getPopularMangas() {
        String url = JIKAN_API + "/top/manga?filter=bypopularity";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public List<MangaResponse> getTopMangas() {
        String url = JIKAN_API + "/top/manga";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public MangaResponse getMangaById(Long id) {
        String url = JIKAN_API + "/manga/" + id;
        var response = restTemplate.getForObject(url, JikanSingleResponse.class);
        return new MangaResponse(response.getData());
    }

    public List<MangaResponse> searchMangaByTitle(String title) {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String url = JIKAN_API + "/manga?q=" + encodedTitle;
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    // Classes auxiliares para deserialização
    private static class JikanResponse {
        private JikanMangaDto[] data;

        public JikanMangaDto[] getData() {
            return data;
        }
    }

    private static class JikanSingleResponse {
        private JikanMangaDto data;

        public JikanMangaDto getData() {
            return data;
        }
    }
}