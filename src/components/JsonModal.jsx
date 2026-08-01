import { useEffect, useMemo, useRef, useState } from "react";
import profile from "../data/profile.json";

function highlightJson(value) {
  const escaped = JSON.stringify(value, null, 2)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let className = "json-number";
      if (/^"/.test(match)) className = /:$/.test(match) ? "json-key" : "json-string";
      else if (/true|false/.test(match)) className = "json-boolean";
      else if (/null/.test(match)) className = "json-null";
      return `<span class="${className}">${match}</span>`;
    },
  );
}

export default function JsonModal({ open, onClose, triggerRef }) {
  const closeRef = useRef(null);
  const copyTimerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const json = useMemo(() => JSON.stringify(profile, null, 2), []);
  const highlightedJson = useMemo(() => highlightJson(profile), []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const modal = closeRef.current?.closest('[role="dialog"]');
      const focusable = modal?.querySelectorAll("button, a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [onClose, open, triggerRef]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    },
    [],
  );

  if (!open) return null;

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="reference-json-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="json-modal-title"
        className="reference-json-modal"
      >
        <div className="reference-json-head">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="h-3 w-3 rounded-full bg-coral" />
              <i className="h-3 w-3 rounded-full bg-yellow" />
              <i className="h-3 w-3 rounded-full bg-mint" />
            </span>
            <strong id="json-modal-title" className="font-mono text-sm">{profile.ui.modalTitle}</strong>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="reference-json-close"
            aria-label="Fermer la fenêtre JSON"
          >
            ×
          </button>
        </div>

        <p className="reference-json-hint">{profile.ui.jsonHint}</p>
        <pre
          className="reference-json-view"
          dangerouslySetInnerHTML={{ __html: highlightedJson }}
        />

        <div className="reference-json-actions">
          <button type="button" onClick={copyJson} className="reference-button reference-button-paper">
            {copied ? profile.ui.copied : profile.ui.modalCopy}
          </button>
        </div>
      </div>
    </div>
  );
}
