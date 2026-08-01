import profile from "../data/profile.json";

function joinFrench(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} et ${items.at(-1)}`;
}

export default function AboutSection() {
  const [beforeHighlight, afterHighlight] = profile.bio.split(profile.bioHighlight);

  return (
    <section id="a-propos" className="reference-section">
      <div className="reference-wrap">
        <div className="reference-section-head">
          <p className="section-kicker">{profile.ui.aboutEyebrow}</p>
          <h2 className="section-heading">{profile.ui.aboutTitle}</h2>
        </div>
        <div className="reference-about-grid">
          <p className="reference-bio">
            {beforeHighlight}
            <span className="reference-scribble">
              {profile.bioHighlight}
            </span>
            {afterHighlight}
          </p>
          <aside className="reference-offduty">
            <h3>{profile.ui.offDutyTitle}</h3>
            <p>
            {joinFrench(profile.offDuty)}.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
