import { clientSite, phoneLabel, phoneLink } from "../content";
import { ChapterFiveJourney } from "../sections/ChapterFiveJourney";
import { ChapterFourServe } from "../sections/ChapterFourServe";
import { ChapterOneHero } from "../sections/ChapterOneHero";
import { ChapterSevenWherever } from "../sections/ChapterSevenWherever";
import { ChapterSixEastValley } from "../sections/ChapterSixEastValley";
import { ChapterThreeStandard } from "../sections/ChapterThreeStandard";
import { ChapterTwoBelongings } from "../sections/ChapterTwoBelongings";
import { HomepageClosing, HomeServices } from "../sections/HomepageClosing";

export function HomePage() {
  return (
    <>
      <header className="site-header">
        <a className="brand-lockup" href="/" aria-label="Mullins Moving home">
          <img src="/brand/mullins-logo-white.png" alt="Mullins Moving" width="472" height="239" />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#story">Our Story</a>
          <a href="#destinations">Destinations</a>
          <a href="#services">Services</a>
        </nav>
        <a className="header-cta" href="#consultation">Request Consultation</a>
      </header>
      <main>
        <ChapterOneHero />
        <ChapterTwoBelongings />
        <ChapterFourServe />
        <ChapterThreeStandard />
        <ChapterFiveJourney />
        <ChapterSevenWherever />
        <HomeServices />
        <ChapterSixEastValley />
        <HomepageClosing />
      </main>
      <footer className="site-footer">
        <a href="/" aria-label="Mullins Moving home">
          <img src="/brand/mullins-logo.png" alt="Mullins Moving. Top Tier Moving. Driven with Heart." width="424" height="216" loading="lazy" />
        </a>
        <div className="footer-links">
          <a href={phoneLink}>{phoneLabel}</a>
          <a href={clientSite + "/privacy-terms"}>Privacy &amp; Terms</a>
        </div>
      </footer>
    </>
  );
}
