import { Link } from 'react-router-dom'

// 404. Site chrome rather than client copy, so it carries no data-cms fields —
// cms-check excludes notfound/404 files from the coverage scan for that reason.
// Styled from the same tokens as the rest of the site.
export default function NotFound() {
  return (
    <section className="bg-charcoal-dark flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-pink font-heading font-black text-6xl leading-none">404</p>
      <h1 className="font-heading font-black uppercase text-white text-3xl md:text-4xl tracking-wide mt-4">
        Page not found
      </h1>
      <p className="font-body text-gray-300 mt-3">
        That page doesn’t exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-body font-bold tracking-wide rounded transition-all duration-200 hover:scale-105"
      >
        Back to home
      </Link>
    </section>
  )
}
