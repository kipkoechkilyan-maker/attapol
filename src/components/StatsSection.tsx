import { motion } from "framer-motion";

const stats = [
  { label: "Surveys Launched", value: "5,000" },
  { label: "Registered Users", value: "100,000" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center text-gradient-green mb-12"
        >
          Our Stats
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="gradient-card rounded-xl p-8 text-center border border-border shadow-card"
            >
              <p className="font-display text-4xl font-bold text-primary mb-2">{s.value}</p>
              <p className="text-muted-foreground text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
