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
  { label: "Consultation", href: "/consultation" },
  { label: "Academy", href: "/academy" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const COURSES = [
  {
    id: "dgca-drone-regulations",
    title: "DGCA Drone Regulations",
    category: "Compliance & Regulations",
    description: "Understand India’s drone rules, airspace, pilot responsibilities and basic compliance through simple explanations and practical flight situations.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 1499,
    rating: 4.9,
    students: 1240,
    image: "/banner_dgca_1784991714820.png",
    tags: ["DGCA", "UAS", "Compliance", "India"],
    modules: [
        {
            "title": "Module 1: India’s Drone Regulatory Framework",
            "items": [
                "Drone Rules 2021 and the current regulatory ecosystem",
                "Key terms: drone/UAS, operator, remote pilot and type certification",
                "Roles of MoCA, DGCA, eGCA and the Digital Sky ecosystem",
                "Where to check current notices, airspace information and regulatory updates"
            ]
        },
        {
            "title": "Module 2: Categories, Registration & Certification Awareness",
            "items": [
                "Drone weight categories and why classification matters",
                "Registration/UIN and ownership basics",
                "Type certification: purpose, applicability and basic flow",
                "eGCA service flow and common documentation awareness"
            ]
        },
        {
            "title": "Module 3: Airspace & Flight Operations",
            "items": [
                "Green, Yellow and Red zones and how to read the airspace map",
                "Basic altitude and operating limits",
                "Airport / controlled-airspace restrictions and permission awareness",
                "Pre-flight airspace, weather and operating-area checks"
            ]
        },
        {
            "title": "Module 4: Remote Pilot & Operator Responsibilities",
            "items": [
                "Remote pilot certification and training basics",
                "Responsibilities of the remote pilot and operator",
                "VLOS, safe separation, people/property and responsible operation",
                "Flight logs, records and incident-reporting awareness"
            ]
        },
        {
            "title": "Module 5: Safety, Compliance & Documentation",
            "items": [
                "Aircraft, battery and maintenance-readiness checks",
                "Privacy, security, payload and responsible-use awareness",
                "Simple compliance-document checklist for an operation",
                "Non-compliance, incidents and enforcement awareness"
            ]
        },
        {
            "title": "Module 6: Practical Regulatory Scenarios & Review",
            "items": [
                "Planning a basic mapping / survey flight",
                "Planning an operation near restricted or controlled airspace",
                "Commercial-operation documentation walkthrough",
                "How to check for rule updates + final compliance exercise"
            ]
        }
    ],
    topics: [
        "Drone Rules 2021 and the current regulatory ecosystem",
        "Key terms: drone/UAS, operator, remote pilot and type certification",
        "Roles of MoCA, DGCA, eGCA and the Digital Sky ecosystem",
        "Where to check current notices, airspace information and regulatory updates",
        "Drone weight categories and why classification matters",
        "Registration/UIN and ownership basics",
        "Type certification: purpose, applicability and basic flow",
        "eGCA service flow and common documentation awareness",
        "Green, Yellow and Red zones and how to read the airspace map",
        "Basic altitude and operating limits",
        "Airport / controlled-airspace restrictions and permission awareness",
        "Pre-flight airspace, weather and operating-area checks",
        "Remote pilot certification and training basics",
        "Responsibilities of the remote pilot and operator",
        "VLOS, safe separation, people/property and responsible operation",
        "Flight logs, records and incident-reporting awareness",
        "Aircraft, battery and maintenance-readiness checks",
        "Privacy, security, payload and responsible-use awareness",
        "Simple compliance-document checklist for an operation",
        "Non-compliance, incidents and enforcement awareness",
        "Planning a basic mapping / survey flight",
        "Planning an operation near restricted or controlled airspace",
        "Commercial-operation documentation walkthrough",
        "How to check for rule updates + final compliance exercise"
    ],
    eligibility: "Students, aspiring drone pilots, entrepreneurs, and professionals from photography, surveying, agriculture, and inspection fields.",
    outcome: "Clear foundation in Indian UAS regulations and basic requirements for safe, responsible, and compliant drone operations.",
  },
  {
    id: "faa-drone-regulations",
    title: "FAA Drone Regulations",
    category: "Compliance & Regulations",
    description: "Learn the main FAA Part 107 rules for small drone operations, remote-pilot responsibilities, airspace, Remote ID and authorizations.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.8,
    students: 890,
    image: "/banner_faa_1784991724685.png",
    tags: ["FAA", "Part 107", "UAS", "USA"],
    modules: [
        {
            "title": "Module 1: FAA & Part 107 Fundamentals",
            "items": [
                "What Part 107 covers and when it applies",
                "Part 107 versus recreational flying — simple comparison",
                "Key roles: Remote Pilot in Command, visual observer and operator",
                "Small-UAS eligibility, registration and basic operating responsibility"
            ]
        },
        {
            "title": "Module 2: Remote Pilot Requirements",
            "items": [
                "Remote Pilot Certificate eligibility and knowledge-test route",
                "Recurrent training and keeping knowledge current",
                "Pilot-in-command responsibilities and crew coordination",
                "Pre-flight inspection, risk assessment and go/no-go decisions"
            ]
        },
        {
            "title": "Module 3: Airspace & Operating Rules",
            "items": [
                "Basic US airspace classes for drone pilots",
                "400-ft rule, VLOS and common operating limitations",
                "Operations at night and over people — awareness level",
                "Weather, visibility, emergencies and accident-reporting basics"
            ]
        },
        {
            "title": "Module 4: LAANC & Airspace Authorization",
            "items": [
                "What LAANC is and when it is used",
                "UAS Facility Maps and altitude grids",
                "Near-real-time authorization versus further coordination",
                "Manual authorization and the difference between authorization and waiver"
            ]
        },
        {
            "title": "Module 5: Remote ID, Registration & Compliance",
            "items": [
                "Drone registration and marking basics",
                "Standard Remote ID and broadcast-module concepts",
                "Records, inspections and operational documentation",
                "Common compliance mistakes and how to avoid them"
            ]
        },
        {
            "title": "Module 6: Waivers, Scenarios & Final Review",
            "items": [
                "What a Part 107 waiver is and when it may be needed",
                "Simple controlled-airspace mission-planning example",
                "Night / people / special-operation scenario discussion",
                "Final Part 107 compliance checklist and review"
            ]
        }
    ],
    topics: [
        "What Part 107 covers and when it applies",
        "Part 107 versus recreational flying — simple comparison",
        "Key roles: Remote Pilot in Command, visual observer and operator",
        "Small-UAS eligibility, registration and basic operating responsibility",
        "Remote Pilot Certificate eligibility and knowledge-test route",
        "Recurrent training and keeping knowledge current",
        "Pilot-in-command responsibilities and crew coordination",
        "Pre-flight inspection, risk assessment and go/no-go decisions",
        "Basic US airspace classes for drone pilots",
        "400-ft rule, VLOS and common operating limitations",
        "Operations at night and over people — awareness level",
        "Weather, visibility, emergencies and accident-reporting basics",
        "What LAANC is and when it is used",
        "UAS Facility Maps and altitude grids",
        "Near-real-time authorization versus further coordination",
        "Manual authorization and the difference between authorization and waiver",
        "Drone registration and marking basics",
        "Standard Remote ID and broadcast-module concepts",
        "Records, inspections and operational documentation",
        "Common compliance mistakes and how to avoid them",
        "What a Part 107 waiver is and when it may be needed",
        "Simple controlled-airspace mission-planning example",
        "Night / people / special-operation scenario discussion",
        "Final Part 107 compliance checklist and review"
    ],
    eligibility: "Beginners interested in UAS operations in the USA, aspiring FAA remote pilots, drone business owners, and professionals using drones commercially.",
    outcome: "Basic understanding of FAA UAS compliance and safe flight practices for responsible drone operations in the United States.",
  },
  {
    id: "easa-drone-regulations",
    title: "EASA Drone Regulations",
    category: "Compliance & Regulations",
    description: "Understand the European UAS framework and how the Open, Specific and Certified categories affect drone operations.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.7,
    students: 620,
    image: "/banner_easa.png",
    tags: ["EASA", "Europe", "UAS", "Compliance"],
    modules: [
        {
            "title": "Module 1: European UAS Regulatory Framework",
            "items": [
                "How the EASA risk-based UAS framework is organised",
                "Open, Specific and Certified categories — big-picture comparison",
                "UAS operator versus remote pilot responsibilities",
                "Class identification, registration and remote-ID awareness"
            ]
        },
        {
            "title": "Module 2: Open Category Fundamentals",
            "items": [
                "Main Open-category limitations and basic operating conditions",
                "VLOS, 120-m height concept and safe operation around people",
                "Operator registration and remote-pilot competency awareness",
                "Class-marked and legacy / privately built UAS — foundation view"
            ]
        },
        {
            "title": "Module 3: A1, A2 & A3 Operations",
            "items": [
                "What A1, A2 and A3 are designed for",
                "People, distance and operating-area considerations",
                "Remote-pilot competency differences across subcategories",
                "Choosing A1/A2/A3 for simple example missions"
            ]
        },
        {
            "title": "Module 4: Specific Category",
            "items": [
                "When an operation moves beyond the Open category",
                "Operational authorisation — concept and purpose",
                "Standard scenarios and declarations — awareness level",
                "SORA and risk assessment — introduction only"
            ]
        },
        {
            "title": "Module 5: Certified & Higher-Risk Operations",
            "items": [
                "What the Certified category is for",
                "Higher-risk operations and why additional approvals are needed",
                "Aircraft, operator and pilot certification concepts",
                "Comparing Open, Specific and Certified using examples"
            ]
        },
        {
            "title": "Module 6: Practical Compliance Scenarios",
            "items": [
                "Classifying a simple drone mission",
                "Geographical zones and local-rule awareness",
                "Basic operating documentation and pre-flight checks",
                "How to find current EASA rules + final review"
            ]
        }
    ],
    topics: [
        "How the EASA risk-based UAS framework is organised",
        "Open, Specific and Certified categories — big-picture comparison",
        "UAS operator versus remote pilot responsibilities",
        "Class identification, registration and remote-ID awareness",
        "Main Open-category limitations and basic operating conditions",
        "VLOS, 120-m height concept and safe operation around people",
        "Operator registration and remote-pilot competency awareness",
        "Class-marked and legacy / privately built UAS — foundation view",
        "What A1, A2 and A3 are designed for",
        "People, distance and operating-area considerations",
        "Remote-pilot competency differences across subcategories",
        "Choosing A1/A2/A3 for simple example missions",
        "When an operation moves beyond the Open category",
        "Operational authorisation — concept and purpose",
        "Standard scenarios and declarations — awareness level",
        "SORA and risk assessment — introduction only",
        "What the Certified category is for",
        "Higher-risk operations and why additional approvals are needed",
        "Aircraft, operator and pilot certification concepts",
        "Comparing Open, Specific and Certified using examples",
        "Classifying a simple drone mission",
        "Geographical zones and local-rule awareness",
        "Basic operating documentation and pre-flight checks",
        "How to find current EASA rules + final review"
    ],
    eligibility: "Beginners interested in UAS operations in Europe, aspiring remote pilots, drone service providers, and professionals from photography, surveying, and inspection.",
    outcome: "Clear foundation in EASA UAS rules and basic compliance approach for safe drone operations in Europe.",
  },
  {
    id: "aerospace-fundamentals",
    title: "Aerospace Engineering Fundamentals",
    category: "Technical Foundation",
    description: "Build a clear foundation in how aircraft fly, how they are built and how the main aerospace engineering areas work together.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 1499,
    rating: 4.9,
    students: 2100,
    image: "/banner_pixhawk_1784992045334.png",
    tags: ["Aerospace", "Aviation", "Engineering", "Fundamentals"],
    modules: [
        {
            "title": "Module 1: Aircraft & Aerospace Basics",
            "items": [
                "Major types of aircraft, UAVs and spacecraft — overview",
                "Main aircraft parts and what each part does",
                "Aerospace engineering disciplines and how they connect",
                "Aircraft axes, basic motion and control surfaces"
            ]
        },
        {
            "title": "Module 2: Principles of Flight",
            "items": [
                "Lift, weight, thrust and drag",
                "Why wings create lift — simple explanation",
                "Angle of attack, stall and basic flight conditions",
                "Stability, control and basic aircraft performance"
            ]
        },
        {
            "title": "Module 3: Aircraft Structures",
            "items": [
                "Loads acting on wings, fuselage and landing gear",
                "Basic structural members: spars, ribs, frames and skin",
                "Tension, compression, bending, shear and torsion — concept level",
                "Why stiffness, strength and weight all matter"
            ]
        },
        {
            "title": "Module 4: Aerospace Materials & Manufacturing",
            "items": [
                "Aluminium, steel, titanium and where they are used",
                "Composite materials and sandwich structures",
                "Material properties: strength, stiffness, density and fatigue awareness",
                "Basic aerospace manufacturing and joining methods"
            ]
        },
        {
            "title": "Module 5: Propulsion & Aircraft Systems",
            "items": [
                "Piston, turboprop, turbofan, jet and electric propulsion — overview",
                "Fuel, electrical and hydraulic systems — overview",
                "Avionics, navigation and flight-control systems — overview",
                "How aircraft systems are integrated around the mission"
            ]
        },
        {
            "title": "Module 6: Aircraft Development & Industry",
            "items": [
                "From mission requirement to aircraft concept",
                "Design trade-offs: weight, range, speed, cost and safety",
                "Testing, certification and documentation — foundation view",
                "Aerospace project lifecycle, roles and career pathways"
            ]
        }
    ],
    topics: [
        "Major types of aircraft, UAVs and spacecraft — overview",
        "Main aircraft parts and what each part does",
        "Aerospace engineering disciplines and how they connect",
        "Aircraft axes, basic motion and control surfaces",
        "Lift, weight, thrust and drag",
        "Why wings create lift — simple explanation",
        "Angle of attack, stall and basic flight conditions",
        "Stability, control and basic aircraft performance",
        "Loads acting on wings, fuselage and landing gear",
        "Basic structural members: spars, ribs, frames and skin",
        "Tension, compression, bending, shear and torsion — concept level",
        "Why stiffness, strength and weight all matter",
        "Aluminium, steel, titanium and where they are used",
        "Composite materials and sandwich structures",
        "Material properties: strength, stiffness, density and fatigue awareness",
        "Basic aerospace manufacturing and joining methods",
        "Piston, turboprop, turbofan, jet and electric propulsion — overview",
        "Fuel, electrical and hydraulic systems — overview",
        "Avionics, navigation and flight-control systems — overview",
        "How aircraft systems are integrated around the mission",
        "From mission requirement to aircraft concept",
        "Design trade-offs: weight, range, speed, cost and safety",
        "Testing, certification and documentation — foundation view",
        "Aerospace project lifecycle, roles and career pathways"
    ],
    eligibility: "Students interested in aerospace or aeronautical engineering, beginners exploring aviation or drone technology, and professionals seeking aerospace domain awareness.",
    outcome: "Clear understanding of aerospace engineering fundamentals and ability to identify major aerospace systems, basic flight concepts, and engineering applications.",
  },
  {
    id: "aerodynamics",
    title: "Aerodynamics",
    category: "Technical Foundation",
    description: "Learn how air moves around wings and aircraft, how lift and drag are produced, and how simple aerodynamic choices affect stability and performance.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.8,
    students: 1580,
    image: "/banner_aerodynamics_1784991955683.png",
    tags: ["Aerodynamics", "Airfoil", "Lift", "Drag"],
    modules: [
        {
            "title": "Module 1: Airflow & Aerodynamic Forces",
            "items": [
                "Air properties: pressure, density, temperature and speed",
                "Relative airflow, velocity and basic flow terminology",
                "The four forces acting on an aircraft",
                "Pressure and momentum as simple ways to understand aerodynamic force"
            ]
        },
        {
            "title": "Module 2: Airfoils, Pressure & Angle of Attack",
            "items": [
                "Airfoil geometry: chord, camber, thickness and leading/trailing edge",
                "How airflow and pressure change around an airfoil",
                "Angle of attack and how it changes lift",
                "Flow separation and stall — what happens and why"
            ]
        },
        {
            "title": "Module 3: Lift, Drag & Aerodynamic Coefficients",
            "items": [
                "Lift equation and simple use of lift coefficient",
                "Parasite, induced and total drag",
                "Drag coefficient and simple drag-polar awareness",
                "Lift-to-drag ratio and what it tells us about efficiency"
            ]
        },
        {
            "title": "Module 4: Real Wings & High-Lift Effects",
            "items": [
                "From a 2D airfoil to a finite wing",
                "Aspect ratio, wing planform and wing loading",
                "Wingtip vortices and induced drag",
                "Flaps and simple high-lift-device effects"
            ]
        },
        {
            "title": "Module 5: Stability & Performance Basics",
            "items": [
                "Centre of gravity, aerodynamic centre and centre of pressure — concept level",
                "Longitudinal, lateral and directional stability",
                "How control surfaces create pitching, rolling and yawing moments",
                "How aerodynamics affects take-off, climb, cruise and glide"
            ]
        },
        {
            "title": "Module 6: Aircraft & UAV Applications",
            "items": [
                "Reynolds number — simple awareness for small UAVs",
                "Wind, gusts and why small drones are more sensitive",
                "Choosing a wing / airfoil for a simple mission",
                "Final aircraft/UAV aerodynamic trade-off case study"
            ]
        }
    ],
    topics: [
        "Air properties: pressure, density, temperature and speed",
        "Relative airflow, velocity and basic flow terminology",
        "The four forces acting on an aircraft",
        "Pressure and momentum as simple ways to understand aerodynamic force",
        "Airfoil geometry: chord, camber, thickness and leading/trailing edge",
        "How airflow and pressure change around an airfoil",
        "Angle of attack and how it changes lift",
        "Flow separation and stall — what happens and why",
        "Lift equation and simple use of lift coefficient",
        "Parasite, induced and total drag",
        "Drag coefficient and simple drag-polar awareness",
        "Lift-to-drag ratio and what it tells us about efficiency",
        "From a 2D airfoil to a finite wing",
        "Aspect ratio, wing planform and wing loading",
        "Wingtip vortices and induced drag",
        "Flaps and simple high-lift-device effects",
        "Centre of gravity, aerodynamic centre and centre of pressure — concept level",
        "Longitudinal, lateral and directional stability",
        "How control surfaces create pitching, rolling and yawing moments",
        "How aerodynamics affects take-off, climb, cruise and glide",
        "Reynolds number — simple awareness for small UAVs",
        "Wind, gusts and why small drones are more sensitive",
        "Choosing a wing / airfoil for a simple mission",
        "Final aircraft/UAV aerodynamic trade-off case study"
    ],
    eligibility: "Aerospace, aeronautical, and mechanical engineering students, UAS and aviation learners, CAD/FEA/CFD learners seeking aerodynamic understanding.",
    outcome: "Clear foundation in aerodynamic principles and understanding of how airflow affects design, stability, performance, and efficiency in aircraft and drones.",
  },
  {
    id: "drone-components",
    title: "Drone Components & Applications",
    category: "Technical Foundation",
    description: "Understand the main drone components, how they work together and how to select a sensible combination for different missions.",
    duration: "8 weeks",
    lessons: 32,
    level: "Beginner" as const,
    price: 2999,
    rating: 4.6,
    students: 1120,
    image: "/banner_components_1784991954912.png",
    tags: ["UAS", "Drone", "Components", "R&D"],
    modules: [
        {
            "title": "Module 1: UAV Types & System Architecture",
            "items": [
                "Multirotor, fixed-wing and VTOL configurations",
                "Main drone subsystems and how they connect",
                "Mission requirements: payload, range, endurance and environment",
                "Basic safety and system-level design thinking"
            ]
        },
        {
            "title": "Module 2: Frames & Structures",
            "items": [
                "Frame layouts and structural load paths",
                "Common materials: plastics, aluminium and composites",
                "Weight, balance and centre-of-gravity awareness",
                "Vibration, landing loads and payload mounting"
            ]
        },
        {
            "title": "Module 3: Motors & Propellers",
            "items": [
                "Brushless-motor basics and KV rating",
                "Propeller diameter, pitch and blade-count basics",
                "Matching motor and propeller to thrust requirement",
                "Simple thrust-to-weight selection exercise"
            ]
        },
        {
            "title": "Module 4: ESCs, Batteries & Power Systems",
            "items": [
                "ESC purpose, current rating and control signals",
                "LiPo battery voltage, capacity and C-rating",
                "Power distribution, connectors and electrical safety",
                "Simple energy / endurance and power-budget exercise"
            ]
        },
        {
            "title": "Module 5: Flight Controllers & Sensors",
            "items": [
                "What a flight controller does",
                "IMU sensors: accelerometer and gyroscope",
                "Magnetometer, barometer and sensor calibration",
                "PID / control-loop awareness — concept level"
            ]
        },
        {
            "title": "Module 6: Communication, Navigation & Payloads",
            "items": [
                "RC control links and frequencies — overview",
                "Telemetry and ground-control communication",
                "GNSS/GPS, positioning and navigation basics",
                "Cameras, mapping sensors and other payloads"
            ]
        },
        {
            "title": "Module 7: Drone Applications",
            "items": [
                "Surveying and mapping",
                "Agriculture, inspection and monitoring",
                "Delivery, public-safety and research applications",
                "How mission environment changes component needs"
            ]
        },
        {
            "title": "Module 8: Component Selection Project",
            "items": [
                "Turn mission needs into design requirements",
                "Select frame, motor, propeller, ESC and battery",
                "Check weight, power, endurance and payload trade-offs",
                "Create a simple bill of materials and explain the final selection"
            ]
        }
    ],
    topics: [
        "Multirotor, fixed-wing and VTOL configurations",
        "Main drone subsystems and how they connect",
        "Mission requirements: payload, range, endurance and environment",
        "Basic safety and system-level design thinking",
        "Frame layouts and structural load paths",
        "Common materials: plastics, aluminium and composites",
        "Weight, balance and centre-of-gravity awareness",
        "Vibration, landing loads and payload mounting",
        "Brushless-motor basics and KV rating",
        "Propeller diameter, pitch and blade-count basics",
        "Matching motor and propeller to thrust requirement",
        "Simple thrust-to-weight selection exercise",
        "ESC purpose, current rating and control signals",
        "LiPo battery voltage, capacity and C-rating",
        "Power distribution, connectors and electrical safety",
        "Simple energy / endurance and power-budget exercise",
        "What a flight controller does",
        "IMU sensors: accelerometer and gyroscope",
        "Magnetometer, barometer and sensor calibration",
        "PID / control-loop awareness — concept level",
        "RC control links and frequencies — overview",
        "Telemetry and ground-control communication",
        "GNSS/GPS, positioning and navigation basics",
        "Cameras, mapping sensors and other payloads",
        "Surveying and mapping",
        "Agriculture, inspection and monitoring",
        "Delivery, public-safety and research applications",
        "How mission environment changes component needs",
        "Turn mission needs into design requirements",
        "Select frame, motor, propeller, ESC and battery",
        "Check weight, power, endurance and payload trade-offs",
        "Create a simple bill of materials and explain the final selection"
    ],
    eligibility: "Students and beginners interested in drone technology, aspiring drone pilots, entrepreneurs exploring drone-based ideas, professionals from agriculture, surveying, and inspection.",
    outcome: "Clear understanding of UAS components, applications, terminology, basic aerodynamics, and R&D basics with awareness of how drone ideas move toward practical solutions.",
  },
  {
    id: "matlab-programming",
    title: "MATLAB Programming",
    category: "Technical Foundation",
    description: "Learn MATLAB from the basics and use it for engineering calculations, plots, data handling and simple aerospace applications.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 2499,
    rating: 4.9,
    students: 750,
    image: "/banner_matlab_1784991967948.png",
    tags: ["MATLAB", "Programming", "Engineering", "Data"],
    modules: [
        {
            "title": "Module 1: MATLAB Environment & Variables",
            "items": [
                "MATLAB interface, Command Window, Workspace and Editor",
                "Variables, data types and naming rules",
                "Operators, units and basic engineering calculations",
                "Using help, documentation and simple built-in functions"
            ]
        },
        {
            "title": "Module 2: Vectors, Matrices & Operations",
            "items": [
                "Creating vectors and matrices",
                "Indexing, slicing and array operations",
                "Matrix multiplication and element-wise operations",
                "Useful mathematical functions for engineering work"
            ]
        },
        {
            "title": "Module 3: Scripts & Programming Logic",
            "items": [
                "Writing and running scripts",
                "Logical expressions and if/else statements",
                "For and while loops",
                "Debugging simple errors and checking outputs"
            ]
        },
        {
            "title": "Module 4: Functions & Engineering Data",
            "items": [
                "Creating reusable functions",
                "Function inputs, outputs and local variables",
                "Importing CSV / spreadsheet data",
                "Tables, data cleaning and simple data organisation"
            ]
        },
        {
            "title": "Module 5: Plotting & Numerical Analysis",
            "items": [
                "2D plots, labels, legends and engineering presentation",
                "Multiple data series and simple 3D-plot awareness",
                "Interpolation and simple curve fitting",
                "Basic numerical solving and result checking"
            ]
        },
        {
            "title": "Module 6: Aerospace Applications",
            "items": [
                "Plotting aerodynamic coefficient data",
                "Simple trajectory / motion calculation",
                "Solving a small system of engineering equations",
                "Mini-project: analyse and present a small aerospace dataset"
            ]
        }
    ],
    topics: [
        "MATLAB interface, Command Window, Workspace and Editor",
        "Variables, data types and naming rules",
        "Operators, units and basic engineering calculations",
        "Using help, documentation and simple built-in functions",
        "Creating vectors and matrices",
        "Indexing, slicing and array operations",
        "Matrix multiplication and element-wise operations",
        "Useful mathematical functions for engineering work",
        "Writing and running scripts",
        "Logical expressions and if/else statements",
        "For and while loops",
        "Debugging simple errors and checking outputs",
        "Creating reusable functions",
        "Function inputs, outputs and local variables",
        "Importing CSV / spreadsheet data",
        "Tables, data cleaning and simple data organisation",
        "2D plots, labels, legends and engineering presentation",
        "Multiple data series and simple 3D-plot awareness",
        "Interpolation and simple curve fitting",
        "Basic numerical solving and result checking",
        "Plotting aerodynamic coefficient data",
        "Simple trajectory / motion calculation",
        "Solving a small system of engineering equations",
        "Mini-project: analyse and present a small aerospace dataset"
    ],
    eligibility: "Engineering students and graduates, aerospace, mechanical, electrical learners, and professionals who want to improve engineering computation skills.",
    outcome: "Clear foundation in MATLAB programming for basic engineering calculations, data visualization, problem-solving, and technical project support.",
  },
  {
    id: "catia-design",
    title: "CATIA Design",
    category: "Design Foundation",
    description: "Learn a structured CATIA CAD workflow and apply the main tools to practical aerospace and UAV modelling tasks.",
    duration: "10 weeks",
    lessons: 40,
    level: "Intermediate" as const,
    price: 4999,
    rating: 4.7,
    students: 1580,
    image: "/banner_aero_1784991736912.png",
    tags: ["CATIA", "CAD", "Aircraft", "3D Design"],
    modules: [
        {
            "title": "Module 1: CATIA Interface & CAD Fundamentals",
            "items": [
                "CATIA interface, workbenches and file types",
                "Units, standards and model organisation",
                "Sketcher basics and reference planes",
                "Basic geometric and dimensional constraints"
            ]
        },
        {
            "title": "Module 2: Sketching & Design Intent",
            "items": [
                "Fully constrained sketches",
                "Construction geometry and reference elements",
                "Editing dimensions and design intent",
                "Sketch practice using simple aerospace profiles"
            ]
        },
        {
            "title": "Module 3: Part Design Fundamentals",
            "items": [
                "Pad, pocket and shaft / revolve features",
                "Holes, ribs and grooves",
                "Patterns, mirrors and feature repetition",
                "Editing feature order and parent-child relationships"
            ]
        },
        {
            "title": "Module 4: Advanced Part Modelling",
            "items": [
                "Fillets, chamfers and edge treatment",
                "Shell / thickness and draft features",
                "Multi-body design awareness",
                "Modelling a practical bracket or structural part"
            ]
        },
        {
            "title": "Module 5: Robust Parametric Modelling",
            "items": [
                "Datums, planes, axes and reference geometry",
                "Parameters and simple formulas",
                "Design-table awareness and controlled variations",
                "Model cleanup, naming and robust-feature practices"
            ]
        },
        {
            "title": "Module 6: Assembly Design",
            "items": [
                "Creating and managing an assembly",
                "Positioning and constraining components",
                "Interference / clash checks",
                "Basic assembly structure and bill-of-material awareness"
            ]
        },
        {
            "title": "Module 7: Surface Modelling",
            "items": [
                "Wireframe and surface-workbench basics",
                "Extrude, sweep and multi-section surfaces",
                "Trim, split, join and boundary operations",
                "Simple aerodynamic surface / fairing practice"
            ]
        },
        {
            "title": "Module 8: Drafting & Engineering Drawings",
            "items": [
                "Creating standard drawing views",
                "Dimensions, sections and detail views",
                "GD&T awareness and drawing notes",
                "Title block, sheet setup and export"
            ]
        },
        {
            "title": "Module 9: Aerospace Component Modelling",
            "items": [
                "Model an aircraft/UAV structural component",
                "Create a simple wing / fairing surface",
                "Combine solid and surface techniques",
                "Check geometry quality and manufacturability awareness"
            ]
        },
        {
            "title": "Module 10: Final CAD Project",
            "items": [
                "Define project requirements and modelling plan",
                "Create the final part / assembly",
                "Prepare drawing and presentation views",
                "Design review, corrections and portfolio-ready submission"
            ]
        }
    ],
    topics: [
        "CATIA interface, workbenches and file types",
        "Units, standards and model organisation",
        "Sketcher basics and reference planes",
        "Basic geometric and dimensional constraints",
        "Fully constrained sketches",
        "Construction geometry and reference elements",
        "Editing dimensions and design intent",
        "Sketch practice using simple aerospace profiles",
        "Pad, pocket and shaft / revolve features",
        "Holes, ribs and grooves",
        "Patterns, mirrors and feature repetition",
        "Editing feature order and parent-child relationships",
        "Fillets, chamfers and edge treatment",
        "Shell / thickness and draft features",
        "Multi-body design awareness",
        "Modelling a practical bracket or structural part",
        "Datums, planes, axes and reference geometry",
        "Parameters and simple formulas",
        "Design-table awareness and controlled variations",
        "Model cleanup, naming and robust-feature practices",
        "Creating and managing an assembly",
        "Positioning and constraining components",
        "Interference / clash checks",
        "Basic assembly structure and bill-of-material awareness",
        "Wireframe and surface-workbench basics",
        "Extrude, sweep and multi-section surfaces",
        "Trim, split, join and boundary operations",
        "Simple aerodynamic surface / fairing practice",
        "Creating standard drawing views",
        "Dimensions, sections and detail views",
        "GD&T awareness and drawing notes",
        "Title block, sheet setup and export",
        "Model an aircraft/UAV structural component",
        "Create a simple wing / fairing surface",
        "Combine solid and surface techniques",
        "Check geometry quality and manufacturability awareness",
        "Define project requirements and modelling plan",
        "Create the final part / assembly",
        "Prepare drawing and presentation views",
        "Design review, corrections and portfolio-ready submission"
    ],
    eligibility: "Students and beginners in CAD design, mechanical, aerospace, aeronautical learners, UAS and aircraft design enthusiasts, and engineering graduates.",
    outcome: "Foundation in CATIA-based design — create basic 3D parts, understand assembly structure, read design intent, and apply CAD concepts to aircraft and product design.",
  },
  {
    id: "nx-cad-design",
    title: "NX CAD Design",
    category: "Design Foundation",
    description: "Learn Siemens NX through a complete CAD workflow covering sketching, parts, assemblies, surfaces, drawings and an aerospace project.",
    duration: "10 weeks",
    lessons: 40,
    level: "Intermediate" as const,
    price: 4999,
    rating: 4.8,
    students: 920,
    image: "/banner_siemens_1784991985646.png",
    tags: ["NX CAD", "Siemens", "CAD", "3D Modeling"],
    modules: [
        {
            "title": "Module 1: NX Interface & CAD Fundamentals",
            "items": [
                "NX interface, roles and Part Navigator",
                "Units, files and model organisation",
                "Sketch creation and datum planes",
                "Basic geometric and dimensional constraints"
            ]
        },
        {
            "title": "Module 2: Sketching & Design Intent",
            "items": [
                "Fully constrained sketches",
                "Construction geometry and references",
                "Expressions and parameter-driven dimensions",
                "Aerospace-profile sketch practice"
            ]
        },
        {
            "title": "Module 3: Part Modelling Fundamentals",
            "items": [
                "Extrude, revolve and hole features",
                "Boolean operations",
                "Patterns and mirror features",
                "Feature editing and model-history awareness"
            ]
        },
        {
            "title": "Module 4: Advanced Part Modelling",
            "items": [
                "Sweeps and loft-style features",
                "Blends, chamfers, shell and draft",
                "Synchronous-modelling awareness",
                "Practical structural-component exercise"
            ]
        },
        {
            "title": "Module 5: Parametric & Robust Modelling",
            "items": [
                "Datum geometry and reference control",
                "Expressions and simple design parameters",
                "Feature dependencies and editing strategy",
                "Model cleanup and geometry-check habits"
            ]
        },
        {
            "title": "Module 6: Assemblies",
            "items": [
                "Assembly structure and component positioning",
                "Assembly constraints",
                "Interference / clearance checks",
                "Basic parts-list and assembly documentation awareness"
            ]
        },
        {
            "title": "Module 7: Surface Modelling",
            "items": [
                "Curve creation and surface fundamentals",
                "Swept / through-curve surfaces",
                "Trim, extend and sew operations",
                "Simple aerodynamic surface practice"
            ]
        },
        {
            "title": "Module 8: Drafting",
            "items": [
                "Standard views and section views",
                "Dimensions and annotations",
                "GD&T awareness and drawing standards",
                "Sheet setup and export"
            ]
        },
        {
            "title": "Module 9: Aerospace Modelling Exercise",
            "items": [
                "Model an aircraft/UAV component",
                "Create a simple wing / fairing geometry",
                "Apply parametric changes",
                "Review geometry quality and design intent"
            ]
        },
        {
            "title": "Module 10: Final NX Project",
            "items": [
                "Define requirements and modelling approach",
                "Complete part / assembly modelling",
                "Create drawings and presentation views",
                "Final design review and portfolio submission"
            ]
        }
    ],
    topics: [
        "NX interface, roles and Part Navigator",
        "Units, files and model organisation",
        "Sketch creation and datum planes",
        "Basic geometric and dimensional constraints",
        "Fully constrained sketches",
        "Construction geometry and references",
        "Expressions and parameter-driven dimensions",
        "Aerospace-profile sketch practice",
        "Extrude, revolve and hole features",
        "Boolean operations",
        "Patterns and mirror features",
        "Feature editing and model-history awareness",
        "Sweeps and loft-style features",
        "Blends, chamfers, shell and draft",
        "Synchronous-modelling awareness",
        "Practical structural-component exercise",
        "Datum geometry and reference control",
        "Expressions and simple design parameters",
        "Feature dependencies and editing strategy",
        "Model cleanup and geometry-check habits",
        "Assembly structure and component positioning",
        "Assembly constraints",
        "Interference / clearance checks",
        "Basic parts-list and assembly documentation awareness",
        "Curve creation and surface fundamentals",
        "Swept / through-curve surfaces",
        "Trim, extend and sew operations",
        "Simple aerodynamic surface practice",
        "Standard views and section views",
        "Dimensions and annotations",
        "GD&T awareness and drawing standards",
        "Sheet setup and export",
        "Model an aircraft/UAV component",
        "Create a simple wing / fairing geometry",
        "Apply parametric changes",
        "Review geometry quality and design intent",
        "Define requirements and modelling approach",
        "Complete part / assembly modelling",
        "Create drawings and presentation views",
        "Final design review and portfolio submission"
    ],
    eligibility: "Students and beginners in NX CAD, mechanical, aerospace, aeronautical learners, UAS and aircraft enthusiasts, and professionals strengthening CAD skills.",
    outcome: "Foundation in NX CAD-based design — create basic 3D models, understand assembly concepts, apply design modifications for aircraft and product design.",
  },
  {
    id: "mathematics-fea-cfd",
    title: "Mathematics for FEA & CFD",
    category: "Engineering Mathematics",
    description: "Build the practical mathematics needed to understand FEA and CFD without turning the course into a pure mathematics class.",
    duration: "6 weeks",
    lessons: 24,
    level: "Intermediate" as const,
    price: 2499,
    rating: 4.9,
    students: 540,
    image: "/banner_math_1784991995091.png",
    tags: ["Mathematics", "FEA", "CFD", "Simulation"],
    modules: [
        {
            "title": "Module 1: Engineering Algebra & Functions",
            "items": [
                "Units, dimensions and scientific notation",
                "Algebraic manipulation and engineering equations",
                "Functions, graphs and common engineering relationships",
                "Exponents, logarithms and simple scaling relationships"
            ]
        },
        {
            "title": "Module 2: Vectors & Coordinate Systems",
            "items": [
                "Vector magnitude and direction",
                "Vector addition and component form",
                "Dot product and cross product",
                "Coordinate systems and simple transformations"
            ]
        },
        {
            "title": "Module 3: Matrices & Linear Systems",
            "items": [
                "Matrix notation and basic operations",
                "Determinants and inverse — practical use",
                "Solving simultaneous linear equations",
                "Eigenvalue / eigenvector awareness and why they appear in engineering"
            ]
        },
        {
            "title": "Module 4: Calculus for Engineering",
            "items": [
                "Derivative as a rate of change",
                "Partial derivatives and multivariable functions",
                "Gradient and directional-change awareness",
                "Integration and physical meaning in engineering"
            ]
        },
        {
            "title": "Module 5: Differential Equations & Field Variables",
            "items": [
                "Ordinary versus partial differential equations",
                "Initial and boundary conditions",
                "Conservation equations — concept level",
                "How temperature, displacement, pressure and velocity vary through a domain"
            ]
        },
        {
            "title": "Module 6: Numerical Methods for Simulation",
            "items": [
                "Discretisation: turning a continuous problem into points/elements",
                "Finite-difference / finite-element idea — simple comparison",
                "Interpolation, iteration and numerical solving",
                "Error, convergence and why simulation results must be checked"
            ]
        }
    ],
    topics: [
        "Units, dimensions and scientific notation",
        "Algebraic manipulation and engineering equations",
        "Functions, graphs and common engineering relationships",
        "Exponents, logarithms and simple scaling relationships",
        "Vector magnitude and direction",
        "Vector addition and component form",
        "Dot product and cross product",
        "Coordinate systems and simple transformations",
        "Matrix notation and basic operations",
        "Determinants and inverse — practical use",
        "Solving simultaneous linear equations",
        "Eigenvalue / eigenvector awareness and why they appear in engineering",
        "Derivative as a rate of change",
        "Partial derivatives and multivariable functions",
        "Gradient and directional-change awareness",
        "Integration and physical meaning in engineering",
        "Ordinary versus partial differential equations",
        "Initial and boundary conditions",
        "Conservation equations — concept level",
        "How temperature, displacement, pressure and velocity vary through a domain",
        "Discretisation: turning a continuous problem into points/elements",
        "Finite-difference / finite-element idea — simple comparison",
        "Interpolation, iteration and numerical solving",
        "Error, convergence and why simulation results must be checked"
    ],
    eligibility: "Engineering students and graduates, CAD learners moving toward simulation, mechanical, aerospace, civil, and automotive engineering learners.",
    outcome: "Clear foundation in the mathematical concepts behind FEA and CFD — prepared to understand simulation workflows, structural analysis, and result interpretation.",
  },
  {
    id: "fea-analysis",
    title: "FEA Analysis",
    category: "Simulation & Analysis",
    description: "Learn the complete FEA workflow from engineering assumptions and meshing to loads, results, verification and an aerospace structural project.",
    duration: "10 weeks",
    lessons: 40,
    level: "Advanced" as const,
    price: 4999,
    rating: 4.7,
    students: 680,
    image: "/banner_fea_1784992005177.png",
    tags: ["FEA", "Structural", "Simulation", "CAE"],
    modules: [
        {
            "title": "Module 1: FEA Fundamentals",
            "items": [
                "What FEA is and where it is useful",
                "The FEA workflow from geometry to results",
                "Assumptions, units and idealisation",
                "Common reasons an FEA result can be wrong"
            ]
        },
        {
            "title": "Module 2: Mechanics Refresher",
            "items": [
                "Stress, strain and deformation",
                "Young’s modulus, Poisson’s ratio and Hooke’s law",
                "Tension, compression, bending and shear",
                "Free-body diagrams and simple structural checks"
            ]
        },
        {
            "title": "Module 3: Elements & Meshing",
            "items": [
                "1D, 2D and 3D element types",
                "Mesh size and local refinement",
                "Element quality and distorted elements",
                "Mesh-convergence concept"
            ]
        },
        {
            "title": "Module 4: Materials & Properties",
            "items": [
                "Linear-elastic material model",
                "Isotropic versus orthotropic awareness",
                "Entering material properties with correct units",
                "Temperature-dependent / nonlinear material awareness"
            ]
        },
        {
            "title": "Module 5: Loads, Constraints & Contacts",
            "items": [
                "Forces, pressures, moments and gravity",
                "Fixed, pinned and symmetry constraints",
                "Contact / connection concepts",
                "Avoiding over-constraint and unrealistic boundary conditions"
            ]
        },
        {
            "title": "Module 6: Static Structural Analysis",
            "items": [
                "Set up a simple static structural model",
                "Solve and check solver messages",
                "Deformation and reaction-force results",
                "Basic stress results and load-path interpretation"
            ]
        },
        {
            "title": "Module 7: Reading FEA Results",
            "items": [
                "Von Mises and principal stress — simple interpretation",
                "Stress concentration versus singularity",
                "Deformed shape and displacement checks",
                "Using probes, paths and result plots"
            ]
        },
        {
            "title": "Module 8: Verification & Mesh Independence",
            "items": [
                "Run a mesh-independence study",
                "Compare against a simple hand calculation",
                "Check reactions, units and energy / balance where relevant",
                "Document assumptions, checks and model limitations"
            ]
        },
        {
            "title": "Module 9: Aerospace Structural Case Study",
            "items": [
                "Define loads for a bracket / rib / panel",
                "Build a sensible mesh and boundary conditions",
                "Evaluate stress, deformation and critical regions",
                "Suggest a simple design improvement and re-check"
            ]
        },
        {
            "title": "Module 10: Final FEA Project",
            "items": [
                "Define problem and analysis plan",
                "Build and solve the model",
                "Verify and interpret the results",
                "Prepare a short engineering report and review"
            ]
        }
    ],
    topics: [
        "What FEA is and where it is useful",
        "The FEA workflow from geometry to results",
        "Assumptions, units and idealisation",
        "Common reasons an FEA result can be wrong",
        "Stress, strain and deformation",
        "Young’s modulus, Poisson’s ratio and Hooke’s law",
        "Tension, compression, bending and shear",
        "Free-body diagrams and simple structural checks",
        "1D, 2D and 3D element types",
        "Mesh size and local refinement",
        "Element quality and distorted elements",
        "Mesh-convergence concept",
        "Linear-elastic material model",
        "Isotropic versus orthotropic awareness",
        "Entering material properties with correct units",
        "Temperature-dependent / nonlinear material awareness",
        "Forces, pressures, moments and gravity",
        "Fixed, pinned and symmetry constraints",
        "Contact / connection concepts",
        "Avoiding over-constraint and unrealistic boundary conditions",
        "Set up a simple static structural model",
        "Solve and check solver messages",
        "Deformation and reaction-force results",
        "Basic stress results and load-path interpretation",
        "Von Mises and principal stress — simple interpretation",
        "Stress concentration versus singularity",
        "Deformed shape and displacement checks",
        "Using probes, paths and result plots",
        "Run a mesh-independence study",
        "Compare against a simple hand calculation",
        "Check reactions, units and energy / balance where relevant",
        "Document assumptions, checks and model limitations",
        "Define loads for a bracket / rib / panel",
        "Build a sensible mesh and boundary conditions",
        "Evaluate stress, deformation and critical regions",
        "Suggest a simple design improvement and re-check",
        "Define problem and analysis plan",
        "Build and solve the model",
        "Verify and interpret the results",
        "Prepare a short engineering report and review"
    ],
    eligibility: "Engineering students and graduates, mechanical, aerospace, aeronautical learners, CAD designers moving toward simulation, UAS and aircraft enthusiasts.",
    outcome: "Clear foundation in FEA concepts and simulation workflow — understand how structural analysis supports design decisions, product improvement, and engineering validation.",
  },
  {
    id: "cfd-analysis",
    title: "CFD Analysis",
    category: "Simulation & Analysis",
    description: "Learn the CFD workflow from geometry and mesh to solver setup, convergence, results, validation and an aircraft/UAV case study.",
    duration: "10 weeks",
    lessons: 40,
    level: "Advanced" as const,
    price: 4999,
    rating: 4.8,
    students: 720,
    image: "/banner_cfd_1784992023667.png",
    tags: ["CFD", "Aerodynamics", "Simulation", "Fluids"],
    modules: [
        {
            "title": "Module 1: CFD Fundamentals",
            "items": [
                "What CFD is and where it is used",
                "The CFD workflow from geometry to results",
                "Domains, assumptions, units and reference conditions",
                "Common reasons a CFD result can look believable but be wrong"
            ]
        },
        {
            "title": "Module 2: Fluid Mechanics Refresher",
            "items": [
                "Pressure, density, viscosity and velocity",
                "Reynolds number and flow-regime awareness",
                "Boundary layers, separation and wakes",
                "Incompressible versus compressible flow — concept level"
            ]
        },
        {
            "title": "Module 3: Governing Equations & Discretisation",
            "items": [
                "Conservation of mass — concept level",
                "Momentum / Navier-Stokes idea — concept level",
                "Energy equation and when it matters",
                "Discretisation, residuals and numerical convergence"
            ]
        },
        {
            "title": "Module 4: Geometry & Domain Preparation",
            "items": [
                "Clean and simplify geometry for CFD",
                "Create internal / external fluid domains",
                "Far-field size and domain boundaries",
                "Symmetry and simplification where appropriate"
            ]
        },
        {
            "title": "Module 5: Meshing",
            "items": [
                "Structured versus unstructured mesh awareness",
                "Local refinement and surface sizing",
                "Inflation layers near walls",
                "Mesh quality and mesh-independence checks"
            ]
        },
        {
            "title": "Module 6: Boundary Conditions & Solver Setup",
            "items": [
                "Velocity / mass-flow inlets and pressure outlets",
                "Wall, symmetry and far-field boundaries",
                "Reference values and basic solver settings",
                "Initialization, monitors and convergence setup"
            ]
        },
        {
            "title": "Module 7: Turbulence Models — Practical Selection",
            "items": [
                "Why turbulence modelling is needed",
                "Laminar versus turbulent setup",
                "k-epsilon and k-omega SST — practical awareness",
                "Choosing a reasonable model without overcomplicating it"
            ]
        },
        {
            "title": "Module 8: Results, Verification & Validation",
            "items": [
                "Residuals and monitor histories",
                "Pressure, velocity, streamline and contour plots",
                "Lift, drag and coefficient extraction",
                "Sanity checks, verification and comparison with known / simple data"
            ]
        },
        {
            "title": "Module 9: Aircraft / UAV Aerodynamics Case Study",
            "items": [
                "Prepare a simple wing or UAV geometry",
                "Create domain, mesh and boundary conditions",
                "Run the case and monitor convergence",
                "Interpret lift, drag, pressure and flow features"
            ]
        },
        {
            "title": "Module 10: Final CFD Project",
            "items": [
                "Define the problem and simulation plan",
                "Build, mesh and solve the case",
                "Check convergence and validate the result",
                "Prepare a concise engineering report and review"
            ]
        }
    ],
    topics: [
        "What CFD is and where it is used",
        "The CFD workflow from geometry to results",
        "Domains, assumptions, units and reference conditions",
        "Common reasons a CFD result can look believable but be wrong",
        "Pressure, density, viscosity and velocity",
        "Reynolds number and flow-regime awareness",
        "Boundary layers, separation and wakes",
        "Incompressible versus compressible flow — concept level",
        "Conservation of mass — concept level",
        "Momentum / Navier-Stokes idea — concept level",
        "Energy equation and when it matters",
        "Discretisation, residuals and numerical convergence",
        "Clean and simplify geometry for CFD",
        "Create internal / external fluid domains",
        "Far-field size and domain boundaries",
        "Symmetry and simplification where appropriate",
        "Structured versus unstructured mesh awareness",
        "Local refinement and surface sizing",
        "Inflation layers near walls",
        "Mesh quality and mesh-independence checks",
        "Velocity / mass-flow inlets and pressure outlets",
        "Wall, symmetry and far-field boundaries",
        "Reference values and basic solver settings",
        "Initialization, monitors and convergence setup",
        "Why turbulence modelling is needed",
        "Laminar versus turbulent setup",
        "k-epsilon and k-omega SST — practical awareness",
        "Choosing a reasonable model without overcomplicating it",
        "Residuals and monitor histories",
        "Pressure, velocity, streamline and contour plots",
        "Lift, drag and coefficient extraction",
        "Sanity checks, verification and comparison with known / simple data",
        "Prepare a simple wing or UAV geometry",
        "Create domain, mesh and boundary conditions",
        "Run the case and monitor convergence",
        "Interpret lift, drag, pressure and flow features",
        "Define the problem and simulation plan",
        "Build, mesh and solve the case",
        "Check convergence and validate the result",
        "Prepare a concise engineering report and review"
    ],
    eligibility: "Engineering students and graduates, mechanical, aerospace, aeronautical learners, CAD designers moving toward fluid simulation, and performance analysis professionals.",
    outcome: "Clear foundation in CFD concepts and simulation workflow — understand how fluid analysis supports aerodynamic study, design improvement, and performance-based decisions.",
  },
  {
    id: "as9100d-quality",
    title: "AS9100D Quality Management",
    category: "Quality & Industry Standards",
    description: "Understand AS9100D in practical language and see how aerospace quality requirements are applied through processes, documents and evidence.",
    duration: "8 weeks",
    lessons: 32,
    level: "Intermediate" as const,
    price: 2999,
    rating: 4.6,
    students: 650,
    image: "/banner_as9100d_1784992034263.png",
    tags: ["AS9100D", "Quality", "Aerospace", "Compliance"],
    modules: [
        {
            "title": "Module 1: Aerospace Quality Fundamentals",
            "items": [
                "Why aerospace quality systems are stricter than normal business processes",
                "ISO 9001 and AS9100D — relationship and purpose",
                "Process approach and PDCA thinking",
                "Customer, statutory and regulatory requirements — overview"
            ]
        },
        {
            "title": "Module 2: AS9100D Structure & Requirements",
            "items": [
                "How the standard is organised — simple overview",
                "Context, leadership and planning",
                "Support and operational controls",
                "Performance evaluation and improvement"
            ]
        },
        {
            "title": "Module 3: QMS Documentation & Records",
            "items": [
                "Quality-manual / process-document hierarchy — practical view",
                "Procedures, work instructions, forms and records",
                "Document approval, revision and change control",
                "Record retention, traceability and evidence"
            ]
        },
        {
            "title": "Module 4: Risk, Product Safety & Change",
            "items": [
                "Risk-based thinking in a quality system",
                "Operational risk management — foundation view",
                "Product safety and human-factor awareness",
                "Planning and controlling changes"
            ]
        },
        {
            "title": "Module 5: Configuration, Traceability & Critical Items",
            "items": [
                "Configuration-management basics",
                "Identification and traceability",
                "Special requirements and critical-item awareness",
                "Counterfeit-parts prevention awareness"
            ]
        },
        {
            "title": "Module 6: Supplier & Production Quality",
            "items": [
                "Supplier approval and monitoring",
                "Purchase requirements and supplier communication",
                "Incoming inspection and verification",
                "Production / service controls and nonconforming output awareness"
            ]
        },
        {
            "title": "Module 7: Non-Conformance, CAPA & Audits",
            "items": [
                "Identifying and controlling nonconformity",
                "Root-cause analysis basics",
                "Corrective action and effectiveness checks",
                "Internal audits and management review"
            ]
        },
        {
            "title": "Module 8: Practical AS9100D Implementation",
            "items": [
                "Simple gap-assessment exercise",
                "Process mapping and responsibility matrix",
                "Building an evidence / documentation checklist",
                "Mock implementation case and final review"
            ]
        }
    ],
    topics: [
        "Why aerospace quality systems are stricter than normal business processes",
        "ISO 9001 and AS9100D — relationship and purpose",
        "Process approach and PDCA thinking",
        "Customer, statutory and regulatory requirements — overview",
        "How the standard is organised — simple overview",
        "Context, leadership and planning",
        "Support and operational controls",
        "Performance evaluation and improvement",
        "Quality-manual / process-document hierarchy — practical view",
        "Procedures, work instructions, forms and records",
        "Document approval, revision and change control",
        "Record retention, traceability and evidence",
        "Risk-based thinking in a quality system",
        "Operational risk management — foundation view",
        "Product safety and human-factor awareness",
        "Planning and controlling changes",
        "Configuration-management basics",
        "Identification and traceability",
        "Special requirements and critical-item awareness",
        "Counterfeit-parts prevention awareness",
        "Supplier approval and monitoring",
        "Purchase requirements and supplier communication",
        "Incoming inspection and verification",
        "Production / service controls and nonconforming output awareness",
        "Identifying and controlling nonconformity",
        "Root-cause analysis basics",
        "Corrective action and effectiveness checks",
        "Internal audits and management review",
        "Simple gap-assessment exercise",
        "Process mapping and responsibility matrix",
        "Building an evidence / documentation checklist",
        "Mock implementation case and final review"
    ],
    eligibility: "Students and beginners in aerospace quality, UAS, aviation, and aerospace technology learners, quality and production professionals, and entrepreneurs with drone/aerospace products.",
    outcome: "Clear foundation in aerospace quality management and AS9100D awareness — understand quality terms, documentation, traceability, compliance mindset, and continual improvement.",
  },
  {
    id: "jet-engine-fundamentals",
    title: "Jet Engine Fundamentals",
    category: "Technical Foundation",
    description: "Understand how jet engines create thrust, what the main engine components do, and how common gas-turbine engine types differ.",
    duration: "8 weeks",
    lessons: 32,
    level: "Beginner" as const,
    price: 2999,
    rating: 4.8,
    students: 500,
    image: "/jet_engine_banner.png",
    tags: ["Aviation", "Engineering"],
    modules: [
        {
            "title": "Module 1: Propulsion, Thrust & Jet Engine Basics",
            "items": [
                "What propulsion and thrust mean",
                "Newton’s laws as used in propulsion",
                "Main airflow path through a gas-turbine engine",
                "Basic thrust equation and mass-flow idea — concept level"
            ]
        },
        {
            "title": "Module 2: Gas Turbine Cycle & Engine Stations",
            "items": [
                "The gas-turbine engine as one complete system",
                "Intake–compress–burn–expand–exhaust sequence",
                "Pressure and temperature changes through the engine",
                "Brayton cycle and engine-station numbering — visual introduction"
            ]
        },
        {
            "title": "Module 3: Inlets & Compressors",
            "items": [
                "Purpose of the inlet / diffuser",
                "Centrifugal and axial compressors",
                "Compressor stages, rotors, stators and pressure rise",
                "Compressor stall and surge — awareness level"
            ]
        },
        {
            "title": "Module 4: Combustion Chambers",
            "items": [
                "Purpose of the combustor and fuel system",
                "Can, annular and can-annular combustor awareness",
                "Ignition, flame stability and airflow distribution",
                "Efficiency, pressure loss, temperature and emissions — simple design goals"
            ]
        },
        {
            "title": "Module 5: Turbines, Shafts & Accessories",
            "items": [
                "How turbines extract energy from hot gas",
                "Turbine stages, blades and vanes",
                "Single-spool and multi-spool engines",
                "Accessory gearbox and turbine-blade cooling — awareness level"
            ]
        },
        {
            "title": "Module 6: Exhaust Nozzles & Thrust Production",
            "items": [
                "Purpose of the exhaust nozzle",
                "Turning pressure / thermal energy into jet velocity",
                "Convergent and convergent-divergent nozzle awareness",
                "Choked flow and thrust augmentation / afterburner — awareness only"
            ]
        },
        {
            "title": "Module 7: Gas-Turbine Engine Types",
            "items": [
                "Turbojet and where it is useful",
                "Turbofan and bypass-ratio concept",
                "Turboprop and propulsive efficiency",
                "Turboshaft / APU applications and engine-type comparison"
            ]
        },
        {
            "title": "Module 8: Performance, Operation & Case Study",
            "items": [
                "Thrust, specific fuel consumption and efficiency — simple view",
                "Effect of altitude and flight speed — concept level",
                "Starting, EGT / speed limits and common operating concerns — awareness",
                "Final aircraft-engine selection and comparison case study"
            ]
        }
    ],
    topics: [
        "What propulsion and thrust mean",
        "Newton’s laws as used in propulsion",
        "Main airflow path through a gas-turbine engine",
        "Basic thrust equation and mass-flow idea — concept level",
        "The gas-turbine engine as one complete system",
        "Intake–compress–burn–expand–exhaust sequence",
        "Pressure and temperature changes through the engine",
        "Brayton cycle and engine-station numbering — visual introduction",
        "Purpose of the inlet / diffuser",
        "Centrifugal and axial compressors",
        "Compressor stages, rotors, stators and pressure rise",
        "Compressor stall and surge — awareness level",
        "Purpose of the combustor and fuel system",
        "Can, annular and can-annular combustor awareness",
        "Ignition, flame stability and airflow distribution",
        "Efficiency, pressure loss, temperature and emissions — simple design goals",
        "How turbines extract energy from hot gas",
        "Turbine stages, blades and vanes",
        "Single-spool and multi-spool engines",
        "Accessory gearbox and turbine-blade cooling — awareness level",
        "Purpose of the exhaust nozzle",
        "Turning pressure / thermal energy into jet velocity",
        "Convergent and convergent-divergent nozzle awareness",
        "Choked flow and thrust augmentation / afterburner — awareness only",
        "Turbojet and where it is useful",
        "Turbofan and bypass-ratio concept",
        "Turboprop and propulsive efficiency",
        "Turboshaft / APU applications and engine-type comparison",
        "Thrust, specific fuel consumption and efficiency — simple view",
        "Effect of altitude and flight speed — concept level",
        "Starting, EGT / speed limits and common operating concerns — awareness",
        "Final aircraft-engine selection and comparison case study"
    ],
    eligibility: "Engineering students and beginners.",
    outcome: "Clear foundation in Jet Engine Fundamentals."
  },
  {
    id: "aircraft-hydraulic-systems",
    title: "Aircraft Hydraulic Systems",
    category: "Technical Foundation",
    description: "Learn how aircraft hydraulic systems create, control and use fluid pressure to operate brakes, landing gear, flight controls and other systems.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 2499,
    rating: 4.9,
    students: 500,
    image: "/hydraulic_systems_banner.png",
    tags: ["Aviation", "Engineering"],
    modules: [
        {
            "title": "Module 1: Hydraulic Principles & Aircraft Applications",
            "items": [
                "Why aircraft use hydraulic power",
                "Pascal’s law and force multiplication",
                "Pressure, flow, force and basic hydraulic work",
                "Typical aircraft uses: brakes, gear, flaps and flight controls"
            ]
        },
        {
            "title": "Module 2: Fluids, Lines, Seals & Safety",
            "items": [
                "Purpose and properties of hydraulic fluid",
                "Common aviation hydraulic-fluid families — awareness level",
                "Rigid lines, flexible hoses, fittings and seals",
                "Contamination, leaks, pressure hazards and safety awareness"
            ]
        },
        {
            "title": "Module 3: Reservoirs, Pumps, Filters & Accumulators",
            "items": [
                "Reservoir purpose, pressurisation and basic layout",
                "Gear / gerotor / piston pump awareness + engine/electric drive",
                "Filters, indicators and contamination control",
                "Accumulators, stored energy and pressure smoothing"
            ]
        },
        {
            "title": "Module 4: Valves, Pressure Control & Actuators",
            "items": [
                "Check, selector and shutoff valves",
                "Relief, pressure-regulating and priority-valve concepts",
                "Linear actuators / hydraulic cylinders and rotary-actuator awareness",
                "Tracing pressure and return flow through a simple circuit"
            ]
        },
        {
            "title": "Module 5: Aircraft Hydraulic Applications",
            "items": [
                "Hydraulic wheel brakes and anti-skid awareness",
                "Landing-gear extension, retraction and locking concepts",
                "Flaps, spoilers and powered flight-control applications",
                "Redundancy, backup pumps and power-transfer-unit awareness"
            ]
        },
        {
            "title": "Module 6: Schematics, Fault Awareness & Review",
            "items": [
                "Common hydraulic symbols and line types",
                "Tracing a complete simple aircraft hydraulic schematic",
                "Recognising low pressure, leaks, contamination and overheating symptoms",
                "Final system-tracing / fault-awareness exercise and review"
            ]
        }
    ],
    topics: [
        "Why aircraft use hydraulic power",
        "Pascal’s law and force multiplication",
        "Pressure, flow, force and basic hydraulic work",
        "Typical aircraft uses: brakes, gear, flaps and flight controls",
        "Purpose and properties of hydraulic fluid",
        "Common aviation hydraulic-fluid families — awareness level",
        "Rigid lines, flexible hoses, fittings and seals",
        "Contamination, leaks, pressure hazards and safety awareness",
        "Reservoir purpose, pressurisation and basic layout",
        "Gear / gerotor / piston pump awareness + engine/electric drive",
        "Filters, indicators and contamination control",
        "Accumulators, stored energy and pressure smoothing",
        "Check, selector and shutoff valves",
        "Relief, pressure-regulating and priority-valve concepts",
        "Linear actuators / hydraulic cylinders and rotary-actuator awareness",
        "Tracing pressure and return flow through a simple circuit",
        "Hydraulic wheel brakes and anti-skid awareness",
        "Landing-gear extension, retraction and locking concepts",
        "Flaps, spoilers and powered flight-control applications",
        "Redundancy, backup pumps and power-transfer-unit awareness",
        "Common hydraulic symbols and line types",
        "Tracing a complete simple aircraft hydraulic schematic",
        "Recognising low pressure, leaks, contamination and overheating symptoms",
        "Final system-tracing / fault-awareness exercise and review"
    ],
    eligibility: "Engineering students and beginners.",
    outcome: "Clear foundation in Aircraft Hydraulic Systems."
  },
];

export const COURSE_BUNDLES = [
  {
    id: "aeronautics-and-systems-bundle",
    title: "Aeronautics & Systems Engineering Master Bundle",
    description: "Master Aeronautics, Aerodynamics, Engines, Hydraulics, CAD & Simulation",
    includes: [
      "Aeronautics & Aviation Fundamentals",
      "Aerodynamics",
      "Jet Engine Fundamentals",
      "Aircraft Hydraulic Systems",
      "CATIA Design",
      "NX CAD Design",
      "FEA Analysis",
      "CFD Analysis"
    ],
    courseIds: [
      "aeronautics-aviation",
      "aerodynamics",
      "jet-engine-fundamentals",
      "aircraft-hydraulic-systems",
      "catia-design",
      "nx-cad-design",
      "fea-analysis",
      "cfd-analysis"
    ],
    price: 16999,
    savings: 6493,
    color: "amber",
  },

  {
    id: "drone-regulations-bundle",
    title: "Drone Regulations Bundle",
    description: "Complete global drone regulations coverage — India, USA & Europe",
    includes: ["DGCA Drone Regulations", "FAA Drone Regulations", "EASA Drone Regulations"],
    courseIds: ["dgca-drone-regulations", "faa-drone-regulations", "easa-drone-regulations"],
    price: 4499,
    savings: 999,
    color: "blue",
  },
  {
    id: "technical-foundation-bundle",
    title: "Technical Foundation Bundle",
    description: "Complete technical foundation for aerospace and drone engineering",
    includes: ["Aerospace Engineering Fundamentals", "Aerodynamics", "Drone Components & Applications", "MATLAB Programming"],
    courseIds: ["aerospace-fundamentals", "aerodynamics", "drone-components", "matlab-programming"],
    price: 7499,
    savings: 1497,
    color: "green",
  },
  {
    id: "design-bundle",
    title: "Design Bundle",
    description: "Master both industry-standard 3D CAD platforms",
    includes: ["CATIA Design", "NX CAD Design"],
    courseIds: ["catia-design", "nx-cad-design"],
    price: 6999,
    savings: 999,
    color: "purple",
  },
  {
    id: "simulation-bundle",
    title: "Simulation Bundle",
    description: "Complete simulation and analysis pathway from math to FEA & CFD",
    includes: ["Mathematics for FEA & CFD", "FEA Analysis", "CFD Analysis"],
    courseIds: ["mathematics-fea-cfd", "fea-analysis", "cfd-analysis"],
    price: 9999,
    savings: 1998,
    color: "orange",
  },
  {
    id: "complete-program",
    title: "Complete Aerospace, Drone & Simulation Program",
    description: "All 13 courses — the ultimate aerospace learning journey",
    includes: ["All 13 courses included"],
    courseIds: [],
    price: 24999,
    savings: 8497,
    color: "red",
  },
];

export const LEARNER_BENEFITS = [
  "Live interactive classes",
  "One-on-one mentorship support",
  "Dedicated doubt-solving sessions",
  "Structured learning materials and resources based on course requirements",
  "Practical examples and industry-oriented explanations",
  "Guided preparation for assessments",
  "Result-based course completion certificate",
  "Support for higher-level learning, projects, and professional skill development",
];

export const CONSULTATION_SERVICES = [
  {
    id: "uas-certification",
    title: "Drone Type Certification Services",
    description:
      "End-to-end DGCA & FAA type certification support for UAS manufacturers — from initial documentation to final flight testing.",
    icon: "Shield",
    features: [
      "Comprehensive regulatory compliance roadmap",
      "Detailed design, safety, and operational documentation review",
      "Test flight planning, execution, and data analysis",
      "Direct representation and submission support with authorities",
    ],
    outcome: "Outcome: A fully certified UAS ready for commercial operations without regulatory delays.",
  },
  {
    id: "as9100d-quality",
    title: "Quality Management System Services",
    description:
      "Implement and maintain robust aerospace quality management systems required to participate in the global supply chain.",
    icon: "Award",
    features: [
      "Comprehensive Gap Analysis against AS9100 Rev D standards",
      "Complete QMS Documentation (Quality Manual, Procedures, Forms)",
      "Internal auditor training and mock readiness assessments",
      "On-site support during Stage 1 & Stage 2 Certification Body audits",
    ],
    outcome: "Outcome: You walk away fully prepared and de-risked for your certification audits.",
  },
  {
    id: "drone-rd",
    title: "Drone R&D and Product Development Services",
    description:
      "Advanced technical consulting for drone design, payload integration, and performance testing — from concept to production.",
    icon: "Cpu",
    features: [
      "Initial concept feasibility and mission profile definition",
      "Avionics architecture and custom payload integration",
      "Prototype fabrication guidance and flight envelope testing",
      "Transition-to-production and manufacturing scalability support",
    ],
    outcome: "Outcome: A validated, production-ready drone architecture optimized for your specific use-case.",
  },
  {
    id: "design-simulation",
    title: "Engineering Design & Simulation Services",
    description:
      "High-fidelity CAD/CAE consulting for aerospace structures, mechanisms, and advanced system-level simulation.",
    icon: "Box",
    features: [
      "Advanced 3D modeling and complex surface generation (CATIA/NX)",
      "Structural FEA and aerodynamic CFD analysis",
      "Weight optimization and material selection consulting",
      "Digital twin development for predictive lifecycle maintenance",
    ],
    outcome: "Outcome: Highly optimized engineering designs backed by rigorous simulation data.",
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
    image: "/banner_as9100d_1784992034263.png",
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
,
];
