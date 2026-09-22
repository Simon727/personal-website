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
  const evidence = data.evidence.map((item) => `<a class="evidence-card reveal"${linkAttrs(item.file)}><div class="evidence-image-wrap"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}预览" loading="lazy" /></div><div class="evidence-copy"><span>${escapeHTML(item.category)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.detail)}</p><strong>查看证明 ↗</strong></div></a>`).join("");

  main.innerHTML = `
    <section class="hero section-shell" id="about">
      <div class="hero-copy reveal"><p class="kicker">${escapeHTML(p.englishName)}</p><h1>${escapeHTML(p.name)}</h1><p class="role">${escapeHTML(p.role)}</p><p class="intro">${escapeHTML(p.intro)}</p><div class="contact-row"><a class="primary-button" href="mailto:${escapeHTML(p.email)}">邮件联系</a><a class="secondary-button" href="#research">查看成果</a></div><ul class="highlight-list">${highlights}</ul></div>
      <aside class="profile-panel reveal" aria-label="个人概览"><div class="portrait-wrap"><img src="${escapeHTML(p.avatar)}" alt="${escapeHTML(p.name)}的证件照" /><span class="status-dot" aria-hidden="true"></span></div><div class="profile-caption"><strong>${escapeHTML(p.status)}</strong><span>${escapeHTML(p.location)}</span></div><div class="facts-grid">${facts}</div></aside>
    </section>
    <section class="section section-shell" id="research"><div class="section-heading reveal"><p class="section-number">01</p><div><p class="eyebrow">Research</p><h2>科研与成果</h2><p>聚焦黑土区土壤有机碳、生态系统服务、遥感反演与土地资源管理。</p></div></div><div class="research-list">${research}</div></section>
    <section class="section section-shell" id="education"><div class="section-heading reveal"><p class="section-number">02</p><div><p class="eyebrow">Education</p><h2>教育背景</h2></div></div><div class="education-list">${education}</div></section>
    <section class="section skills-section" id="skills"><div class="section-shell"><div class="section-heading light reveal"><p class="section-number">03</p><div><p class="eyebrow">Capabilities</p><h2>能力与技能</h2></div></div><div class="skills-grid">${skills}</div></div></section>
    <section class="section section-shell" id="honors"><div class="section-heading reveal"><p class="section-number">04</p><div><p class="eyebrow">Honors</p><h2>荣誉与专业资质</h2></div></div><ol class="honors-list">${honors}</ol></section>
    <section class="section section-shell" id="experience"><div class="section-heading reveal"><p class="section-number">05</p><div><p class="eyebrow">Experience</p><h2>研究与实践经历</h2></div></div><div class="experience-list">${experience}</div></section>
    <section class="section evidence-section" id="evidence"><div class="section-shell"><div class="section-heading reveal"><p class="section-number">06</p><div><p class="eyebrow">Selected Evidence</p><h2>代表性成果证明</h2><p>点击卡片可在新窗口查看对应 PDF。</p></div></div><div class="evidence-grid">${evidence}</div></div></section>
    <section class="about-band" id="contact"><div class="section-shell about-grid"><div class="reveal"><p class="eyebrow">Profile</p><h2>用遥感与空间分析理解土地系统</h2></div><div class="reveal"><p>${escapeHTML(data.about)}</p><div class="contact-details"><a href="mailto:${escapeHTML(p.email)}">${escapeHTML(p.email)}</a><a href="tel:${escapeHTML(p.phone)}">${escapeHTML(p.phone)}</a></div></div></div></section>`;

  document.querySelector("#footer-copy").textContent = `© ${new Date().getFullYear()} ${p.name}.`;
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
