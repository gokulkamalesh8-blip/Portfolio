"use strict";
/* ============================================================
   Gokul N: portfolio (React 18, no build step needed)
   1) DATA      : all your content. Edit this part only.
   2) Components: small React pieces that build each section.
   3) App       : puts the pieces together and starts React.
   ============================================================ */
const { useState, useEffect } = React;
const h = React.createElement; // short name for "create an HTML element"

/* ---------- 1. DATA (taken from your resume) ---------- */
const DATA = {
  name: "Gokul N",
  role: "Java Backend Developer",
  location: "Chennai, Tamil Nadu, India",
  email: "gokulkamalesh8@gmail.com",
  phone: "6380815713",
  github: "https://github.com/gokulkamalesh8-blip",
  linkedin: "https://www.linkedin.com/in/gokul-n-585a59376",
  intro: "From Chennai, I build REST APIs and full-stack apps with Java, Spring Boot, and MySQL.",
  about: "B.Sc. IT graduate (2026) seeking an entry-level Java Backend Developer role. I built REST APIs with Java, Spring Boot, and MySQL for an e-commerce app, and I’m familiar with JDBC, SQL, and basic MongoDB. Strong in core Java: OOP, Collections, multithreading, and Java 8. I enjoy debugging and problem solving.",
  stats: [["3", "Projects built"], ["5", "Job simulations and certifications"], ["2026", "B.Sc. IT graduate"], ["Java 8", "Core language"]],
  strip: ["Java 8", "Spring Boot", "REST API", "JDBC", "MySQL", "OOP", "Multithreading", "Git and GitHub"],
  // "demo" is empty because no live demo exists yet. Add a URL and a button appears.
  projects: [
    { title: "StyleStore", short: "Full-stack e-commerce web application.", repo: "https://github.com/gokulkamalesh8-blip/StyleStore", demo: "",
      points: ["Product browsing, search, cart, and checkout.", "Spring Boot REST APIs for customer orders and order items.", "MySQL storage; checkout validation and backend error handling."],
      tags: ["Java", "Spring Boot", "React", "MySQL", "REST API", "JavaScript"] },
    { title: "Multi-Client Chat", short: "Real-time chat through a central TCP server.", repo: "https://github.com/gokulkamalesh8-blip/JavaSocketProgramming", demo: "",
      points: ["Text and private messaging, emoji sharing, and file transfer.", "JavaFX (FXML) interface; multithreaded server.", "Blocks duplicate usernames; handles disconnects and reconnects."],
      tags: ["Java", "JavaFX", "FXML", "TCP/IP Sockets", "Multithreading", "Maven"] },
    { title: "Employee Management", short: "Java app to add, update, view, and delete employee records.", repo: "https://github.com/gokulkamalesh8-blip/Employee-Management-System", demo: "",
      points: ["JDBC and SQL for all record operations.", "OOP and exception handling for clean, reliable code."],
      tags: ["Java", "JDBC", "SQL"] }
  ],
  skills: {
    "Languages": ["Java", "SQL"],
    "Backend": ["Spring Boot", "REST API", "JDBC"],
    "Core Java": ["OOP", "Collections", "Exception Handling", "File I/O", "Multithreading", "Socket Programming", "Java 8"],
    "Databases": ["MySQL", "SQL", "MongoDB (Basic)"],
    "Frontend": ["HTML", "CSS", "JavaScript"],
    "Tools": ["Git", "GitHub", "Maven"],
    "Practices": ["SDLC", "STLC", "Algorithmic Thinking"],
    "Soft skills": ["Problem Solving", "Debugging", "Teamwork", "Adaptability", "Quick Learner"]
  },
  education: { degree: "B.Sc. Information Technology", school: "RVS Kumaran Arts and Science College", year: "2026" },
  certs: [
    ["Walmart Global Tech", "Advanced Software Engineering Job Simulation (Forage), Sep 2025"],
    ["Quantium", "Software Engineering Job Simulation (Forage), Sep 2025"],
    ["Skyscanner", "Front-End Software Engineering Job Simulation (Forage), Sep 2025"],
    ["Accenture", "Developer and Technology Job Simulation (Forage), Oct 2025"],
    ["TCS iON Career Edge", "IT Primer, Interview and Job Readiness, Young Professional, Aug to Dec 2025"]
  ]
};

// Navigation items: id must match a section id below
const LINKS = [["projects", "Projects"], ["about", "About"], ["skills", "Skills"], ["certifications", "Education"], ["contact", "Contact"]];
const mail = "mailto:" + DATA.email;

// ---------- Voice ----------
const GREETING = "Hello, I am Gokul. Welcome to my portfolio.";   // fallback text for your recording
const INTRO = "Good morning, sir/madam. My name is Gokul. I completed my B.Sc. in Information Technology in 2026. I have knowledge of Java, SQL, and Spring Boot. I am a quick learner, hardworking, and eager to start my career as a software developer. Thank you.";
let greetingAudio = null;

