import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { CheckCircle, MessageSquare, Truck, ArrowRight } from 'lucide-react';
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

const stepIcons = [MessageSquare, CheckCircle, Truck];

export default function Topsoil() {
  return (
    <>
      <title>Topsoil Supply & Screening | Hart Haulage Ltd</title>

      <PageHero
        title={c.topsoil_hero_title}
        subtitle={c.topsoil_hero_subtitle}
        image={c.topsoil_hero_image}
        accent={c.topsoil_hero_accent}
        cmsPage="Topsoil"
      />

      {/* What We Offer */}
      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Topsoil - Offer - Label">{c.topsoil_offer_label}</p>
              <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-6" data-cms="Topsoil - Offer - Heading">
                {c.topsoil_offer_heading}
              </h2>
              <p className="font-body text-gray-300 text-lg leading-relaxed mb-8" data-cms="Topsoil - Offer - Body">
                {c.topsoil_offer_body}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.topsoil_features.map((f, i) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-pink mt-0.5 shrink-0" />
                    <span className="font-body text-gray-300 text-sm" data-cms={`Topsoil - Features - Item ${i + 1}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-pink/20 rounded-lg" />
                <img
                  src={c.topsoil_offer_image}
                  alt="Topsoil screening operations"
                  data-cms="Topsoil - Offer - Image"
                  className="w-full h-80 md:h-96 object-cover rounded-lg relative z-10"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Screening Info */}
      <section className="bg-charcoal-black diagonal-texture py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-8 md:p-10">
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Topsoil - Screening - Label">{c.topsoil_screening_label}</p>
              <h3 className="font-heading font-black uppercase text-white text-3xl leading-none mb-4" data-cms="Topsoil - Screening - Heading">
                {c.topsoil_screening_heading}
              </h3>
              <p className="font-body text-gray-300 leading-relaxed" data-cms="Topsoil - Screening - Body">
                {c.topsoil_screening_body}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How to Order */}
      <section className="bg-charcoal-mid py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Topsoil - Order - Label">{c.topsoil_order_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none" data-cms="Topsoil - Order - Heading">
              {c.topsoil_order_heading}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.topsoil_steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <AnimatedSection key={s.step} delay={i * 100}>
                  <div className="relative bg-charcoal-dark border border-charcoal-light rounded-xl p-8 text-center h-full">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink text-white font-heading font-black text-lg w-10 h-10 rounded-full flex items-center justify-center" data-cms={`Topsoil - Steps - Step ${i + 1}`}>
                      {s.step}
                    </div>
                    <div className="mt-4 mb-4 flex justify-center">
                      <Icon size={32} className="text-pink" />
                    </div>
                    <h3 className="font-heading font-bold uppercase text-white text-xl tracking-wide mb-3" data-cms={`Topsoil - Steps - Title ${i + 1}`}>{s.title}</h3>
                    <p className="font-body text-muted text-sm leading-relaxed" data-cms={`Topsoil - Steps - Desc ${i + 1}`}>{s.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="Topsoil - CTA - Heading">
              {c.topsoil_cta_heading}
            </h2>
            <p className="font-body text-gray-300 mb-8" data-cms="Topsoil - CTA - Body">
              {c.topsoil_cta_body}
            </p>
            <Link
              to="/contact"
              data-cms="Topsoil - CTA - Button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              {c.topsoil_cta_button} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
