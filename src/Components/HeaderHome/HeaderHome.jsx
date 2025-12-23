import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBriefcase, faUsers, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function HeaderHome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-200 shadow-sm">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">🚀 Your Career Journey Starts Here</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Discover 
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Opportunities
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                That Match Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Skills
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              SkillMatch connects creative professionals with freelance jobs, courses, 
              and tools to elevate their careers. Start your journey today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Join Now
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="text-sm group-hover:translate-x-1 transition-transform duration-300" 
                />
              </a>
              <a
                href="/discover"
                className="px-8 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:border-primary-500 hover:text-primary-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Find Opportunities
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">5K+</p>
                <p className="text-sm text-gray-600">Professionals</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Companies</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              
              {/* Card 1 - Jobs */}
              <div className="absolute top-0 right-0 w-72 p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faBriefcase} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Freelance Jobs</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find projects that match your expertise and grow your portfolio.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm">
                  <span>Explore Jobs</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </div>
              </div>

              {/* Card 2 - Community */}
              <div className="absolute top-40 left-0 w-72 p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faUsers} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join Community</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Connect with professionals and expand your network globally.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
                  <span>Join Now</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </div>
              </div>

              {/* Card 3 - Courses */}
              <div className="absolute bottom-0 right-12 w-72 p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Learn & Grow</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Access courses and resources to enhance your skills continuously.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                  <span>Start Learning</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-40 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 opacity-20 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

