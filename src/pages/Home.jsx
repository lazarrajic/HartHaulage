import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import {
  ChevronDown, ArrowRight, Truck, Mountain, Wheat, Anchor,
  Recycle, Wrench, Shield, Award, Heart,
} from 'lucide-react';
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

const homeServiceIcons = [Truck, Mountain, Wheat, Anchor, Recycle, Wrench];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${c.home_hero_image})` }}
        />
        <img src={c.home_hero_image} data-cms="Home - Hero - Image" alt="" style={{ display: 'none' }} />
        <div className="absolute inset-0 bg-charcoal-black/80" />
        <div className="absolute inset-0 diagonal-texture" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <p className="text-pink font-heading font-bold uppercase tracking-[0.35em] text-sm md:text-base mb-4 animate-[fadeIn_0.8s_ease-out]" data-cms="Home - Hero - Region">
            {c.home_hero_region}
          </p>
          <h1 className="font-heading font-black uppercase text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6 max-w-4xl" data-cms="Home - Hero - Heading">
            {c.home_hero_heading}
          </h1>
          <p className="font-body text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed" data-cms="Home - Hero - Sub">
            {c.home_hero_sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              data-cms="Home - Hero - CTA 1"
              className="px-7 py-3.5 bg-pink hover:bg-pink-dark text-white font-body font-semibold tracking-wide rounded transition-all duration-200 hover:scale-105"
            >
              {c.home_hero_cta1}
            </Link>
            <Link
              to="/contact"
              data-cms="Home - Hero - CTA 2"
              className="px-7 py-3.5 border-2 border-pink text-pink hover:bg-pink hover:text-white font-body font-semibold tracking-wide rounded transition-all duration-200 hover:scale-105"
            >
              {c.home_hero_cta2}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-pink">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal-mid border-y border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-charcoal-light">
            {c.home_stats.map(({ value, label }, i) => (
              <div key={label} className="text-center md:px-8">
                <p className="font-heading font-black text-pink text-4xl lg:text-5xl" data-cms={`Home - Stats - Value ${i + 1}`}>{value}</p>
                <p className="font-body text-muted text-sm mt-1 uppercase tracking-widest" data-cms={`Home - Stats - Label ${i + 1}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Home - About - Label">{c.home_about_label}</p>
              <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-6" data-cms="Home - About - Heading">
                {c.home_about_heading}
              </h2>
              <p className="font-body text-gray-300 text-lg leading-relaxed mb-8" data-cms="Home - About - Body">
                {c.home_about_body}
              </p>
              <Link
                to="/about"
                data-cms="Home - About - CTA"
                className="inline-flex items-center gap-2 text-pink font-body font-semibold hover:gap-4 transition-all duration-200"
              >
                {c.home_about_cta} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-pink/20 rounded-lg" />
                <img
                  src={c.home_about_image}
                  alt="Hart Haulage fleet"
                  data-cms="Home - About - Image"
                  className="w-full h-80 md:h-96 object-cover rounded-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 bg-pink text-white px-4 py-2 rounded z-20">
                  <p className="font-heading font-bold text-sm uppercase tracking-wide" data-cms="Home - About - Badge">{c.home_about_badge}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-charcoal-black py-20 md:py-28 diagonal-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Home - Services - Label">{c.home_services_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none" data-cms="Home - Services - Heading">
              {c.home_services_heading}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.home_services.map(({ title, desc }, i) => {
              const Icon = homeServiceIcons[i];
              return (
                <AnimatedSection key={title} delay={i * 80}>
                  <div className="group bg-charcoal-mid border-l-4 border-pink hover:border-pink-dark rounded-r-lg p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink/10 transition-all duration-300 h-full">
                    <Icon size={28} className="text-pink mb-4" />
                    <h3 className="font-heading font-bold uppercase text-white text-xl tracking-wide mb-2" data-cms={`Home - Services - Title ${i + 1}`}>{title}</h3>
                    <p className="font-body text-muted text-sm leading-relaxed" data-cms={`Home - Services - Desc ${i + 1}`}>{desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/services"
              data-cms="Home - Services - CTA"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-pink text-pink hover:bg-pink hover:text-white font-body font-semibold tracking-wide rounded transition-all duration-200"
            >
              {c.home_services_cta} <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Pink */}
      <section className="relative bg-charcoal-mid py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-pink/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Heart size={40} className="text-pink fill-pink mx-auto mb-6" />
            <div className="h-px bg-pink w-24 mx-auto mb-8" />
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-6xl leading-none mb-6" data-cms="Home - Why Pink - Heading">
              {c.home_whypink_heading}
            </h2>
            <div className="h-px bg-pink w-24 mx-auto mb-8" />
            <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" data-cms="Home - Why Pink - Body">
              {c.home_whypink_body}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="bg-charcoal-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-black uppercase text-white text-3xl md:text-4xl" data-cms="Home - Gallery Strip - Heading">{c.home_gallery_heading}</h2>
            <Link to="/gallery" data-cms="Home - Gallery Strip - Link" className="text-pink font-body font-semibold hover:text-pink-dark transition-colors text-sm">
              {c.home_gallery_link}
            </Link>
          </AnimatedSection>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {c.home_gallery_photos.map((item, i) => (
              <div key={i} className="shrink-0 w-64 md:w-80 h-52 md:h-64 overflow-hidden rounded-lg border border-charcoal-light hover:border-pink transition-colors duration-300">
                <img
                  src={item.image}
                  alt={`Hart Haulage fleet photo ${i + 1}`}
                  data-cms={`Home - Gallery Strip - Photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <AnimatedSection className="text-center mt-8">
            <Link
              to="/gallery"
              data-cms="Home - Gallery Strip - CTA"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink hover:bg-pink-dark text-white font-body font-semibold tracking-wide rounded transition-colors duration-200"
            >
              {c.home_gallery_cta} <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-charcoal-black py-20 md:py-28 diagonal-texture overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-6xl leading-none mb-4" data-cms="Home - CTA - Heading">
              {c.home_cta_heading}
            </h2>
            <p className="font-body text-gray-300 text-lg mb-10" data-cms="Home - CTA - Body">
              {c.home_cta_body}
            </p>
            <Link
              to="/contact"
              data-cms="Home - CTA - Button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              {c.home_cta_button} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
