export async function getTopAnime() {
    const res = await fetch("http://localhost:8080/api/animes/top");
    if (!res.ok) throw new Error("Erro ao buscar mangás");
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
    if (!res.ok) throw new Error("Erro ao buscar manga");
    return res.json();
}

export async function getAnimeByName(name: string) {
    const res = await fetch(`http://localhost:8080/api/animes/name/${name}`);
    if (!res.ok) throw new Error("Erro ao buscar manga");
    return res.json();
}