import { ChevronDown, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { name: "Blog", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Product Hunt", href: "#" },
  { name: "Contact", href: "#" },
];

const footerLinksTwo = [
  { name: "Developers", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Press Kit", href: "#" },
];

const footerLinksThree = [
  { name: "Tutorials & Manuals", href: "#" },
  { name: "Mobile App Tutorials", href: "#" },
  { name: "Web App Tutorials", href: "#" },
  { name: "Frequently Asked Questions", href: "#" },
  { name: "Support", href: "#" },
];

const LanguageSelect = () => (
  <div className="relative inline-flex items-center">
    <select className="appearance-none text-white py-2.5 px-5 pr-9 rounded-md outline-none bg-white/10 border border-white/10 text-sm cursor-pointer hover:bg-white/15 transition-colors">
      <option value="en" className="bg-[#15181a] text-white">English</option>
      <option value="es" className="bg-[#15181a] text-white">Spanish</option>
      <option value="fr" className="bg-[#15181a] text-white">French</option>
    </select>
    <ChevronDown className="pointer-events-none absolute right-2.5 text-white/60" size={15} />
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#15181a] py-12">
      <div className="w-full max-w-5xl mx-auto px-8">
        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {footerLinksTwo.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {footerLinksThree.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + copyright + legal */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Fin<span className="text-emerald-500">lytics</span>
              </span>
            </div>
            <p className="text-gray-600 text-xs">
              Copyright © 2026 Finlytics. All rights reserved.
            </p>
            <div className="flex gap-4">
              <NavLink to="#" className="text-[#b33556] text-xs hover:text-[#d94668] transition-colors">
                Terms of Use
              </NavLink>
              <NavLink to="#" className="text-[#b33556] text-xs hover:text-[#d94668] transition-colors">
                Privacy Policy
              </NavLink>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm">Language</span>
            <LanguageSelect />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
