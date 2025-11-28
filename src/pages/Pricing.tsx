import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams and startups",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Up to 50 assessments/month",
        "Basic MCQ tests",
        "5 AI video interviews",
        "Email support",
        "Basic analytics",
        "Standard security",
      ],
    },
    {
      name: "Professional",
      description: "For growing companies",
      monthlyPrice: 299,
      annualPrice: 2990,
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
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 799,
      annualPrice: 7990,
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
    },
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = ((monthlyCost - annual) / monthlyCost * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, <span className="gradient-primary bg-clip-text text-transparent">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your hiring needs. All plans include core features with no hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-muted rounded-full p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full transition-smooth ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full transition-smooth ${
                  billingCycle === "annual"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Annual <span className="text-xs ml-1">(Save up to 17%)</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-card border rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-smooth ${
                  plan.popular ? "border-primary" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="text-sm text-primary mt-2">
                      Save {calculateSavings(plan.monthlyPrice, plan.annualPrice)}% annually
                    </p>
                  )}
                </div>

                <Button
                  className={`w-full mb-6 ${plan.popular ? "" : "variant-outline"}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans later?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise plans.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes! All plans include a 14-day free trial with full access to all features.",
                },
                {
                  question: "Do you offer discounts for annual billing?",
                  answer: "Yes! Save up to 17% when you choose annual billing on any plan.",
                },
              ].map((faq) => (
                <div key={faq.question} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
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
