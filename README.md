# Portfolio de Jules Dimitri

Portfolio professionnel de Tonye Nwalal Jules Dimitri, ingénieur en systèmes d'information et développeur full-stack.

## Stack active

- React 19 et Vite
- Tailwind CSS
- Three.js et React Three Fiber

## Lancer le projet

```bash
npm install
npm run dev
```

## Vérifications

```bash
npm run lint
npm run build
```

## Architecture active

- `src/data/profile.json` : source unique du contenu professionnel
- `src/components/StackIconsScene.jsx` : sept badges dessinés avec Canvas 2D et rendus en sprites Three.js
- `src/components/JsonModal.jsx` : vue JSON accessible et copiable
- `src/components/*Section.jsx` : projets, présentation, stack et contact
- `src/hooks/useTheme.js` : thème clair/sombre persistant
- `src/hooks/useReducedMotion.js` : respect de la préférence de réduction des mouvements

La scène Three.js est chargée dans un chunk séparé. React Three Fiber gère automatiquement le redimensionnement du canvas et les textures personnalisées sont libérées au démontage.
