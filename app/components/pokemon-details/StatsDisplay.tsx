interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export function StatsDisplay({ stats }: { stats: Stat[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Stats</h2>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="space-y-1">
          <div className="flex justify-between">
            <span className="capitalize">{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
