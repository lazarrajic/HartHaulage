import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { ArrowRight, MapPin } from 'lucide-react';
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

export default function Projects() {
  return (
    <>
      <title>Our Projects | Hart Haulage Ltd</title>

      <PageHero
        title={c.projects_hero_title}
        subtitle={c.projects_hero_subtitle}
        image={c.projects_hero_image}
        accent={c.projects_hero_accent}
        cmsPage="Projects"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Projects - Section - Label">{c.projects_section_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="Projects - Section - Heading">
              {c.projects_section_heading}
            </h2>
            <p className="font-body text-gray-300 max-w-2xl mx-auto" data-cms="Projects - Section - Sub">
              {c.projects_section_sub}
            </p>
          </AnimatedSection>

          <div className="space-y-10">
            {c.projects.map(({ name, region, desc, scope, photo }, i) => (
              <AnimatedSection key={name} delay={i * 80}>
                <div className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-charcoal-light hover:border-pink/30 transition-all duration-300 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`relative h-60 lg:h-auto overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={photo}
                      alt={name}
                      data-cms={`Projects - Card ${i + 1} - Photo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-charcoal-black/30 group-hover:bg-charcoal-black/20 transition-colors duration-300" />
                  </div>
                  <div className={`bg-charcoal-mid p-8 md:p-10 flex flex-col justify-center border-l-4 border-pink ${i % 2 === 1 ? 'lg:order-1 lg:border-l-0 lg:border-r-4' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-pink" />
                      <span className="text-pink font-body text-xs uppercase tracking-widest" data-cms={`Projects - Card ${i + 1} - Region`}>{region}</span>
                    </div>
                    <h3 className="font-heading font-black uppercase text-white text-3xl md:text-4xl tracking-wide mb-4" data-cms={`Projects - Card ${i + 1} - Name`}>{name}</h3>
                    <p className="font-body text-gray-300 leading-relaxed mb-5" data-cms={`Projects - Card ${i + 1} - Desc`}>{desc}</p>
                    <div className="border-t border-charcoal-light pt-4">
                      <p className="font-body text-xs text-muted uppercase tracking-widest mb-1">Scope of Works</p>
                      <p className="font-body text-gray-400 text-sm" data-cms={`Projects - Card ${i + 1} - Scope`}>{scope}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-black diagonal-texture py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="Projects - CTA - Heading">
              {c.projects_cta_heading}
            </h2>
            <p className="font-body text-gray-300 mb-8" data-cms="Projects - CTA - Body">
              {c.projects_cta_body}
            </p>
            <Link
              to="/contact"
              data-cms="Projects - CTA - Button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              {c.projects_cta_button} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
