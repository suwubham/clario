import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const team = [
  { name: "Alex Chen", title: "Product Lead", bio: "Former meditation app founder. Believes technology should quiet the mind, not clutter it." },
  { name: "Priya Desai", title: "AI Engineer", bio: "NLP researcher turned builder. Specializes in empathetic language models and sentiment analysis." },
  { name: "Mateo Rossi", title: "Frontend Developer", bio: "Obsessed with micro-interactions and accessibility. Every pixel should feel intentional." },
  { name: "Lina Kapoor", title: "UX/UI Designer", bio: "Trained in cognitive psychology. Designs interfaces that feel like conversations, not forms." },
  { name: "Jamal Thompson", title: "Backend Developer", bio: "Security-first engineer. Ensures your most intimate reflections remain yours alone." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain-overlay" />
      <Navbar />

      {/* Mission */}
      <section className="pt-32 pb-16 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-6">
            Our Mission
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-light text-foreground mb-8 text-balance leading-tight">
            Improving mental clarity through{" "}
            <span className="italic text-primary">AI-guided reflection</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            We believe self-understanding shouldn't require a therapist's schedule or a writer's discipline. 
            Clario meets you where you are — your voice, your pace, your truth.
          </motion.p>
        </motion.div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-light text-center mb-14"
          >
            The people behind <span className="italic">Clario</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <span className="font-display text-lg font-semibold text-primary">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-xs uppercase tracking-widest text-accent mt-1 mb-3">{member.title}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-4">Our Approach</p>
            <h2 className="font-display text-3xl font-light text-foreground mb-8">
              Built with <span className="italic">care</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { label: "Voice AI", desc: "On-device speech processing with cloud-based NLP for nuanced emotional analysis." },
                { label: "Privacy First", desc: "End-to-end encryption. Your reflections are processed but never stored in readable form." },
                { label: "Adaptive Learning", desc: "Clario's insights evolve with you, recognizing recurring themes and growth over time." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-background border border-border/30">
                  <h4 className="font-body text-sm font-semibold text-foreground mb-2">{item.label}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
