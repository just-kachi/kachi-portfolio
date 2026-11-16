import React from 'react';
import { Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  Code2, ShieldCheck, Workflow, Menu, X, Github, Linkedin, Mail,
  ExternalLink, Sparkles, Instagram, CheckCircle2, CalendarDays,
  Paperclip, SlidersHorizontal, Search
} from 'lucide-react';
import { projects, experience } from './data/projects.js';

gsap.registerPlugin(ScrollTrigger);

// Keep browser history from restoring an old scroll offset when a new
// React Router page opens. Section links still resolve after the home page mounts.
function RouteScrollManager() {
  const { pathname, hash, key } = useLocation();

  React.useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous || 'auto'; };
  }, []);

  React.useLayoutEffect(() => {
    let frameOne;
    let frameTwo;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const placeViewport = () => {
      if (pathname === '/' && hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' });
        else window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Run immediately and on two animation frames to beat browser scroll
    // restoration and ensure the destination route has painted.
    placeViewport();
    frameOne = window.requestAnimationFrame(() => {
      placeViewport();
      frameTwo = window.requestAnimationFrame(() => {
        placeViewport();
        ScrollTrigger.refresh();
        document.documentElement.style.scrollBehavior = previousScrollBehavior || 'smooth';
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      if (frameTwo) window.cancelAnimationFrame(frameTwo);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname, hash, key]);

  return null;
}

const email = 'eboegbunekachi@gmail.com';
const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
const github = 'https://github.com/just-kachi';
const linkedin = 'https://www.linkedin.com/in/onyedikachi-eboegbune-077a34294/';
const instagram = 'https://www.instagram.com/just.kxchi/';

function usePageMotion(dependencies = []) {
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('.hero-kicker', { y: 18, opacity: 0, duration: 0.65 })
        .from('.hero-line', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .from('.hero-copy, .hero-art, .hero-foot', { y: 24, opacity: 0, duration: 0.75, stagger: 0.12 }, '-=0.48');

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true }
        });
      });

      gsap.utils.toArray('.work-row').forEach((element, index) => {
        gsap.fromTo(element, { x: index % 2 === 0 ? -22 : 22, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        });
      });

      gsap.to('.hero-orbit', { rotate: 360, duration: 32, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('.art-graphic', { y: -8, duration: 3.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
    });
    return () => ctx.revert();
  // Route changes should replay the page entrance.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

function Header() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => setOpen(false);
  const goToSection = (section) => (event) => {
    event.preventDefault();
    close();

    if (location.pathname !== '/') {
      navigate(`/#${section}`);
      return;
    }

    const target = document.getElementById(section);
    if (!target) {
      navigate(`/#${section}`);
      return;
    }

    // Update the visible URL without triggering a full document navigation.
    window.history.replaceState(window.history.state, '', `/#${section}`);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  return (
    <header className="site-header">
      <div className="header-inner mx-auto flex h-full items-center justify-between">
        <Link to="/" className="brand-mark" onClick={close} aria-label="Kachi Eboegbune home">
          <span className="brand-symbol" aria-hidden="true">K.E</span>
          <span className="brand-name">Kachi Eboegbune</span>
        </Link>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="/#work" onClick={goToSection('work')}>Selected work <span>01</span></a>
          <a href="/#experience" onClick={goToSection('experience')}>Experience <span>02</span></a>
          <a href="/#focus" onClick={goToSection('focus')}>What I do <span>03</span></a>
          <a href="/#about" onClick={goToSection('about')}>About <span>04</span></a>
          <a className="nav-contact" href={emailComposeUrl} target="_blank" rel="noreferrer" onClick={close}>Let's talk <ArrowUpRight size={15}/></a>
        </nav>
      </div>
    </header>
  );
}

function SectionLabel({ number, children }) {
  return <div className="section-label reveal"><span className="section-number">{number}</span><span className="section-rule"/><span>{children}</span></div>;
}

function HeroArt() {
  return (
    <div className="hero-art" aria-label="Abstract geometric artwork representing build, secure and connect">
      <div className="art-topline"><span>INDEPENDENT PRACTICE</span><span>PORTFOLIO / 2026</span></div>
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="art-graphic" aria-hidden="true"><span className="art-graphic-disc"/><span className="art-graphic-square"/><span className="art-graphic-axis"/></div>
      <div className="art-sticker"><Sparkles size={15}/><span>CURIOUS<br/>BY DESIGN</span></div>
      <div className="art-bottomline"><span>BUILD / SECURE / CONNECT</span><span>2023 — NOW</span></div>
      <div className="art-side-index">INDEX — 001</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero page-wrap relative mx-auto" id="top">
      <div className="hero-kicker"><span className="kicker-dot"/> PORTFOLIO / 2026</div>
      <div className="hero-grid">
        <div className="hero-main">
          <p className="hero-pretitle">SOFTWARE · SECURITY · SYSTEMS</p>
          <h1 className="hero-title">
            <span className="hero-line"><span>I make</span></span>
            <span className="hero-line"><span>technology</span></span>
            <span className="hero-line"><span><em>work.</em></span></span>
          </h1>
          <div className="hero-copy">
            <p>I'm Kachi — a technology enthusiast working across <strong>software development, cybersecurity and business technology.</strong> I like understanding how things work, then finding ways to make them work better. <span className="hero-money-line">And I'm doing it for the money.</span></p>
            <a className="text-cta" href="#work">Explore selected work <ArrowDownRight size={18}/></a>
          </div>
        </div>
        <HeroArt/>
      </div>
      <div className="hero-foot">
        <span>SCROLL TO EXPLORE</span><span className="hero-foot-line"/><ArrowDown size={15}/>
        <span className="hero-foot-note">A growing archive of projects, practice and experience.</span>
      </div>
    </section>
  );
}

function TaskManagerPreview({ compact = false }) {
  const tasks = [
    { title: 'Review project requirements', category: 'Development', priority: 'High', due: 'Today', status: 'In progress' },
    { title: 'Prepare weekly progress notes', category: 'Planning', priority: 'Medium', due: 'Tomorrow', status: 'To do' },
    { title: 'Organise reference materials', category: 'Research', priority: 'Low', due: 'Friday', status: 'Completed' }
  ];
  return (
    <div className={`task-concept ${compact ? 'is-compact' : 'is-expanded'}`}>
      <div className="task-concept-sidebar">
        <div className="task-concept-brand"><span className="task-concept-brand-mark">T</span><span>Taskflow</span></div>
        <div className="task-concept-nav active"><span className="task-nav-dot"/> My tasks</div>
        <div className="task-concept-nav"><span className="task-nav-dot"/> Upcoming</div>
        <div className="task-concept-nav"><span className="task-nav-dot"/> Completed</div>
        <div className="task-concept-sidebar-foot">WORKSPACE<br/><strong>Personal</strong></div>
      </div>
      <div className="task-concept-content">
        <div className="task-concept-toolbar"><div><span className="task-concept-eyebrow">MY WORKSPACE / OVERVIEW</span><h4>My tasks</h4></div><span className="task-concept-add">+ New task</span></div>
        {!compact && <div className="task-concept-summary"><div><small>OPEN TASKS</small><strong>08</strong></div><div><small>DUE TODAY</small><strong>02</strong></div><div><small>COMPLETED</small><strong>14</strong></div></div>}
        <div className="task-concept-filter"><span><Search size={12}/> Search tasks</span><span><SlidersHorizontal size={12}/> Filters</span></div>
        <div className="task-concept-table-head"><span>TASK</span><span>PRIORITY</span><span>DUE DATE</span><span>STATUS</span></div>
        {tasks.slice(0, compact ? 2 : 3).map((task) => (
          <div className="task-concept-row" key={task.title}>
            <div className="task-concept-title"><span className={`task-check ${task.status === 'Completed' ? 'done' : ''}`}>{task.status === 'Completed' ? <CheckCircle2 size={11}/> : ''}</span><div><strong>{task.title}</strong><small>{task.category}</small></div></div>
            <span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
            <span className="task-due"><CalendarDays size={11}/>{task.due}</span>
            <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
          </div>
        ))}
        {!compact && <div className="task-concept-create"><span><Paperclip size={12}/> Files · Comments</span><span>Edit · Delete · Title · Description · Due date</span></div>}
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  if (project.visualType === 'task-manager-concept') return <TaskManagerPreview compact/>;
  return <img src={project.image} alt={project.imageAlt || `${project.name} application screenshot`} loading="lazy"/>;
}

function WorkRow({ project, index }) {
  return (
    <Link to={`/work/${project.slug}`} className="work-row group">
      <div className="work-index"><span>0{index + 1}</span><span className="work-category">{project.category}</span></div>
      <div className="work-main">
        <div className="work-title-line"><h3>{project.name}</h3><span className="work-year">{project.year}</span></div>
        <p>{project.summary}</p>
        <div className="work-tags">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className={`work-preview ${project.visualType === 'task-manager-concept' ? 'work-preview-concept' : ''}`}>
        <ProjectPreview project={project}/>
        {project.visualType === 'task-manager-concept' && <span className="preview-note">DESIGN RECONSTRUCTION</span>}
      </div>
      <span className="work-arrow"><ArrowUpRight size={21}/></span>
    </Link>
  );
}

function WorkSection() {
  return (
    <section id="work" className="work-section section-pad">
      <div className="page-wrap">
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="section-intro reveal">
          <h2>Things I've<br/><span>put into the world.</span></h2>
          <div className="section-intro-aside"><span className="aside-marker">A SMALL SELECTION</span><p>Applications, experiments and workflow projects. Each one has its own story, decisions and lessons.</p></div>
        </div>
        <div className="work-list divide-y">{projects.map((project, index) => <WorkRow key={project.slug} project={project} index={index}/>)}</div>
        <div className="work-end reveal"><span>MORE TO COME</span><span className="work-end-line"/><p>The archive grows as the work does.</p></div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="experience-section section-pad">
      <div className="page-wrap">
        <SectionLabel number="02">Experience</SectionLabel>
        <div className="section-intro reveal">
          <h2>Learning by<br/><span>getting involved.</span></h2>
          <div className="section-intro-aside"><span className="aside-marker">2024 — 2026</span><p>Different teams and environments have given me a wider view of how technology supports people and organisations.</p></div>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-row reveal" key={item.company}>
              <div className="experience-date"><span>0{index + 1}</span><strong>{item.period}</strong></div>
              <div className="experience-body">
                <div className="experience-heading"><div><h3>{item.company}</h3><p>{item.role}</p></div><span className="experience-location">NIGERIA</span></div>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const focusAreas = [
  { number: '01', verb: 'BUILD', title: 'Software development', icon: Code2, body: 'Creating applications, shaping interfaces and connecting the pieces behind useful digital products.', tags: ['Python', 'Java', 'React', 'PostgreSQL', 'REST APIs'] },
  { number: '02', verb: 'SECURE', title: 'Cybersecurity', icon: ShieldCheck, body: 'Building practical understanding of information security, governance, risk and compliance.', tags: ['Information Security', 'GRC', 'ISO 27001', 'Cybersecurity'] },
  { number: '03', verb: 'CONNECT', title: 'Business technology & automation', icon: Workflow, body: 'Working with business applications, data and workflows to make everyday processes more effective.', tags: ['Power Platform', 'Power BI', 'SharePoint', 'n8n'] }
];

function FocusSection() {
  return (
    <section id="focus" className="focus-section section-pad">
      <div className="page-wrap">
        <SectionLabel number="03">What I work across</SectionLabel>
        <div className="focus-heading reveal"><h2>Three connected<br/><span>interests.</span></h2><p>Not separate boxes. Different ways of looking at technology, solving problems and building useful things.</p></div>
        <div className="focus-grid grid">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return <article className="focus-card reveal" key={area.number}>
              <div className="focus-card-top"><span>{area.number} / {area.verb}</span><Icon size={21}/></div>
              <h3>{area.title}</h3><p>{area.body}</p>
              <div className="focus-tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="page-wrap">
        <SectionLabel number="04">A little about me</SectionLabel>
        <div className="about-grid reveal">
          <div className="about-aside"><span className="about-aside-label">THE PERSON<br/>BEHIND THE WORK</span><div className="about-aside-graphic" aria-hidden="true"><span className="about-graphic-ring"/><span className="about-graphic-square"/><span className="about-graphic-dot"/></div><span className="about-aside-caption">Always learning.<br/>Always building.</span></div>
          <div className="about-copy"><h2>Curious about the<br/>systems <em>behind</em><br/>the screen.</h2><p>I'm a Computer Science student at Pan-Atlantic University focused on cybersecurity-aware software systems, AI automation, APIs and database-backed applications.</p><p>I've worked on Python/Streamlit applications, Java/PostgreSQL systems, JavaScript/SQLite web applications, React interfaces and Python chatbot prototypes. I enjoy working across application logic, databases and integrations to make software function as a complete system.</p><p>My experience also includes IT operations, network monitoring and documentation, Microsoft business tools, workflow automation and information security governance, risk and compliance. I'm continuing to develop my skills through practical projects and professional experience.</p><a href={emailComposeUrl} target="_blank" rel="noreferrer" className="text-cta">Get in touch <ArrowUpRight size={18}/></a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-top reveal"><div><span className="footer-eyebrow">HAVE AN OPPORTUNITY OR SOMETHING TO BUILD?</span><h2>Let's make<br/><em>something useful.</em></h2></div><a className="footer-cta" href={instagram} target="_blank" rel="noreferrer" aria-label="Start a conversation on Instagram"><span>Start a conversation</span><ArrowUpRight size={20}/></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Kachi Eboegbune</span><div className="social-links"><a href={github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ExternalLink size={11}/></a><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ExternalLink size={11}/></a><a href={instagram} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram <ExternalLink size={11}/></a><a href={emailComposeUrl} target="_blank" rel="noreferrer"><Mail size={16}/> Email</a></div><a href="#top" className="back-top">Back to top ↑</a></div>
      </div>
    </footer>
  );
}

function Home() {
  usePageMotion([]);
  return <><main><Hero/><div className="marquee-band" aria-hidden="true"><div className="marquee-track"><span>BUILD WITH INTENTION</span><b>✳</b><span>THINK ABOUT THE SYSTEM</span><b>✳</b><span>MAKE IT WORK BETTER</span><b>✳</b><span>BUILD WITH INTENTION</span><b>✳</b></div></div><WorkSection/><ExperienceSection/><FocusSection/><AboutSection/></main><Footer/></>;
}

function ProjectVisual({ project }) {
  if (project.visualType === 'task-manager-concept') {
    return <div className="task-visual-comparison">
      <figure className="detail-screenshot task-original-shot"><div className="concept-topline"><span>ARCHIVED SCREENSHOT</span><span>EARLIER IMPLEMENTATION</span></div><img src={project.legacyImage || project.image} alt="Archived screenshot of the earlier Task Manager implementation"/><figcaption>The available screenshot from an earlier version of the application.</figcaption></figure>
      <div className="detail-concept-wrap"><div className="concept-topline"><span>INTERFACE STUDY</span><span>RECONSTRUCTED FOR PRESENTATION</span></div><TaskManagerPreview/><p className="visual-caption">A code-built reconstruction based on the confirmed feature set and the later design direction you described. It is not a screenshot or recovered copy of the unavailable improved build.</p></div>
    </div>;
  }
  return <figure className="detail-screenshot"><img src={project.image} alt={project.imageAlt || `${project.name} original interface screenshot`} /><figcaption>{project.visualCaption || 'Screenshot from the original project.'}</figcaption></figure>;
}

function CaseStudyHeading({ number, eyebrow, title, intro }) {
  return (
    <div className="case-study-heading reveal">
      <div className="case-study-eyebrow"><span>{number}</span><span>{eyebrow}</span></div>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function SIBASCaseStudy({ caseStudy, project }) {
  return (
    <div className="case-study">
      <section className="case-study-overview reveal">
        <div className="case-study-overview-copy">
          <span className="detail-section-label">THE ASSIGNMENT</span>
          <h2>A simplified adaptation, built to understand the system behind attendance.</h2>
          <p>{caseStudy.brief}</p>
          <p>{caseStudy.designChallenge}</p>
          <div className="case-study-pills"><span>{caseStudy.context}</span><span>{caseStudy.period}</span><span>Local PostgreSQL setup</span></div>
        </div>
        <aside className="case-study-outcome">
          <span className="case-study-outcome-label">PROJECT OUTCOME</span>
          <strong>Working local prototype</strong>
          <p>{caseStudy.outcome}</p>
          <a className="text-cta" href={project.githubUrl} target="_blank" rel="noreferrer">Explore the source <ArrowUpRight size={17}/></a>
        </aside>
      </section>
      <div className="case-study-tech reveal"><span className="case-study-card-label">TECHNOLOGIES USED</span><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>

      <section className="case-study-block">
        <CaseStudyHeading number="01" eyebrow="MY ROLE & COLLABORATION" title="I built the application layer and connected it to the supplied database." intro="The work was shared, but my main responsibility was the interface, Python logic and integration."/>
        <div className="case-study-contribution-grid">
          <article className="case-study-panel case-study-panel-primary reveal">
            <span className="case-study-card-label">MY MAIN CONTRIBUTION</span>
            <ul>{caseStudy.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="case-study-panel reveal">
            <span className="case-study-card-label">TEAM CONTEXT</span>
            <p>{caseStudy.collaboration}</p>
          </article>
        </div>
      </section>

      <section className="case-study-block">
        <CaseStudyHeading number="02" eyebrow="SYSTEM ARCHITECTURE" title="From the Streamlit screens to PostgreSQL." intro="I connected the Python application to the relational structure created by a teammate. The app used that structure to support the different role-based workflows."/>
        <div className="case-architecture-flow reveal">
          {caseStudy.architecture.map((node, index) => (
            <React.Fragment key={node.title}>
              <article className="case-architecture-node">
                <span>0{index + 1}</span><h3>{node.title}</h3><p>{node.detail}</p>
              </article>
              {index < caseStudy.architecture.length - 1 && <div className="case-architecture-arrow" aria-hidden="true"><ArrowRight size={18}/></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="case-study-data-note reveal"><div><span className="case-study-card-label">DATABASE & RELATIONSHIPS</span><h3>Relational data, connected workflows.</h3></div><p>{caseStudy.dataModel}</p></div>
      </section>

      <section className="case-study-block">
        <CaseStudyHeading number="03" eyebrow="USER WORKFLOWS" title="Three roles, three different views of attendance." intro="Each role has its own navigation and set of tasks. The app uses the role returned during login to decide which pages are available in the interface."/>
        <div className="case-study-roles">
          {caseStudy.roleGroups.map((group, index) => (
            <article className="case-study-role-card reveal" key={group.title}>
              <span className="case-study-role-index">0{index + 1} / ROLE</span>
              <h3>{group.title}</h3><p>{group.intro}</p>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-block">
        <CaseStudyHeading number="04" eyebrow="ENGINEERING CHALLENGES" title="The tricky part was making the pieces work together." intro="These are the areas that required the most attention during implementation."/>
        <div className="case-study-challenges">
          <article className="case-study-challenge reveal"><span>01</span><h3>Keeping roles distinct</h3><p>{caseStudy.roleChallenge}</p></article>
          <article className="case-study-challenge reveal"><span>02</span><h3>Validating CSV data</h3><p>{caseStudy.csvChallenge}</p></article>
          <article className="case-study-challenge reveal"><span>03</span><h3>Turning records into useful reports</h3><p>{caseStudy.reportingChallenge}</p></article>
        </div>
      </section>

      <section className="case-study-block case-study-gallery-block">
        <CaseStudyHeading number="05" eyebrow="PROJECT SCREENSHOTS" title="A look inside the application." intro="These are original captures from the working local application. Personal account and student identifiers have been cropped out or excluded."/>
        <div className="case-study-gallery">
          {caseStudy.gallery.map((item, index) => (
            <figure className={`case-study-gallery-item reveal ${index === 0 ? 'gallery-featured' : ''}`} key={item.src}>
              <div className="case-study-gallery-image"><img src={item.src} alt={item.title} loading="lazy"/></div>
              <figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study-block case-study-learning-block">
        <CaseStudyHeading number="06" eyebrow="WHAT I LEARNED" title="What the project taught me." intro="The experience was useful because it made me work with the connections between an interface, application logic and a relational database—not just the screens on their own."/>
        <div className="case-study-lessons reveal">
          {caseStudy.lessons.map((lesson, index) => <div className="case-study-lesson" key={lesson}><span>0{index + 1}</span><p>{lesson}</p></div>)}
        </div>
      </section>

      <section className="case-study-scope reveal">
        <div><span className="case-study-card-label">SCOPE & LIMITATIONS</span><h2>What this version did—and did not—include.</h2></div>
        <ul>{caseStudy.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="case-study-biometric-note"><strong>Important note:</strong> SIBAS expands to Student Information Biometrics Attendance System, but biometric capture or recognition was not implemented in this assignment version. Attendance was handled through CSV uploads and lecturer corrections.</p>
      </section>
      <a className="case-study-source" href={project.githubUrl} target="_blank" rel="noreferrer">VIEW SOURCE CODE ON GITHUB <ArrowUpRight size={17}/></a>
    </div>
  );
}

function SanteCaseStudy({ caseStudy, project }) {
  return <div className="case-study sante-case-study">
    <section className="case-study-overview reveal">
      <div className="case-study-overview-copy">
        <span className="detail-section-label">THE ASSIGNMENT</span>
        <h2>A laboratory management application built by a three-person team.</h2>
        <p>{caseStudy.brief}</p>
        <p>{caseStudy.challenge}</p>
        <div className="case-study-pills"><span>Three-person team</span><span>Backend & integration</span><span>Completed and functional</span></div>
      </div>
      <aside className="case-study-outcome"><span className="case-study-outcome-label">PROJECT OUTCOME</span><strong>Functional desktop application</strong><p>{caseStudy.outcome}</p><a className="text-cta" href={project.githubUrl} target="_blank" rel="noreferrer">Explore the source <ArrowUpRight size={17}/></a></aside>
    </section>
    <div className="case-study-tech reveal"><span className="case-study-card-label">TECHNOLOGIES USED</span><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>

    <section className="case-study-block">
      <CaseStudyHeading number="01" eyebrow="MY ROLE & COLLABORATION" title="I owned the backend and brought the application together." intro="The project was split across three people. My responsibility covered the backend and the integration work that connected it to the JavaFX interface."/>
      <div className="case-study-contribution-grid">
        <article className="case-study-panel case-study-panel-primary reveal"><span className="case-study-card-label">MY CONTRIBUTION</span><ul>{caseStudy.contribution.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="case-study-panel reveal"><span className="case-study-card-label">TEAM RESPONSIBILITIES</span><div className="sante-team-list">{caseStudy.team.map((member) => <div key={member.role}><strong>{member.role}</strong><p>{member.detail}</p></div>)}</div></article>
      </div>
    </section>

    <section className="case-study-block">
      <CaseStudyHeading number="02" eyebrow="APPLICATION ARCHITECTURE" title="The interface, backend, database and email service had to work as one." intro="The application was built as a Java desktop system. I implemented the backend and database operations, then connected those operations to the separately developed frontend."/>
      <div className="case-architecture-flow sante-architecture-flow reveal">{caseStudy.architecture.map((node, index) => <React.Fragment key={node.title}><article className="case-architecture-node"><span>0{index + 1}</span><h3>{node.title}</h3><p>{node.detail}</p></article>{index < caseStudy.architecture.length - 1 && <div className="case-architecture-arrow" aria-hidden="true"><ArrowRight size={18}/></div>}</React.Fragment>)}</div>
      <div className="case-study-data-note reveal"><div><span className="case-study-card-label">DATABASE</span><h3>PostgreSQL persistence.</h3></div><p>The application uses a PostgreSQL database named <strong>lims_db</strong>. The project setup includes a SQL schema and a database seeder for preparing the local environment. Java connects to the database through the PostgreSQL JDBC driver.</p></div>
    </section>

    <section className="case-study-block">
      <CaseStudyHeading number="03" eyebrow="ENGINEERING CHALLENGES" title="The hard part was making the separate pieces agree." intro="Once the backend and frontend had been developed separately, the integration work became the most demanding part of the project."/>
      <div className="case-study-challenges">{caseStudy.challenges.map((item, index) => <article className="case-study-challenge reveal" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
    </section>

    <section className="case-study-block">
      <CaseStudyHeading number="04" eyebrow="APPLICATION FEATURES" title="Administration, laboratory operations and customer requests." intro="The application brings together different responsibilities through role-aware screens and connected data workflows."/>
      <div className="sante-feature-grid">{project.features.map((feature, index) => <article className="sante-feature-card reveal" key={feature}><span>0{index + 1}</span><p>{feature}</p></article>)}</div>
    </section>

    <section className="case-study-block case-study-gallery-block">
      <CaseStudyHeading number="05" eyebrow="PROJECT SCREENSHOTS" title="A look inside Sante Diagnostics." intro="These are original screenshots from the completed desktop application. Screens containing user email addresses or account-level details have been excluded."/>
      <div className="case-study-gallery">{project.gallery.map((item) => <figure className="case-study-gallery-item reveal" key={item.src}><div className="case-study-gallery-image"><img src={item.src} alt={item.title} loading="lazy"/></div><figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption></figure>)}</div>
    </section>

    <section className="case-study-block case-study-learning-block">
      <CaseStudyHeading number="06" eyebrow="WHAT I LEARNED" title="Integration is where the system becomes real." intro={caseStudy.learning}/>
      <div className="case-study-scope sante-scope reveal"><div><span className="case-study-card-label">PROJECT SCOPE</span><h2>Academic project, completed as a team.</h2></div><ul>{caseStudy.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </section>
    <a className="case-study-source" href={project.githubUrl} target="_blank" rel="noreferrer">VIEW SOURCE CODE ON GITHUB <ArrowUpRight size={17}/></a>
  </div>;
}

function ProjectSummary({ project }) {
  return <div className="project-summary-page">
    <section className="project-summary-overview reveal">
      <div><span className="detail-section-label">PROJECT OVERVIEW</span><h2>{project.summaryHeading || 'A practical application, developed through hands-on work.'}</h2><p>{project.details}</p>{project.developmentStory && <p>{project.developmentStory}</p>}</div>
      <aside><span className="detail-section-label">MY CONTRIBUTION</span><p>{project.contributionDetails || project.contribution}</p><span className="detail-section-label project-summary-status-label">PROJECT STATUS</span><p>{project.note}</p></aside>
    </section>
    <section className="project-summary-features"><div className="project-summary-section-heading"><span className="detail-section-label">WHAT IT INCLUDES</span><h2>Key functionality</h2></div><div className="project-summary-feature-grid">{project.features.map((feature, index) => <article className="project-summary-feature reveal" key={feature}><span>0{index + 1}</span><p>{feature}</p></article>)}</div></section>
    {project.learning && <section className="project-summary-learning reveal"><span className="detail-section-label">WHAT I LEARNED</span><p>{project.learning}</p></section>}
    <section className="project-summary-stack"><div><span className="detail-section-label">TECHNOLOGIES</span><h2>Tools used across the project</h2></div><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section>
    {project.githubUrl && <a className="case-study-source" href={project.githubUrl} target="_blank" rel="noreferrer">VIEW SOURCE CODE ON GITHUB <ArrowUpRight size={17}/></a>}
  </div>;
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  usePageMotion([slug]);
  if (!project) return <main className="page-wrap not-found"><h1>Project not found.</h1><Link className="text-cta" to="/">Back home <ArrowRight/></Link></main>;
  return <><main className="detail-page page-wrap" id="top">
    <Link to="/#work" className="back-link"><ArrowLeft size={16}/> Back to selected work</Link>
    <div className="detail-header"><div className="detail-kicker">{project.category} <span>·</span> {project.year}</div><h1>{project.name}<em>.</em></h1><p>{project.summary}</p><div className="detail-meta"><span>{project.status}</span><span>{project.contribution}</span></div></div>
    <ProjectVisual project={project}/>
    {project.caseStudy ? <SIBASCaseStudy caseStudy={project.caseStudy} project={project}/> : project.santeCaseStudy ? <SanteCaseStudy caseStudy={project.santeCaseStudy} project={project}/> : <ProjectSummary project={project}/>}
    <Link to="/#work" className="next-project-link"><span>Back to all selected work</span><ArrowUpRight/></Link>
  </main><Footer/></>;
}

export default function App() {
  return <><RouteScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/work/:slug" element={<ProjectDetail/>}/></Routes></>;
}
