import belongingsImage from "../assets/mm-section-2-v2.webp";
import driverImage from "../assets/mullins-driver.webp";
import crewImage from "../assets/mullins-crew.webp";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";

const services = [
  { label: "Residential moving", path: "/residential-moving" },
  { label: "Commercial moving", path: "/commercial-moving-services" },
  { label: "Long-distance moving", path: "/long-distance-moving" },
  { label: "International relocation", path: "#international" },
  { label: "White-glove moving", path: "/white-glove-moving-service" },
  { label: "Packing, unpacking & storage", path: "/services" },
];

export function HomeServices() {
  return (
    <section className="closing-scene" id="services" aria-labelledby="services-title">
      <img className="closing-media" src={belongingsImage} alt="" loading="lazy" decoding="async" />
      <div className="closing-content">
        <h2 id="services-title">Services Without Compromise.</h2>
        <ul className="service-index">
          {services.map(({ label, path }) => (
            <li key={label}>
              <a href={path.startsWith("#") ? path : clientSite + path}>
                {label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomepageClosing() {
  return (
    <>
      <section className="closing-scene" id="reviews" aria-labelledby="reviews-title">
        <img className="closing-media" src={crewImage} alt="" loading="lazy" decoding="async" />
        <div className="closing-content">
          <h2 id="reviews-title">Stories Worth Moving.</h2>
          <p>Hear from families and businesses who chose Mullins for their move.</p>
          <a className="text-cta" href={clientSite + "/reviews-stories"}>Read Reviews &amp; Stories</a>
        </div>
      </section>
      <section className="closing-scene" id="journal" aria-labelledby="journal-title">
        <img className="closing-media" src={driverImage} alt="" loading="lazy" decoding="async" />
        <div className="closing-content">
          <h2 id="journal-title">The Arizona Moving Journal.</h2>
          <p>Practical guides for planning your move, packing well, and getting settled.</p>
          <a className="text-cta" href={clientSite + "/blog"}>Explore the Journal</a>
        </div>
      </section>
      <section className="closing-scene consultation-scene" id="consultation" aria-labelledby="consultation-title">
        <img className="closing-media" src={belongingsImage} alt="" loading="lazy" decoding="async" />
        <div className="closing-content">
          <h2 id="consultation-title">Wherever Life Takes You, We’ll Help You Get There.</h2>
          <p>Tell us where you’re headed and what matters most about your move.</p>
          <div className="consultation-actions">
            <a className="button button-primary" href={quoteLink}>Request Your Move Consultation</a>
            <a className="text-cta" href={phoneLink}>Call {phoneLabel}</a>
          </div>
        </div>
      </section>
    </>
  );
}
