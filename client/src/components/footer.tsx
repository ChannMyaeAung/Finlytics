import { ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { name: "Blog", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Product hunt", href: "#" },
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

const Footer = () => {
  return (
    <footer className="bg-[#15181a] py-12">
      <div className="w-full max-w-5xl mx-auto px-8 ">
        {/* Links Container */}
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {/* First set of footer links */}
          <div className="flex flex-col gap-1.5 text-sm md:text-base md:gap-3">
            {footerLinks.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Second set of footer links */}
          <div className="flex flex-col gap-1.5 text-sm md:text-base md:gap-3">
            {footerLinksTwo.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Third set of footer links */}
          <div className="flex flex-col gap-1.5 text-sm md:text-base md:gap-3">
            {footerLinksThree.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logo and Copyright, Terms and Policy & Language Selection */}
        <div className="flex flex-col items-start space-y-6 mt-12">
          {/* Language Selection for small screens, hidden in lg screens and up */}
          <div className="lg:hidden flex md:items-center flex-col gap-8 md:flex-row-reverse justify-between w-full">
            <div>
              <span className="text-[#f6f5f1] ml-auto font-semibold mr-6 ">
                Language
              </span>
              <div className="relative inline-flex items-center">
                <select className="appearance-none text-white py-3 px-6 pr-10 rounded-md outline-none bg-black">
                  <option value="en" className="bg-[#15181a] text-white">
                    English
                  </option>
                  <option value="es" className="bg-[#15181a] text-white">
                    Spanish
                  </option>
                  <option value="fr" className="bg-[#15181a] text-white">
                    French
                  </option>
                </select>
                <ChevronUp
                  className="pointer-events-none absolute right-3 text-white"
                  size={18}
                />
              </div>
            </div>
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-normal text-white">
                Fin<span className="font-light">lytics</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            <div className="flex w-full flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="text-gray-500 text-xs w-full whitespace-nowrap">
                Copyright © 2025 Finlytics. All rights reserved.
              </span>
              <div className="flex gap-3 mb-6">
                <NavLink to="#" className="text-[#b33556] text-xs">
                  Terms of Use
                </NavLink>
                <NavLink to="#" className="text-[#b33556] text-xs">
                  Privacy Policy
                </NavLink>
              </div>
            </div>

            {/* Language Selection Desktop, hidden in small & md screens */}
            <div className="hidden lg:block">
              <span className="text-[#f6f5f1] ml-auto font-semibold mr-6 ">
                Language
              </span>
              <div className="relative inline-flex items-center">
                <select className="appearance-none text-white py-3 px-6 pr-10 rounded-md outline-none bg-black">
                  <option value="en" className="bg-[#15181a] text-white">
                    English
                  </option>
                  <option value="es" className="bg-[#15181a] text-white">
                    Spanish
                  </option>
                  <option value="fr" className="bg-[#15181a] text-white">
                    French
                  </option>
                </select>
                <ChevronUp
                  className="pointer-events-none absolute right-3 text-white"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
