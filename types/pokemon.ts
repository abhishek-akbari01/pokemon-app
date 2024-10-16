export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicPokemonInfo[];
}

export interface BasicPokemonInfo {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface TypesListResponse {
  count: number;
  results: PokemonType[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface BasicPokemonInfo {
  name: string;
  url: string;
}
