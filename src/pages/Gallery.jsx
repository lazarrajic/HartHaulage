import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { getContent } from '../utils/getContent';

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

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[200] bg-charcoal-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-5xl max-h-[85vh] mx-12" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.image}
          alt={photo.label}
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />
        <p className="text-center text-muted text-sm font-body mt-3">{photo.label}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted text-sm font-body">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

export default function Gallery() {
  const c = getContent();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = (activeFilter === 'all'
    ? c.gallery_photos
    : c.gallery_photos.filter(p => p.tag === activeFilter)
  ).filter(item => item.image);

  const handlePrev = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const handleNext = () => setLightboxIndex(i => (i + 1) % filtered.length);

  return (
    <>
      <title>Gallery | Hart Haulage Ltd</title>

      <PageHero
        title={c.gallery_hero_title}
        subtitle={c.gallery_hero_subtitle}
        image={c.gallery_hero_image}
        accent={c.gallery_hero_accent}
        cmsPage="Gallery"
      />

      <section className="bg-charcoal-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <AnimatedSection className="flex flex-wrap gap-3 mb-10">
            {c.gallery_filters.map(({ key, label }, i) => (
              <button
                key={key}
                onClick={() => { setActiveFilter(key); setLightboxIndex(null); }}
                data-cms={`Gallery - Filters - Label ${i + 1}`}
                className={`px-5 py-2 font-heading font-bold uppercase tracking-widest text-sm rounded transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-pink text-white'
                    : 'bg-charcoal-mid border border-charcoal-light text-muted hover:border-pink hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </AnimatedSection>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <AnimatedSection key={photo.image} delay={i * 50} className="break-inside-avoid">
                <div
                  className="relative overflow-hidden rounded-lg border border-charcoal-light hover:border-pink cursor-pointer group transition-all duration-300"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={photo.image}
                    alt={photo.label}
                    data-cms={`Gallery - Photos - Image ${i + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal-black/0 group-hover:bg-charcoal-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-heading font-bold uppercase text-sm tracking-widest transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
