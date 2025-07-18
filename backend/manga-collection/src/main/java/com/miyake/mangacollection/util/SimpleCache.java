package com.miyake.mangacollection.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SimpleCache<T> {
    private final Map<String, CacheEntry<T>> cache = new ConcurrentHashMap<>();
    private final long ttlMillis;

    public SimpleCache(long ttlMillis) {
        this.ttlMillis = ttlMillis;
    }

    public T get(String key) {
        CacheEntry<T> entry = cache.get(key);
        if (entry == null || System.currentTimeMillis() > entry.expiry) {
            cache.remove(key);
            return null;
        }
        return entry.value;
    }

    public void put(String key, T value) {
        long expiry = System.currentTimeMillis() + ttlMillis;
        cache.put(key, new CacheEntry<>(value, expiry));
    }

    private static class CacheEntry<T> {
        T value;
        long expiry;

        CacheEntry(T value, long expiry) {
            this.value = value;
            this.expiry = expiry;
        }
    }
}
