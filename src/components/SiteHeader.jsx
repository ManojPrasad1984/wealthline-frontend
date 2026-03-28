import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/image/logo.jpeg";

const sectionItems = [
  { label: "Home", hash: "#home" },
  { label: "Project Layout", hash: "#project-layout" },
  { label: "Scheme", hash: "#scheme" },
  { label: "Contact", hash: "#contact" },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSectionHref = (hash) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="home-navbar">
        <div className="container home-navbar-inner">
          <a className="home-brand" href={getSectionHref("#home")}>
            <img src={logo} alt="Wealthline Infrastructure logo" />
            <span>Wealthline Infrastructure</span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`home-menu-shell${isMenuOpen ? " is-open" : ""}`}>
          <nav className="home-nav" id="primary-navigation" aria-label="Primary">
            {sectionItems.map((item) => (
              <a
                key={item.label}
                href={getSectionHref(item.hash)}
                className="home-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <NavLink
            to="/LuckyDraw/Apply"
            className={({ isActive }) =>
              `home-cta${isActive ? " home-cta-active" : ""}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Join Lucky Draw
          </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
