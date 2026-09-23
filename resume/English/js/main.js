(function () {
  "use strict";
  const data = window.RESUME_DATA;
  const main = document.querySelector("#main");
  if (!data || !main) return;

  const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const linkAttrs = (url) => url ? ` href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer"` : "";
  const p = data.profile;

  const facts = p.facts.map((item) => `<div class="fact"><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`).join("");
  const highlights = data.highlights.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
  const research = data.research.map((item, index) => `
    <article class="research-card reveal">
      <div class="research-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="research-content">
        <div class="research-topline"><span class="eyebrow">${escapeHTML(item.type)}</span>${item.year ? `<span class="year-pill">${escapeHTML(item.year)}</span>` : ""}</div>
        <h3>${item.url ? `<a${linkAttrs(item.url)}>${escapeHTML(item.title)}</a>` : escapeHTML(item.title)}</h3>
        <p class="research-meta">${escapeHTML(item.meta)}</p><p>${escapeHTML(item.detail)}</p>
      </div>
    </article>`).join("");
  const education = data.education.map((item) => `
    <article class="education-card reveal">
      <div class="education-topline"><div><p class="education-period">${escapeHTML(item.period)}</p><h3>${escapeHTML(item.school)}</h3><p>${escapeHTML(item.college)} · ${escapeHTML(item.major)} · ${escapeHTML(item.degree)}</p></div><strong>${escapeHTML(item.grade)}</strong></div>
      ${item.details?.length ? `<ul class="education-details">${item.details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}</ul>` : ""}
    </article>`).join("");
  const skills = data.skills.map((group) => `<article class="skill-group reveal"><h3>${escapeHTML(group.title)}</h3><ul>${group.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></article>`).join("");
  const honors = data.honors.map((item) => `<li class="honor-item reveal"><span class="honor-year">${escapeHTML(item.year)}</span><span><strong>${escapeHTML(item.title)}</strong>${item.detail ? `<small>${escapeHTML(item.detail)}</small>` : ""}</span></li>`).join("");
  const experience = data.experience.map((item) => `<article class="experience-item reveal"><p class="experience-period">${escapeHTML(item.period)}</p><div><h3>${escapeHTML(item.organization)}</h3><p class="experience-role">${escapeHTML(item.role)}</p><p>${escapeHTML(item.detail)}</p></div></article>`).join("");
  
  main.innerHTML = `
    <section class="hero section-shell" id="about">
      <div class="hero-copy reveal">
        <p class="kicker">${escapeHTML(p.kicker || "Academic CV · Portfolio")}</p>
        <h1>${escapeHTML(p.name)}</h1>
        <p class="role">${escapeHTML(p.role)}</p>
        <p class="intro">${escapeHTML(p.intro)}</p>
        <div class="research-statement-box">
          <span class="statement-tag">Research Statement</span>
          <p class="statement-desc">${escapeHTML(p.researchStatement || "Remote sensing and spatial modelling for soil and ecosystem assessment.")}</p>
        </div>
        <div class="contact-row">
          <a class="primary-button" href="mailto:${escapeHTML(p.email)}">
            <svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Email Me</span>
          </a>
          <a class="primary-button" href="#research">
            <svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Publications</span>
          </a>
          <a class="primary-button download-button" href="${escapeHTML(p.resumePdf || './files/金宣成简历.pdf')}" download="Xuancheng_Jin_CV.pdf" target="_blank" rel="noopener noreferrer">
            <svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download CV</span>
          </a>
        </div>
        <div class="profile-links">
          <a href="mailto:${escapeHTML(p.email)}">${escapeHTML(p.email)}</a>
          <a href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer">GitHub · Simon727</a>
          <a href="${escapeHTML(p.orcid)}" target="_blank" rel="noopener noreferrer">ORCID · 0009-0009-0583-6142</a>
        </div>
        <ul class="highlight-list">${highlights}</ul>
        <div class="about-skills">${data.skills.map((group) => `<div class="about-skill-group"><span class="about-skill-label">${escapeHTML(group.title)}</span><div class="about-skill-tags">${group.items.map((item) => `<span class="about-skill-tag">${escapeHTML(item)}</span>`).join("")}</div></div>`).join("")}</div>
      </div>
      <aside class="profile-panel reveal" aria-label="Personal Overview"><div class="portrait-wrap"><img src="${escapeHTML(p.avatar)}" alt="${escapeHTML(p.name)}'s Portrait" /><span class="status-dot" aria-hidden="true"></span></div><div class="profile-affiliation"><span>${escapeHTML(p.affiliation)}</span></div><div class="facts-grid">${facts}</div></aside>
    </section>
    <section class="section section-shell" id="research"><div class="section-heading reveal"><p class="section-number">01</p><div><p class="eyebrow">Research</p><h2>Research & Publications</h2><p>Focusing on black soil organic carbon, ecosystem services, remote sensing inversion, and land resource management.</p></div></div><div class="research-list">${research}</div></section>
    <section class="section section-shell" id="education"><div class="section-heading reveal"><p class="section-number">02</p><div><p class="eyebrow">Education</p><h2>Education Background</h2></div></div><div class="education-list">${education}</div></section>
    <section class="section section-shell" id="honors"><div class="section-heading reveal"><p class="section-number">03</p><div><p class="eyebrow">Honors</p><h2>Honors & Qualifications</h2></div></div><ol class="honors-list">${honors}</ol></section>
    <section class="section section-shell" id="experience"><div class="section-heading reveal"><p class="section-number">04</p><div><p class="eyebrow">Experience</p><h2>Research & Practical Experience</h2></div></div><div class="experience-list">${experience}</div></section>
    `;

  const footerEl = document.querySelector("#footer-copy");
  if (footerEl) {
    footerEl.textContent = "Last updated: September 2026 · © 2026 Xuancheng Jin · Academic Portfolio";
  }
  const themeButton = document.querySelector("#theme-toggle");
  const storedTheme = localStorage.getItem("resume-theme");
  if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) document.documentElement.dataset.theme = "dark";
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("resume-theme", next);
  });
})();
