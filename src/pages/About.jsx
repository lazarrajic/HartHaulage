import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { Shield, Award, Phone, Mail, ArrowRight } from 'lucide-react';
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

const certIcons = [Award, Shield];

export default function About() {
  return (
    <>
      <title>Our Story | Hart Haulage Ltd</title>

      <PageHero
        title={c.about_hero_title}
        subtitle={c.about_hero_subtitle}
        image={c.about_hero_image}
        accent={c.about_hero_accent}
        cmsPage="About"
      />

      {/* Full Story */}
      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="About - Story - Label">{c.about_story_label}</p>
              <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-6" data-cms="About - Story - Heading">
                {c.about_story_heading}
              </h2>
              <div className="space-y-5 font-body text-gray-300 leading-relaxed">
                <p data-cms="About - Story - P1">{c.about_story_p1}</p>
                <p data-cms="About - Story - P2">{c.about_story_p2}</p>
                <p data-cms="About - Story - P3">{c.about_story_p3}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-pink/20 rounded-lg" />
                <img
                  src={c.about_story_image}
                  alt="Barry and Debbie Hart"
                  data-cms="About - Story - Image"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg relative z-10"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-charcoal-black py-16 diagonal-texture">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="border-2 border-pink/40 bg-pink/5 rounded-xl p-8 md:p-12 text-center">
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-4" data-cms="About - Mission - Label">{c.about_mission_label}</p>
              <blockquote className="font-body text-white text-xl md:text-2xl leading-relaxed italic" data-cms="About - Mission - Quote">
                {c.about_mission_quote}
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-charcoal-mid py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="About - Certs - Label">{c.about_certs_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl leading-none" data-cms="About - Certs - Heading">
              {c.about_certs_heading}
            </h2>
          </AnimatedSection>

          <div data-cms-repeater="About - Accreditations" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {c.about_certs.map((cert, i) => {
              const Icon = certIcons[i % certIcons.length];
              return (
                <div key={cert.title} className="bg-charcoal-dark border border-charcoal-light rounded-xl p-7 flex items-start gap-5">
                  <div className="bg-pink/10 border border-pink/30 rounded-lg p-3 shrink-0">
                    <Icon size={28} className="text-pink" />
                  </div>
                  <div>
                    <h3 data-cms-field="title" className="font-heading font-bold uppercase text-white text-xl tracking-wide mb-2">{cert.title}</h3>
                    <p data-cms-field="desc" className="font-body text-muted text-sm leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="About - Team - Label">{c.about_team_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none" data-cms="About - Team - Heading">
              {c.about_team_heading}
            </h2>
          </AnimatedSection>

          <div data-cms-repeater="About - Team" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.team.map((member, i) => (
              <div key={member.name} className="bg-charcoal-mid border border-charcoal-light hover:border-pink/40 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-14 h-14 rounded-full bg-pink/10 border-2 border-pink/30 flex items-center justify-center mb-5">
                  <span className="font-heading font-black text-pink text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 data-cms-field="name" className="font-heading font-bold uppercase text-white text-2xl tracking-wide">{member.name}</h3>
                <p data-cms-field="role" className="text-pink font-body text-sm font-semibold mb-5">{member.role}</p>
                {member.depot && (
                  <p data-cms-field="depot" className="font-body text-muted text-xs uppercase tracking-widest mb-4">{member.depot}</p>
                )}
                <div className="space-y-3">
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    data-cms-field="phone"
                    className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors"
                  >
                    <Phone size={14} className="text-pink shrink-0" />
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    data-cms-field="email"
                    className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors break-all"
                  >
                    <Mail size={14} className="text-pink shrink-0" />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-black diagonal-texture py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-4" data-cms="About - CTA - Heading">
              {c.about_cta_heading}
            </h2>
            <p className="font-body text-gray-300 mb-8" data-cms="About - CTA - Body">
              {c.about_cta_body}
            </p>
            <Link
              to="/contact"
              data-cms="About - CTA - Button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide text-lg rounded transition-all duration-200 hover:scale-105"
            >
              {c.about_cta_button} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
