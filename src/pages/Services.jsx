import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { Truck, Mountain, Wheat, Anchor, Recycle, Wrench, Route, TreePine, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import c from '../content.js';

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

const serviceIcons = [Truck, Mountain, TreePine, Wheat, Anchor, Wrench, Recycle, Route, Mountain];

export default function Services() {
  return (
    <>
      <title>Our Services | Hart Haulage Ltd</title>

      <PageHero
        title={c.services_hero_title}
        subtitle={c.services_hero_subtitle}
        image={c.services_hero_image}
        accent={c.services_hero_accent}
        cmsPage="Services"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Services - Section - Label">{c.services_section_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="Services - Section - Heading">
              {c.services_section_heading}
            </h2>
            <p className="font-body text-gray-300 max-w-2xl mx-auto" data-cms="Services - Section - Sub">
              {c.services_section_sub}
            </p>
          </AnimatedSection>

          <div data-cms-repeater="Services - Services" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {c.services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div key={service.title} className="group bg-charcoal-mid border-l-4 border-pink hover:border-pink-dark rounded-r-lg p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink/10 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink/10 border border-pink/20 rounded-lg p-3 shrink-0">
                      <Icon size={24} className="text-pink" />
                    </div>
                    <div className="flex-1">
                      <h3 data-cms-field="title" className="font-heading font-bold uppercase text-white text-xl tracking-wide mb-2">{service.title}</h3>
                      <p data-cms-field="desc" className="font-body text-gray-300 text-sm leading-relaxed mb-3">{service.desc}</p>
                      <p data-cms-field="detail" className="font-body text-muted text-xs leading-relaxed mb-5">{service.detail}</p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-pink text-sm font-body font-semibold hover:gap-3 transition-all duration-200"
                      >
                        {c.services_enquire_cta} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-black diagonal-texture py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="Services - CTA - Heading">
              {c.services_cta_heading}
            </h2>
            <p className="font-body text-gray-300 mb-8" data-cms="Services - CTA - Body">
              {c.services_cta_body}
            </p>
            <Link
              to="/contact"
              data-cms="Services - CTA - Button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              {c.services_cta_button} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
