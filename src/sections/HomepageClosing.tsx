import { EditorialScene } from "./EditorialScene";
import { GoogleReviews } from "./GoogleReviews";
import servicesPoster from "../assets/mullins-services-poster.webp";
import journalPhoto from "../assets/packing-dishes.webp";
import consultationPhoto from "../assets/customer-handshake.webp";
import reviewPhoto from "../assets/mullins-cap.webp";
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
    <EditorialScene
      id="services"
      titleId="services-title"
      media={{
        image: servicesPoster,
        video: "/videos/mullins-services-scroll.mp4",
        description: "Two movers carry furniture through a home with protected floors",
      }}
      imageFirst
    >
      <h2 id="services-title">Services Without Compromise.</h2>
      <ul className="service-index">
        {services.map(({ label, href }) => (
          <li key={label}>
            <a href={href}>{label} <span aria-hidden="true">↗</span></a>
          </li>
        ))}
      </ul>
      <a className="text-cta" href="/services">Explore All Moving Services</a>
    </EditorialScene>
  );
}

export function HomepageClosing() {
  return (
    <>
      <GoogleReviews backdrop={reviewPhoto} />
      <EditorialScene
        id="journal"
        titleId="journal-title"
        media={{ image: journalPhoto, description: "A mover wraps dishes in packing paper" }}
        imageFirst
      >
        <h2 id="journal-title">The Arizona Moving Journal.</h2>
        <p>Practical guides for planning your move, packing well, and getting settled.</p>
        <a className="text-cta" href={clientSite + "/blog"}>Explore the Journal</a>
      </EditorialScene>
      <EditorialScene
        id="consultation"
        titleId="consultation-title"
        media={{ image: consultationPhoto, description: "A member of the Mullins Moving team shakes hands with a customer" }}
      >
        <h2 id="consultation-title">Wherever Life Takes You, We’ll Help You Get There.</h2>
        <p>Tell us where you’re headed and what matters most about your move.</p>
        <div className="consultation-actions">
          <a className="button button-primary" href={quoteLink}>Request Your Move Consultation</a>
          <a className="text-cta" href={phoneLink}>Call {phoneLabel}</a>
        </div>
      </EditorialScene>
    </>
  );
}
