# Kachi Eboegbune — Personal Portfolio

**Student:** Kachi Eboegbune  
**Matriculation Number:** 23120111012  
**Course:** CSC 419 — Advances in Web, Mobile and Blockchain Development

A responsive personal portfolio built with React, Tailwind CSS, custom CSS, React Router and GSAP. It presents selected software projects, professional experience, technical focus areas and contact links.

## Run locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with:

```bash
npm run build
npm run preview
```

## Main technologies

- React 18 and React Router for the interface and project-detail routes.
- Tailwind CSS and custom CSS for styling and responsive layouts.
- GSAP and ScrollTrigger for page and scroll animations.
- Lucide React for interface icons.
- Vite for development and production builds.

## Project structure

```text
kachi-portfolio/
├── public/
│   └── images/projects/       # Original project screenshots and visual assets
│       └── sante/             # Additional Sante application screenshots
├── src/
│   ├── data/projects.js       # Project content and experience timeline
│   ├── App.jsx                # Page components and routing
│   ├── main.jsx               # React entry point
│   └── styles.css             # Global styles and responsive rules
├── index.html
├── package.json
└── README.md
```

## Updating the portfolio

### Add or edit a project

1. Open `src/data/projects.js`.
2. Add or update an object in the exported `projects` array.
3. Give the project a unique `slug`; its detail page will be available at `/work/<slug>`.
4. Place screenshots in `public/images/projects/` and reference them using a root-relative path such as `/images/projects/example.jpg`.
5. Keep project claims accurate. Label reconstructed interface previews as reconstructions, not original screenshots.

SIBAS and Sante Diagnostics LIMS have dedicated case-study layouts. Other projects use the shorter project-summary layout.

### Update experience

Edit the `experience` array in `src/data/projects.js`.

### Update contact links

Email, GitHub, LinkedIn and Instagram links are defined near the top of `src/App.jsx`.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the build command as `npm run build` and the output directory as `dist`.
4. Deploy the site and test both the homepage and direct project URLs such as `/work/sibas` and `/work/sante-lims`.

The included `vercel.json` rewrite sends client-side routes to the Vite entry page so direct project links and page refreshes can be served by the React Router application.

## Design notes

- White is the primary canvas.
- Deep violet (`#6520A8`) is the primary accent.
- Bright purple (`#9A0DFE`) is used for selected highlights.
- Charcoal (`#242027`) is used for primary text.
- The design avoids generated portraits and uses original project screenshots where available.
- The Sante case study includes the original dashboard, test-type management, available-tests catalogue, sign-in and registration screens. Screens with customer-level request or account details are not included.
- The Task Manager improved-interface visual is a code-built reconstruction because the later source code is unavailable.

## Assignment checklist

- About Me section.
- Projects section with project names, descriptions, visuals and technologies.
- Dedicated project-detail pages (including full SIBAS and Sante case studies).
- Functional contact calls to action.
- Responsive layouts for desktop, tablet and mobile.
- Original visual design and custom animations.
- Ready for public deployment; deploy the production build and add the live URL to the submission when available.

## Notes

- No downloadable CV button is included by design.
- The site does not include an education/certificates section or a final-year research project section.
- Before publishing, review screenshots and repository links to ensure no personal, student or account information is exposed.
