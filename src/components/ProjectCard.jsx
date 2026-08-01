const rotations = [-4, 3, -2, 4, -3, 2];
const pinColors = {
  mint: "#2EC4B6",
  coral: "#FF6B57",
  grape: "#8C6FF7",
  yellow: "#FFC94A",
};

export default function ProjectCard({ project, index }) {
  return (
    <article
      className="reference-project-card"
      style={{
        "--rot": `${rotations[index % rotations.length]}deg`,
        "--pin": pinColors[project.pin] || pinColors.mint,
      }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="reference-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="reference-tag">#{tag}</span>
        ))}
      </div>
    </article>
  );
}
