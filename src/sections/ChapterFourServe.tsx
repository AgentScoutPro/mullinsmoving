import { EditorialScene } from "./EditorialScene";
import crew from "../assets/mullins-crew.webp";
import { clientSite } from "../content";

export function ChapterFourServe() {
  return (
    <EditorialScene
      staggerCopy
      id="story"
      titleId="chapter-four-title"
      media={{
        image: crew,
        description: "Mullins Moving crew with a customer",
        position: "center 36%",
        photoMotion: "portrait",
      }}
      imageFirst
    >
      <p className="section-eyebrow">Our Why</p>
      <h2 id="chapter-four-title">A Heart to Serve.</h2>
      <p>Moving day is personal. We show up with care, clear communication, and respect for the people and homes we serve.</p>
      <a className="text-cta" href={clientSite + "/about"}>Meet the Team Behind Mullins</a>
    </EditorialScene>
  );
}
