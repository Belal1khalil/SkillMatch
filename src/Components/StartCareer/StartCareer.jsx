import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faArrowRight,
  faCheck,
  faUsers,
  faBriefcase,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function StartCareer() {
  const stats = [
    { icon: faUsers, value: "5K+", label: "Active Users" },
    { icon: faBriefcase, value: "10K+", label: "Job Listings" },
    { icon: faStar, value: "4.9", label: "User Rating" },
  ];

  const benefits = [
    "Personalized job matching",
    "Access to exclusive opportunities",
    "Career growth resources",
    "Professional networking",
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 right-1/4 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <FontAwesomeIcon icon={faRocket} className="text-sm" />
              <span className="text-sm font-semibold">Start Your Journey Today</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Ready to Transform
              <br />
              Your Career?
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
              Join SkillMatch today and unlock a world of opportunities tailored
              just for you. Start building your dream career now.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheck} className="text-xs" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/signup"
                className="group px-8 py-4 rounded-xl bg-white text-primary-600 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Now
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="text-sm group-hover:translate-x-1 transition-transform duration-300" 
                />
              </a>
              <a
                href="/learn-more"
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="relative hidden lg:block">
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-x-2"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon 
                        icon={stat.icon} 
                        className="text-2xl text-white"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-white/80">
                        {stat.label}
                      </p>
                    </div>

                    {/* Arrow */}
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}

              {/* Trust Badge */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">
                      Join 5,000+ professionals
                    </p>
                    <p className="text-white/80 text-sm">
                      Already transforming their careers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>

        </div>

        {/* Mobile Stats - Below Content */}
        <div className="lg:hidden mt-12 grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center"
            >
              <FontAwesomeIcon 
                icon={stat.icon} 
                className="text-2xl text-white mb-2"
              />
              <p className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-white/80 text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  );
}

