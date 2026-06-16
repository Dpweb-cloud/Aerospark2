// AeroSpark Constants & Configuration

export const SITE_CONFIG = {
  name: "AeroSpark",
  tagline: "Aerospace Learning Ecosystem",
  description:
    "A futuristic aerospace engineering ecosystem combining education, R&D, and enterprise solutions.",
  url: "https://aerospark.io",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Consultation", href: "/consultation" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const COURSES = [
  {
    id: "drone-rules",
    title: "Drone Rules & Regulations DGCA",
    category: "Regulatory",
    description:
      "Master India's DGCA drone regulations, airspace classifications, and compliance frameworks for commercial UAS operations.",
    duration: "8 weeks",
    lessons: 42,
    level: "Beginner" as const,
    price: 12999,
    rating: 4.9,
    students: 1240,
    image: "/courses/drone-rules.jpg",
    tags: ["DGCA", "Regulation", "UAS", "Compliance"],
  },
  {
    id: "drone-systems",
    title: "Drone Systems & R&D",
    category: "Engineering",
    description:
      "Design, build, and test advanced multirotor and fixed-wing UAS systems from concept to flight testing.",
    duration: "12 weeks",
    lessons: 68,
    level: "Advanced" as const,
    price: 24999,
    rating: 4.8,
    students: 890,
    image: "/courses/drone-systems.jpg",
    tags: ["R&D", "Systems", "Design", "Testing"],
  },
  {
    id: "as9100d",
    title: "AS9100D Quality Management",
    category: "Quality",
    description:
      "Implement aerospace quality management systems aligned with AS9100D standards for manufacturing excellence.",
    duration: "6 weeks",
    lessons: 36,
    level: "Intermediate" as const,
    price: 18999,
    rating: 4.7,
    students: 650,
    image: "/courses/as9100d.jpg",
    tags: ["Quality", "AS9100D", "Manufacturing", "Audit"],
  },
  {
    id: "catia-v5",
    title: "CATIA V5 – Advanced Surface & Solid",
    category: "CAD/CAM",
    description:
      "Master CATIA V5 for aerospace part design, surface modeling, assembly design, and GD&T annotations.",
    duration: "10 weeks",
    lessons: 55,
    level: "Intermediate" as const,
    price: 19999,
    rating: 4.9,
    students: 1580,
    image: "/courses/catia-v5.jpg",
    tags: ["CATIA", "CAD", "Surface", "Design"],
  },
  {
    id: "nx-cad",
    title: "Siemens NX CAD",
    category: "CAD/CAM",
    description:
      "Comprehensive NX CAD training covering parametric modeling, sheet metal, and aerospace assembly workflows.",
    duration: "10 weeks",
    lessons: 52,
    level: "Intermediate" as const,
    price: 19999,
    rating: 4.8,
    students: 920,
    image: "/courses/nx-cad.jpg",
    tags: ["NX", "Siemens", "CAD", "Modeling"],
  },
  {
    id: "cfd",
    title: "Computational Fluid Dynamics",
    category: "Simulation",
    description:
      "Learn CFD fundamentals, mesh generation, turbulence modeling, and aerodynamic analysis using industry tools.",
    duration: "12 weeks",
    lessons: 64,
    level: "Advanced" as const,
    price: 29999,
    rating: 4.9,
    students: 720,
    image: "/courses/cfd.jpg",
    tags: ["CFD", "Simulation", "Fluent", "Aerodynamics"],
  },
  {
    id: "fea",
    title: "Finite Element Analysis",
    category: "Simulation",
    description:
      "Structural analysis, thermal simulation, fatigue life prediction, and composite material modeling for aerospace.",
    duration: "12 weeks",
    lessons: 60,
    level: "Advanced" as const,
    price: 29999,
    rating: 4.8,
    students: 680,
    image: "/courses/fea.jpg",
    tags: ["FEA", "Structural", "ANSYS", "Composites"],
  },
  {
    id: "aerodynamics",
    title: "Aerodynamics Fundamentals",
    category: "Core",
    description:
      "Foundational aerodynamics covering lift, drag, airfoil theory, boundary layers, and high-speed flow regimes.",
    duration: "8 weeks",
    lessons: 45,
    level: "Beginner" as const,
    price: 14999,
    rating: 4.9,
    students: 2100,
    image: "/courses/aerodynamics.jpg",
    tags: ["Aerodynamics", "Theory", "Airfoil", "Flow"],
  },
];

