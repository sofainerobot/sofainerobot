"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Globe, ChevronDown, Search } from "lucide-react";
import { locales } from "@/i18n";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "fa", name: "Persian (Farsi)", flag: "🇮🇷" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇮🇳" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
] as const;

export default function LanguageSelector() {
  const t = useTranslations("common");
  const router = useRouter();
  // Current locale provided by NextIntlClientProvider in the [locale] layout.
  const currentLocale = useLocale() || "en";
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    LANGUAGES.find((language) => language.code === currentLocale) ||
      LANGUAGES[0]
  );

  const filteredLanguages = LANGUAGES.filter(
    (language) =>
      language.name.toLowerCase().includes(search.toLowerCase()) ||
      language.code.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * Navigate to the selected locale route (e.g. `/ar` or `/fr`).
   * The next-intl middleware + `[locale]` route render the localized page,
   * and the NEXT_LOCALE cookie is refreshed on the next server request.
   */
  const handleSelect = (language: Language) => {
    router.push(`/${language.code}`);
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1b26] border border-white/10 text-white hover:bg-white/5 transition-all duration-300"
        aria-label={t("language")}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-sm font-medium">
          {selectedLanguage.flag} {selectedLanguage.name}
        </span>
        <ChevronDown className="w-4 h-4 ml-auto text-white/70" />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 z-50 mt-2 w-full sm:w-64 max-w-[340px] bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden"
        >
          <div className="p-3 border-b border-white/10 bg-[#1a1b26]/80 backdrop-blur">
            <div className="relative">
              <Search
                className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder={t("searchLanguages")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-transparent border-none rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleSelect(language)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-white/50">
                {t("noLanguagesFound")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
