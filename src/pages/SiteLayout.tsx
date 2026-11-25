import { useEffect, type ReactNode } from "react";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand-lockup" href="/" aria-label="Mullins Moving home">
          <img src="/brand/mullins-logo-white.png" alt="Mullins Moving" width="472" height="239" />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="/#story">Our Story</a>
          <a href="/#destinations">Destinations</a>
          <a href="/services">Services</a>
          <a href="/service-areas">Service Areas</a>
        </nav>
        <a className="header-cta" href={quoteLink}>Request Consultation</a>
      </header>
      {children}
      <footer className="site-footer">
        <a href="/" aria-label="Mullins Moving home">
          <img src="/brand/mullins-logo-white.png" alt="Mullins Moving. Top Tier Moving. Driven with Heart." width="472" height="239" loading="lazy" />
        </a>
        <div className="footer-links">
          <a href={phoneLink}>{phoneLabel}</a>
          <a href="/contact">Contact</a>
          <a href={clientSite + "/faq"}>FAQ</a>
          <a href="/#reviews">Reviews</a>
          <a href={clientSite + "/privacy-terms"}>Privacy &amp; Terms</a>
        </div>
      </footer>
    </>
  );
}
