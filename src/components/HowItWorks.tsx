import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "Sign Up", desc: "Join for free in under 2 minutes." },
  { num: "2", title: "Complete Profile", desc: "Fill out your profile to unlock surveys." },
  { num: "3", title: "Take Surveys", desc: "Earn points by sharing your opinions." },
  { num: "4", title: "Cash Out", desc: "Withdraw instantly via M-Pesa with no minimum threshold." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center text-gradient-green mb-14"
        >
          How It Works
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="gradient-card rounded-xl p-6 text-center border border-border"
            >
              <div className="gradient-green h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-xl font-bold text-primary-foreground">{s.num}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
