export function PokemonImage({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <img src={imageUrl} alt={name} className="w-full h-auto" loading="lazy" />
    </div>
  );
}
