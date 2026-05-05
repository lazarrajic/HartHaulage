export default function PageHero({ title, subtitle, image, accent, cmsPage }) {
  return (
    <section className="relative min-h-[45vh] flex items-end pb-16 pt-32 overflow-hidden">
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <img src={image} data-cms={`${cmsPage} - Hero - Image`} alt="" style={{ display: 'none' }} />
        </>
      )}
      <div className="absolute inset-0 bg-charcoal-black/75" />
      <div className="absolute inset-0 diagonal-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {accent && (
          <p className="text-pink font-heading font-bold uppercase tracking-[0.3em] text-sm mb-3" data-cms={`${cmsPage} - Hero - Accent`}>{accent}</p>
        )}
        <h1 className="font-heading font-black uppercase text-white text-5xl md:text-6xl lg:text-7xl leading-none" data-cms={`${cmsPage} - Hero - Title`}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-gray-300 font-body text-lg max-w-2xl" data-cms={`${cmsPage} - Hero - Subtitle`}>{subtitle}</p>
        )}
        <div className="mt-6 h-1 w-24 bg-pink rounded" />
      </div>
    </section>
  );
}
