import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import c from '../content.js';

const CMS_URL = 'http://localhost:3000/api/content/42185e69-0ca2-4372-9173-de94320b3ca7';

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  if (index === null || !photos[index]) return null;
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
          src={photo.url}
          alt={`Gallery photo ${index + 1}`}
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />
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
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([{ key: 'all', label: 'All' }]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CMS_URL)
      .then(r => r.json())
      .then(content => {
        try {
          const raw = JSON.parse(content['Gallery - Photos'] || '[]');
          setPhotos(
            raw.map(item => typeof item === 'string' ? { url: item, album: 'all' } : item)
               .filter(p => p && p.url)
          );
        } catch {}
        try {
          const rawAlbums = JSON.parse(content['Gallery - Photos - Albums'] || '[]');
          if (rawAlbums.length > 0) setAlbums(rawAlbums);
        } catch {}
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.album === activeFilter);

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
          {albums.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {albums.map((album) => (
                <button
                  key={album.key}
                  onClick={() => { setActiveFilter(album.key); setLightboxIndex(null); }}
                  className={`px-5 py-2 font-heading font-bold uppercase tracking-widest text-sm rounded transition-all duration-200 ${
                    activeFilter === album.key
                      ? 'bg-pink text-white'
                      : 'bg-charcoal-mid border border-charcoal-light text-muted hover:border-pink hover:text-white'
                  }`}
                >
                  {album.label}
                </button>
              ))}
            </div>
          )}

          {/* Photo Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted font-body text-sm">
              Loading gallery…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-muted font-body text-sm">
              No photos in this album yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((photo, i) => (
                <div
                  key={`${photo.url}-${i}`}
                  className="break-inside-avoid relative overflow-hidden rounded-lg border border-charcoal-light hover:border-pink cursor-pointer group transition-all duration-300"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={photo.url}
                    alt={`Gallery photo ${i + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal-black/0 group-hover:bg-charcoal-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-heading font-bold uppercase text-sm tracking-widest transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
