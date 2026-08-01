import profile from "../data/profile.json";

const rotations = [-2, 1.5, -1, 2.5, -1.5, 1];

export default function StackSection() {
  return (
    <section id="stack" className="reference-section">
      <div className="reference-wrap">
        <div className="reference-section-head">
          <p className="section-kicker">{profile.ui.stackEyebrow}</p>
          <h2 className="section-heading">{profile.ui.stackTitle}</h2>
          <p className="section-description">{profile.ui.stackDescription}</p>
        </div>

        <div className="reference-stack-cloud">
          {profile.skills.map((skill, index) => (
            <span
              key={skill}
              className="reference-stack-tag"
              style={{ "--skill-rot": `${rotations[index % rotations.length]}deg` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
