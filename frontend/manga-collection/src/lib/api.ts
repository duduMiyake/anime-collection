const BACK_API_URL = process.env.NEXT_PUBLIC_BACK_API_URL;

export async function getTopAnime(page: number = 1, limit: number = 25) {
    const res = await fetch(`${BACK_API_URL}/api/animes/top?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Erro ao buscar animes");
    return res.json();
}

export async function getPopularAnime(page: number = 1) {
    const res = await fetch(`${BACK_API_URL}/api/animes/popular?page=${page}`);
    if (!res.ok) throw new Error("Erro ao buscar popular animes");
    return res.json();
}

export async function getSeasonalAnime(page: number = 1) {
    const res = await fetch(`${BACK_API_URL}/api/animes/seasonal?page=${page}`);
    if (!res.ok) throw new Error("Erro ao buscar seasonal animes");
    return res.json();
}

export async function getAnimeById(id: string) {
    const res = await fetch(`${BACK_API_URL}/api/animes/id/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar anime");
    return res.json();
}

export async function getAnimeByName(name: string) {
    const res = await fetch(`${BACK_API_URL}/api/animes/title/first/${name}`);
    if (!res.ok) throw new Error("Erro ao buscar anime");
    return res.json();
}