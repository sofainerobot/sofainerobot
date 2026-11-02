"use client";

import { Send, MessageSquare, Bot } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  color: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Open Telegram",
    description: "Open the Sofaine Robot chat inside the Telegram app.",
    Icon: Send,
    color: "cyan",
  },
  {
    number: "2",
    title: "Send /start",
    description: "Send the /start command to wake up the bot and see the menu.",
    Icon: MessageSquare,
    color: "blue",
  },
  {
    number: "3",
    title: "Chat with AI",
    description: "Ask anything and get instant AI-powered replies right in chat.",
    Icon: Bot,
    color: "purple",
  },
];

const stepColors: Record<string, { bg: string; text: string; glow: string }> = {
  cyan: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
  },
  purple: {
    bg: "bg-purple-600/20",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-16 px-4 bg-[#0a0a0a]">
      {/* Cyan/purple glow decorations */}
      <div className="absolute top-[-12%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-12%] right-[-10%] w-[60%] h-[60%] bg-purple-600/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Section 1: Telegram chat mockup */}
        <div className="mb-16 max-w-md mx-auto">
          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="font-medium">Sofaine Robot</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs">online</span>
            </div>
          </div>

          {/* Glassmorphism chat container */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 shadow-2xl">
            {/* User bubble (right, cyan) */}
            <div className="flex justify-end mb-4">
              <div className="bg-cyan-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Can you write a Python script for me?
              </div>
            </div>

            {/* Bot bubble (left, dark gray) */}
            <div className="flex justify-start">
              <div className="bg-[#2a2a2a] border border-white/10 text-gray-300 text-sm px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[90%] shadow-lg">
                Of course! Here is the code you requested…
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 3-Step Guide */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-3">
            How it works
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Get started in seconds — no signup, no credit card. Just open Telegram
            and start chatting with Sofaine Robot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const { bg, text, glow } = stepColors[step.color];
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Glowing step number badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white font-bold ${bg} ${glow}`}>
                  {step.number}
                </div>

                {/* Glowing icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white ${bg} ${glow} group-hover:scale-110 transition-transform duration-300`}>
                  <step.Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
