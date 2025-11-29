"use client";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      icon: Zap,
      features: [
        "Process up to 5 files",
        "All AI modes",
        "Basic support",
        "50MB file size limit",
      ],
      color: "slate",
      gradient: "from-slate-500 to-slate-400",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "per month",
      icon: Sparkles,
      features: [
        "Process up to 20 files",
        "All AI modes",
        "Priority support",
        "200MB file size limit",
        "Save history for 90 days",
        "Export results",
      ],
      color: "teal",
      gradient: "from-teal-500 to-cyan-400",
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      period: "per month",
      icon: Crown,
      features: [
        "Unlimited files",
        "All AI modes",
        "Premium support",
        "Unlimited file size",
        "Unlimited history",
        "Export results",
        "API access",
        "Team collaboration",
      ],
      color: "purple",
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Choose Your Plan
        </h1>
        <p className="text-slate-400">
          Upgrade to unlock more features and processing power
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative grid auto-cols-auto bg-slate-800/30 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all duration-300 ${
                isCurrentPlan
                  ? "border-teal-400 shadow-lg shadow-teal-500/20"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute top-4 right-4">
                  <div className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Current</span>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-2">
                  / {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => setCurrentPlan(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isCurrentPlan
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : plan.id === "free"
                    ? "bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10"
                    : "bg-gradient-to-r from-teal-400 to-cyan-300 text-slate-900 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:scale-105"
                }`}
              >
                {isCurrentPlan
                  ? "Current Plan"
                  : plan.id === "free"
                  ? "Downgrade"
                  : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Billing Info */}
      {currentPlan !== "free" && (
        <div className="mt-8 bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Next Billing Date
              </h3>
              <p className="text-slate-400 text-sm">December 29, 2025</p>
            </div>
            <button className="px-6 py-2 bg-red-500/20 border-2 border-red-500/50 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all">
              Cancel Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
