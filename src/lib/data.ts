export const personalInfo = {
  name: "Isahaq",
  title: "Senior Full Stack Developer",
  subtitle: "Full Stack Engineer",
  company: "Paragon Group",
  location: "Dhaka, Bangladesh",
  email: "hmisahaq01@gmail.com",
  github: "https://github.com/isahaq1",
  linkedin: "https://www.linkedin.com/in/hm-isahaq-6b1593132/",
  bio: "Senior Full Stack Developer with 6+ years of experience building enterprise-level applications. Passionate about clean architecture, microservices, and delivering scalable solutions that drive business impact.",
  shortBio:
    "I craft robust backends and sleek frontends — turning complex problems into elegant, high-performance web solutions.",
};

export const skills = [
  {
    category: "Backend",
    icon: "⚙️",
    color: "#6366f1",
    items: [
      { name: "Laravel / PHP", level: 95 },
      { name: "Node.js / Express", level: 90 },
      { name: "Spring Boot", level: 72 },
      { name: "NestJS", level: 78 },
      { name: "RESTful APIs", level: 95 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    color: "#a855f7",
    items: [
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue / Nuxt.js", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "#06b6d4",
    items: [
      { name: "MySQL / PostgreSQL", level: 92 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 75 },
      { name: "Elasticsearch", level: 65 },
      { name: "Oracle / MSSQL", level: 70 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    color: "#10b981",
    items: [
      { name: "Docker / Kubernetes", level: 80 },
      { name: "Jenkins / CI-CD", level: 78 },
      { name: "AWS / Azure / GCP", level: 72 },
      { name: "Linux / Nginx", level: 85 },
      { name: "Kafka / RabbitMQ", level: 68 },
    ],
  },
];

// Flat list for the solar system orbit animation
export const skillPlanets = [
  { name: "Laravel", color: "#ef4444", size: 18, orbit: 1 },
  { name: "Node.js", color: "#22c55e", size: 16, orbit: 1 },
  { name: "React", color: "#3b82f6", size: 16, orbit: 1 },
  { name: "Next.js", color: "#f8fafc", size: 14, orbit: 1 },
  { name: "TypeScript", color: "#3178c6", size: 15, orbit: 2 },
  { name: "Docker", color: "#0ea5e9", size: 14, orbit: 2 },
  { name: "PostgreSQL", color: "#6366f1", size: 15, orbit: 2 },
  { name: "MySQL", color: "#f59e0b", size: 13, orbit: 2 },
  { name: "Redis", color: "#ef4444", size: 12, orbit: 3 },
  { name: "MongoDB", color: "#22c55e", size: 13, orbit: 3 },
  { name: "AWS", color: "#f97316", size: 12, orbit: 3 },
  { name: "Tailwind", color: "#06b6d4", size: 12, orbit: 3 },
  { name: "PHP", color: "#8b5cf6", size: 14, orbit: 2 },
  { name: "GraphQL", color: "#ec4899", size: 11, orbit: 3 },
  { name: "Jenkins", color: "#d946ef", size: 11, orbit: 3 },
  { name: "Linux", color: "#facc15", size: 13, orbit: 2 },
  { name: "NestJS", color: "#e11d48", size: 12, orbit: 3 },
  { name: "Kafka", color: "#a3a3a3", size: 11, orbit: 3 },
  { name: "K8s", color: "#3b82f6", size: 12, orbit: 3 },
  { name: "Vue", color: "#10b981", size: 12, orbit: 3 },
];

export const techStack = [
  "PHP",
  "Laravel",
  "Node.js",
  "React",
  "Next.js",
  "TypeScript",
  "Spring Boot",
  "NestJS",
  "Docker",
  "Kubernetes",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Tailwind CSS",
  "GraphQL",
  "Kafka",
  "Jenkins",
  "Linux",
];

export const experiences = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Paragon Group",
    period: "2026 – Present",
    type: "Current",
    description:
      "Leading full-stack development of enterprise solutions, architecting scalable microservices, and mentoring junior developers. Delivering high-impact digital transformation projects.",
    tech: ["Laravel", "Node.js", "React", "Next.js", "Docker", "MySQL"],
    highlights: [
      "Architecting microservices-based enterprise solutions",
      "Leading cross-functional development teams",
      "Driving digital transformation initiatives",
      "Optimizing system performance and scalability",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Numatrix (SEBL | DX GROUP)",
    period: "2022 – 2026",
    type: "Previous",
    description:
      "Led cloud-based enterprise solution development using microservices architecture. Built and maintained multiple large-scale systems including ERP, HRMS, and Field Force Tracking applications.",
    tech: ["Node.js", "Next.js", "Laravel", "Jenkins", "Docker", "PostgreSQL"],
    highlights: [
      "EBS ERP System — microservices with Jenkins CI/CD pipeline",
      "HRMS — recruitment & barcode asset tracking for 500+ employees",
      "FFT Field Force Tracker — serving 550+ users with warranty management",
      "Financial Loan Module for IPDC — mobile API development",
    ],
  },
  {
    id: 3,
    role: "PHP Developer",
    company: "BDTask",
    period: "2019 – 2022",
    type: "Previous",
    description:
      "Developed large-scale web applications with a focus on performance optimization and CI/CD pipelines. Built ERP systems, pharmacy management, and HRMS platforms.",
    tech: [
      "PHP",
      "CodeIgniter",
      "Laravel",
      "MySQL",
      "Digital Ocean",
      "JavaScript",
    ],
    highlights: [
      "Full ERP System using PHP/CodeIgniter/MySQL on Digital Ocean",
      "Pharmacare — multi-branch pharmacy management system",
      "HRMS with fingerprint device integration",
      "Online bus ticketing & booking system",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "EBS – Enterprise ERP System",
    description:
      "Cloud-based ERP built with microservices architecture. Handles inventory, finance, HR, and operations for a large enterprise. Deployed with Jenkins CI/CD on cloud infrastructure.",
    tech: ["Node.js", "Next.js", "PostgreSQL", "Docker", "Jenkins", "Redis"],
    category: "Enterprise",
    featured: true,
    link: null,
    github: null,
    color: "#6366f1",
  },
  {
    id: 2,
    title: "Barcode & QR Code Generator",
    description:
      "Open-source Composer package for Laravel and PHP. Supports 30+ barcode/QR code formats including Code128, QR Code, PDF417, and more. Used by developers worldwide.",
    tech: ["PHP", "Laravel", "Composer", "Open Source"],
    category: "Open Source",
    featured: true,
    link: "https://packagist.org/packages/isahaq/barcode",
    github: "https://github.com/isahaq1/barcodeGeneratorPkg",
    color: "#a855f7",
  },
  {
    id: 7,
    title: "NumberToString — Multilingual Converter",
    description:
      "A powerful NPM package for converting numbers to words in 7+ languages including English, Bangla, French, Hindi, Spanish, Urdu, and Chinese. Supports currency formatting and large numbers up to billions.",
    tech: ["JavaScript", "Node.js", "NPM", "Open Source"],
    category: "Open Source",
    featured: true,
    link: "https://www.npmjs.com/package/@isahaq/numbertostring",
    github: "https://github.com/isahaq1/numbertostring",
    color: "#f59e0b",
    stats: {
      languages: "7+",
      version: "v2.8.0",
      license: "MIT",
    },
  },
  {
    id: 3,
    title: "FFT – Field Force Tracker",
    description:
      "Real-time field force management system serving 550+ users. Features warranty management, asset tracking, and geolocation-based reporting for enterprise field operations.",
    tech: ["Laravel", "MySQL", "Redis", "REST API", "JavaScript"],
    category: "Enterprise",
    featured: true,
    link: null,
    github: null,
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "HRMS with Biometric Integration",
    description:
      "Complete HR management system with fingerprint device integration for attendance, payroll automation, leave management, and recruitment tracking.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Biometric SDK"],
    category: "Enterprise",
    featured: false,
    link: null,
    github: null,
    color: "#10b981",
  },
  {
    id: 5,
    title: "CI/CD Pipeline Infrastructure",
    description:
      "Full DevOps pipeline setup using Docker, Kubernetes, and Jenkins for automated testing, building, and deployment across multiple environments.",
    tech: ["Docker", "Kubernetes", "Jenkins", "Linux", "Shell Script"],
    category: "DevOps",
    featured: false,
    link: null,
    github: "https://github.com/isahaq1",
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Pharmacare Management System",
    description:
      "Multi-branch pharmacy management system with inventory control, sales tracking, prescription management, and financial reporting across multiple locations.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap", "jQuery"],
    category: "Enterprise",
    featured: false,
    link: null,
    github: null,
    color: "#ef4444",
  },
];

export const stats = [
  { label: "Years Experience", value: "5+", suffix: "" },
  { label: "Projects Delivered", value: "30+", suffix: "" },
  { label: "Technologies", value: "20+", suffix: "" },
  { label: "Users Served", value: "1K+", suffix: "" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
