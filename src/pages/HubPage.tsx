import { ScrollReveal } from "../sections/ScrollReveal";
import servicesPhoto from "../assets/mullins-packing.webp";
import localMap from "../assets/mm-image-map.webp";
import truckPhoto from "../assets/mullins-truck.webp";
import globalMap from "../assets/mm-section-7-global.webp";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";
import routes from "../hub-routes.json";

type HubPath = keyof typeof routes;
type Detail = { title: string; body: string; href?: string };
type Hub = {
  eyebrow: string;
  intro: string;
  image: string;
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
    image: servicesPhoto,
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
    image: localMap,
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
    image: truckPhoto,
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
    image: globalMap,
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
        <img src={hub.image} alt="" fetchPriority="high" />
        <ScrollReveal className="hub-width">
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
          <a className="button button-primary" href={quoteLink}>Request Your Free Estimate</a>
          <a className="pillar-link" href={clientSite + "/faq"}>Moving FAQs</a>
        </div>
      </section>
    </main>
  );
}
