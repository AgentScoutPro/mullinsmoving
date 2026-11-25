import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollReveal } from "../sections/ScrollReveal";
import { EditorialScene, SceneVisual, type SceneMedia } from "../sections/EditorialScene";
import servicesPhoto from "../assets/mullins-organized-truck-poster.webp";
import localPhoto from "../assets/east-valley-arrival.webp";
import truckPhoto from "../assets/mullins-truck.webp";
import internationalPhoto from "../assets/loading-boxes.webp";
import screenProtection from "../assets/mullins-protecting-flat-screen.webp";
import specialtyItem from "../assets/mullins-specialty-item-protection.webp";
import driveway from "../assets/mullins-driveway-access.webp";
import neighborhoodTruck from "../assets/mullins-neighborhood-truck.webp";
import truckRamp from "../assets/mullins-loading-truck-ramp.webp";
import furniturePlacement from "../assets/mullins-team-placing-furniture.webp";
import wrappedPieces from "../assets/mullins-wrapped-specialty-pieces.webp";
import protectedInventory from "../assets/mullins-protected-household-inventory.webp";
import { clientSite, phoneLabel, phoneLink, quoteLink } from "../content";
import routes from "../hub-routes.json";

type HubPath = Exclude<keyof typeof routes, "/contact">;
type Detail = { title: string; body: string; href?: string };
type DetailSection = { heading: string; details: Detail[] };
type HubScene = { title: string; body: string; media: SceneMedia };

