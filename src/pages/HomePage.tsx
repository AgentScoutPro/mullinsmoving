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
    <main id="main-content">
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
  );
}
