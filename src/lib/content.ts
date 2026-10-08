export const brand = {
  name: "Luai Amer",
  subLabel: "Cyper Security Student",
  hireMe: { label: "Hire Me", href: "#contact" },
};

/** First-load terminal boot screen */
export const boot = {
  prompt: "root@luai2001~:~#",
  commands: ["$ ssh luai2001~", "$ sudo ./load_profile"],
  responses: ["> key accepted", "> portfolio unlocked"],
  barLabel: "LOADING PORTFOLIO",
  /** How long the progress bar takes to fill */
  barDurationMs: 5200,
};

export const hero = {
  greeting: "Hello, I'm",
  firstName: "LUAI",
  lastName: "AMER",
  subtitle: ["Information Security Student &", "Cybersecurity Enthusiast"],
  description:
    "With hands-on experience in web development, software development, and cybersecurity projects.",
  location: "AVAILABLE WORLDWIDE · Johor, Malaysia",
  cornerLabel: ["Information Security Student", "Cybersecurity Enthusiast"],
  engagementStatus: "AVAILABLE FOR ENGAGEMENTS",
  scrollHint: "SCROLL TO DECRYPT",
  primaryCta: { label: "View My Work", href: "#work" },
  secondaryCta: { label: "Download Resume", href: "/Luai Amer-CV.pdf" },
  portrait: {
    src: "/images/Luai.jpeg",
    alt: "Portrait of LUAI AMIR",
    /** Size multiplier — 1 = default, try 0.7–1.4 */
    size: 1,
  },
  badge: "Luai Amer",
};

/** Matrix rain tweaks — edit these anytime */
export const matrix = {
  /** Overall visibility: 0 = invisible, 1 = solid (try 0.25–0.45) */
  opacity: 0.32,
  /** Fall speed multiplier: 1 = default, 0.5 = half speed (try 0.4–0.8) */
  speed: 0.55,
  /** How many columns rain: 0–1 (try 0.25–0.4) */
  density: 0.35,
};

export const metrics = [
  { value: 12, suffix: "+", label: "Years experience", color: "accent" as const },
  { value: 500, suffix: "+", label: "Penetration tests", color: "white" as const },
  { value: 40, suffix: "+", label: "CVEs disclosed", color: "cyan" as const },
];

export const skills = [
  "Penetration Testing",
  "Malware Analysis",
  "Threat Hunting",
  "Cloud Security",
  "Web App Security",
  "Network Exploitation",
  "Social Engineering",
  "Secure Code Review",
];

export const about = {
  eyebrow: "// WHOAMI",
  headline: "Education.",
  paragraphs: [
    "Information Security Student with hands-on experience in web development, software development, and cybersecurity projects. Skilled in advanced tech stack with experience developing practical web-based solutions and working with security-focused technologies. Strong problem-solving and analytical skills, with a passion for cybersecurity, secure application development, and emerging technologies. Seeking opportunities to apply technical and cybersecurity skills while contributing to innovative projects in the technology industry.",
  ],
  highlights: [
    { title: "BACHELOR'S DEGREE COMPUTER SCIENCE (INFORMATION SECURITY)", subtitle: "Universiti Tun Hussein Onn Malaysia" },
    { title: "GPA", subtitle: "3.69" },
  ],
  terminal: {
    title: "luai2001~",
    whoami: "luai_amer",
    role: "BACHELOR'S DEGREE COMPUTER SCIENCE (INFORMATION SECURITY)",
    experience: "5+ years",
    engagements: "500+",
    certs: "CISCO CCNA",
    statusLines: [
      "5+ years of experience",
      "50+ penetration tests",
      "Head of Social & Cultural Affairs Officer of the YSU UTHM",
    ],
  },
};