type Hub = {
  eyebrow: string;
  intro: string;
  hero: SceneMedia;
  feature: HubScene;
  closing: HubScene;
  heading: string;
  details: Detail[];
  more?: DetailSection;
  resources?: { label: string; href: string }[];
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
      media: { image: screenProtection, description: "Two Mullins movers prepare a large flat-screen TV for transport", position: "44% 68%" },
    },
    closing: {
      title: "Tell us what your move needs.",
      body: "Share your dates, the amount you’re moving, and any pieces that need special care. We’ll help you decide where packing, protection, and placement make the most difference.",
      media: { image: specialtyItem, description: "A large padded piece is prepared for loading into the moving truck", position: "65% center" },
    },
    heading: "A move for every chapter.",
    details: [
      { title: "White-glove and estate moving", body: "Plan fine art, antiques, and custom furniture with a dedicated coordinator. Ask about custom crating, final placement, furniture assembly, and packing debris removal.", href: clientSite + "/white-glove-moving-service" },
      { title: "Residential and apartment moving", body: "Move from a house, condo, or apartment with a plan for stairs, elevators, loading zones, and furniture protection at both addresses.", href: clientSite + "/residential-moving" },
      { title: "Commercial and office moving", body: "Coordinate the move around business hours, building access, furniture, and equipment. The crew can place items according to your floor plan.", href: clientSite + "/commercial-moving-services" },
      { title: "Packing and unpacking", body: "Choose full-home packing or help with selected rooms and fragile items. Ask about labeled boxes and unpacking at the new address." },
      { title: "Senior and assisted-living moves", body: "Plan downsizing, furniture placement, and move-in access with family, caregivers, or the receiving community.", href: clientSite + "/senior-moving-services-az" },
      { title: "Specialty items", body: "Flag pianos, safes, artwork, and oversized pieces during the estimate so the crew can plan handling, protection, and access." },
      { title: "Labor-only help", body: "Book a crew to load or unload a rental truck or portable container, or to rearrange heavy furniture within your home." },
      { title: "Storage between homes", body: "If the dates for your two homes don’t line up, ask about storage options and how pickup, storage, and final delivery would fit together." },
    ],
    more: {
      heading: "Moving for work or service.",
      details: [
        { title: "Military moves", body: "Share your orders timeline, inventory, and any reimbursement documentation your move requires.", href: clientSite + "/military-movers" },
        { title: "First responder moves", body: "Talk through your shift schedule and see the moving support Mullins offers first responders.", href: clientSite + "/first-responder-movers" },
        { title: "Moving discounts", body: "See the current eligibility and terms for military members, first responders, and educators.", href: clientSite + "/discounts" },
      ],
    },
    resources: [
      { label: "Review valuation options", href: clientSite + "/moving-insurance-options" },
      { label: "Read client moving stories", href: clientSite + "/reviews-stories" },
    ],
    next: destinations,
  },
  "/service-areas": {
    eyebrow: "Arizona Is Home",
    intro: "Plan a residential, white-glove, or commercial move across the East Valley, Greater Phoenix, or elsewhere in Arizona. Start with your city and share both addresses so we can plan the route and access.",
    hero: { image: localPhoto, description: "", position: "66% center" },
    feature: {
      title: "Every neighborhood has its details.",
      body: "A gated estate in Paradise Valley and a condo in Old Town Scottsdale call for different plans. Share gate and HOA rules, elevator reservations, parking, or steep driveways early so the crew can plan truck access and protect your home.",
      media: { image: driveway, description: "A Mullins truck positioned in a residential driveway", position: "44% center" },
    },
    closing: {
      title: "Moving across the Valley?",
      body: "Tell us where you’re starting, where you’re headed, and when you need to move. We’ll use those details to plan for both homes.",
      media: { image: neighborhoodTruck, description: "A purple and gold Mullins truck outside a home", position: "50% 43%" },
    },
    heading: "Find your city or community.",
    details: [
      { title: "Gilbert", body: "Agritopia, Val Vista Lakes, Morrison Ranch, Cooley Station, and Whitewing.", href: clientSite + "/moving-company-gilbert-arizona" },
      { title: "Scottsdale", body: "Old Town condos, DC Ranch, Grayhawk, and North Scottsdale homes.", href: clientSite + "/moving-company-scottsdale-arizona" },
      { title: "Mesa", body: "Eastmark, Las Sendas, Red Mountain Ranch, Dobson Ranch, and Downtown Mesa.", href: clientSite + "/moving-company-mesa-arizona" },
      { title: "Chandler", body: "Ocotillo, Fulton Ranch, Downtown Chandler, and nearby Sun Lakes.", href: clientSite + "/moving-company-chandler-arizona" },
      { title: "Queen Creek", body: "Cortina, Montelena, and Queen Creek Crossroads.", href: clientSite + "/moving-company-queen-creek-arizona" },
      { title: "Tempe", body: "The ASU area, South Tempe, Warner Ranch, and the Kyrene Corridor.", href: clientSite + "/moving-company-tempe-arizona" },
      { title: "Paradise Valley", body: "White-glove planning for estates, high-value furnishings, and private or gated access.", href: clientSite + "/moving-company-paradise-valley-arizona" },
      { title: "Phoenix", body: "Arcadia, Biltmore, Central Phoenix, and Desert Ridge.", href: clientSite + "/moving-company-phoenix-arizona" },
      { title: "San Tan Valley", body: "Johnson Ranch, Pecan Creek, and Skyline Ranch.", href: clientSite + "/moving-company-san-tan-valley-arizona" },
      { title: "Ahwatukee", body: "Lakewood, The Foothills, and Mountain Park Ranch.", href: clientSite + "/moving-company-ahwatukee-arizona" },
      { title: "Fountain Hills", body: "Eagle Mountain, Firerock, and Sunridge Canyon.", href: clientSite + "/moving-company-fountain-hills-arizona" },
      { title: "Apache Junction", body: "Apache Junction, Gold Canyon, and the Superstition Foothills.", href: clientSite + "/moving-company-apache-junction-arizona" },
    ],
    more: {
      heading: "Explore neighborhood moving guides.",
      details: [
        { title: "Agritopia", body: "Gilbert", href: clientSite + "/locations/agritopia-movers" },
        { title: "Morrison Ranch", body: "Gilbert", href: clientSite + "/locations/morrison-ranch-movers" },
        { title: "Val Vista Lakes", body: "Gilbert", href: clientSite + "/locations/val-vista-lakes-movers" },
        { title: "Cooley Station", body: "Gilbert", href: clientSite + "/locations/cooley-station-movers" },
        { title: "Eastmark", body: "Mesa", href: clientSite + "/locations/eastmark-movers" },
        { title: "Las Sendas", body: "Mesa", href: clientSite + "/locations/las-sendas-movers" },
        { title: "Ocotillo", body: "Chandler", href: clientSite + "/locations/ocotillo-movers" },
        { title: "Fulton Ranch", body: "Chandler", href: clientSite + "/locations/fulton-ranch-movers" },
        { title: "Cortina", body: "Queen Creek", href: clientSite + "/locations/cortina-movers" },
      ],
    },
    resources: [
      { label: "North Phoenix, Anthem and Peoria", href: clientSite + "/north-phoenix-az-anthem-peoria" },
      { label: "Glendale", href: clientSite + "/moving-to-glendale-az" },
      { label: "West Valley moving guide", href: clientSite + "/move-to-west-phoenix-az" },
      { label: "Local moving resources", href: clientSite + "/moving-resources" },
    ],
  },
  "/long-distance-moving": {
    eyebrow: "Across State Lines",
    intro: "Move from Phoenix or the East Valley with one Mullins team, a truck reserved for your household, and a written binding quote for the agreed inventory, services, and access conditions.",
    hero: { image: truckPhoto, description: "Mullins Moving truck", position: "66% center" },
    feature: {
      title: "Your own truck. A clear plan.",
      body: "You book directly with Mullins. The same team handles loading, transportation, unloading, and placement. Your household travels on its own truck, with pickup and delivery arrangements agreed before move day.",
      media: { image: truckRamp, description: "A mover guides a wrapped piece up the truck ramp", position: "70% 52%" },
    },
    closing: {
      title: "Plan for the day you arrive.",
      body: "Tell us which rooms the furniture belongs in and what needs reassembly. We’ll account for those details alongside the delivery window and access at your new address.",
      media: { image: furniturePlacement, description: "Several movers work together to maneuver a large piece of furniture indoors", position: "55% 55%" },
    },
    heading: "What to expect on an interstate move.",
    details: [
      { title: "Review both addresses", body: "Share your dates, inventory, stairs and elevators, truck access, packing needs, and any specialty pieces at the consultation." },
      { title: "Confirm the binding quote", body: "Review the agreed inventory, services, and access conditions in writing. Tell your coordinator about changes so they can be addressed ahead of pickup." },
      { title: "Protect, load, and transport", body: "The crew pads and wraps furniture as needed and protects mirrors and glass. Ask about full or partial packing and unpacking in your written plan." },
      { title: "Settle in at arrival", body: "Furniture disassembly, reassembly, and placement are included. The crew unloads into the rooms you designate and walks through the delivery with you." },
    ],
    more: {
      heading: "See how real interstate moves came together.",
      details: [
        { title: "Scottsdale to San Diego", body: "A two-bedroom household move with white-glove care and direct transportation." },
        { title: "Phoenix to Bethesda", body: "A three-bedroom household move with full packing before the interstate trip." },
        { title: "Gilbert to Irvine", body: "A household move that needed a short storage window between homes." },
      ],
    },
    resources: [
      { label: "Read the full client stories", href: clientSite + "/reviews-stories" },
      { label: "Review valuation options", href: clientSite + "/moving-insurance-options" },
      { label: "Verify registration and household-goods authority: USDOT 4250923, MC 1647731", href: "https://www.fmcsa.dot.gov/protect-your-move/search-mover" },
      { label: "Review the FMCSA moving checklist", href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist" },
    ],
    next: [destinations[0], destinations[2]],
  },
  "/international-moving": {
    eyebrow: "Across Borders",
    intro: "Start planning your international household relocation from Arizona. Share your destination, timing, and inventory so Mullins can discuss the arrangements available for your route.",
    hero: { image: internationalPhoto, description: "", position: "66% center" },
    feature: {
      title: "Start with your destination.",
      body: "The right plan starts with what you’re taking and when you need it. Share which essentials need to arrive first, what can travel later, and which heirlooms, artwork, or furnishings may need special preparation.",
      media: { image: wrappedPieces, description: "Movers maneuver padded oversize pieces on wheeled dollies", position: "55% 60%" },
    },
    closing: {
      title: "Talk through the route with us.",
      body: "Tell us if this is a household, corporate or executive relocation, or a military move. Bring any employer or orders deadlines so the consultation can cover timing, responsibilities, and next steps.",
      media: { image: protectedInventory, description: "Wrapped household furniture staged for moving on a protected floor", position: "55% 60%" },
    },
    heading: "What to bring to your consultation.",
    details: [
      { title: "Your origin and destination", body: "Share your pickup city and your destination country and city, even if the final address is still open." },
      { title: "Your timing", body: "Bring your target move date, delivery window, and any time you’ll need between homes." },
      { title: "What you’re taking", body: "List your household goods, furniture, and fragile or high-value pieces. Include any items you plan to leave behind." },
    ],
    more: {
      heading: "What to confirm before you book.",
      details: [
        { title: "Freight and timing", body: "Ask whether ocean or air freight is available for your route, how a shipment would be packed or containerized, and how the delivery window is set." },
        { title: "Customs and paperwork", body: "Ask which inventory and customs documents your destination requires, who prepares them, and when they need to be ready." },
        { title: "Pickup, handoffs, and delivery", body: "Confirm who handles packing and origin pickup, who takes over in transit, and whether destination delivery, storage, unpacking, or placement can be arranged." },
      ],
    },
    resources: [{ label: "Explore white-glove packing and protection", href: clientSite + "/white-glove-moving-service" }],
    next: [destinations[0], destinations[1]],
  },
};

