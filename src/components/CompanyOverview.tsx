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
    <section ref={ref} className="py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            About Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">InterQ Technologies Inc.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Leading the transformation of recruitment through innovative AI technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full mb-8 space-y-4">
            {[
              {
                value: "products",
                title: "InterQ Products",
                content: "InterQ designs and delivers intelligent digital solutions that help businesses operate smarter and scale faster. Our product offerings include data-driven platforms, workflow automation tools, analytics dashboards, and custom technology solutions tailored to modern business needs. Each product is built with performance, scalability, and user experience at its core.",
              },
              {
                value: "industries",
                title: "Industries We Serve",
                content: "We serve startups, growing organizational hiring teams, and established organizations across multiple industries including technology, finance, retail, and professional services. InterQ partners with forward-thinking teams that value innovation, efficiency, and long-term digital growth.",
              },
              {
                value: "values",
                title: "Our Core Values",
                content: null,
                customContent: (
                  <div className="space-y-5">
                    {[
                      { name: "Integrity", desc: "We operate with honesty, transparency, and accountability, building trust with our clients, partners, and team members." },
                      { name: "Innovation", desc: "We embrace creativity and continuous improvement, always seeking better ways to solve problems and deliver value." },
                      { name: "Collaboration", desc: "We believe the best results come from working together—across teams, with clients, and through open communication." },
                    ].map((v) => (
                      <div key={v.name}>
                        <h4 className="font-semibold text-foreground mb-1.5">{v.name}</h4>
                        <p className="text-muted-foreground">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                value: "team",
                title: "Meet the Team",
                content: "Our team is made up of passionate strategists, designers, engineers, and problem-solvers who share a common goal: delivering exceptional digital solutions. At InterQ, we value diversity of thought, continuous learning, and collaboration. Every team member brings unique expertise and a commitment to excellence in everything they do.",
              },
              {
                value: "ceo",
                title: "Message from the CEO",
                content: null,
                customContent: (
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="team-member-image-wrapper relative">
                      <div className="team-image-container w-full h-full relative group">
                        <img src="/saima-huma-ceo.png" alt="Saima Huma, CEO" className="team-image" loading="eager" decoding="async" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                        At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together.
                      </p>
                      <div className="font-bold text-primary text-lg">— Saima Huma</div>
                      <div className="text-sm text-muted-foreground font-medium">CEO, InterQ Technologies Inc.</div>
                    </div>
                  </div>
                ),
              },
            ].map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="bg-card border border-border/50 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 px-8 text-foreground">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8 px-8">
                  {item.customContent || item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Our Values Section */}
          <div className="mb-8 p-8 bg-card border border-border/50 rounded-2xl shadow-soft">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Our Values</h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {[
                { value: "innovation", title: "Innovation", desc: "We continuously explore new ideas, technologies, and approaches to deliver smarter and more effective solutions. Innovation drives everything we build." },
                { value: "integrity", title: "Integrity", desc: "We operate with honesty, transparency, and accountability, building trust with our clients, partners, and team members." },
                { value: "collaboration", title: "Collaboration", desc: "We believe the best results come from working together—across teams, with clients, and through open communication." },
                { value: "excellence", title: "Excellence", desc: "We are committed to delivering the highest quality in everything we do, from our products to our partnerships." },
              ].map((v, i) => (
                <AccordionItem key={v.value} value={v.value} className={i < 3 ? "border-b border-border" : "border-none"}>
                  <AccordionTrigger className="text-base font-medium hover:no-underline text-foreground">{v.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-4">{v.desc}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Team and CEO duplicates — using glass-card */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="team" className="glass-card px-8 border border-border/30 rounded-2xl">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Meet the Team</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8">
                Our team is made up of passionate strategists, designers, engineers, and problem-solvers who share a common goal: delivering exceptional digital solutions. At InterQ, we value diversity of thought, continuous learning, and collaboration. Every team member brings unique expertise and a commitment to excellence in everything they do.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceo" className="glass-card px-8 border border-border/30 rounded-2xl">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Message from the CEO</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="team-member-image-wrapper relative">
                    <div className="team-image-container w-full h-full relative group">
                      <img src="/saima-huma-ceo.png" alt="Saima Huma, CEO" className="team-image" loading="eager" decoding="async" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                      At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together.
                    </p>
                    <div className="font-bold text-primary text-lg">— Saima Huma</div>
                    <div className="text-sm text-muted-foreground font-medium">CEO, InterQ Technologies Inc.</div>
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
