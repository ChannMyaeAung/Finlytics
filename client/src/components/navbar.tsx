// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const menus = [
  { name: "Personal Finance App", link: "/" },
  { name: "Bank Connections", link: "/bank-connections" },
  { name: "Budgeting", link: "/dashboard" },
  { name: "Currencies", link: "/currencies" },
  { name: "Pricing", link: "/pricing" },
];

const Navbar = () => {
  return (
    <header className="relative top-0 z-50 bg-white dark:bg-accent dark:border-0 border-b border-gray-100 lg:min-h-16 h-full min-h-80 sm:min-h-45 w-full">
      {/* Navbar for Small screens and Tablets (below lg)*/}
      <div className="px-6 flex flex-col items-end lg:hidden justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full py-3">
          <span className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
            Fin<span className="font-light">lytics</span>
          </span>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <NavLink
                to="/auth"
                className="hidden sm:block px-6 py-2 bg-transparent font-bold rounded-full border border-black transition-all text-[11px] uppercase tracking-wider hover:border-pink-400 hover:text-pink-400 dark:border-white dark:hover:border-pink-400"
              >
                Log in
              </NavLink>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-between w-full gap-6 pt-4 h-13">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.link}
              end={menu.link === "/"}
              className={({ isActive }) =>
                `
                nav-tab flex items-center h-full text-[11px] uppercase tracking-widest transition-colors
                ${isActive ? "nav-tab--active " : "nav-tab--inactive "}
                `
              }
            >
              <span className="h-0 text-sm tracking-wider">{menu.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Navbar for Large screens and Desktops (lg and above) */}
      <div className="px-6 h-full hidden lg:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-normal text-gray-900 dark:text-white">
            Fin<span className="font-light">lytics</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12 h-full">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.link}
              end={menu.link === "/"}
              className={({ isActive }) =>
                `
                nav-tab flex items-center h-16 uppercase tracking-widest transition-colors
                ${isActive ? "nav-tab--active " : "nav-tab--inactive "}
                `
              }
            >
              <span className="h-0 text-xs! tracking-wider">{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <NavLink
              to="/auth"
              className="hidden sm:block px-6 py-2 bg-transparent font-bold rounded-full border border-black transition-all text-[11px] uppercase tracking-wider hover:border-pink-400 hover:text-pink-400 dark:border-white dark:hover:border-pink-400"
            >
              Log in
            </NavLink>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
