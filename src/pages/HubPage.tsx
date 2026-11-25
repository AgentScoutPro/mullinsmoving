import { ScrollReveal } from "../sections/ScrollReveal";
import { EditorialScene, SceneVisual, type SceneMedia } from "../sections/EditorialScene";
import servicesPhoto from "../assets/mullins-organized-truck-poster.webp";
import localPhoto from "../assets/east-valley-arrival.webp";
import truckPhoto from "../assets/mullins-truck.webp";
import internationalPhoto from "../assets/loading-boxes.webp";
import packingPhoto from "../assets/packing-dishes.webp";
import consultationPhoto from "../assets/customer-handshake.webp";
import patioPhoto from "../assets/mesa-patio.webp";
import skylinePhoto from "../assets/arizona-skyline.webp";
import loadingPhoto from "../assets/mullins-packing.webp";
import belongingsPhoto from "../assets/mm-section-2-v2.webp";
import relocationPhoto from "../assets/mm-section-7-global.webp";
import crewPhoto from "../assets/mullins-crew.webp";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";
import routes from "../hub-routes.json";

type HubPath = Exclude<keyof typeof routes, "/contact">;
type Detail = { title: string; body: string; href?: string };
type HubScene = { title: string; body: string; media: SceneMedia };

type Hub = {
  eyebrow: string;
  intro: string;
  hero: SceneMedia;
  feature: HubScene;
  closing: HubScene;
  heading: string;
  details: Detail[];
  next?: Detail[];
};

const destinations: Detail[] = [
  { title: "Phoenix & East Valley", body: "Find your city and plan a local move.", href: "/service-areas" },
  { title: "Long-distance moving", body: "Plan an interstate move from Arizona.", href: "/long-distance-moving" },
  { title: "International relocation", body: "Start with an overseas moving consultation.", href: "/international-moving" },
];