// Read any text aloud with the visitor's browser voice (free, no files needed)
function speakText(text, onStart) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-IN"; u.rate = 0.95;
  if (onStart) u.onstart = onStart;
  window.speechSynthesis.speak(u);
}

// Play YOUR recorded voice (audio/greeting.mp3). If the file can't play, use the browser voice instead.
function playGreeting(onStart) {
  if (!greetingAudio) greetingAudio = new Audio("audio/greeting.mp3");
  greetingAudio.onerror = () => speakText(GREETING, onStart);
  greetingAudio.currentTime = 0;
  const p = greetingAudio.play();
  if (p && p.then) p.then(() => onStart && onStart()).catch(() => {});  // blocked by the browser: retried on first click
}

// "About Me" button: scroll to the About section and say the introduction.
// It plays audio/about.mp3 if you add that file (your own voice); otherwise it uses the browser voice.
let aboutAudio = null;
function aboutMe() {
  if (greetingAudio) greetingAudio.pause();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (aboutAudio) aboutAudio.pause();
  aboutAudio = new Audio("audio/about.mp3");
  aboutAudio.onerror = () => speakText(INTRO);       // file missing: fall back to the computer voice
  aboutAudio.play().catch(() => {});
  const el = document.getElementById("about");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ---------- 2. COMPONENTS ---------- */
// Icon: small inline SVG icons (no icon library needed). Use e.g. <Icon name="github" />
const P = (d) => h("path", { d });
const ICONS = {
  github: [P("M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22")],
  linkedin: [P("M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"), h("rect", { x: 2, y: 9, width: 4, height: 12 }), h("circle", { cx: 4, cy: 4, r: 2 })],
  envelope: [P("M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"), P("m22 6-10 7L2 6")],
  phone: [P("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z")],
  bars: [P("M3 12h18M3 6h18M3 18h18")],
  xmark: [P("M18 6 6 18M6 6l12 12")],
  volume: [P("M11 5 6 9H2v6h4l5 4V5z"), P("M15.54 8.46a5 5 0 0 1 0 7.07"), P("M19.07 4.93a10 10 0 0 1 0 14.14")]
};
const Icon = ({ name }) => h("svg", { className: "ico", viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
  ICONS[Object.keys(ICONS).find((k) => name.includes(k))]);

// Opens a link in a new tab safely
const Ext = (href, label, icon) => h("a", { href, target: "_blank", rel: "noopener noreferrer", "aria-label": label }, h(Icon, { name: icon }));

// Top bar. On phones the links hide behind a menu button.
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return h("header", { className: "top" }, h("div", { className: "wrap nav" },
    h("a", { className: "pill sm", href: mail }, "Let’s chat"),
    h("img", { className: "av mid", src: "images/avatar-face.jpg", alt: "", width: 46, height: 46 }),
    h("button", { className: "burger", "aria-label": "Toggle menu", "aria-expanded": open, onClick: () => setOpen(!open) },
      h(Icon, { name: open ? "fa-solid fa-xmark" : "fa-solid fa-bars" })),
    h("ul", { className: "links" + (open ? " open" : "") }, LINKS.map(([id, label]) =>
      h("li", { key: id }, h("a", { href: "#" + id, className: active === id ? "on" : "", onClick: () => setOpen(false) }, label))))
  ));
}

function Hero() {
  return h("section", { id: "home", className: "hero" }, h("div", { className: "wrap" },
    h("span", { className: "chip" }, "Hello, I am Gokul. Welcome to my portfolio."),
    // The avatar sits inside the heading, like the template
    h("h1", null, h("span", null, "Java"),
      h("img", { className: "av", src: "images/avatar-face.jpg", alt: "3D avatar of Gokul", width: 120, height: 120 }),
      h("span", null, "Backend"), h("span", null, "Developer")),
    h("p", null, DATA.intro),
    h("div", { className: "cta" },
      h("a", { className: "pill", href: "#projects" }, "View My Work"),
      h("a", { className: "pill ghost", href: "#contact" }, "Contact Me"),
      h("button", { className: "pill ghost", type: "button", onClick: aboutMe }, h(Icon, { name: "volume" }), "About Me")),
    h("div", { className: "social" },
      Ext(DATA.github, "GitHub", "fa-brands fa-github"),
      Ext(DATA.linkedin, "LinkedIn", "fa-brands fa-linkedin-in"),
      h("a", { href: mail, "aria-label": "Email" }, h(Icon, { name: "fa-solid fa-envelope" })))
  ));
}

// Scrolling strip of key skills (repeated twice for a seamless loop)
const Strip = () => h("div", { className: "strip", "aria-hidden": "true" },
  h("div", null, DATA.strip.concat(DATA.strip).map((s, i) => h("span", { key: i }, s))));

const Tags = ({ list }) => h("div", { className: "tags" }, list.map((t) => h("span", { key: t }, t)));

// One card per project. The demo button only shows when "demo" is filled in.
function Project({ p }) {
  return h("article", { className: "card reveal" },
    h("div", { className: "cover" }, p.title),
    h("h3", null, p.title), h("p", null, p.short),
    h("ul", null, p.points.map((t) => h("li", { key: t }, t))),
    h(Tags, { list: p.tags }),
    h("div", { className: "links-row" },
      h("a", { href: p.repo, target: "_blank", rel: "noopener noreferrer" }, "GitHub ↗"),
      p.demo && h("a", { href: p.demo, target: "_blank", rel: "noopener noreferrer" }, "Live demo ↗")));
}

const Projects = () => h("section", { id: "projects" }, h("div", { className: "wrap" },
  h("div", { className: "head" }, h("h2", null, "Projects"),
    h("a", { className: "pill ghost", href: DATA.github, target: "_blank", rel: "noopener noreferrer" }, "View all on GitHub")),
  h("div", { className: "cards" }, DATA.projects.map((p) => h(Project, { key: p.title, p })))));

const About = () => h("section", { id: "about" }, h("div", { className: "wrap about" },
  h("div", { className: "stage reveal" },
    h("img", { src: "images/avatar.jpg", alt: "3D avatar of Gokul waving with a laptop", width: 540, height: 960, loading: "lazy" }),
    h("span", { className: "bubble" }, "Let me introduce myself.")),
  h("div", { className: "reveal" }, h("h2", null, "About me"), h("p", null, DATA.about),
    h("div", { className: "stats" }, DATA.stats.map(([n, l]) => h("div", { key: l }, h("b", null, n), h("small", null, l)))))));

const Skills = () => h("section", { id: "skills" }, h("div", { className: "wrap" },
  h("div", { className: "head" }, h("h2", null, "My skills")),
  h("div", { className: "skills" }, Object.entries(DATA.skills).map(([group, list]) =>
    h("div", { key: group, className: "card reveal" }, h("h3", null, group), h(Tags, { list }))))));

const Certs = () => h("section", { id: "certifications" }, h("div", { className: "wrap two" },
  h("div", { className: "reveal" }, h("h2", null, "Education"),
    h("div", { className: "edu" }, h("b", null, DATA.education.degree), h("span", null, DATA.education.school + ", " + DATA.education.year))),
  h("div", { className: "reveal" }, h("h2", null, "Certifications"),
    h("ol", { className: "tl" }, DATA.certs.map(([org, what]) => h("li", { key: org }, h("b", null, org), h("span", null, what)))))));

// Footer doubles as the Contact section
function Footer() {
  const link = (href, icon, text, ext) => h("a", Object.assign({ href }, ext ? { target: "_blank", rel: "noopener noreferrer" } : {}), h(Icon, { name: icon }), text);
  return h("footer", { id: "contact" },
    h("div", { className: "marq big", "aria-label": "Start a project" }, [0, 1, 2, 3].map((i) =>
      h("a", { key: i, className: "big", href: mail, "aria-hidden": i ? "true" : null, tabIndex: i ? -1 : null }, "Start a project ↗"))),
    h("div", { className: "wrap" },
      h("div", { className: "contact" },
        link(mail, "fa-solid fa-envelope", DATA.email),
        link("tel:+91" + DATA.phone, "fa-solid fa-phone", DATA.phone),
        link(DATA.github, "fa-brands fa-github", "GitHub", true),
        link(DATA.linkedin, "fa-brands fa-linkedin-in", "LinkedIn", true)),
      h("p", { className: "note" }, "© 2026 " + DATA.name + " · " + DATA.location)));
}

/* ---------- 3. APP ---------- */
function App() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    // Fade elements in as they scroll into view
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("in")); return; }
    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
    }), { threshold: 0.12 });
    items.forEach((el) => reveal.observe(el));
    // Highlight the nav link of the section currently on screen
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: "-40% 0px -55% 0px" });
    ["home"].concat(LINKS.map((l) => l[0])).forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    return () => { reveal.disconnect(); spy.disconnect(); };
  }, []);
  // Play the greeting voice when the page opens. Browsers often block sound until the
  // visitor interacts, so if blocked we retry on the first click, tap or key press.
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart"];
    const stop = () => events.forEach((e) => window.removeEventListener(e, attempt));
    const attempt = () => playGreeting(stop);       // stop retrying once audio has started
    events.forEach((e) => window.addEventListener(e, attempt, { passive: true }));
    attempt();
    return stop;
  }, []);
  return h(React.Fragment, null, h(Nav, { active }), h("main", null, h(Hero), h(Strip), h(Projects), h(About), h(Skills), h(Certs)), h(Footer));
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
