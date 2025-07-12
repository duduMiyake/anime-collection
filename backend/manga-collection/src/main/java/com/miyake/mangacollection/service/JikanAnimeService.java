package com.miyake.mangacollection.service;

import com.miyake.mangacollection.dto.JikanMangaDto;
import com.miyake.mangacollection.dto.MangaResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class JikanAnimeService {
    private final RestTemplate restTemplate;
    private static final String JIKAN_API = "https://api.jikan.moe/v4";

    public JikanAnimeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MangaResponse> getPopularAnimes() {
        String url = JIKAN_API + "/top/anime?filter=bypopularity";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public List<MangaResponse> getTopAnimes() {
        String url = JIKAN_API + "/top/anime";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public List<MangaResponse> getSeasonalAnimes() {
        String url = JIKAN_API + "/seasons/now";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public MangaResponse getAnimeById(Long id) {
        String url = JIKAN_API + "/anime/" + id;
        var response = restTemplate.getForObject(url, JikanSingleResponse.class);
        return new MangaResponse(response.getData());
    }

    public List<MangaResponse> searchAnimeByTitle(String title) {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String url = JIKAN_API + "/anime?q=" + encodedTitle;
        System.out.println("URL da requisição: " + url); // Adicione este log

        var response = restTemplate.getForObject(url, JikanResponse.class);

        if (response == null || response.getData() == null || response.getData().length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum resultado encontrado para: " + title);
        }

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public MangaResponse getAnimeByTitle(String title) {
        try {
            List<MangaResponse> results = searchAnimeByTitle(title);

            if (results.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Nenhum anime encontrado com o título: " + title);
            }

            return results.stream()
                    .filter(anime -> anime.getTitle().equalsIgnoreCase(title))
                    .findFirst()
                    .orElse(results.get(0)); // Retorna o primeiro se não encontrar exato
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar anime", e);
        }
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
