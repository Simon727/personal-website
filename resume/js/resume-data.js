/* 简历内容集中维护文件：后续修改本文件即可更新页面。 */
window.RESUME_DATA = {
  profile: {
    name: "金宣成",
    englishName: "Xuancheng Jin",
    role: "土地资源管理 · 遥感科学 · 空间分析",
    intro: "吉林大学土地资源管理专业硕士研究生，关注黑土区土壤有机碳、耕地保护、生态系统服务与遥感反演。具备空间分析、机器学习、科研写作和项目研究经验。",
    location: "吉林 · 长春",
    status: "开放学术交流与合作",
    avatar: "./images/profile.jpg",
    phone: "13116525518",
    email: "j07270523m@163.com",
    facts: [
      { label: "2026 论文", value: "2 篇" },
      { label: "第一作者", value: "1 篇" },
      { label: "国家奖学金", value: "1 项" },
      { label: "软件著作权", value: "12 项" },
    ],
  },
  highlights: ["土壤有机碳制图", "遥感与空间分析", "机器学习与深度学习", "生态系统服务评估"],
  research: [
    {
      type: "第一作者论文", year: "2026",
      title: "Uncertainty in ecosystem service value assessment caused by spatial scale and aggregation rules: a multiscale study of Northeast China from 2000 to 2024",
      meta: "Ecological Indicators 190 (2026) 115426",
      detail: "量化空间尺度与聚合规则对东北地区生态系统服务价值估算及空间解释的影响。",
      url: "https://doi.org/10.1016/j.ecolind.2026.115426",
    },
    {
      type: "共同作者论文", year: "2026",
      title: "Integrating transformer-based learning and Sentinel-2 bare soil composites for soil organic carbon mapping in the black soil region of Northeast China",
      meta: "Scientific Reports 16, 3784 (2026) · 第三作者",
      detail: "融合 Sentinel-2 裸土合成影像与 TabPFN，实现东北黑土区小样本条件下的土壤有机碳高精度制图。",
      url: "https://doi.org/10.1038/s41598-025-33682-4",
    },
    {
      type: "主持项目", year: "2026",
      title: "空间聚类与深度学习融合的黑土区土壤有机碳多尺度融合反演方法研究",
      meta: "吉林大学研究生创新研究计划项目 · 2026CX229",
      detail: "面向黑土区多尺度土壤有机碳反演，探索空间聚类与深度学习方法的协同应用。",
    },
    {
      type: "研究项目", year: "2025",
      title: "呼伦贝尔农场区不同耕作年限下土壤有机碳空间差异遥感识别研究",
      meta: "吉林大学地球科学学院 · 成果报告编写成员",
      detail: "参与耕地开垦历史遥感重建、土壤有机碳反演建模与空间制图。",
    },
    {
      type: "论文", year: "本科阶段",
      title: "基于生境质量变化的吉林省西部盐碱区生态系统修复分区",
      meta: "《农业资源与环境学报》· 第二作者",
      detail: "围绕吉林省西部盐碱区生境质量变化与生态修复分区开展研究。",
    },
    {
      type: "知识产权", year: "持续积累",
      title: "计算机软件著作权与农业遥感软件研发",
      meta: "第一作者及参与发表共 12 项",
      detail: "包括校园失物招领平台与土壤健康遥感分析软件等应用研发。",
    },
  ],
  education: [
    {
      period: "2025.09 — 至今", school: "吉林大学", college: "地球科学学院",
      major: "土地资源管理", degree: "硕士研究生", grade: "研究方向：遥感与土壤碳",
      details: ["土壤有机碳遥感反演", "空间尺度效应", "黑土资源保护与利用"],
    },
    {
      period: "2021.09 — 2025.06", school: "吉林农业大学", college: "经济管理学院",
      major: "土地资源管理", degree: "本科", grade: "绩点 4.28 · 专业排名 1 / 70",
      details: ["土地利用规划", "地理信息系统", "应用遥感技术", "土地经济学"],
    },
  ],
  skills: [
    { title: "空间分析与遥感", items: ["ArcGIS", "Google Earth Engine", "Sentinel-2 / Landsat", "空间统计", "遥感制图"] },
    { title: "模型与研究方法", items: ["Python", "机器学习", "深度学习", "TabPFN", "InVEST", "PLUS", "SHAP"] },
    { title: "语言与学术能力", items: ["CATTI 英语三级笔译", "CET-4 595", "CET-6 581", "英文论文写作", "期刊审稿"] },
  ],
  honors: [
    { year: "2024", title: "本科生国家奖学金", detail: "2023—2024 学年度" },
    { year: "2026", title: "CATTI 英语三级笔译专业资格", detail: "国家专业技术人员职业资格" },
    { year: "2026", title: "Springer Nature Reviewer Certificate", detail: "Functional & Integrative Genomics" },
    { year: "2025", title: "“外研社·国才杯”全国大学生外语能力大赛银奖", detail: "英语组综合能力赛项" },
    { year: "2023", title: "全国大学生英语竞赛全国一等奖", detail: "全国级" },
    { year: "2023", title: "“外研社·国才杯”全国大学生阅读大赛三等奖", detail: "全国级" },
    { year: "2023", title: "第六届“外教社杯”全国高校学生跨文化能力大赛吉林赛区三等奖" },
    { year: "本科期间", title: "专业一等奖学金 5 次、单科奖学金 2 次" },
  ],
  experience: [
    {
      period: "2026.06 — 2026.09", organization: "中国地质调查局牡丹江自然资源综合调查中心",
      role: "研究实习", detail: "协助多光谱遥感数据提取、土壤碳汇遥感识别及相关项目研究。",
    },
    {
      period: "2023.07 — 2023.08", organization: "浙江省温岭市自然资源和规划局",
      role: "实习", detail: "参与自然资源与规划相关工作实践。",
    },
  ],
  evidence: [
    {
      category: "国家级荣誉", title: "本科生国家奖学金",
      detail: "2023—2024 学年度，中华人民共和国教育部颁发。",
      image: "./images/national-scholarship.png", file: "./files/national-scholarship.pdf",
    },
    {
      category: "学术服务", title: "Springer Nature 审稿证明",
      detail: "2026 年为 Functional & Integrative Genomics 完成 1 篇稿件审阅。",
      image: "./images/reviewer-certificate.png", file: "./files/reviewer-certificate-2026.pdf",
    },
    {
      category: "学科竞赛", title: "2025 “外研社·国才杯”银奖",
      detail: "“理解当代中国”全国大学生外语能力大赛英语组综合能力赛项。",
      image: "./images/guocai-cup.png", file: "./files/guocai-cup-2025.pdf",
    },
    {
      category: "软件著作权", title: "基于微信小程序的校园失物招领平台 V1.0",
      detail: "著作权人：金宣成，登记号 2025SR2213380。",
      image: "./images/software-copyright.png", file: "./files/campus-lost-found-copyright.pdf",
    },
  ],
  about: "希望把遥感、空间分析与机器学习方法用于土地系统和土壤碳研究，在可靠数据、可解释模型与现实管理问题之间建立联系。重视严谨写作、开放协作与可复现研究。",
};
