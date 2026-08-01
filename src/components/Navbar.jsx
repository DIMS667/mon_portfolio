import { useCallback, useRef, useState } from "react";
import profile from "../data/profile.json";
import JsonModal from "./JsonModal";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [jsonOpen, setJsonOpen] = useState(false);
  const jsonButtonRef = useRef(null);
  const closeJson = useCallback(() => setJsonOpen(false), []);

  return (
    <>
      <header className="reference-nav">
        <nav className="reference-wrap reference-nav-inner" aria-label="Navigation principale">
          <a
            href="#accueil"
            className="reference-logo"
            aria-label={`${profile.name} — Accueil`}
          >
            &lt;{profile.handle}/&gt;
          </a>

          <div className="reference-nav-links">
            {profile.navigation.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="reference-nav-right">
            <button
              ref={jsonButtonRef}
              type="button"
              onClick={() => setJsonOpen(true)}
              className="reference-json-button"
            >
              {profile.ui.jsonButton}
            </button>
            <span className="reference-status">{profile.status}</span>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <JsonModal open={jsonOpen} onClose={closeJson} triggerRef={jsonButtonRef} />
    </>
  );
}
