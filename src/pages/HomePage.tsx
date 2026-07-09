import { ChapterFiveJourney } from "../sections/ChapterFiveJourney";
import { ChapterFourServe } from "../sections/ChapterFourServe";
import { ChapterOneHero } from "../sections/ChapterOneHero";
import { ChapterSixEastValley } from "../sections/ChapterSixEastValley";
import { ChapterThreeStandard } from "../sections/ChapterThreeStandard";
import { ChapterTwoBelongings } from "../sections/ChapterTwoBelongings";

export function HomePage() {
  return (
    <main>
      <ChapterOneHero />
      <ChapterTwoBelongings />
      <ChapterThreeStandard />
      <ChapterFourServe />
      <ChapterFiveJourney />
      <ChapterSixEastValley />
    </main>
  );
}
