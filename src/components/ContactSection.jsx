import { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const whatsappUrl = `https://wa.me/${profile.contact.whatsapp}?text=${encodeURIComponent(profile.contact.whatsappMessage)}`;

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      timerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="reference-section">
      <div className="reference-wrap">
        <div className="reference-section-head">
          <p className="section-kicker">{profile.ui.contactEyebrow}</p>
          <h2 className="section-heading">{profile.ui.contactTitle}</h2>
          <p className="section-description">{profile.ui.contactDescription}</p>
        </div>

        <div>
        <div className="reference-terminal">
          <div className="reference-terminal-bar">
            <i className="h-3 w-3 rounded-full bg-coral" />
            <i className="h-3 w-3 rounded-full bg-yellow" />
            <i className="h-3 w-3 rounded-full bg-mint" />
          </div>
          <div className="reference-terminal-body">
            <p className="text-mint">{profile.ui.contactCommand}</p>
            <div className="reference-copy-row">
              <a href={`mailto:${profile.contact.email}`} className="text-yellow">
                {profile.contact.email}
              </a>
              <button type="button" onClick={copyEmail} className="reference-copy-button">
                {copied ? profile.ui.copied : profile.ui.copy}
              </button>
            </div>
          </div>
        </div>

        <div className="reference-contact-ctas">
          <a href={`mailto:${profile.contact.email}`} className="reference-button reference-button-coral">{profile.ui.emailButton}</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="reference-button reference-button-whatsapp">
            <PhoneIcon />
            {profile.ui.whatsappButton}
          </a>
        </div>

        <div className="reference-socials">
          {profile.contact.socials.map((social) => (
            <a key={social.url} href={social.url} target="_blank" rel="noreferrer" download={social.download || undefined} className="reference-social">
              {social.label}
            </a>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
