import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { getContent } from '../utils/getContent';

export default function Footer() {
  const c = getContent();
  return (
    <footer className="bg-charcoal-black border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img
                src={c.logo}
                alt={c.company_name}
                data-cms="Footer - Logo"
                className="h-12 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-muted text-sm font-body leading-relaxed mb-4" data-cms="Footer - Tagline">
              {c.footer_tagline}
            </p>
            <div className="inline-flex items-center gap-2 bg-pink/10 border border-pink/30 rounded px-3 py-1.5">
              <Heart size={14} className="text-pink fill-pink" />
              <span className="text-pink text-xs font-body font-semibold tracking-wide" data-cms="Footer - Badge">{c.footer_badge}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              {c.nav_links.map(({ to, label }, i) => (
                <li key={to}>
                  <Link
                    to={to}
                    data-cms={`Footer - Nav Link ${i + 1}`}
                    className="text-muted hover:text-pink text-sm font-body transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auckland Depot */}
          <div>
            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-4" data-cms="Footer - Auckland Heading">{c.footer_auckland_heading}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-pink mt-0.5 shrink-0" />
                <span className="text-muted text-sm font-body" data-cms="Footer - Auckland Address">{c.footer_auckland_address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-pink shrink-0" />
                <a href={`tel:${c.footer_auckland_phone.replace(/\s/g, '')}`} data-cms="Footer - Auckland Phone" className="text-muted hover:text-pink text-sm font-body transition-colors">{c.footer_auckland_phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-pink shrink-0" />
                <a href={`mailto:${c.footer_auckland_email}`} data-cms="Footer - Auckland Email" className="text-muted hover:text-pink text-sm font-body transition-colors">{c.footer_auckland_email}</a>
              </li>
            </ul>
          </div>

          {/* Hamilton Depot */}
          <div>
            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-4" data-cms="Footer - Hamilton Heading">{c.footer_hamilton_heading}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-pink mt-0.5 shrink-0" />
                <span className="text-muted text-sm font-body" data-cms="Footer - Hamilton Address">{c.footer_hamilton_address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-pink shrink-0" />
                <a href={`tel:${c.footer_hamilton_phone.replace(/\s/g, '')}`} data-cms="Footer - Hamilton Phone" className="text-muted hover:text-pink text-sm font-body transition-colors">{c.footer_hamilton_phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-pink shrink-0" />
                <a href={`mailto:${c.footer_hamilton_email}`} data-cms="Footer - Hamilton Email" className="text-muted hover:text-pink text-sm font-body transition-colors">{c.footer_hamilton_email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-body">
            &copy; {new Date().getFullYear()} {c.company_name}. All rights reserved.
          </p>
          <p className="text-muted text-xs font-body" data-cms="Footer - Credits">
            {c.footer_credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
