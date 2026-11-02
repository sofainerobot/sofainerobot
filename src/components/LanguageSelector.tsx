"use client";

import { useState } from "react";
import { Globe, ChevronDown, Search } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "it", name: "Italian" },
  { code: "tr", name: "Turkish" },
] as const;

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLanguages = LANGUAGES.filter((language) =>
    language.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800 border border-gray-700 text-gray-300 hover:text-neon-cyan hover:bg-dark-700 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span>English</span>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 z-50 mt-2 w-64 bg-dark-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-3 border-b border-gray-700 bg-dark-800">
            <div className="relative">
              <Search
                className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search languages"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-dark-900 border border-gray-700 rounded-lg text-sm text-gray-200 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none placeholder:text-gray-600"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-dark-800 hover:text-neon-cyan transition-colors"
                >
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span>{language.name}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