const hubs: Record<HubPath, Hub> = {
  "/services": {
    eyebrow: "The Mullins Standard",
    intro: "From protecting a family heirloom to moving an entire office, we help you choose the right level of care for your move.",
    hero: {
      image: servicesPhoto,
      description: "Wrapped furniture and labeled boxes secured inside a moving truck",
      video: "/videos/mullins-organized-truck-scroll.mp4",
    },
    feature: {
      title: "Care starts with the first box.",
      body: "From wrapping dishes to padding furniture and protecting floors, we plan the work around your home and what you need moved. Choose the services that fit your move.",
      media: { image: packingPhoto, description: "A Mullins mover wraps dishes in packing paper" },
    },
    closing: {
      title: "Tell us what your move needs.",
      body: "Share your dates, the amount you’re moving, and any pieces that need special care. We’ll help you decide where packing, protection, and placement make the most difference.",
      media: { image: consultationPhoto, description: "A Mullins team member shakes hands with a customer" },
    },
    heading: "A move for every chapter.",
    details: [
      { title: "White-glove moving", body: "Plan protection, careful handling, and placement for the items that need extra attention.", href: clientSite + "/white-glove-moving-service" },
      { title: "Residential moving", body: "Coordinate furniture, boxes, access, and the details of getting settled at home.", href: clientSite + "/residential-moving" },
      { title: "Commercial moving", body: "Schedule your office move around access, equipment, and business hours.", href: clientSite + "/commercial-moving-services" },
      { title: "Packing & unpacking", body: "Ask for full or partial packing based on what you want help with.", href: clientSite + "/services" },
      { title: "Senior moving", body: "Plan the move alongside family or caregivers and coordinate access at the new home.", href: clientSite + "/senior-moving-services-az" },
      { title: "Specialty items", body: "Tell us about fragile, oversized, or high-value pieces so we can plan ahead.", href: quoteLink },
    ],
    next: destinations,
  },
  "/service-areas": {
    eyebrow: "Arizona Is Home",
    intro: "Whether you’re moving across Gilbert or across the Valley, start with the crew that calls Arizona home.",
    hero: { image: localPhoto, description: "", position: "66% center" },
    feature: {
      title: "Every neighborhood has its details.",
      body: "A gated community, a downtown loading zone, and a home with a long driveway each call for a different plan. Tell us about parking, gate access, stairs, and any building rules when you request your estimate.",
      media: { image: patioPhoto, description: "" },
    },
    closing: {
      title: "Moving across the Valley?",
      body: "Tell us where you’re starting, where you’re headed, and when you need to move. We’ll use those details to plan for both homes.",
      media: { image: skylinePhoto, description: "" },
    },
    heading: "Find your city.",
    details: [
      { title: "Gilbert", body: "Including Agritopia, Val Vista Lakes, and Morrison Ranch.", href: clientSite + "/moving-to-gilbert-arizona" },
      { title: "Scottsdale", body: "Including Old Town, DC Ranch, and Grayhawk.", href: clientSite + "/professional-movers-in-scottsdale-az" },
      { title: "Mesa", body: "Including Eastmark, Las Sendas, and Red Mountain Ranch.", href: clientSite + "/moving-to-mesa-az" },
      { title: "Chandler", body: "Including Ocotillo, Sun Lakes, and Fulton Ranch.", href: clientSite + "/moving-to-chandler-arizona" },
      { title: "Queen Creek", body: "Ask about pickup and delivery dates in Queen Creek and nearby communities.", href: clientSite + "/service-areas" },
      { title: "Tempe", body: "From the ASU area to South Tempe and the Kyrene Corridor.", href: clientSite + "/movers-in-tempe-arizona" },
      { title: "Paradise Valley", body: "Plan access, protection, and placement for your home move.", href: clientSite + "/moving-resources-for-paradise-valley-az" },
      { title: "Phoenix", body: "Including Arcadia, Biltmore, and Central Phoenix.", href: clientSite + "/moving-tips-phoenix-arizona" },
    ],
  },
  "/long-distance-moving": {
    eyebrow: "Across State Lines",
    intro: "Move from the Phoenix area with a dedicated truck, one team, and a written quote for the inventory and services you agree on.",
    hero: { image: truckPhoto, description: "Mullins Moving truck", position: "66% center" },
    feature: {
      title: "Your own truck. A clear plan.",
      body: "Before the truck leaves Arizona, we confirm your inventory, what needs extra protection, and how the crew will access both homes. Your written quote lays out the services you’ve agreed on.",
      media: { image: loadingPhoto, description: "A Mullins mover loads wrapped furniture into a truck", position: "center 44%" },
    },
    closing: {
      title: "Plan for the day you arrive.",
      body: "Tell us which rooms the furniture belongs in and what needs reassembly. We’ll account for those details alongside the delivery window and access at your new address.",
      media: { image: belongingsPhoto, description: "Movers carry a framed family portrait inside a home", position: "72% center" },
    },
    heading: "What to expect on an interstate move.",
    details: [
      { title: "Start with the details", body: "Share both addresses, your dates, access conditions, inventory, and packing needs." },
      { title: "Get a written plan", body: "Confirm what is included in your quote and how pickup and delivery will be scheduled." },
      { title: "Travel on a dedicated truck", body: "Your belongings travel directly to your destination on a truck reserved for your move." },
      { title: "Settle in at arrival", body: "The team unloads, reassembles furniture, and places it in the rooms you designate." },
    ],
    next: [destinations[0], destinations[2]],
  },
  "/international-moving": {
    eyebrow: "Across Borders",
    intro: "Planning an overseas move? Tell us where you’re headed, what you’re taking, and when you need to arrive. We’ll discuss your options and the next steps for your route.",
    hero: { image: internationalPhoto, description: "", position: "66% center" },
    feature: {
      title: "Start with your destination.",
      body: "Your destination, household inventory, and arrival window shape the conversation. Bring those details so we can discuss the arrangements available for your route.",
      media: { image: relocationPhoto, description: "" },
    },
    closing: {
      title: "Talk through the route with us.",
      body: "Bring your questions about timing, packing, paperwork, and who handles each stage. We’ll help you work through the next steps for the route you’re considering.",
      media: { image: crewPhoto, description: "Mullins Moving crew with a customer", position: "center 36%" },
    },
    heading: "What to bring to your consultation.",
    details: [
      { title: "Your origin and destination", body: "Share your pickup city and your destination country and city, even if the final address is still open." },
      { title: "Your timing", body: "Bring your target move date, delivery window, and any time you’ll need between homes." },
      { title: "What you’re taking", body: "List your household goods, furniture, and fragile or high-value pieces. Include any items you plan to leave behind." },
      { title: "Questions about shipping", body: "Ask which arrangements are available for your route, who handles each stage, and what paperwork you may need." },
    ],
    next: [destinations[0], destinations[1]],
  },
};

