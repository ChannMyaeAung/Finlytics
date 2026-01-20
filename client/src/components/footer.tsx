import React from "react";
import { ChevronUp } from "lucide-react";

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
              <a
                href={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Second set of footer links */}
          <div className="flex flex-col gap-1.5 text-sm md:text-base md:gap-3">
            {footerLinksTwo.map((link) => (
              <a
                href={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Third set of footer links */}
          <div className="flex flex-col gap-1.5 text-sm md:text-base md:gap-3">
            {footerLinksThree.map((link) => (
              <a
                href={link.href}
                key={link.name}
                className="text-white/60 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Logo and Copyright, Terms and Policy & Language Selection */}
        <div className="flex flex-col items-start space-y-6 mt-12">
          {/* Language Selection for small screens, hidden in medium and up */}
          <div className="md:hidden">
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

          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="text-gray-500 text-xs w-full whitespace-nowrap">
                Copyright © 2025 Finlytics. All rights reserved.
              </span>
              <div className="flex gap-3 mb-6">
                <a href="#" className="text-[#b33556] text-sm">
                  Terms of Use
                </a>
                <a href="#" className="text-[#b33556] text-sm">
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Language Selection Desktop, hidden in small screens */}
            <div className="hidden md:block">
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
