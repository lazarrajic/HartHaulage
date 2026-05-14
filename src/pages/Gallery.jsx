import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import c from '../content.js';

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  if (index === null || !photos[index]) return null;
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[200] bg-charcoal-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors">
        <ChevronLeft size={24} />
      </button>
      <div className="max-w-5xl max-h-[85vh] mx-12" onClick={(e) => e.stopPropagation()}>
        <img src={photo.image} alt={photo.label || `Gallery photo ${index + 1}`} className="max-h-[85vh] max-w-full object-contain rounded-lg" />
      </div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-charcoal-mid hover:bg-charcoal-light transition-colors">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted text-sm font-body">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

export default function Gallery() {
  useEffect(() => { window.scrollTo(0, 0) }, []);

  const tagKeys = [...new Set(c.gallery_photos.map(p => p.tag).filter(Boolean))]
  const filters = tagKeys.length > 0
    ? [{ key: 'all', label: 'All' }, ...tagKeys.map(t => ({ key: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))]
    : (c.gallery_filters || [{ key: 'all', label: 'All' }]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeFilter === 'all'
    ? c.gallery_photos
    : c.gallery_photos.filter(p => p.tag === activeFilter);

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
          {filters.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setActiveFilter(f.key); setLightboxIndex(null); }}
                  className={`px-5 py-2 font-heading font-bold uppercase tracking-widest text-sm rounded transition-all duration-200 ${
                    activeFilter === f.key
                      ? 'bg-pink text-white'
                      : 'bg-charcoal-mid border border-charcoal-light text-muted hover:border-pink hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          <div data-cms-repeater="Gallery - Photos" className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {c.gallery_photos.map((photo, i) => {
              const filteredIdx = filtered.indexOf(photo);
              if (activeFilter !== 'all' && photo.tag !== activeFilter) return null;
              return (
                <div
                  key={`${photo.image}-${i}`}
                  className="break-inside-avoid relative overflow-hidden rounded-lg border border-charcoal-light hover:border-pink cursor-pointer group transition-all duration-300"
                  onClick={() => setLightboxIndex(filteredIdx)}
                >
                  <img
                    src={photo.image}
                    data-cms-field="image"
                    alt={photo.label || `Gallery photo ${i + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="sr-only" data-cms-field="label">{photo.label}</span>
                  <span className="sr-only" data-cms-field="tag">{photo.tag}</span>
                  <div className="absolute inset-0 bg-charcoal-black/0 group-hover:bg-charcoal-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-heading font-bold uppercase text-sm tracking-widest transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              );
            })}
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
