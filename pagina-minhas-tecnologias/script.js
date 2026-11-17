/* ===== ÍCONES ===== */
// Ícones do Devicon (classes) ou SVG próprio quando o Devicon não tem o ícone.
const dv = (name) => `<i class="devicon-${name}" aria-hidden="true"></i>`;
const svg = (paths) => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;

const ICON = {
  html:    dv("html5-plain colored"),
  css:     dv("css3-plain colored"),
  js:      dv("javascript-plain colored"),
  python:  dv("python-plain colored"),
  git:     dv("git-plain colored"),
  github:  dv("github-original"),
  vscode:  dv("vscode-plain colored"),
  react:   dv("react-original colored"),
  devicon: dv("devicon-plain colored"),

  // SVGs simples para o que o Devicon não oferece
  db:   svg('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'),
  api:  svg('<circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M7.4 11l9.2-4M7.4 13l9.2 4"/>'),
  rest: svg('<path d="M4 8h14M14 4l4 4-4 4"/><path d="M20 16H6M10 12l-4 4 4 4"/>'),
  json: svg('<path d="M8 4c-2 0-3 1-3 3v2c0 1.5-.8 3-2 3 1.2 0 2 1.5 2 3v2c0 2 1 3 3 3"/><path d="M16 4c2 0 3 1 3 3v2c0 1.5.8 3 2 3-1.2 0-2 1.5-2 3v2c0 2-1 3-3 3"/>'),
  font: '<span style="font-family:var(--font-title);font-weight:700;color:var(--blue)">Aa</span>'
};

/* ===== DADOS DOS CARDS ===== */
const using = [
  { icon: "html",   name: "HTML5", text: "Estruturação de páginas web, organização de textos, imagens, links e conteúdos." },
  { icon: "css",    name: "CSS3", text: "Estilização, cores, tipografia, layouts, animações e responsividade." },
  { icon: "js",     name: "JavaScript", text: "Interatividade, funcionalidades e comportamentos dinâmicos." },
  { icon: "python", name: "Python", text: "Lógica de programação, automação e desenvolvimento de aplicações." },
  { icon: "git",    name: "Git", text: "Controle de versões e acompanhamento de alterações no código." },
  { icon: "github", name: "GitHub", text: "Hospedagem de repositórios, compartilhamento e organização de projetos." },
  { icon: "vscode", name: "Visual Studio Code", text: "Editor de código para desenvolver, organizar e testar projetos." }
];

const learning = [
  { icon: "db",    name: "SQL e Banco de Dados", text: "Armazenamento, organização, consulta e gerenciamento de informações." },
  { icon: "api",   name: "APIs", text: "Comunicação e integração entre diferentes sistemas e aplicações." },
  { icon: "rest",  name: "REST", text: "Arquitetura utilizada para desenvolver APIs e realizar requisições HTTP." },
  { icon: "json",  name: "JSON", text: "Formato de representação e troca de informações entre aplicações." },
  { icon: "react", name: "React", text: "Biblioteca JavaScript utilizada para desenvolver interfaces por meio de componentes reutilizáveis." }
];

const pageTech = [
  { icon: "html",    name: "HTML5", text: "Estrutura e organização do conteúdo." },
  { icon: "css",     name: "CSS3", text: "Design, cores, animações e responsividade." },
  { icon: "js",      name: "JavaScript", text: "Interações e animações." },
  { icon: "devicon", name: "Devicon", text: "Biblioteca de ícones das tecnologias." },
  { icon: "font",    name: "Google Fonts", text: "Tipografia da interface." },
  { icon: "vscode",  name: "Visual Studio Code", text: "Editor utilizado para desenvolver o projeto." }
];

/* ===== CRIAÇÃO DOS CARDS ===== */
function render(containerId, list, badge) {
  const box = document.getElementById(containerId);

  list.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "card reveal";
    card.style.transitionDelay = `${(i % 4) * 80}ms`; // entrada escalonada

    card.innerHTML = `
      <div class="icon">${ICON[item.icon]}</div>
      <h3>${item.name}</h3>
      <p>${item.text}</p>
      ${badge ? `<span class="badge ${badge.cls}">${badge.label}</span>` : ""}`;

    // Luz que acompanha o mouse dentro do card
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    box.appendChild(card);
  });
}

render("grid-use",   using,    { cls: "use",   label: "Em utilização" });
render("grid-learn", learning, { cls: "learn", label: "Em aprendizado" });
render("grid-page",  pageTech, null);

/* ===== ANIMAÇÃO DURANTE A ROLAGEM ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
