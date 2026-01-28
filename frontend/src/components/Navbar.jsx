import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Navbar({ scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="nav-brand">Peak Digital</div>
        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#home"
              className="nav-link"
              onClick={() => scrollToSection("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="nav-link"
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="nav-link"
              onClick={() => scrollToSection("services")}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="nav-link"
              onClick={() => scrollToSection("portfolio")}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link btn-contact"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
          </li>
        </ul>
        <div
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
