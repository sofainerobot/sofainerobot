"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Edit,
  Trash2,
  Save,
  Plus,
  ChevronDown,
  ShieldCheck,
  Users,
  Globe,
  Settings,
  Lock,
  Monitor,
} from "lucide-react";

import {
  adminLogin,
  adminLogout,
  updateHeroSettings,
  upsertFaq,
  deleteFaq,
  upsertSocialLink,
  deleteSocialLink,
} from "@/lib/actions";
import type { FAQItem, SocialLink } from "@/lib/actions";

interface HeroSettings {
  title: string;
  description: string;
}

/**
 * Admin Dashboard (Client Component).
 *
 * Provides a tabbed interface to edit site content dynamically:
 *  - Hero section title & description
 *  - FAQ items (add / edit / delete)
 *  - Social media links (add / edit / delete)
 *
 * All writes go through Server Actions imported from "@/lib/actions".
 * After every successful mutation we call router.refresh() so the Server
 * Component that rendered this page re-fetches fresh data from the DB.
 */
export default function AdminDashboard({
  hero,
  faqs,
  socialLinks,
}: {
  hero: HeroSettings;
  faqs: FAQItem[];
  socialLinks: SocialLink[];
}) {
  const router = useRouter();

  /* ---------------------------------------------------------------- */
  /* UI state                                                         */
  /* ---------------------------------------------------------------- */
  const [activeTab, setActiveTab] = useState<"hero" | "faq" | "social">("hero");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* Local form state (mirrors the DB so edits show pre-filled values) */
  const [heroForm, setHeroForm] = useState({ title: hero.title, description: hero.description });
  const [faqForm, setFaqForm] = useState<Partial<FAQItem> & { id?: string }>({});
  const [socialForm, setSocialForm] = useState<Partial<SocialLink> & { id?: string }>({});

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
  const sortedSocials = [...socialLinks].sort((a, b) => a.platform.localeCompare(b.platform));

  /* Auto-clear messages after 5 seconds */
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);

  /* ---------------------------------------------------------------- */
  /* Helpers                                                          */
  /* ---------------------------------------------------------------- */
  const show = useCallback((type: "success" | "error", text: string) => {
    setMessage({ type, text });
  }, []);

  const clearForm = (kind: "faq" | "social") => {
    if (kind === "faq") setFaqForm({});
    else setSocialForm({});
  };

  /* ---------------------------------------------------------------- */
  /* Mutations                                                        */
  /* ---------------------------------------------------------------- */

  /* ---- Hero ---- */
  const handleHeroSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateHeroSettings(null, buildFormData(heroForm));
    setIsLoading(false);
    if (result?.error) {
      show("error", result.error);
    } else {
      show("success", "Hero section updated.");
      await router.refresh();
    }
  };

  /* ---- FAQ ---- */
  const handleFaqSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await upsertFaq(null, buildFormData(faqForm));
    setIsLoading(false);
    if (result?.error) {
      show("error", result.error);
    } else {
      show("success", faqForm.id ? "FAQ updated." : "FAQ added.");
      clearForm("faq");
      await router.refresh();
    }
  };

  const handleFaqDelete = async (id: string) => {
    if (!window.confirm("Delete this FAQ item?")) return;
    setIsLoading(true);
    const result = await deleteFaq(null, buildFormData({ id }));
    setIsLoading(false);
    if (result?.error) {
      show("error", result.error);
    } else {
      show("success", "FAQ deleted.");
      await router.refresh();
    }
  };

  const handleFaqEdit = (item: FAQItem) => {
    setFaqForm({ id: item.id, question: item.question, answer: item.answer, order: item.order });
    setActiveTab("faq");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---- Social ---- */
  const handleSocialSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await upsertSocialLink(null, buildFormData(socialForm));
    setIsLoading(false);
    if (result?.error) {
      show("error", result.error);
    } else {
      show("success", socialForm.id ? "Social link updated." : "Social link added.");
      clearForm("social");
      await router.refresh();
    }
  };

  const handleSocialDelete = async (id: string) => {
    if (!window.confirm("Remove this social link?")) return;
    setIsLoading(true);
    const result = await deleteSocialLink(null, buildFormData({ id }));
    setIsLoading(false);
    if (result?.error) {
      show("error", result.error);
    } else {
      show("success", "Social link deleted.");
      await router.refresh();
    }
  };

  const handleSocialEdit = (item: SocialLink) => {
    setSocialForm({ id: item.id, platform: item.platform, url: item.url, icon: item.icon });
    setActiveTab("social");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    await adminLogout();
  };

  /* Build a FormData object from a plain object (Server Actions read FormData) */
  function buildFormData(obj: Record<string, unknown>): FormData {
    const fd = new FormData();
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    }
    return fd;
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur border-b border-gray-700">
        <div className="container px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-dark-900" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-emerald">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
            >
              View site
            </a>
          </div>
        </div>
      </header>

      <div className="container px-6 py-10">
        {/* Message toast */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              message.type === "success"
                ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-300"
                : "bg-red-900/20 border-red-500/30 text-red-300"
            } flex items-center gap-3`}
          >
            {message.type === "success" ? (
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Lock className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-gray-800 pb-4">
          {[
            { key: "hero" as const, label: "Hero Section", icon: Monitor },
            { key: "faq" as const, label: "FAQs", icon: Users },
            { key: "social" as const, label: "Social Links", icon: Globe },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* ================= HERO TAB ================= */}
        {activeTab === "hero" && (
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="card p-8">
              <div className="flex items-center gap-2 mb-6">
                <Monitor className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-xl font-semibold">Hero Section</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Edit the main headline and sub-description shown on the homepage.
              </p>
              <form onSubmit={handleHeroSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Title
                  </label>
                  <input
                    name="title"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition-colors"
                    placeholder="@sofainerobot"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition-colors"
                    placeholder="Your AI-Powered Telegram Assistant..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Hero Settings
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Preview */}
            <div className="card p-8">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-xl font-semibold">Live Preview</h3>
              </div>
              <div className="bg-dark-800/50 p-8 rounded-2xl border border-gray-700 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 text-xs font-semibold mb-4">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  Online on Telegram
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-emerald">
                  {hero.title}
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {hero.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= FAQ TAB ================= */}
        {activeTab === "faq" && (
          <div className="lg:grid-cols-2 lg:gap-10 grid gap-6">
            <div className="lg:col-span-2 card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">FAQ Items</h3>
                </div>
                <button
                  onClick={() => {
                    setFaqForm({});
                    setActiveTab("faq");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" /> Add FAQ
                </button>
              </div>

              {sortedFaqs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No FAQ items yet. Add your first one below.
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="card border-gray-700 p-5"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-white">{faq.question}</p>
                          <p className="text-xs text-gray-500 mt-1">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFaqEdit(faq)}
                            className="p-2 text-gray-400 hover:text-neon-cyan transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleFaqDelete(faq.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="bg-gray-700 px-2 py-0.5 rounded">Order #{faq.order}</span>
                        <span className="flex items-center gap-1">
                          <ChevronDown className="w-3 h-3" /> drag to reorder (coming soon)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 card p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {faqForm.id ? "Edit FAQ" : "Add New FAQ"} <Plus className="w-4 h-4 text-neon-cyan" />
              </h3>
              <form onSubmit={handleFaqSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                      Question
                    </label>
                    <input
                      name="question"
                      value={faqForm.question ?? ""}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                      placeholder="What is Sofaine Robot?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                      Order
                    </label>
                    <input
                      name="order"
                      type="number"
                      value={faqForm.order ?? ""}
                      onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                      placeholder="1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Answer
                  </label>
                  <textarea
                    name="answer"
                    value={faqForm.answer ?? ""}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                    placeholder="Type the answer here..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {faqForm.id ? (
                      <>
                        <Save className="w-4 h-4" /> Update FAQ
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add FAQ
                      </>
                    )}
                  </button>
                  {faqForm.id && (
                    <button
                      type="button"
                      onClick={() => clearForm("faq")}
                      className="px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= SOCIAL TAB ================= */}
        {activeTab === "social" && (
          <div className="lg:grid-cols-2 lg:gap-10 grid gap-6">
            <div className="lg:col-span-2 card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">Social Media Links</h3>
                </div>
                <button
                  onClick={() => {
                    setSocialForm({});
                    setActiveTab("social");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Link
                </button>
              </div>

              {sortedSocials.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No social links yet. Add your first one below.
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedSocials.map((link) => (
                    <div key={link.id} className="card border-gray-700 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded flex items-center justify-center bg-gray-800 text-gray-300">
                            <span className="text-xs">{link.platform.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">{link.platform}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{link.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSocialEdit(link)}
                            className="p-2 text-gray-400 hover:text-neon-cyan transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSocialDelete(link.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 card p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {socialForm.id ? "Edit Social Link" : "Add New Link"} <Plus className="w-4 h-4 text-neon-cyan" />
              </h3>
              <form onSubmit={handleSocialSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Platform
                  </label>
                  <input
                    name="platform"
                    value={socialForm.platform ?? ""}
                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                    placeholder="e.g. Instagram"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    URL
                  </label>
                  <input
                    name="url"
                    value={socialForm.url ?? ""}
                    onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Icon (lucide name)
                  </label>
                  <input
                    name="icon"
                    value={socialForm.icon ?? ""}
                    onChange={(e) => setSocialForm({ ...socialForm, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-gray-600 text-white focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none"
                    placeholder="e.g. Instagram, X, Youtube, Send"
                    title="Must match a lucide-react icon name (e.g. Instagram, Facebook, Tiktok, Youtube, X, Send)"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {socialForm.id ? (
                      <>
                        <Save className="w-4 h-4" /> Update Link
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add Link
                      </>
                    )}
                  </button>
                  {socialForm.id && (
                    <button
                      type="button"
                      onClick={() => clearForm("social")}
                      className="px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-800 bg-dark-900/50 mt-12 pt-8 pb-4">
        <div className="container px-6 text-center text-xs text-gray-600">
          Sofaine Robot Admin Panel — protected by middleware. Changes are saved to
          data/db.json and reflected on the live site instantly.
        </div>
      </footer>
    </div>
  );
}
