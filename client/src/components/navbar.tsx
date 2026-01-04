// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const menus = [
  { name: "Personal Finance App", link: "/" },
  { name: "Bank Connections", link: "/bank-connections" },
  { name: "Budgeting", link: "/dashboard" },
  { name: "Currencies", link: "/currencies" },
  { name: "Pricing", link: "/pricing" },
];

const navLinkClasses = (isActive: boolean) =>
  [
    "pb-1 border-b-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 ",
    isActive
      ? "text-pink-500 border-pink-500"
      : "text-toshl-gray border-transparent hover:text-toshl-dark hover:border-pink-200",
  ].join(" ");

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-8 w-full z-50 relative border-b">
      {/* Logo Area */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl font-bold tracking-tight text-toshl-dark">
          Fin<span className="font-light">lytics</span>
        </span>
      </div>

      {/* Desktop Links - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.link}
            className={({ isActive }) => navLinkClasses(isActive)}
            end={menu.link === "/"}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <a
          href="/dashboard"
          className="hidden sm:block px-6 py-2 bg-toshl-yellow text-toshl-dark font-bold rounded-full border-2 border-black transition-all  shadow-sm uppercase text-xs tracking-wider"
        >
          Log in
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
