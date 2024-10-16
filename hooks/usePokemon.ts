import { useState, useEffect, useCallback } from "react";
import {
  BasicPokemonInfo,
  PokemonType,
  PaginationState,
} from "../types/pokemon";
import {
  fetchPokemonList,
  fetchPokemonTypes,
  fetchPokemonsByType,
  searchPokemon,
} from "../utils/api";
import debounce from "lodash.debounce";

export function usePokemon() {
  const [pokemon, setPokemon] = useState<BasicPokemonInfo[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 12,
    totalItems: 0,
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.length >= 2) {
        setLoading(true);
        try {
          const results = await searchPokemon(term);
          setPokemon(results);
          setPagination((prev) => ({
            ...prev,
            totalItems: results.length,
            totalPages: Math.ceil(results.length / pagination.itemsPerPage),
          }));
        } catch (error) {
          console.error("Error searching pokemon:", error);
        } finally {
          setLoading(false);
        }
      }
    }, 1000),
    []
  );

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [pokemonData, typesData] = await Promise.all([
          fetchPokemonList(1, pagination.itemsPerPage),
          fetchPokemonTypes(),
        ]);
        setPokemon(pokemonData.results);
        setTypes(typesData.results);
        setPagination((prev) => ({
          ...prev,
          totalItems: pokemonData.count,
          totalPages: Math.ceil(pokemonData.count / pagination.itemsPerPage),
        }));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle type and search filters
  useEffect(() => {
    if (searchTerm.length) {
      debouncedSearch(searchTerm);
      return;
    }

    const filterPokemon = async () => {
      setLoading(true);
      try {
        let filteredPokemon: BasicPokemonInfo[];

        if (selectedType) {
          const typeData = await fetchPokemonsByType(selectedType);
          filteredPokemon = typeData.results;
          setPagination((prev) => ({
            ...prev,
            totalItems: typeData.results.length,
            totalPages: Math.ceil(
              typeData.results.length / pagination.itemsPerPage
            ),
            currentPage: 1,
          }));
        } else {
          const data = await fetchPokemonList(
            pagination.currentPage,
            pagination.itemsPerPage
          );
          filteredPokemon = data.results;
          setPagination((prev) => ({
            ...prev,
            totalItems: data.count,
            totalPages: Math.ceil(data.count / prev.itemsPerPage),
          }));
        }

        setPokemon(filteredPokemon);
      } catch (error) {
        console.error("Error filtering pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    filterPokemon();
  }, [selectedType, pagination.currentPage, searchTerm]);

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return {
    pokemon,
    types,
    loading,
    selectedType,
    searchTerm,
    pagination,
    setSelectedType,
    setSearchTerm,
    setPage,
  };
}
