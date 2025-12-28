import logo from "../../assets/imgs/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src={logo} 
                  className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110" 
                  alt="SkillMatch Logo" 
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                SkillMatch
              </h1>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              Connecting creative professionals with freelance jobs, courses,
              and tools to elevate their careers.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {[
                { 
                  icon: faFacebookF, 
                  href: "https://www.facebook.com/belal.khalil.235235/", 
                  label: "Facebook" 
                },
                { 
                  icon: faLinkedinIn, 
                  href: "https://www.linkedin.com/in/belal-5halil", 
                  label: "LinkedIn" 
                },
                { 
                  icon: faGithub, 
                  href: "https://github.com/Belal1khalil", 
                  label: "GitHub" 
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-600 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-600 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Blog", "Newsletter", "Events", "Community"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-600 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get the latest updates and opportunities.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-primary-400 focus:shadow-lg transition-all duration-300 text-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} <span className="font-semibold text-primary-600">SkillMatch</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                Sitemap
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                Accessibility
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

