import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Info, ArrowRight, Zap, Globe, ShieldCheck, Mail } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams and startups",
      icon: Zap,
      features: [
        "Up to 50 assessments/month",
        "Basic MCQ tests",
        "5 AI video interviews",
        "Email support",
        "Basic analytics",
        "Standard security",
      ],
      color: "blue"
    },
    {
      name: "Professional",
      description: "For growing companies",
      popular: true,
      icon: Globe,
      features: [
        "Up to 200 assessments/month",
        "Advanced MCQ tests",
        "25 AI video interviews",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Fraud detection",
      ],
      color: "purple"
    },
    {
      name: "Organizational",
      description: "For large organizations",
      icon: ShieldCheck,
      features: [
        "Unlimited assessments",
        "All assessment types",
        "Unlimited AI interviews",
        "24/7 dedicated support",
        "Custom analytics",
        "White-labeling",
        "SSO & advanced security",
        "Custom integrations",
        "Dedicated account manager",
      ],
      color: "emerald"
    },
  ];

  const comparisonData = [
    { feature: "Assessments / Month", starter: "50", pro: "200", org: "Unlimited" },
    { feature: "AI Video Interviews", starter: "5", pro: "25", org: "Unlimited" },
    { feature: "Question Library", starter: "Basic", pro: "Full", org: "Full + Custom" },
    { feature: "API Access", starter: false, pro: true, org: true },
    { feature: "Custom Branding", starter: false, pro: true, org: true },
    { feature: "Dedicated Support", starter: false, pro: false, org: true },
    { feature: "SLA Guarantees", starter: false, pro: false, org: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Scale Your <span className="gradient-primary bg-clip-text text-transparent">Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium">
              Enterprise-grade hiring solutions tailored to your unique organizational structure. Compare our tiers below and connect with our team.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col bg-card border rounded-3xl p-10 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden glass-morphism ${plan.popular ? "border-primary/50 ring-2 ring-primary/10" : "border-border/40"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-[10px] font-black px-8 py-1 rotate-45 translate-x-[28%] translate-y-[100%] uppercase tracking-widest shadow-sm">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20`}>
                    <plan.icon className={`h-7 w-7 text-primary`} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">{plan.description}</p>

                  <div className="h-20 flex flex-col justify-end">
                    <div className="flex flex-col text-left">
                      <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Pricing Model</span>
                      <span className="text-4xl font-black tracking-tighter">Contact Sales</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 text-left">Key Inclusion Suite</div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground transition-colors text-left">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => window.location.href = '/get-started'}
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full h-14 text-sm font-black uppercase tracking-widest shadow-sm rounded-2xl ${plan.popular
                      ? "gradient-primary border-0 hover:shadow-glow-sm transition-all text-white"
                      : "border-primary/20 hover:bg-primary/5 text-primary"
                    }`}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Request Quote
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block mb-24"
          >
            <h2 className="text-4xl font-black tracking-tight text-center mb-12">Tier Architecture Comparison</h2>
            <div className="bg-card/50 backdrop-blur-xl border border-border/40 rounded-[2.5rem] overflow-hidden shadow-elegant">
              <Table>
                <TableHeader className="bg-secondary/30">
                  <TableRow className="border-border/40">
                    <TableHead className="w-[300px] text-xs font-black uppercase tracking-widest py-8 pl-10 text-muted-foreground">Functional Specifications</TableHead>
                    <TableHead className="text-center text-xs font-black uppercase tracking-widest text-foreground">Starter</TableHead>
                    <TableHead className="text-center text-xs font-black uppercase tracking-widest text-primary">Professional</TableHead>
                    <TableHead className="text-center text-xs font-black uppercase tracking-widest text-foreground">Organizational</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row) => (
                    <TableRow key={row.feature} className="hover:bg-primary/5 transition-colors border-border/20">
                      <TableCell className="font-bold py-6 pl-10 flex items-center gap-3 text-sm">
                        {row.feature}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-primary transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover border-border/40">
                              <p className="text-xs font-bold">Deep analytic support for {row.feature.toLowerCase()}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-center font-bold text-sm text-muted-foreground/80">
                        {typeof row.starter === 'boolean' ? (row.starter ? <Check className="mx-auto text-emerald-500" size={18} /> : "-") : row.starter}
                      </TableCell>
                      <TableCell className="text-center bg-primary/5 font-black text-sm text-primary">
                        {typeof row.pro === 'boolean' ? (row.pro ? <Check className="mx-auto text-emerald-500" size={18} /> : "-") : row.pro}
                      </TableCell>
                      <TableCell className="text-center font-bold text-sm text-muted-foreground/80">
                        {typeof row.org === 'boolean' ? (row.org ? <Check className="mx-auto text-emerald-500" size={18} /> : "-") : row.org}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto pb-20 text-left">
            <h2 className="text-4xl font-black tracking-tight text-center mb-12">Procurement Inquiries</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "How do custom enterprise quotas work?",
                  answer: "We analyze your historical hiring volume and growth projections to normalize a custom quota that prevents overages and stabilizes costs.",
                },
                {
                  question: "What constitutes a 'Cognitive Assessment'?",
                  answer: "A single interaction where a candidate engages with our AI expert or technical rubric. We provide detailed multi-modal feedback for every session.",
                },
                {
                  question: "Is platform white-labeling supported?",
                  answer: "Yes, our Enterprise tier supports full aesthetic customization, allowing you to wrap the candidate experience in your organizational brand system.",
                },
                {
                  question: "Security and Data Sovereignty?",
                  answer: "We utilize multi-region encryption protocols. Custom data residency configurations are available for our Tier-3 Organizational partners.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/30 transition-all shadow-sm group"
                >
                  <h3 className="text-sm font-black mb-3 flex items-center gap-3 tracking-tight">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-xs font-medium leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
