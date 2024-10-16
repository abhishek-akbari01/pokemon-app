import {
  BasicPokemonInfo,
  PokemonDetail,
  PokemonListResponse,
  TypesListResponse,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  page: number = 1,
  itemsPerPage: number = 12
): Promise<PokemonListResponse> {
  const offset = (page - 1) * itemsPerPage;
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${itemsPerPage}&offset=${offset}`
  );
  return response.json();
}

export async function fetchPokemonTypes(): Promise<TypesListResponse> {
  const response = await fetch(`${BASE_URL}/type`);
  return response.json();
}

export async function fetchPokemonDetail(id: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  return response.json();
}

export async function fetchPokemonsByType(
  type: string
): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  return {
    count: data.pokemon.length,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: data.pokemon.map((p: any) => p.pokemon),
    next: null,
    previous: null,
  };
}

export async function searchPokemon(
  searchTerm: string
): Promise<BasicPokemonInfo[]> {
  // First fetch a larger set of Pokemon to search through
  const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
  const data: PokemonListResponse = await response.json();

  // Implement fuzzy search
  return data.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
