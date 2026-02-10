import { motion } from "framer-motion";
import { TrendingUp, Coins, Trophy } from "lucide-react";

const items = [
  { icon: TrendingUp, title: "Earn Ksh 500-3,000 Daily", desc: "Complete surveys and earn rewards from anywhere." },
  { icon: Coins, title: "Per Survey: Ksh 50-500", desc: "Each survey pays based on length and complexity." },
  { icon: Trophy, title: "Success Stories", desc: "Michael from Nairobi earns Ksh 25,000 monthly, Susan from Nakuru earns Ksh 2,500 daily, David from Mombasa withdrew Ksh 80,000 in 3 months." },
];

const EarningsPotential = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center text-gradient-green mb-14"
        >
          Earnings Potential
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-xl p-6 border border-border hover:shadow-green transition-shadow"
            >
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EarningsPotential;
