import { EditorialScene } from "./EditorialScene";
import protectionPhoto from "../assets/mullins-packing.webp";
import { clientSite } from "../content";

const craftsmanshipItems = [
  "Professional wrapping and padding",
  "Organized loading and secure transport",
  "Careful placement at your destination",
];

export function ChapterThreeStandard() {
  return (
    <EditorialScene
      id="standard"
      titleId="chapter-three-title"
      media={{
        image: protectionPhoto,
        description: "A Mullins Moving crew member loading wrapped furniture into the truck",
        position: "center 44%",
      }}
    >
      <p className="section-eyebrow">White Glove Craftsmanship</p>
      <h2 id="chapter-three-title">Protection Is Our Standard.</h2>
      <p>We wrap and protect your furniture before loading, then organize it for safe transport and careful placement in your new home.</p>
      <ul className="editorial-list">
        {craftsmanshipItems.map(item => <li key={item}>{item}</li>)}
      </ul>
      <a className="text-cta" href={clientSite + "/white-glove-moving-service"}>Explore White-Glove Moving</a>
    </EditorialScene>
  );
}
