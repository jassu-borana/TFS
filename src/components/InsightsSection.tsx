"use client";

import { motion } from "framer-motion";

type Insight = {
  number: string;
  headline: string;
  quote: string;
};

const INSIGHTS: Insight[] = [
  {
    number: "01",
    headline: "Start Before You're Ready",
    quote:
      "The founders who win aren't the ones who had the perfect plan. They're the ones who started, adapted, and refused to quit.",
  },
  {
    number: "02",
    headline: "Your Network Is Your Net Worth",
    quote:
      "Every breakthrough funding round, critical hire, or game-changing partnership traced back to a relationship. Build people, not just products.",
  },
  {
    number: "03",
    headline: "Failure Is the Curriculum",
    quote:
      "No MBA teaches what a failed launch does. Embrace the lessons embedded in every setback — they are your competitive moat.",
  },
  {
    number: "04",
    headline: "Growth Over Comfort",
    quote:
      "Scaling a company is personal growth in disguise. You'll be forced to confront your weaknesses, and that's exactly where the magic happens.",
  },
];

function InsightCard({ item }: { item: Insight }) {
  return (
    <div className="flex gap-5 items-start">
      <span className="font-bebas text-7xl md:text-8xl text-white/10 leading-none select-none shrink-0 w-20">
        {item.number}
      </span>

      <div>
        <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-white mb-4">
          {item.headline}
        </h3>

        <p className="text-white/60 text-lg leading-relaxed max-w-xl">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function InsightsSection() {
  return (
    <section className="bg-brand-dark py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto relative z-30">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-brand-accent/70 uppercase mb-3">
            Wisdom
          </p>

          <h2 className="font-bebas text-7xl sm:text-8xl leading-none tracking-wide text-white">
            FOUNDER<br />INSIGHTS
          </h2>
        </motion.div>

        {/* Rows */}
        <div className="space-y-20">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="border-t border-white/10 pt-10"
            >
              <InsightCard item={item} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}