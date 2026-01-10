import React from "react";

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
      <div className="w-full max-w-5xl mx-auto">
        {/* Links Container */}
        <div className="grid grid-cols-3">
          {/* First set of footer links */}
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-normal text-white">
              Fin<span className="font-light">lytics</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full justify-between">
            <div>
              <span className="text-gray-500 text-xs">
                Copyright © 2025 Finlytics. All rights reserved.
              </span>
              <a href="#" className="text-[#b33556]">
                Terms of Use
              </a>
              <a href="#" className="text-[#b33556]">
                Privacy Policy
              </a>
            </div>

            <select className="self-end text-white p-3 rounded-md outline-none">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
