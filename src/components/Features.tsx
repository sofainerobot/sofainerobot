import { Zap, Clock, Shield, Brain } from "lucide-react";

// Feature card definitions with icons, titles, descriptions, and accent colors
const features = [
  {
    icon: Zap,
    title: "Fast Responses",
    description: "Lightning-fast replies powered by optimized AI models.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "The bot never sleeps. Chat anytime, day or night.",
    color: "text-neon-emerald",
    bg: "bg-neon-emerald/10",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are protected and kept confidential.",
    color: "text-neon-purple",
    bg: "bg-neon-purple/10",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced AI that understands and responds intelligently.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 bg-dark-800/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose @sofainerobot?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need from a Telegram bot, wrapped in a sleek,
            intelligent experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="card group">
              <div className={`${feature.bg} ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-neon-cyan transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
