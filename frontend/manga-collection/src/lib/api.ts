export async function getTopAnime(page: number = 1, limit: number = 25) {
    const res = await fetch(`http://localhost:8080/api/animes/top?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Erro ao buscar animes");
    return res.json();
}

export async function getPopularAnime() {
    const res = await fetch("http://localhost:8080/api/animes/popular");
    if (!res.ok) throw new Error("Erro ao buscar mangás");
    return res.json();
}

export async function getSeasonalAnime() {
    const res = await fetch("http://localhost:8080/api/animes/seasonal");
    if (!res.ok) throw new Error("Erro ao buscar mangás");
    return res.json();
}

export async function getAnimeById(id: string) {
    const res = await fetch(`http://localhost:8080/api/animes/id/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar anime");
    return res.json();
}

export async function getAnimeByName(name: string) {
    const res = await fetch(`http://localhost:8080/api/animes/title/first/${name}`);
    if (!res.ok) throw new Error("Erro ao buscar anime");
    return res.json();
}