export const CONSULTATION_SERVICES = [
  {
    id: "uas-certification",
    title: "UAS Type Certification",
    description:
      "End-to-end DGCA type certification support for UAS manufacturers — from documentation to flight testing.",
    icon: "Shield",
    features: [
      "DGCA compliance roadmap",
      "Design review & documentation",
      "Test planning & execution",
      "Certification submission support",
    ],
  },
  {
    id: "as9100d-quality",
    title: "AS9100D Quality Systems",
    description:
      "Implement and maintain aerospace quality management systems for global supply chain participation.",
    icon: "Award",
    features: [
      "Gap analysis & readiness audit",
      "QMS documentation support",
      "Internal audit training",
      "Certification body preparation",
    ],
  },
  {
    id: "drone-rd",
    title: "Drone R&D Consulting",
    description:
      "Technical consulting for drone design, development, and testing — from concept to production.",
    icon: "Cpu",
    features: [
      "Concept design & feasibility",
      "Prototype development",
      "Flight testing & validation",
      "Production transition support",
    ],
  },
  {
    id: "design-simulation",
    title: "Design & Simulation",
    description:
      "Advanced CAD/CAE consulting for aerospace structures, mechanisms, and system-level simulation.",
    icon: "Box",
    features: [
      "3D modeling & surfacing",
      "FEA/CFD analysis",
      "Design optimization",
      "Digital twin development",
    ],
  },
  {
    id: "procurement",
    title: "Aerospace Procurement",
    description:
      "Strategic procurement consulting for aerospace-grade materials, components, and vendor management.",
    icon: "Package",
    features: [
      "Vendor qualification",
      "Material sourcing",
      "Supply chain optimization",
      "Cost reduction strategies",
    ],
  },
];

export const BLOG_POSTS = [
  {
    id: "future-of-uas",
    title: "The Future of UAS in India: DGCA's Evolving Framework",
    excerpt:
      "An in-depth analysis of India's drone regulatory landscape and upcoming policy changes that will reshape the industry.",
    category: "Regulatory",
    author: "Dr. Arun Mehta",
    date: "2026-05-01",
    readTime: "8 min",
    image: "/blog/uas-future.jpg",
  },
  {
    id: "composite-materials",
    title: "Advanced Composite Materials in Modern Aerospace",
    excerpt:
      "How carbon fiber and advanced composites are revolutionizing aircraft design, reducing weight, and improving performance.",
    category: "Engineering",
    author: "Priya Sharma",
    date: "2026-04-25",
    readTime: "12 min",
    image: "/blog/composites.jpg",
  },
  {
    id: "ai-in-aerospace",
    title: "AI-Driven Quality Inspection in Aerospace Manufacturing",
    excerpt:
      "Machine learning applications in non-destructive testing, automated visual inspection, and predictive maintenance.",
    category: "Technology",
    author: "Vikram Rao",
    date: "2026-04-18",
    readTime: "10 min",
    image: "/blog/ai-aerospace.jpg",
  },
  {
    id: "digital-twin",
    title: "Digital Twins: Transforming Aerospace Product Lifecycle",
    excerpt:
      "How digital twin technology is bridging the gap between design simulation and real-world aerospace operations.",
    category: "Technology",
    author: "Dr. Arun Mehta",
    date: "2026-04-10",
    readTime: "9 min",
    image: "/blog/digital-twin.jpg",
  },
  {
    id: "evtol-revolution",
    title: "eVTOL Revolution: Urban Air Mobility Takes Flight",
    excerpt:
      "The engineering challenges and market opportunities in the rapidly evolving electric vertical takeoff and landing sector.",
    category: "Industry",
    author: "Priya Sharma",
    date: "2026-04-02",
    readTime: "11 min",
    image: "/blog/evtol.jpg",
  },
  {
    id: "additive-manufacturing",
    title: "Additive Manufacturing in Aerospace: Beyond Prototyping",
    excerpt:
      "3D printing for flight-critical components — certifications, materials, and production-scale applications.",
    category: "Manufacturing",
    author: "Vikram Rao",
    date: "2026-03-28",
    readTime: "7 min",
    image: "/blog/additive.jpg",
  },
];

export const STATS = [
  { label: "Students Trained", value: "8,200+", icon: "Users" },
  { label: "Courses Available", value: "24", icon: "BookOpen" },
  { label: "Industry Partners", value: "50+", icon: "Building" },
  { label: "Certifications Issued", value: "3,600+", icon: "Award" },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Drone Startup Founder",
    content:
      "AeroSpark's drone certification course gave me the exact knowledge I needed to navigate DGCA regulations. Our startup got type-certified in record time.",
    avatar: "/avatars/rajesh.jpg",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Quality Engineer, HAL",
    content:
      "The AS9100D course is incredibly thorough. It directly helped me implement quality systems at our facility and pass the certification audit on the first attempt.",
    avatar: "/avatars/sneha.jpg",
    rating: 5,
  },
  {
    name: "Arjun Deshmukh",
    role: "CAD Designer, Tata Advanced Systems",
    content:
      "CATIA V5 training from AeroSpark is best-in-class. The projects mirror real aerospace design challenges — I was productive from day one at my new role.",
    avatar: "/avatars/arjun.jpg",
    rating: 5,
  },
];