function HubDetails({
  id, heading, details, interactive, children,
}: DetailSection & { id: string; interactive: boolean; children?: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className={children ? "hub-width hub-section hub-discover" : "hub-width hub-section"} aria-labelledby={id} data-interactive-cards={interactive || undefined}>
      <ScrollReveal>
        <h2 id={id}>{heading}</h2>
      </ScrollReveal>
      <div className="hub-grid">
        {details.map(({ title, body, href }, index) => (
          <motion.article
            key={title}
            initial={reducedMotion ? false : { opacity: .72, y: 16, scale: interactive ? .96 : 1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: .5, delay: (index % 3) * .055, ease: "easeOut" }}
          >
            <h3>{href ? <a href={href}>{title} <span aria-hidden="true">{href.startsWith("/") ? "→" : "↗"}</span></a> : title}</h3>
            <p>{body}</p>
          </motion.article>
        ))}
      </div>
      {children}
    </section>
  );
}

export function isHubPath(path: string): path is HubPath {
  return Object.prototype.hasOwnProperty.call(hubs, path);
}

export function HubPage({ path }: { path: HubPath }) {
  const hub = hubs[path];
  const interactiveCards = path === "/service-areas";
  const estimateLabel = path === "/international-moving"
    ? "Request an International Consultation"
    : "Request Your Free Estimate";
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
            <a className="button button-primary" href={quoteLink}>{estimateLabel}</a>
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
      <HubDetails heading={hub.heading} details={hub.details} id="hub-details" interactive={interactiveCards} />
      {hub.more && <HubDetails {...hub.more} id="hub-more" interactive={interactiveCards} />}
      <HubDetails id="hub-next" heading="Keep planning your move." details={hub.next ?? destinations.slice(1)} interactive={interactiveCards}>
        <ScrollReveal className="hub-actions">
          {hub.resources?.map(({ label, href }) => (
            <a className="text-cta" href={href} key={href}>{label}</a>
          ))}
          <a className="text-cta" href={clientSite + "/faq"}>Moving FAQs</a>
        </ScrollReveal>
      </HubDetails>
      <EditorialScene
        titleId="hub-closing"
        media={{ photoMotion: "portrait", ...hub.closing.media }}
        staggerCopy
      >
        <h2 id="hub-closing">{hub.closing.title}</h2>
        <p>{hub.closing.body}</p>
        <div className="consultation-actions">
          <a className="button button-primary" href={quoteLink}>{estimateLabel}</a>
          <a className="text-cta" href={phoneLink}>Call {phoneLabel}</a>
        </div>
      </EditorialScene>
    </main>
  );
}
