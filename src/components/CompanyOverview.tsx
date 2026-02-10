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
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Clean background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-white to-slate-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-50 to-white rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">InterQ Technologies Inc.</span>
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
          {/* Main Sections */}
          <Accordion type="single" collapsible className="w-full mb-8 space-y-6">
            <AccordionItem value="products" className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6 px-8 text-slate-800">InterQ Products</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                InterQ designs and delivers intelligent digital solutions that help businesses operate smarter and scale faster. Our product offerings include data-driven platforms, workflow automation tools, analytics dashboards, and custom technology solutions tailored to modern business needs. Each product is built with performance, scalability, and user experience at its core.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="industries" className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6 px-8 text-slate-800">Industries We Serve</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                We serve startups, growing organizational hiring teams, and established organizations across multiple industries including technology, finance, retail, and professional services. InterQ partners with forward-thinking teams that value innovation, efficiency, and long-term digital growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="values" className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6 px-8 text-slate-800">Our Core Values</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Integrity</h4>
                    <p>We operate with honesty, transparency, and accountability, building trust with our clients, partners, and team members.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Innovation</h4>
                    <p>We embrace creativity and continuous improvement, always seeking better ways to solve problems and deliver value.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Collaboration</h4>
                    <p>We believe the best results come from working together—across teams, with clients, and through open communication.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="team" className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6 px-8 text-slate-800">Meet the Team</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                Our team is made up of passionate strategists, designers, engineers, and problem-solvers who share a common goal: delivering exceptional digital solutions. At InterQ, we value diversity of thought, continuous learning, and collaboration. Every team member brings unique expertise and a commitment to excellence in everything they do.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceo" className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6 px-8 text-slate-800">Message from the CEO</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="team-member-image-wrapper relative">
                    <div className="team-image-container w-full h-full relative group">
                      <img
                        src="/saima-huma-ceo.png"
                        alt="Saima Huma, CEO"
                        className="team-image w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.classList.remove('team-image');
                          target.classList.add('team-image-cover');
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-6 text-base leading-relaxed text-slate-700">
                      At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together.
                    </p>
                    <div className="font-bold text-primary text-lg">
                      — Saima Huma
                    </div>
                    <div className="text-base text-slate-500 font-medium">
                      CEO, InterQ Technologies Inc.
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Our Values Section */}
          <div className="mb-8 p-6 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">Our Values</h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="innovation" className="border-b border-slate-200">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-slate-800">Innovation</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base pb-4">
                  We continuously explore new ideas, technologies, and approaches to deliver smarter and more effective solutions. Innovation drives everything we build.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrity" className="border-b border-slate-200">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-slate-800">Integrity</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base pb-4">
                  We operate with honesty, transparency, and accountability, building trust with our clients, partners, and team members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="collaboration" className="border-b border-slate-200">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-slate-800">Collaboration</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base pb-4">
                  We believe the best results come from working together—across teams, with clients, and through open communication.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="excellence" className="border-none">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-slate-800">Excellence</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base pb-4">
                  We are committed to delivering the highest quality in everything we do, from our products to our partnerships.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Team and CEO Section */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="team" className="glass-card px-8 border border-white/10 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-card/50 to-card/30">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">Meet the Team</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8">
                Our team is made up of passionate strategists, designers, engineers, and problem-solvers who share a common goal: delivering exceptional digital solutions. At InterQ, we value diversity of thought, continuous learning, and collaboration. Every team member brings unique expertise and a commitment to excellence in everything they do.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceo" className="glass-card px-8 border border-white/10 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-card/50 to-card/30">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">Message from the CEO</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8 px-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="team-member-image-wrapper relative">
                    <div className="team-image-container w-full h-full relative group">
                      <img
                        src="/saima-huma-ceo.png"
                        alt="Saima Huma, CEO"
                        className="team-image w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.classList.remove('team-image');
                          target.classList.add('team-image-cover');
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-6 text-base leading-relaxed text-slate-700">
                      At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together.
                    </p>
                    <div className="font-bold text-primary text-lg">
                      — Saima Huma
                    </div>
                    <div className="text-base text-slate-500 font-medium">
                      CEO, InterQ Technologies Inc.
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