export const certificates = {
  eyebrow: "// CREDENTIALS",
  headline: "Certifications that prove the craft.",
  description:
    "Scroll or drag the wheel to flip through verified credentials. Each card is a credential earned in the field — not a participation badge.",
  mobileDescription:
    "Swipe to flip through verified credentials. Each card is a credential earned in the field — not a participation badge.",
  wheelLabel: " ",
  items: [
    {
      title:
        "Participated in Cybersecurity Industrial Talk: Your Next Move – From Graduation to Career.",
      date: "Apr 2026",
      image: "/images/certs/image.png",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "CCNA: Introduction to Networks",
      date: "Oct 2025",
      image: "/images/certs/9.png",
      href: "https://www.credly.com/badges/0dc52340-ae58-4c5e-b009-08467c6b0d27",
    },
    {
      title: "Participating in Webinar: FROM PHISHING TO AI-POWERED ATTACKS: THE CHANGING FACE OF CYBERCRIME",
      date: "Jun 2026",
      image: "/images/certs/8.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Hands-On Workshop: Aruba Instant AP (IAP) Configuration",
      date: "Jun 2026",
      image: "/images/certs/5.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Participating in Cybersecurity Industry Talk: AL RISK AND SECURITY MANAGEMENT",
      date: "May 2026",
      image: "/images/certs/4.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Participated in Breaking Into Cybersecurity : A Practical Guide For Fresh Graduates",
      date: "May 2026",
      image: "/images/certs/2.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Participated in Webinar Introduction to Digital Forensics.",
      date: "May 2026",
      image: "/images/certs/3.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Participating in Cybersecurity Industry Talk: Penetration Testing Methodologies",
      date: "Jun 2026",
      image: "/images/certs/6.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
    {
      title: "Participating in industrial talk: INSIDE THE WORLD OF SECURITY OPERATIONS CENTER SOC",
      date: "Jun 2026",
      image: "/images/certs/7.jpg",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/details/certifications/",
    },
  ],
};

export const projects = {
  eyebrow: "// PROJECTS",
  headline: "Selected work from the field.",
  description:
    "Engagements where I mapped risk, broke in like an adversary, and left defenders with a clearer path to harden what matters.",
  items: [
    {
      number: "01",
      category: "PHP, MySQL/MariaDB, AES-256-GCM, SHA-256, RSA-PSS, TOTP 2FA.",
      accent: "accent" as const,
      title: "Secure University Voting and Survey System",
      description:
        "A web-based voting and survey platform for university elections. Voter anonymity is enforced in the database design. The votes table holds no student identifier. A separate participation table records only who voted, never what they chose, and it blocks double voting within each campaign stage. Students and admins log in with credentials plus a time-based one-time password (TOTP) from an authenticator app. The login is fail-closed, following NIST SP 800-63B and OWASP guidance. The system supports committee elections, a second-stage vote that assigns roles to the elected members, accept/reject votes on rules, and anonymous surveys. Admins get a cryptographic audit page that checks each ballot's hash and signature without showing any voter identity.",
    },
    {
      number: "02",
      category: "Authentication & OTP, Information Security, PHP, MySQL, System Analysis & Design, Agile, E-Commerce Development",
      accent: "cyan" as const,
      title: "Silver Gilt Ordering Management System with Email OTP Verification",
      description:
        "For my final year project, I designed a secure web-based ordering system for Silver Gilt, a gold-plated accessories shop in Sana'a, Yemen, that replaces its manual paper, Excel and WhatsApp workflow with online ordering for customers, admins and staff, secured by email OTP, Bcrypt hashing, CAPTCHA and session time-outs.",
    },
    {
      number: "03",
      category: "Software Security, Applied Cryptography, Java, Threat Modeling (STRIDE), Secure Coding, SonarQube, SQLite",
      accent: "accent" as const,
      title: "Aegis Vault – Secure File Manager",
      description:
        "A Java desktop app that protects files stored on a local computer with password-based encryption. Files are encrypted with AES-256, and the key is derived from the user's password with PBKDF2 (65,536 iterations), so no key is hardcoded or stored. Once a file is encrypted, the plain-text original is deleted automatically. Passwords are stored as salted SHA-256 hashes, and logins are protected by throttling plus a 10-minute lockout after 10 failed attempts. An audit log records every login, encryption and decryption. The team built a STRIDE threat model, found and fixed vulnerabilities through manual testing, and scanned the code with SonarQube Cloud. Built with Java Swing (FlatLaf), SQLite and the Java Cryptography Architecture.",
    },
    // {
    //   number: "04",
    //   category: "RESEARCH",
    //   accent: "cyan" as const,
    //   title: "Auth bypass in a popular SSO library",
    //   description:
    //     "Discovered and disclosed a logic flaw that skipped MFA under a race condition. Coordinated CVE assignment, vendor patch, and public write-up without burning production tenants.",
    // },
    // {
    //   number: "05",
    //   category: "HARDEN",
    //   accent: "accent" as const,
    //   title: "Purple-team detection uplift",
    //   description:
    //     "Replayed real attacker tradecraft against the client's SIEM. Tuned rules until each TTP lit up cleanly — cut mean-time-to-detect from days to minutes on the covered paths.",
    // },
  ],
};

export const techStack = {
  eyebrow: "// ARSENAL",
  headline: "Languages, frameworks, and the rest of the kit.",
  description:
    "The stack behind the projects above — languages on top, frameworks and data stores below.",
  languages: [
    { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
    { name: "TypeScript", icon: "typescript", color: "3178C6" },
    { name: "Python", icon: "python", color: "3776AB" },
    { name: "Java", icon: "openjdk", color: "437291" },
    {
      name: "C#",
      icon: "csharp",
      color: "512BD4",
      // Simple Icons removed C# (trademark), so pull it from Devicon instead.
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    },
    { name: "PHP", icon: "php", color: "777BB4" },
    { name: "SQL", icon: "mysql", color: "4479A1" },
    { name: "Bash", icon: "gnubash", color: "4EAA25" },
  ],
  frameworks: [
    { name: "Next.js", icon: "nextdotjs", color: "FFFFFF" },
    { name: "React", icon: "react", color: "61DAFB" },
    { name: "Laravel", icon: "laravel", color: "FF2D20" },
    { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
    { name: "MongoDB", icon: "mongodb", color: "47A248" },
    { name: "MySQL", icon: "mysql", color: "4479A1" },
    { name: "SQLite", icon: "sqlite", color: "003B57" },
    { name: "LangGraph", icon: "langchain", color: "1CFFA0" },
  ],
};

export const contact = {
  eyebrow: "// CONTACT",
  headline: "Open a channel.",
  description:
    "Available for engagements, collaborations, and interesting problems. Pick a line — I reply.",
  email: {
    label: "luai2001ye@gmail.com",
    href: "mailto:luai2001ye@gmail.com",
  },
  cta: { label: "Send a message", href: "mailto:luai@csume.security" },
  footnote: "AVAILABLE WORLDWIDE · USUALLY REPLIES WITHIN 24H",
  socials: [
    {
      name: "GitHub",
      handle: "@luaiamer",
      href: "https://github.com/luaiamer",
      icon: "github" as const,
    },
    {
      name: "LinkedIn",
      handle: "/in/luai-amer-40ba612ab/",
      href: "https://www.linkedin.com/in/luai-amer-40ba612ab/",
      icon: "linkedin" as const,
    },
    {
      name: "Instagram",
      handle: "@amer.loui",
      href: "https://www.instagram.com/amer.loui/",
      icon: "instagram" as const,
    },
    {
      name: "Facebook",
      handle: "/lwy.amr.681270",
      href: "https://facebook.com/lwy.amr.681270/",
      icon: "facebook" as const,
    },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Certs", href: "#certificates" },
  { label: "Work", href: "#work" },
  { label: "Arsenal", href: "#arsenal" },
];
