import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const socialLinks = {
  facebook: "https://www.facebook.com/profile.php?id=61583304695087",
  instagram: "https://www.instagram.com/interq.interview/",
  linkedin: "https://www.linkedin.com/company/inter-tech-lnc/?viewAsMember=true",
};

const team = [
  {
    name: "Saima Huma",
    role: "CEO & Founder",
    image: "/saima-huma-ceo.png",
    bio: "Visionary leader with over 15 years of experience in recruitment technology. Driving InterQ's mission to revolutionize hiring with fairness and AI.",
    quote: "Innovation is the key to unlocking potential.",
  },
  {
    name: "Sohana Akter",
    role: "Chief Operating Officer (COO)",
    image: "/sohana-akter.png",
    bio: "Operational strategist ensuring InterQ's vision becomes reality. Sohana optimizes workflows and drives organizational excellence across all departments.",
    quote: "Efficiency is doing things right.",
  },
  {
    name: "Muhammad Jalal",
    role: "Chief Information Officer (CIO)",
    image: "/muhammad-jalal.png",
    bio: "Driving digital transformation and information strategy. Muhammad ensures InterQ's infrastructure is secure, scalable, and ahead of the curve.",
    quote: "Information is the currency of the future.",
  },
  {
    name: "Abdul Qadir",
    role: "Director of Marketing and Technology Implementation",
    image: "/abdul-qadir.png",
    bio: "Expert in bridging the gap between innovative technology and market adoption. Abdul ensures seamless implementation of InterQ's solutions.",
    quote: "Technology is only as powerful as its execution.",
  },
  {
    name: "Atikur Rahman",
    role: "Director of Operations and Maintenance",
    image: "/atikur-rahman.png",
    bio: "Ensuring operational excellence and system reliability. Atikur oversees the maintenance and optimization of our physical and digital infrastructure.",
    quote: "Reliability is the foundation of trust.",
  },
];

const TeamSection = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-foreground tracking-tight">
            Meet the Team Behind InterQ
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            The talent, expertise, and passion driving our platform's success.
          </p>
        </motion.div>

        {/* Top row: 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
          {team.slice(0, 3).map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[43rem] mx-auto">
          {team.slice(3).map((member, index) => (
            <TeamCard key={member.name} member={member} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TeamCardProps {
  member: (typeof team)[number];
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true, margin: "-40px" }}
    className="group h-full"
  >
    <div className="h-full flex flex-col items-center text-center rounded-2xl bg-card border border-border/50 p-8 pt-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Circular portrait */}
      <div className="relative mb-6">
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden ring-[3px] ring-primary/15 ring-offset-4 ring-offset-card shadow-md group-hover:ring-primary/30 transition-all duration-200">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Info */}
      <h3 className="text-lg font-bold text-foreground tracking-tight mb-1">
        {member.name}
      </h3>
      <p className="text-primary font-semibold text-[11px] uppercase tracking-[0.15em] mb-4">
        {member.role}
      </p>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
        {member.bio}
      </p>

      <p className="italic text-xs text-muted-foreground/80 mb-4">
        "{member.quote}"
      </p>

      {/* Social */}
      <div className="flex gap-1.5">
        {[
          { href: socialLinks.facebook, icon: Facebook, label: "Facebook" },
          { href: socialLinks.instagram, icon: Instagram, label: "Instagram" },
          { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${label}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    </div>
  </motion.div>
);

export default TeamSection;
