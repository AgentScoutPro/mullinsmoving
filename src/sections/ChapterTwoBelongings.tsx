import { SceneVisual } from "./EditorialScene";
import { ScrollReveal } from "./ScrollReveal";
import sectionTwoImage from "../assets/mm-section-2-v2.webp";

const statements = ["Carefully wrapped", "Professionally protected", "Handled like our own"];

export function ChapterTwoBelongings() {
  return (
    <section className="chapter-two" aria-labelledby="chapter-two-title">
      <div className="chapter-two-inner">
        <ScrollReveal className="chapter-two-copy" stagger>
          <p className="section-eyebrow">What We Protect</p>
          <h2 id="chapter-two-title">We Move More Than Belongings.</h2>
          <p className="chapter-two-subhead">We move lives forward.</p>
          <div className="chapter-two-body">
            <p>Family photographs, heirlooms, and the furniture that makes a house feel like home all carry a story. We wrap, protect, and move them with care.</p>
          </div>
          <ul className="chapter-two-statements">
            {statements.map((statement) => <li key={statement}>{statement}</li>)}
          </ul>
          <a className="text-cta" href="#standard">Discover The Mullins Standard</a>
        </ScrollReveal>

        <SceneVisual
          className="chapter-two-media"
          image={sectionTwoImage}
          description="Movers carrying a framed family portrait in a home"
          position="72% center"
          photoMotion="story"
        />
      </div>
    </section>
  );
}
