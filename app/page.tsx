"use client";

import { usePokemon } from "@/hooks/usePokemon";
import Loading from "./components/Loading";
import SearchFilter from "./components/SearchFilter";
import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";

export default function Home() {
  const {
    pokemon,
    types,
    loading,
    selectedType,
    searchTerm,
    pagination,
    setSelectedType,
    setSearchTerm,
    setPage,
  } = usePokemon();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pokemon Search</h1>

      <SearchFilter
        types={types}
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={(type) => {
          setSelectedType(type);
          setPage(1);
        }}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setPage(1);
        }}
      />

      {pokemon.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No Pokémon found matching your criteria
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pokemon.slice(0, pagination.itemsPerPage).map((poke) => (
              <PokemonCard key={poke.name} pokemon={poke} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
