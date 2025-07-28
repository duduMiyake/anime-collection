import type { LoginData, RegisterData } from "@/types";

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

export async function searchAnimeByName(name: string) {
    const res = await fetch(`${BACK_API_URL}/api/animes/title/${name}`);
    if (!res.ok) throw new Error("Erro ao buscar anime");
    return res.json();
}

//user
export async function registerUser(data: RegisterData) {
    const res = await fetch(`${BACK_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao cadastrar usuário: ${errorText}`);
    }

    return res.json();
}

export async function loginUser(data: LoginData) {
    const res = await fetch(`${BACK_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao fazer login: ${errorText}`);
    }
    return res.json();
}
