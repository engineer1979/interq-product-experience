import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";

const team = [
  {
    name: "Saima Huma",
    role: "CEO & Founder",
    image: "/saima-huma-ceo.png",
    bio: "Visionary leader with over 15 years of experience in recruitment technology. Driving InterQ's mission to revolutionize hiring with fairness and AI.",
    quote: "Innovation is the key to unlocking potential.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sohana Akter",
    role: "Chief Operating Officer (COO)",
    image: "/sohana-akter.png",
    bio: "Operational strategist ensuring InterQ's vision becomes reality. Sohana optimizes workflows and drives organizational excellence across all departments.",
    quote: "Efficiency is doing things right.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Muhammad Jalal",
    role: "Chief Information Officer (CIO)",
    image: "/muhammad-jalal.png",
    bio: "Driving digital transformation and information strategy. Muhammad ensures InterQ's infrastructure is secure, scalable, and ahead of the curve.",
    quote: "Information is the currency of the future.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Abdul Qadir",
    role: "Director of Marketing and Technology Implementation",
    image: "/abdul-qadir.png",
    bio: "Expert in bridging the gap between innovative technology and market adoption. Abdul ensures seamless implementation of InterQ's solutions.",
    quote: "Technology is only as powerful as its execution.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Atikur Rahman",
    role: "Director of Operations and Maintenance",
    image: "/atikur-rahman.png",
    bio: "Ensuring operational excellence and system reliability. Atikur oversees the maintenance and optimization of our physical and digital infrastructure.",
    quote: "Reliability is the foundation of trust.",
    socials: { linkedin: "#" },
  },
];

const TeamSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Meet the Team Behind InterQ
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The talent, expertise, and passion driving our platform's success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
              whileHover={{ y: -5 }}
            >
              <Card className="team-member-card h-full shadow-soft hover:shadow-elegant transition-all duration-300 flex flex-col items-center text-center p-8 border-border/50 bg-card">
                <div className="team-member-image-wrapper relative">
                  <div className="team-image-container w-full h-full relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col w-full">
                  <h3 className="text-xl font-bold mb-1 text-foreground tracking-tight">{member.name}</h3>
                  <p className="text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
                    {member.role}
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {member.bio}
                  </p>

                  <div className="mt-auto pt-3 flex flex-col items-center gap-3">
                    <p className="italic text-sm text-muted-foreground font-medium leading-relaxed">"{member.quote}"</p>

                    <div className="flex gap-2">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
