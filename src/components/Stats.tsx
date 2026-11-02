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
    <section className="mt-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around items-center gap-6 md:gap-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
          {stats.map((stat, index) => (
            <div
              key={stat.number}
              className="text-center flex flex-col items-center gap-1.5"
            >
              <span
                className={`text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent ${stat.gradient}`}
              >
                {stat.number}
              </span>
              <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
