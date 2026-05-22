import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import PageHero from '../components/PageHero';
import c from '../content.js';

const TERMS_PDF = '/hart-haulage-terms-and-conditions.pdf';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Layout wrapper for a lettered clause. The data-cms element is written
// explicitly at each call site so the CMS scanner can map it.
function Clause({ letter, children }) {
  return (
    <li className="flex gap-3">
      <span className="font-heading font-bold text-pink shrink-0 w-5">{letter})</span>
      <div className="font-body text-gray-300 text-sm leading-relaxed flex-1">{children}</div>
    </li>
  );
}

function Card({ children, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10">
        {children}
      </div>
    </AnimatedSection>
  );
}

const cardTitle = 'font-heading font-black uppercase text-white text-2xl md:text-3xl leading-none mb-6';
const subItem = 'flex gap-2 font-body text-gray-300 text-sm leading-relaxed';

export default function Terms() {
  return (
    <>
      <title>Terms & Conditions | Hart Haulage Ltd</title>

      <PageHero
        title="Terms & Conditions"
        subtitle="Terms and Conditions of Trade governing the supply of services by Hart Haulage Ltd."
        accent="Legal"
        cmsPage="Terms"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro + download */}
          <AnimatedSection>
            <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10 mb-10">
              <p className="font-body text-gray-300 text-lg leading-relaxed" data-cms="Terms - Intro - Text">
                {c.terms_intro}
              </p>
              <p className="font-body text-muted text-sm uppercase tracking-widest mt-4" data-cms="Terms - Intro - Last Updated">
                {c.terms_last_updated}
              </p>
              <a
                href={TERMS_PDF}
                download
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide rounded transition-all duration-200 hover:scale-105"
              >
                <Download size={18} /> Download as PDF
              </a>
            </div>
          </AnimatedSection>

          <div className="space-y-6">

            {/* Declaration */}
            <Card>
              <h2 className={cardTitle} data-cms="Terms - Declaration - Title">{c.terms_declaration_title}</h2>
              <ol className="space-y-4">
                <Clause letter="a"><p data-cms="Terms - Declaration - Clause A">{c.terms_declaration_a}</p></Clause>
                <Clause letter="b"><p data-cms="Terms - Declaration - Clause B">{c.terms_declaration_b}</p></Clause>
                <Clause letter="c"><p data-cms="Terms - Declaration - Clause C">{c.terms_declaration_c}</p></Clause>
                <Clause letter="d"><p data-cms="Terms - Declaration - Clause D">{c.terms_declaration_d}</p></Clause>
              </ol>
            </Card>

            {/* Delivery */}
            <Card delay={60}>
              <h2 className={cardTitle} data-cms="Terms - Delivery - Title">{c.terms_delivery_title}</h2>
              <ol className="space-y-4">
                <Clause letter="a"><p data-cms="Terms - Delivery - Clause A">{c.terms_delivery_a}</p></Clause>
                <Clause letter="b"><p data-cms="Terms - Delivery - Clause B">{c.terms_delivery_b}</p></Clause>
                <Clause letter="c"><p data-cms="Terms - Delivery - Clause C">{c.terms_delivery_c}</p></Clause>
                <Clause letter="d"><p data-cms="Terms - Delivery - Clause D">{c.terms_delivery_d}</p></Clause>
              </ol>
            </Card>

            {/* Pricing and Terms of Trade */}
            <Card delay={120}>
              <h2 className={cardTitle} data-cms="Terms - Pricing - Title">{c.terms_pricing_title}</h2>
              <ol className="space-y-4">
                <Clause letter="a"><p data-cms="Terms - Pricing - Clause A">{c.terms_pricing_a}</p></Clause>
                <Clause letter="b"><p data-cms="Terms - Pricing - Clause B">{c.terms_pricing_b}</p></Clause>
                <Clause letter="c"><p data-cms="Terms - Pricing - Clause C">{c.terms_pricing_c}</p></Clause>
                <Clause letter="d"><p data-cms="Terms - Pricing - Clause D">{c.terms_pricing_d}</p></Clause>
                <Clause letter="e">
                  <p data-cms="Terms - Pricing - Clause E">{c.terms_pricing_e}</p>
                  <ol className="mt-3 space-y-2">
                    <li className={subItem}>
                      <span className="text-pink shrink-0 w-7 text-right">i.</span>
                      <span data-cms="Terms - Pricing - Clause E i">{c.terms_pricing_e_i}</span>
                    </li>
                    <li className={subItem}>
                      <span className="text-pink shrink-0 w-7 text-right">ii.</span>
                      <span data-cms="Terms - Pricing - Clause E ii">{c.terms_pricing_e_ii}</span>
                    </li>
                    <li className={subItem}>
                      <span className="text-pink shrink-0 w-7 text-right">iii.</span>
                      <span data-cms="Terms - Pricing - Clause E iii">{c.terms_pricing_e_iii}</span>
                    </li>
                  </ol>
                </Clause>
              </ol>
            </Card>

            {/* Ownership and Payment Terms */}
            <Card delay={180}>
              <h2 className={cardTitle} data-cms="Terms - Ownership - Title">{c.terms_ownership_title}</h2>
              <ol className="space-y-4">
                <Clause letter="a"><p data-cms="Terms - Ownership - Clause A">{c.terms_ownership_a}</p></Clause>
                <Clause letter="b"><p data-cms="Terms - Ownership - Clause B">{c.terms_ownership_b}</p></Clause>
                <Clause letter="c"><p data-cms="Terms - Ownership - Clause C">{c.terms_ownership_c}</p></Clause>
                <Clause letter="d"><p data-cms="Terms - Ownership - Clause D">{c.terms_ownership_d}</p></Clause>
              </ol>
            </Card>

            {/* Payment notes */}
            <Card delay={240}>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-heading font-bold text-pink shrink-0 w-5">1.</span>
                  <span className="font-body text-gray-300 text-sm leading-relaxed flex-1" data-cms="Terms - Notes - Note 1">{c.terms_note_1}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-heading font-bold text-pink shrink-0 w-5">2.</span>
                  <span className="font-body text-gray-300 text-sm leading-relaxed flex-1" data-cms="Terms - Notes - Note 2">{c.terms_note_2}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-heading font-bold text-pink shrink-0 w-5">3.</span>
                  <span className="font-body text-gray-300 text-sm leading-relaxed flex-1" data-cms="Terms - Notes - Note 3">{c.terms_note_3}</span>
                </li>
              </ol>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="font-body text-gray-300 mb-6">
              Questions about our terms of trade? Get in touch with the team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
