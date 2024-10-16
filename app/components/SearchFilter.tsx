import { PokemonType } from "@/types/pokemon";
import { useRef, useEffect } from "react";

interface SearchFilterProps {
  types: PokemonType[];
  selectedType: string;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (term: string) => void;
}

export default function SearchFilter({
  types,
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}: SearchFilterProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <select
        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>

      <div className="relative flex-1">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search Pokémon... (Ctrl/⌘ + K)"
          className="w-full p-2 border rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