export function isHubPath(path: string): path is HubPath {
  return Object.prototype.hasOwnProperty.call(hubs, path);
}

export function HubPage({ path }: { path: HubPath }) {
  const hub = hubs[path];
  return (
    <main className="hub-page" id="main-content">
      <section className="hub-hero" aria-labelledby="hub-title">
        <SceneVisual photoMotion="story" {...hub.hero} priority />
        <ScrollReveal className="hub-width hub-hero-copy" stagger>
          <nav className="hub-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{routes[path].title}</span>
          </nav>
          <p className="section-eyebrow">{hub.eyebrow}</p>
          <h1 id="hub-title">{routes[path].title}</h1>
          <p>{hub.intro}</p>
          <div className="hub-actions">
            <a className="button button-primary" href={quoteLink}>Request Your Free Estimate</a>
            <a className="pillar-link" href={phoneLink}>Call {phoneLabel}</a>
          </div>
        </ScrollReveal>
      </section>
      <EditorialScene
        titleId="hub-feature"
        media={{ photoMotion: "story", ...hub.feature.media }}
        imageFirst
        staggerCopy
      >
        <h2 id="hub-feature">{hub.feature.title}</h2>
        <p>{hub.feature.body}</p>
      </EditorialScene>
      <section className="hub-width hub-section" aria-labelledby="hub-details">
        <h2 id="hub-details">{hub.heading}</h2>
        <ScrollReveal className="hub-grid">
          {hub.details.map(({ title, body, href }) => (
            <article key={title}>
              <h3>{href ? <a href={href}>{title} <span aria-hidden="true">↗</span></a> : title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </ScrollReveal>
        {path === "/service-areas" && (
          <a className="text-cta" href={clientSite + "/service-areas"}>See the full service-area directory</a>
        )}
      </section>
      <section className="hub-width hub-section hub-discover" aria-labelledby="hub-next">
        <h2 id="hub-next">Keep planning your move.</h2>
        <ScrollReveal className="hub-grid">
          {(hub.next ?? destinations.slice(1)).map(({ title, body, href }) => (
            <article key={title}>
              <h3><a href={href}>{title} <span aria-hidden="true">→</span></a></h3>
              <p>{body}</p>
            </article>
          ))}
        </ScrollReveal>
        <div className="hub-actions">
          <a className="text-cta" href={clientSite + "/faq"}>Moving FAQs</a>
        </div>
      </section>
      <EditorialScene
        titleId="hub-closing"
        media={{ photoMotion: "portrait", ...hub.closing.media }}
        staggerCopy
      >
        <h2 id="hub-closing">{hub.closing.title}</h2>
        <p>{hub.closing.body}</p>
        <div className="consultation-actions">
          <a className="button button-primary" href={quoteLink}>Request Your Free Estimate</a>
          <a className="text-cta" href={phoneLink}>Call {phoneLabel}</a>
        </div>
      </EditorialScene>
    </main>
  );
}
