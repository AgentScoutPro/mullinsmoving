import { clientSite, googleMapsLink, phoneLabel, phoneLink, quoteLink } from "../content";
import crewPhoto from "../assets/mullins-crew.webp";
import { GoogleReviews } from "../sections/GoogleReviews";
import { ScrollReveal } from "../sections/ScrollReveal";

const mapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.9092122374236!2d-111.8833279236205!3d33.37343617342017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x65e3c8f7738d6501%3A0x43fe5554f2aa6f0a!2sMullins%20Moving!5e0!3m2!1sen!2sus!4v1795583552830!5m2!1sen!2sus";

export function ContactPage() {
  return (
    <main className="hub-page" id="main-content">
      <section className="hub-hero" aria-labelledby="contact-title">
        <img src={crewPhoto} alt="" fetchPriority="high" />
        <ScrollReveal className="hub-width">
          <nav className="hub-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact</span>
          </nav>
          <p className="section-eyebrow">Phoenix &amp; the East Valley</p>
          <h1 id="contact-title">Let’s Plan Your Move.</h1>
          <p>Tell us where you’re headed and when you’d like to move. Our Mesa team can help you plan the next step.</p>
          <div className="hub-actions">
            <a className="button button-primary" href={quoteLink}>Request Your Free Estimate</a>
            <a className="pillar-link" href={phoneLink}>Call {phoneLabel}</a>
          </div>
        </ScrollReveal>
      </section>

      <section className="hub-width hub-section" aria-labelledby="office-title">
        <ScrollReveal className="contact-location">
          <div>
            <h2 id="office-title">Mullins Moving in Mesa</h2>
            <address>
              2266 South Dobson Road, Suite 246<br />
              Mesa, AZ 85202
            </address>
            <a className="text-cta" href={googleMapsLink}>Open Mullins Moving in Google Maps →</a>
            <p><a className="pillar-link" href="/service-areas">Explore Phoenix &amp; East Valley service areas</a></p>
            <p><a className="pillar-link" href={clientSite + "/faq"}>Moving FAQs</a></p>
          </div>
          <iframe title="Mullins Moving office on Google Maps" src={mapEmbed} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </ScrollReveal>
      </section>

      <GoogleReviews />
    </main>
  );
}
