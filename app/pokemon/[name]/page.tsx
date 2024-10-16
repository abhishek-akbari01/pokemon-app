import Breadcrumb from "@/app/components/Breadcrumb";
import { fetchPokemonDetail } from "../../../utils/api";
import { PokemonImage } from "@/app/components/pokemon-details/PokemonImage";
import { TypeBadge } from "@/app/components/pokemon-details/TypeBadge";
import { StatsDisplay } from "@/app/components/pokemon-details/StatsDisplay";
import { AbilitiesList } from "@/app/components/pokemon-details/AbilitiesList";

export default async function PokemonDetail({
  params: { name },
}: {
  params: { name: string };
}) {
  const pokemon = await fetchPokemonDetail(name);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: name }]} />

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PokemonImage
            imageUrl={pokemon.sprites.other["official-artwork"].front_default}
            name={pokemon.name}
          />

          <div className="space-y-6">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.type.name} type={type.type.name} />
                ))}
              </div>
            </div>

            <StatsDisplay stats={pokemon.stats} />
            <AbilitiesList abilities={pokemon.abilities} />
          </div>
        </div>
      </div>
    </div>
  );
}
