import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
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

const fieldTypes = { name: 'text', email: 'email', phone: 'tel' };

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  return (
    <>
      <title>Contact Us | Hart Haulage Ltd</title>

      <PageHero
        title={c.contact_hero_title}
        subtitle={c.contact_hero_subtitle}
        image={c.contact_hero_image}
        accent={c.contact_hero_accent}
        cmsPage="Contact"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Cards */}
          <AnimatedSection className="mb-16">
            <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Contact - Team - Label">{c.contact_team_label}</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl md:text-5xl leading-none mb-10" data-cms="Contact - Team - Heading">
              {c.contact_team_heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.team.map(({ name, role, phone, email, depot }, i) => (
                <AnimatedSection key={name} delay={i * 80}>
                  <div className="bg-charcoal-mid border border-charcoal-light hover:border-pink/40 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-full bg-pink/10 border-2 border-pink/30 flex items-center justify-center mb-4">
                      <span className="font-heading font-black text-pink text-lg">
                        {name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold uppercase text-white text-xl tracking-wide" data-cms={`Contact - Team - Name ${i + 1}`}>{name}</h3>
                    <p className="text-pink font-body text-sm font-semibold mb-1" data-cms={`Contact - Team - Role ${i + 1}`}>{role}</p>
                    {depot && <p className="font-body text-muted text-xs uppercase tracking-widest mb-4" data-cms={`Contact - Team - Depot ${i + 1}`}>{depot}</p>}
                    {!depot && <div className="mb-4" />}
                    <div className="space-y-2.5">
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        data-cms={`Contact - Team - Phone ${i + 1}`}
                        className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors"
                      >
                        <Phone size={15} className="text-pink shrink-0" />
                        {phone}
                      </a>
                      <a
                        href={`mailto:${email}`}
                        data-cms={`Contact - Team - Email ${i + 1}`}
                        className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors break-all"
                      >
                        <Mail size={15} className="text-pink shrink-0" />
                        {email}
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Form + Depots */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-3">
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Contact - Form - Label">{c.contact_form_label}</p>
              <h2 className="font-heading font-black uppercase text-white text-3xl md:text-4xl leading-none mb-8" data-cms="Contact - Form - Heading">
                {c.contact_form_heading}
              </h2>

              {submitted ? (
                <div className="bg-pink/10 border-2 border-pink/40 rounded-xl p-10 text-center">
                  <div className="w-16 h-16 bg-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-white text-2xl mb-2" data-cms="Contact - Form - Success Heading">{c.contact_success_heading}</h3>
                  <p className="font-body text-gray-300" data-cms="Contact - Form - Success Body">{c.contact_success_body}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {c.contact_form_fields.map((field, i) => (
                    <div key={field.name}>
                      <label className="block font-body text-sm text-gray-300 mb-1.5" data-cms={`Contact - Form - Label ${i + 1}`}>{field.label}</label>
                      <input
                        type={fieldTypes[field.name]}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        data-cms={`Contact - Form - Placeholder ${i + 1}`}
                        className={`w-full bg-charcoal-black border ${errors[field.name] ? 'border-red-500' : 'border-charcoal-light'} focus:border-pink rounded-lg px-4 py-3 text-white font-body text-sm outline-none transition-colors placeholder-muted`}
                      />
                      {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block font-body text-sm text-gray-300 mb-1.5" data-cms="Contact - Form - Service Label">{c.contact_service_label}</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`w-full bg-charcoal-black border ${errors.service ? 'border-red-500' : 'border-charcoal-light'} focus:border-pink rounded-lg px-4 py-3 text-white font-body text-sm outline-none transition-colors`}
                    >
                      <option value="" data-cms="Contact - Form - Service Placeholder">{c.contact_service_placeholder}</option>
                      {c.contact_services.map((s, i) => (
                        <option key={s} value={s} data-cms={`Contact - Form - Service Option ${i + 1}`}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-sm text-gray-300 mb-1.5" data-cms="Contact - Form - Message Label">{c.contact_message_label}</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={c.contact_message_placeholder}
                      data-cms="Contact - Form - Message Placeholder"
                      className={`w-full bg-charcoal-black border ${errors.message ? 'border-red-500' : 'border-charcoal-light'} focus:border-pink rounded-lg px-4 py-3 text-white font-body text-sm outline-none transition-colors placeholder-muted resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    data-cms="Contact - Form - Submit Button"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    {c.contact_form_button} <Send size={18} />
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Depot Locations */}
            <AnimatedSection className="lg:col-span-2" delay={150}>
              <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms="Contact - Depots - Label">{c.contact_depots_label}</p>
              <h2 className="font-heading font-black uppercase text-white text-3xl md:text-4xl leading-none mb-8" data-cms="Contact - Depots - Heading">
                {c.contact_depots_heading}
              </h2>
              <div className="space-y-6">
                {c.contact_depots.map((depot, i) => (
                  <div key={depot.name} className="bg-charcoal-mid border-l-4 border-pink rounded-r-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={16} className="text-pink" />
                      <h3 className="font-heading font-bold uppercase text-white text-lg tracking-wide" data-cms={`Contact - Depots - Name ${i + 1}`}>{depot.name}</h3>
                    </div>
                    <p className="font-body text-muted text-sm mb-4" data-cms={`Contact - Depots - Address ${i + 1}`}>{depot.address}</p>
                    <div className="space-y-2">
                      <p className="font-body text-gray-400 text-xs uppercase tracking-widest" data-cms={`Contact - Depots - Contact Label ${i + 1}`}>{depot.contact_label}</p>
                      <a href={`tel:${depot.phone.replace(/\s/g, '')}`} data-cms={`Contact - Depots - Phone ${i + 1}`} className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors">
                        <Phone size={13} className="text-pink" /> {depot.phone}
                      </a>
                      <a href={`mailto:${depot.email}`} data-cms={`Contact - Depots - Email ${i + 1}`} className="flex items-center gap-2 text-gray-300 hover:text-pink text-sm font-body transition-colors break-all">
                        <Mail size={13} className="text-pink" /> {depot.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps embed placeholder */}
              {/*
              <div className="mt-6 rounded-xl overflow-hidden border border-charcoal-light h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              */}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
