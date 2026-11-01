import { ArrowRight, Bot, Sparkles } from "lucide-react";

// 3-step guide data
const steps = [
  {
    number: "01",
    title: "Click the Link",
    description: "Open the Telegram bot link in your browser or app.",
    icon: ArrowRight,
  },
  {
    number: "02",
    title: "Press Start",
    description: "Tap the /start button to activate the bot.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Chat Away",
    description: "Send a message and let @sofainerobot respond.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Getting started with Sofainerobot takes just a few seconds.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left: numbered steps */}
          <div className="lg:w-1/2 animate-slide-up">
            <div className="relative -space-y-1">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 mb-12 group">
                  {/* Step number circle */}
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-neon-cyan font-bold text-lg flex-shrink-0 transition-all duration-300 group-hover:bg-neon-cyan group-hover:text-dark-900 group-hover:scale-110">
                    {step.number}
                  </div>
                  <div className="flex-1 relative">
                    {/* Connector line between steps */}
                    <div className="absolute -left-2 top-3 w-0.5 h-6 bg-gray-700" />
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bot preview card */}
          <div className="lg:w-1/2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-neon-cyan/10 rounded-3xl blur-[100px] transition-all duration-500 group-hover:bg-neon-cyan/20" />
              <div className="relative bg-dark-800/50 border border-gray-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                <Bot className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Start Chatting</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Ready to meet @sofainerobot? Click below to open the bot in
                  Telegram.
                </p>
                <a
                  href="https://t.me/sofainerobot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Open Bot <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
