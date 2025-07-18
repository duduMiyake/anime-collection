package com.miyake.mangacollection.service;

import com.miyake.mangacollection.dto.JikanMangaDto;
import com.miyake.mangacollection.dto.MangaResponse;
import com.miyake.mangacollection.util.SimpleCache;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JikanAnimeService {
    private final RestTemplate restTemplate;
    private static final String JIKAN_API = "https://api.jikan.moe/v4";

    // Caches com TTL de 60 segundos (1 minuto)
    private final SimpleCache<List<MangaResponse>> cachePopular = new SimpleCache<>(60 * 1000);
    private final SimpleCache<List<MangaResponse>> cacheTop = new SimpleCache<>(60 * 1000);
    private final SimpleCache<List<MangaResponse>> cacheSeasonal = new SimpleCache<>(60 * 1000);
    private final SimpleCache<MangaResponse> cacheById = new SimpleCache<>(5 * 60 * 1000); // 5 min
    private final SimpleCache<MangaResponse> cacheByTitle = new SimpleCache<>(5 * 60 * 1000);

    public JikanAnimeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MangaResponse> getPopularAnimes() {
        String key = "popular";
        var cached = cachePopular.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/top/anime?filter=bypopularity";
        var response = restTemplate.getForObject(url, JikanResponse.class);
        var list = Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());

        cachePopular.put(key, list);
        return list;
    }

    public List<MangaResponse> getTopAnimes(int page) {
        String key = "top_" + page;
        var cached = cacheTop.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/top/anime?page=" + page;
        var response = restTemplate.getForObject(url, JikanResponse.class);
        var list = Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());

        cacheTop.put(key, list);
        return list;
    }

    public List<MangaResponse> getAllTopAnimes() {
        List<MangaResponse> allAnimes = new ArrayList<>();
        int page = 1;
        boolean hasMore = true;

        while (hasMore) {
            try {
                List<MangaResponse> pageAnimes = getTopAnimes(page);
                if (pageAnimes.isEmpty()) {
                    hasMore = false;
                } else {
                    allAnimes.addAll(pageAnimes);
                    page++;
                    Thread.sleep(1000); // cuidado com rate limit
                }
            } catch (Exception e) {
                hasMore = false;
            }
        }
        return allAnimes;
    }

    public List<MangaResponse> getSeasonalAnimes() {
        String key = "seasonal";
        var cached = cacheSeasonal.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/seasons/now";
        var response = restTemplate.getForObject(url, JikanResponse.class);
        var list = Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());

        cacheSeasonal.put(key, list);
        return list;
    }

    public MangaResponse getAnimeById(Long id) {
        String key = "id_" + id;
        var cached = cacheById.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/anime/" + id;
        var response = restTemplate.getForObject(url, JikanSingleResponse.class);
        var anime = new MangaResponse(response.getData());

        cacheById.put(key, anime);
        return anime;
    }

    public List<MangaResponse> searchAnimeByTitle(String title) {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String url = JIKAN_API + "/anime?q=" + encodedTitle;
        var response = restTemplate.getForObject(url, JikanResponse.class);

        if (response == null || response.getData() == null || response.getData().length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum resultado encontrado para: " + title);
        }

        return Arrays.stream(response.getData())
                .map(MangaResponse::new)
                .collect(Collectors.toList());
    }

    public MangaResponse getAnimeByTitle(String title) {
        String key = "title_" + title.toLowerCase();
        var cached = cacheByTitle.get(key);
        if (cached != null)
            return cached;

        try {
            List<MangaResponse> results = searchAnimeByTitle(title);

            if (results.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Nenhum anime encontrado com o título: " + title);
            }

            MangaResponse result = results.stream()
                    .filter(anime -> anime.getTitle().equalsIgnoreCase(title))
                    .findFirst()
                    .orElse(results.get(0));

            cacheByTitle.put(key, result);
            return result;
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
