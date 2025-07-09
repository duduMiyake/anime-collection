export async function getTopMangas() {
    const res = await fetch("http://localhost:8080/api/mangas/top");
    if (!res.ok) throw new Error("Erro ao buscar mangás");
    return res.json();
}

export async function getPopularMangas() {
    const res = await fetch("http://localhost:8080/api/mangas/popular");
    if (!res.ok) throw new Error("Erro ao buscar mangás");
    return res.json();
}