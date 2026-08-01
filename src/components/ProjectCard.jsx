const rotations = [-4, 3, -2, 4, -3, 2];
const pinColors = {
  mint: "#2EC4B6",
  coral: "#FF6B57",
  grape: "#8C6FF7",
  yellow: "#FFC94A",
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.09c.98 0 1.96.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.26c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

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
      <div className="reference-project-links">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="reference-project-link"
          >
            <GitHubIcon />
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
