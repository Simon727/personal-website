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
        <p class="kicker">${escapeHTML(p.englishName)}</p>
        <h1>${escapeHTML(p.name)}</h1>
        <p class="role">${escapeHTML(p.role)}</p>
        <p class="intro">${escapeHTML(p.intro)}</p>
        <div class="research-statement-box">
          <span class="statement-tag">Research Statement</span>
          <p class="statement-desc">${escapeHTML(p.researchStatement || "面向土壤与生态系统评估的遥感与空间建模")}</p>
        </div>
        <div class="contact-row">
          <a class="primary-button" href="mailto:${escapeHTML(p.email)}">邮件联系</a>
          <a class="primary-button" href="#research">查看成果</a>
          <a class="primary-button download-button" href="${escapeHTML(p.resumePdf || './files/金宣成简历.pdf')}" download="金宣成简历.pdf" target="_blank" rel="noopener noreferrer">
            <svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>下载简历</span>
          </a>
        </div>
        <div class="profile-links">
          <a href="mailto:${escapeHTML(p.email)}">${escapeHTML(p.email)}</a>
          <a href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer">GitHub · Simon727</a>
          <a href="${escapeHTML(p.orcid)}" target="_blank" rel="noopener noreferrer">ORCID · 0009-0009-0583-6142</a>
          <a href="${escapeHTML(p.resumePdf || './files/金宣成简历.pdf')}" download="金宣成简历.pdf" target="_blank" rel="noopener noreferrer">📄 简历附件 · PDF</a>
        </div>
        <ul class="highlight-list">${highlights}</ul>
        <div class="about-skills">${data.skills.map((group) => `<div class="about-skill-group"><span class="about-skill-label">${escapeHTML(group.title)}</span><div class="about-skill-tags">${group.items.map((item) => `<span class="about-skill-tag">${escapeHTML(item)}</span>`).join("")}</div></div>`).join("")}</div>
      </div>
      <aside class="profile-panel reveal" aria-label="个人概览"><div class="portrait-wrap"><img src="${escapeHTML(p.avatar)}" alt="${escapeHTML(p.name)}的证件照" /><span class="status-dot" aria-hidden="true"></span></div><div class="profile-affiliation"><span>${escapeHTML(p.affiliation)}</span></div><div class="facts-grid">${facts}</div></aside>
    </section>
    <section class="section section-shell" id="research"><div class="section-heading reveal"><p class="section-number">01</p><div><p class="eyebrow">Research</p><h2>科研与成果</h2><p>聚焦黑土区土壤有机碳、生态系统服务、遥感反演与土地资源管理。</p></div></div><div class="research-list">${research}</div></section>
    <section class="section section-shell" id="education"><div class="section-heading reveal"><p class="section-number">02</p><div><p class="eyebrow">Education</p><h2>教育背景</h2></div></div><div class="education-list">${education}</div></section>
    <section class="section section-shell" id="honors"><div class="section-heading reveal"><p class="section-number">03</p><div><p class="eyebrow">Honors</p><h2>荣誉与专业资质</h2></div></div><ol class="honors-list">${honors}</ol></section>
    <section class="section section-shell" id="experience"><div class="section-heading reveal"><p class="section-number">04</p><div><p class="eyebrow">Experience</p><h2>研究与实践经历</h2></div></div><div class="experience-list">${experience}</div></section>
    `;

  const footerEl = document.querySelector("#footer-copy");
  if (footerEl) {
    footerEl.textContent = "Last updated: September 2026，© 2026 Xuancheng Jin · Academic Portfolio";
  }
  document.querySelector("#print-button").addEventListener("click", () => window.print());
  const themeButton = document.querySelector("#theme-toggle");
  const storedTheme = localStorage.getItem("resume-theme");
  if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) document.documentElement.dataset.theme = "dark";
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("resume-theme", next);
  });
})();
