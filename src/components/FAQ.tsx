"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

/**
 * FAQ section (الأسئلة الشائعة).
 *
 * Interactive accordion built with client state. Data is passed in as props
 * (fetched from the database in page.tsx) so the admin can edit Q&As live.
 */
export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isOpen = (id: string) => openId === id;

  if (sortedFaqs.length === 0) {
    return (
      <section id="faq" className="py-20 md:py-32 px-4">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 headline-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">No FAQs yet. Add some from the admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 md:py-32 px-4 bg-dark-800/30">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-neon-cyan" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight headline-gradient">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question? Here are the most common ones. Want to add or edit
            one? Use the Admin Panel.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {sortedFaqs.map((faq) => (
            <div
              key={faq.id}
              className="card border-gray-700 hover:border-neon-cyan/50 transition-all duration-300"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                aria-expanded={isOpen(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-neon-cyan/80">
                    Q{sortedFaqs.indexOf(faq) + 1}
                  </span>
                  <span className="font-semibold text-white">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen(faq.id) ? "rotate-180" : ""
                  } text-gray-400`}
                />
              </button>

              {/* Collapsible answer */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen(faq.id)
                    ? "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
