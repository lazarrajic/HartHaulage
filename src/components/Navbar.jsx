import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import c from '../content.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal-dark/95 backdrop-blur-sm shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={c.logo}
              alt={c.company_name}
              data-cms="Global - Navbar - Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {c.nav_links.map(({ to, label }, i) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  data-cms={`Global - Navbar - Nav Link ${i + 1}`}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-200 rounded ${
                      isActive
                        ? 'text-pink'
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              data-cms="Global - Navbar - CTA"
              className="px-5 py-2.5 bg-pink hover:bg-pink-dark text-white text-sm font-body font-semibold tracking-wide rounded transition-colors duration-200"
            >
              {c.nav_cta}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-charcoal-dark/98 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col p-6 gap-2">
          {c.nav_links.map(({ to, label }, i) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                data-cms={`Global - Navbar - Nav Link ${i + 1}`}
                className={({ isActive }) =>
                  `block px-4 py-3 text-xl font-heading font-bold uppercase tracking-widest border-l-4 transition-all duration-200 ${
                    isActive
                      ? 'border-pink text-pink bg-pink/5'
                      : 'border-charcoal-light text-gray-300 hover:border-pink hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="mt-4">
            <Link
              to="/contact"
              data-cms="Global - Navbar - CTA"
              className="block px-4 py-3 text-center bg-pink hover:bg-pink-dark text-white text-xl font-heading font-bold uppercase tracking-widest rounded transition-colors duration-200"
            >
              {c.nav_cta}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
