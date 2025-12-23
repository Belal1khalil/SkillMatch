import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faRocket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeWorks() {
  const steps = [
    {
      number: "01",
      icon: faUserPlus,
      title: "Create Your Profile",
      description:
        "Showcase your skills, experience, and portfolio to attract the right opportunities and stand out from the crowd.",
      gradient: "from-primary-500 to-primary-600",
      iconBg: "from-primary-100 to-primary-200",
    },
    {
      number: "02",
      icon: faSearch,
      title: "Discover Opportunities",
      description:
        "Browse personalized job listings, courses, and tools matched to your unique profile and career goals.",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "from-purple-100 to-purple-200",
    },
    {
      number: "03",
      icon: faRocket,
      title: "Grow & Succeed",
      description:
        "Apply with confidence, collaborate with professionals, and achieve your career goals faster than ever.",
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "from-emerald-100 to-emerald-200",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-4">
            <span className="text-sm font-semibold text-primary-600">
              🚀 How It Works
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Get Started in
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of creative professionals who have transformed their
            careers with SkillMatch.
          </p>
        </div>

        {/* Steps - Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-purple-200 to-emerald-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Number Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      {/* Arrow (except last step) */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -right-12 top-6">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-3xl text-gray-300 group-hover:text-primary-400 transition-colors duration-300"
                          />
                        </div>
                      )}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center`}
                    >
                      <FontAwesomeIcon
                        icon={step.icon}
                        className={`text-2xl bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile/Tablet Vertical */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-purple-200 to-emerald-200 -mb-8"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex gap-6">
                  {/* Number Badge */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Icon */}
                    <div
                      className={`inline-flex w-12 h-12 rounded-lg bg-gradient-to-br ${step.iconBg} items-center justify-center`}
                    >
                      <FontAwesomeIcon
                        icon={step.icon}
                        className={`text-xl bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105"
          >
            Start Your Journey
            <FontAwesomeIcon icon={faRocket} className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}

