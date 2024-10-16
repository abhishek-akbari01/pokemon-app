interface Ability {
  ability: {
    name: string;
  };
}

export function AbilitiesList({ abilities }: { abilities: Ability[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Abilities</h2>
      <div className="flex flex-wrap gap-2">
        {abilities.map((ability) => (
          <span
            key={ability.ability.name}
            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full capitalize text-sm"
          >
            {ability.ability.name}
          </span>
        ))}
      </div>
    </div>
  );
}
