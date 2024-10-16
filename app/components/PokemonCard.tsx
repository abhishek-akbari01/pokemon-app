import { BasicPokemonInfo } from "@/types/pokemon";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: BasicPokemonInfo;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = pokemon.url.split("/")[6];

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="block border rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1 bg-white"
    >
      <div className="aspect-square relative">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemon.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <h2 className="text-xl font-semibold mt-2 capitalize">{pokemon.name}</h2>
      <p className="text-blue-500 mt-2 flex items-center gap-1">
        Details
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </p>
    </Link>
  );
}
