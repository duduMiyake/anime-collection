package com.miyake.animecollection.service;

import com.miyake.animecollection.dto.JikananimeDto;
import com.miyake.animecollection.dto.AnimeResponse;
import com.miyake.animecollection.util.SimpleCache;

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
    private final SimpleCache<List<AnimeResponse>> cachePopular = new SimpleCache<>(60 * 1000);
    private final SimpleCache<List<AnimeResponse>> cacheTop = new SimpleCache<>(60 * 1000);
    private final SimpleCache<List<AnimeResponse>> cacheSeasonal = new SimpleCache<>(60 * 1000);
    private final SimpleCache<AnimeResponse> cacheById = new SimpleCache<>(5 * 60 * 1000); // 5 min
    private final SimpleCache<AnimeResponse> cacheByTitle = new SimpleCache<>(5 * 60 * 1000);

    public JikanAnimeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<AnimeResponse> getPopularAnimes(int page) {
        String key = "popular_" + page;
        var cached = cachePopular.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/top/anime?filter=bypopularity&page=" + page + "&sfw=true";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        var list = Arrays.stream(response.getData())
                .map(AnimeResponse::new)
                .collect(Collectors.toList());

        cachePopular.put(key, list);
        return list;
    }

    public List<AnimeResponse> getTopAnimes(int page) {
        String key = "top_" + page;
        var cached = cacheTop.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/top/anime?page=" + page + "&sfw=true";
        var response = restTemplate.getForObject(url, JikanResponse.class);
        var list = Arrays.stream(response.getData())
                .map(AnimeResponse::new)
                .collect(Collectors.toList());

        cacheTop.put(key, list);
        return list;
    }

    public List<AnimeResponse> getAllTopAnimes() {
        List<AnimeResponse> allAnimes = new ArrayList<>();
        int page = 1;
        boolean hasMore = true;

        while (hasMore) {
            try {
                List<AnimeResponse> pageAnimes = getTopAnimes(page);
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

    public List<AnimeResponse> getSeasonalAnimes(int page) {
        String key = "seasonal_" + page;
        var cached = cacheSeasonal.get(key);
        if (cached != null)
            return cached;

        // Pega a estação e ano atual
        String season = getCurrentSeason().toLowerCase();
        int year = Calendar.getInstance().get(Calendar.YEAR);

        String url = JIKAN_API + "/seasons/" + year + "/" + season + "?page=" + page + "&sfw=true";
        var response = restTemplate.getForObject(url, JikanResponse.class);

        var list = Arrays.stream(response.getData())
                .map(AnimeResponse::new)
                .collect(Collectors.toList());

        cacheSeasonal.put(key, list);
        return list;
    }

    private String getCurrentSeason() {
        int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
        if (month >= 1 && month <= 3)
            return "Winter";
        if (month >= 4 && month <= 6)
            return "Spring";
        if (month >= 7 && month <= 9)
            return "Summer";
        return "Fall";
    }

    public AnimeResponse getAnimeById(Long id) {
        String key = "id_" + id;
        var cached = cacheById.get(key);
        if (cached != null)
            return cached;

        String url = JIKAN_API + "/anime/" + id;
        var response = restTemplate.getForObject(url, JikanSingleResponse.class);
        var anime = new AnimeResponse(response.getData());

        cacheById.put(key, anime);
        return anime;
    }

    public List<AnimeResponse> searchAnimeByTitle(String title) {
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String url = JIKAN_API + "/anime?q=" + encodedTitle;
        var response = restTemplate.getForObject(url, JikanResponse.class);

        if (response == null || response.getData() == null || response.getData().length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum resultado encontrado para: " + title);
        }

        return Arrays.stream(response.getData())
                .map(AnimeResponse::new)
                .collect(Collectors.toList());
    }

    public AnimeResponse getAnimeByTitle(String title) {
        String key = "title_" + title.toLowerCase();
        var cached = cacheByTitle.get(key);
        if (cached != null)
            return cached;

        try {
            List<AnimeResponse> results = searchAnimeByTitle(title);

            if (results.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Nenhum anime encontrado com o título: " + title);
            }

            AnimeResponse result = results.stream()
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
        private JikananimeDto[] data;

        public JikananimeDto[] getData() {
            return data;
        }
    }

    private static class JikanSingleResponse {
        private JikananimeDto data;

        public JikananimeDto getData() {
            return data;
        }
    }
}
