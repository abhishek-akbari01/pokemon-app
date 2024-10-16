export function TypeBadge({ type }: { type: string }) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-500",
      default: "bg-gray-500",
    };
    return colors[type] || colors.default;
  };

  return (
    <span
      className={`${getTypeColor(
        type
      )} text-white px-3 py-1 rounded-full capitalize text-sm`}
    >
      {type}
    </span>
  );
}
