"use client";

// Feature card definitions with emoji icons, titles, and subtext
const features = [
  {
    emoji: "⚡",
    title: "Lightning Fast",
    subtext: "Instant AI responses.",
  },
  {
    emoji: "🛡️",
    title: "Secure & Private",
    subtext: "Your data is safe.",
  },
  {
    emoji: "🤖",
    title: "AI-Powered",
    subtext: "Smart conversations.",
  },
  {
    emoji: "⏱️",
    title: "24/7 Available",
    subtext: "Always here for you.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mt-6 px-4 pb-6">
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Features
          </h2>
          <p className="text-gray-400 text-sm">
            Everything you need from a Telegram bot, wrapped in a sleek,
            intelligent experience.
          </p>
        </div>

        {/* 2x2 grid on mobile, 4-up on larger screens */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300"
            >
              <span className="text-2xl mb-2">{feature.emoji}</span>
              <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {feature.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
