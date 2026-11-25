import { ScrollReveal } from "./ScrollReveal";
import belongingsImage from "../assets/mm-section-2-v2.webp";
import driverImage from "../assets/mullins-driver.webp";
import { GoogleReviews } from "./GoogleReviews";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";

const services = [
  { label: "Residential moving", href: clientSite + "/residential-moving" },
  { label: "Commercial moving", href: clientSite + "/commercial-moving-services" },
  { label: "Long-distance moving", href: "/long-distance-moving" },
  { label: "International relocation", href: "/international-moving" },
  { label: "White-glove moving", href: clientSite + "/white-glove-moving-service" },
];

export function HomeServices() {
  return (
    <section className="closing-scene" id="services" aria-labelledby="services-title">
      <img className="closing-media" src={belongingsImage} alt="" loading="lazy" decoding="async" />
      <ScrollReveal className="closing-content">
        <h2 id="services-title">Services Without Compromise.</h2>
        <ul className="service-index">
          {services.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>
                {label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="text-cta" href="/services">Explore All Moving Services</a>
      </ScrollReveal>
    </section>
  );
}

export function HomepageClosing() {
  return (
    <>
      <GoogleReviews />
      <section className="closing-scene" id="journal" aria-labelledby="journal-title">
        <img className="closing-media" src={driverImage} alt="" loading="lazy" decoding="async" />
        <ScrollReveal className="closing-content">
          <h2 id="journal-title">The Arizona Moving Journal.</h2>
          <p>Practical guides for planning your move, packing well, and getting settled.</p>
          <a className="text-cta" href={clientSite + "/blog"}>Explore the Journal</a>
        </ScrollReveal>
      </section>
      <section className="closing-scene consultation-scene" id="consultation" aria-labelledby="consultation-title">
        <img className="closing-media" src={belongingsImage} alt="" loading="lazy" decoding="async" />
        <ScrollReveal className="closing-content">
          <h2 id="consultation-title">Wherever Life Takes You, We’ll Help You Get There.</h2>
          <p>Tell us where you’re headed and what matters most about your move.</p>
          <div className="consultation-actions">
            <a className="button button-primary" href={quoteLink}>Request Your Move Consultation</a>
            <a className="text-cta" href={phoneLink}>Call {phoneLabel}</a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
