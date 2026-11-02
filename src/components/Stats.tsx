"use client";

type Stat = {
  number: string;
  label: string;
  gradient: string;
};

// Trust-building stats shown as a glassmorphism bar right below the Hero buttons
const stats: Stat[] = [
  {
    number: "10K+",
    label: "Active Users",
    gradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
  },
  {
    number: "24/7",
    label: "Always Online",
    gradient: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
  },
  {
    number: "99.9%",
    label: "Uptime",
    gradient: "bg-gradient-to-r from-emerald-400 to-teal-400",
  },
];

export default function Stats() {
  return (
    <section className="mt-6 px-4">
      <div className="container mx-auto">
        {/* 3 stats stay on ONE line on mobile via grid-cols-3 with compact text sizes */}
        <div
          className="grid grid-cols-3 gap-2 md:gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-3 md:p-6 shadow-2xl hover:border-cyan-500/30 transition-all duration-300"
        >
          {stats.map((stat) => (
            <div key={stat.number} className="text-center flex flex-col items-center gap-1">
              <span
                className={`text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent leading-none ${stat.gradient}`}
              >
                {stat.number}
              </span>
              <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
