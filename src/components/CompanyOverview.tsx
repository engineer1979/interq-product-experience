import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CompanyOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">InterQ Enterprise Inc</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Leading the transformation of recruitment through innovative AI technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Main Sections */}
          <Accordion type="single" collapsible className="w-full mb-8 space-y-4">
            <AccordionItem value="products" className="glass-card px-6 border border-white/10 rounded-xl">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">Our Products</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                InterQ designs and delivers intelligent digital solutions that help businesses operate smarter and scale faster. Our product offerings include data-driven platforms, workflow automation tools, analytics dashboards, and custom technology solutions tailored to modern business needs. Each product is built with performance, scalability, and user experience at its core.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-we-serve" className="glass-card px-6 border border-white/10 rounded-xl">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">Who We Serve</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                We serve startups, growing enterprises, and established organizations across multiple industries including technology, finance, retail, and professional services. InterQ partners with forward-thinking teams that value innovation, efficiency, and long-term digital growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about" className="glass-card px-6 border border-white/10 rounded-xl">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">About InterQ</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                InterQ is a technology-driven company focused on transforming ideas into impactful digital experiences. We combine strategy, design, and engineering to help organizations solve complex problems and unlock new opportunities. At InterQ, we believe in building solutions that are not just functional, but meaningful and future-ready.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Our Values Section */}
          <div className="mb-8 p-6 glass-card border border-white/10 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Our Values</h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="innovation" className="border-b border-white/5">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">Innovation</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4">
                  We continuously explore new ideas, technologies, and approaches to deliver smarter and more effective solutions. Innovation drives everything we build.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrity" className="border-b border-white/5">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">Integrity</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4">
                  We operate with honesty, transparency, and accountability, building trust with our clients, partners, and team members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="collaboration" className="border-b border-white/5">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">Collaboration</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4">
                  We believe the best results come from working together—across teams, with clients, and through open communication.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="excellence" className="border-none">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">Excellence</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-4">
                  We are committed to high standards in everything we do, from strategy and design to development and delivery.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Team and CEO Section */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="team" className="glass-card px-6 border border-white/10 rounded-xl">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">Meet the Team</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                Our team is made up of passionate strategists, designers, engineers, and problem-solvers who share a common goal: delivering exceptional digital solutions. At InterQ, we value diversity of thought, continuous learning, and collaboration. Every team member brings unique expertise and a commitment to excellence in everything they do.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceo" className="glass-card px-6 border border-white/10 rounded-xl">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">Message from the CEO</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src="/saima-huma-ceo.png"
                      alt="Saima Huma, CEO"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="mb-4">
                      At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together.
                    </p>
                    <div className="font-semibold text-primary">
                      — Saima Huma
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CEO, InterQ Technologies Incorporation
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverview;
