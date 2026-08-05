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
    id: "dgca-drone-regulations",
    title: "DGCA Drone Regulations",
    category: "Compliance & Regulations",
    description:
      "Practical introduction to UAS (Drones) rules, compliance requirements, and safe operating practices in India. Covers DGCA, MoCA, and DigitalSky awareness.",
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
            "title": "Module 1: Introduction to DGCA Drone Regulations",
            "items": [
                  "Overview of drone regulations in India",
                  "Role of DGCA and the Ministry of Civil Aviation",
                  "Introduction to the Drone Rules 2021",
                  "Responsibilities of drone owners, operators and pilots"
            ]
      },
      {
            "title": "Module 2: Drone Classification and Registration",
            "items": [
                  "Drone classification according to weight",
                  "Overview of type-certification requirements",
                  "Drone registration and Unique Identification Number",
                  "Essential operational documents and records"
            ]
      },
      {
            "title": "Module 3: Digital Sky and Airspace Regulations",
            "items": [
                  "Introduction to the Digital Sky platform",
                  "Green, yellow and red airspace zones",
                  "Restrictions near airports and sensitive locations",
                  "Overview of flight permissions and approvals"
            ]
      },
      {
            "title": "Module 4: Remote Pilot Requirements",
            "items": [
                  "Role and responsibilities of a remote pilot",
                  "Overview of the Remote Pilot Certificate",
                  "Basic eligibility and training requirements",
                  "Role of Remote Pilot Training Organisations"
            ]
      },
      {
            "title": "Module 5: Safe Drone Operating Practices",
            "items": [
                  "Pre-flight planning and drone inspection",
                  "Weather, location and airspace assessment",
                  "Safe take-off, flight and landing practices",
                  "Emergency awareness and operational records"
            ]
      },
      {
            "title": "Module 6: Legal Responsibilities and Drone Compliance",
            "items": [
                  "Privacy and responsible aerial data collection",
                  "Restrictions around sensitive locations",
                  "Common regulatory violations",
                  "Standard operating procedures and compliance examples"
            ]
      }
],
    topics: [
      "Introduction to UAS regulations in India",
      "DGCA, MoCA, and DigitalSky overview",
      "Drone categories and operational limitations",
      "Registration and compliance awareness",
      "Remote pilot responsibilities",
      "Airspace, permissions, and safe flight planning",
      "Documentation and operational discipline",
      "Common compliance mistakes and safety risks",
    ],
    eligibility: "Students, aspiring drone pilots, entrepreneurs, and professionals from photography, surveying, agriculture, and inspection fields.",
    outcome: "Clear foundation in Indian UAS regulations and basic requirements for safe, responsible, and compliant drone operations.",
  },
  {
    id: "faa-drone-regulations",
    title: "FAA Drone Regulations",
    category: "Compliance & Regulations",
    description:
      "Introduction to UAS rules and safe operating practices under the FAA framework in the United States. Covers Part 107, Remote ID, and airspace authorization.",
    duration: "6 weeks",
    lessons: 22,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.8,
    students: 890,
    image: "/banner_faa_1784991724685.png",
    tags: ["FAA", "Part 107", "UAS", "USA"],
    modules: [
      {
            "title": "Module 1: Introduction to FAA Drone Regulations",
            "items": [
                  "United States drone regulatory framework",
                  "Role of the Federal Aviation Administration",
                  "Introduction to the National Airspace System",
                  "General pilot and operator responsibilities"
            ]
      },
      {
            "title": "Module 2: Recreational and Part 107 Operations",
            "items": [
                  "Recreational drone-flying requirements",
                  "Introduction to the TRUST safety test",
                  "Purpose and scope of FAA Part 107",
                  "Basic remote-pilot eligibility awareness"
            ]
      },
      {
            "title": "Module 3: Drone Registration and Remote ID",
            "items": [
                  "FAA registration requirements",
                  "Introduction to FAA DroneZone",
                  "Purpose of Remote Identification",
                  "Basic compliance responsibilities"
            ]
      },
      {
            "title": "Module 4: Airspace and Flight Authorisation",
            "items": [
                  "Controlled and uncontrolled airspace",
                  "Checking airspace before a flight",
                  "Introduction to LAANC and DroneZone authorisations",
                  "Airports, restricted areas and temporary restrictions"
            ]
      },
      {
            "title": "Module 5: Safe Drone Operating Practices",
            "items": [
                  "Pre-flight planning and inspection",
                  "Visual line-of-sight and altitude awareness",
                  "Operations near people and vehicles",
                  "Night operations and emergency awareness"
            ]
      },
      {
            "title": "Module 6: Pilot Responsibilities and Compliance",
            "items": [
                  "Remote pilot in command responsibilities",
                  "Required certificates and operating records",
                  "Overview of waivers and special authorisations",
                  "Common violations and compliance examples"
            ]
      }
],
    topics: [
      "Introduction to UAS regulations in the United States",
      "FAA framework and operator responsibilities",
      "Recreational vs commercial drone operations",
      "FAA Part 107 awareness",
      "Registration and Remote ID basics",
      "Airspace awareness and flight authorization overview",
      "Safe operating practices",
      "Risk, liability, and common operational mistakes",
    ],
    eligibility: "Beginners interested in UAS operations in the USA, aspiring FAA remote pilots, drone business owners, and professionals using drones commercially.",
    outcome: "Basic understanding of FAA UAS compliance and safe flight practices for responsible drone operations in the United States.",
  },
  {
    id: "easa-drone-regulations",
    title: "EASA Drone Regulations",
    category: "Compliance & Regulations",
    description:
      "Overview of UAS rules and compliance under the European aviation safety framework. Covers Open, Specific, and Certified category awareness with NAA roles.",
    duration: "6 weeks",
    lessons: 20,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.7,
    students: 620,
    image: "/banner_easa.png",
    tags: ["EASA", "Europe", "UAS", "Compliance"],
    modules: [
      {
            "title": "Module 1: Introduction to EASA Drone Regulations",
            "items": [
                  "European drone regulatory framework",
                  "Role of EASA and National Aviation Authorities",
                  "Difference between a drone operator and remote pilot",
                  "General responsibilities and terminology"
            ]
      },
      {
            "title": "Module 2: EASA Drone Operation Categories",
            "items": [
                  "Open, Specific and Certified categories",
                  "Risk-based approach to drone operations",
                  "Selecting the appropriate operating category",
                  "Authorisation and certification awareness"
            ]
      },
      {
            "title": "Module 3: Open Category and Subcategories",
            "items": [
                  "A1, A2 and A3 subcategories",
                  "Drone class-identification labels",
                  "Basic operating limitations",
                  "Visual line-of-sight and altitude awareness"
            ]
      },
      {
            "title": "Module 4: Registration and Pilot Requirements",
            "items": [
                  "Drone operator registration",
                  "Remote-pilot competency requirements",
                  "Training and examination awareness",
                  "Certificate and record-keeping responsibilities"
            ]
      },
      {
            "title": "Module 5: Geographical Zones and Safe Operations",
            "items": [
                  "Understanding UAS geographical zones",
                  "Checking national airspace restrictions",
                  "Operations near airports and restricted locations",
                  "Geo-awareness and basic emergency procedures"
            ]
      },
      {
            "title": "Module 6: Specific Category and Compliance",
            "items": [
                  "Introduction to the Specific category",
                  "Operational authorisations and standard scenarios",
                  "Basic risk-assessment awareness",
                  "Cross-border and compliance considerations"
            ]
      }
],
    topics: [
      "Introduction to UAS regulations in Europe",
      "EASA and National Aviation Authority overview",
      "Open, Specific, and Certified category awareness",
      "Operator registration and pilot responsibility",
      "Airspace and geographical zone awareness",
      "Equipment and operational compliance basics",
      "Safe operating practices",
      "Risk, privacy, and common compliance mistakes",
    ],
    eligibility: "Beginners interested in UAS operations in Europe, aspiring remote pilots, drone service providers, and professionals from photography, surveying, and inspection.",
    outcome: "Clear foundation in EASA UAS rules and basic compliance approach for safe drone operations in Europe.",
  },
  {
    id: "aerospace-fundamentals",
    title: "Aerospace Engineering Fundamentals",
    category: "Technical Foundation",
    description:
      "Foundation in aerospace engineering concepts including aircraft basics, flight principles, structures, propulsion, materials, and industry applications.",
    duration: "6 weeks",
    lessons: 28,
    level: "Beginner" as const,
    price: 1499,
    rating: 4.9,
    students: 2100,
    image: "/banner_pixhawk_1784992045334.png",
    tags: ["Aerospace", "Aviation", "Engineering", "Fundamentals"],
    modules: [
      {
            "title": "Module 1: Introduction to Aerospace Engineering",
            "items": [
                  "Aeronautical and astronautical engineering",
                  "Development of aviation and space technology",
                  "Aircraft, spacecraft and unmanned aerial systems",
                  "Major aerospace branches and applications"
            ]
      },
      {
            "title": "Module 2: Atmosphere and Principles of Flight",
            "items": [
                  "Atmospheric pressure, temperature and density",
                  "Lift, weight, thrust and drag",
                  "Basic aircraft motion and flight conditions",
                  "Effect of atmospheric conditions on flight"
            ]
      },
      {
            "title": "Module 3: Fundamentals of Aerodynamics",
            "items": [
                  "Airflow around aircraft",
                  "Airfoil and wing terminology",
                  "Angle of attack, lift and drag",
                  "Stall and aerodynamic efficiency"
            ]
      },
      {
            "title": "Module 4: Aircraft Performance and Flight Mechanics",
            "items": [
                  "Take-off, climb, cruise and landing phases",
                  "Speed, altitude, range and endurance",
                  "Weight, balance and centre of gravity",
                  "Basic performance limitations"
            ]
      },
      {
            "title": "Module 5: Aircraft Structures and Materials",
            "items": [
                  "Major aircraft structural components",
                  "Basic structural loads and arrangements",
                  "Common aerospace materials",
                  "Fatigue, corrosion and structural awareness"
            ]
      },
      {
            "title": "Module 6: Aerospace Propulsion Systems",
            "items": [
                  "Piston and propeller systems",
                  "Gas-turbine engine types",
                  "Basic rocket propulsion",
                  "Electric and hybrid-electric propulsion"
            ]
      },
      {
            "title": "Module 7: Stability, Control, Avionics and Spaceflight Basics",
            "items": [
                  "Pitch, roll and yaw",
                  "Aircraft stability and flight controls",
                  "Basic instruments, sensors and navigation",
                  "Introductory spacecraft and orbital concepts"
            ]
      }
],
    topics: [
      "Introduction to aerospace engineering",
      "Aircraft, spacecraft, and UAS overview",
      "Basic flight principles",
      "Aircraft structures and materials awareness",
      "Propulsion system basics",
      "Flight control and stability awareness",
      "Introduction to avionics and aircraft systems",
      "Aerospace manufacturing and quality awareness",
      "Industry applications and career pathways",
      "Emerging trends in aerospace and drone technology",
    ],
    eligibility: "Students interested in aerospace or aeronautical engineering, beginners exploring aviation or drone technology, and professionals seeking aerospace domain awareness.",
    outcome: "Clear understanding of aerospace engineering fundamentals and ability to identify major aerospace systems, basic flight concepts, and engineering applications.",
  },
  {
    id: "aerodynamics",
    title: "Aerodynamics",
    category: "Technical Foundation",
    description:
      "Foundation in aerodynamics with focus on airflow behavior, lift, drag, pressure, stability, and performance concepts for aircraft, drones, and wings.",
    duration: "6 weeks",
    lessons: 26,
    level: "Beginner" as const,
    price: 1999,
    rating: 4.9,
    students: 1580,
    image: "/banner_aerodynamics_1784991955683.png",
    tags: ["Aerodynamics", "Airfoil", "Lift", "Drag"],
    modules: [
      {
            "title": "Module 1: Aerodynamics and the Atmosphere",
            "items": [
                  "Applications of aerodynamics",
                  "Properties of air and atmospheric conditions",
                  "Steady, unsteady and compressibility awareness",
                  "Effect of altitude on aerodynamic behaviour"
            ]
      },
      {
            "title": "Module 2: Airflow and Aerodynamic Forces",
            "items": [
                  "Flow patterns and streamlines",
                  "Pressure and velocity relationships",
                  "Lift, drag, thrust and weight",
                  "Reynolds number and Mach number awareness"
            ]
      },
      {
            "title": "Module 3: Airfoils and Lift Generation",
            "items": [
                  "Airfoil geometry and terminology",
                  "Pressure distribution and lift generation",
                  "Angle of attack and lift behaviour",
                  "Centre of pressure and airfoil selection"
            ]
      },
      {
            "title": "Module 4: Drag and Aerodynamic Efficiency",
            "items": [
                  "Major forms of aerodynamic drag",
                  "Induced and parasite drag",
                  "Lift-to-drag ratio",
                  "Shape, surface and speed effects"
            ]
      },
      {
            "title": "Module 5: Wing Aerodynamics and Stall",
            "items": [
                  "Wing geometry and aspect ratio",
                  "Finite-wing effects and wingtip vortices",
                  "Stall and flow separation",
                  "High-lift devices and ground effect"
            ]
      },
      {
            "title": "Module 6: Stability, Control and Performance",
            "items": [
                  "Pitch, roll and yaw",
                  "Static stability and control surfaces",
                  "Trim and control effects",
                  "Aerodynamics across flight phases"
            ]
      },
      {
            "title": "Module 7: Propeller, Rotor and Applied Aerodynamics",
            "items": [
                  "Propeller thrust and efficiency",
                  "Rotor and multirotor aerodynamic principles",
                  "Wind-tunnel testing awareness",
                  "Introduction to CFD and applied case studies"
            ]
      }
],
    topics: [
      "Introduction to aerodynamics",
      "Airflow, pressure, velocity, and forces",
      "Lift, drag, thrust, and weight concepts",
      "Airfoil and wing basics",
      "Angle of attack and stall awareness",
      "Basic aircraft stability and control awareness",
      "Propeller and rotor aerodynamic awareness",
      "Aerodynamics in drones, aircraft, and vehicles",
      "Introduction to performance improvement concepts",
      "Connection between aerodynamics, CFD, and design validation",
    ],
    eligibility: "Aerospace, aeronautical, and mechanical engineering students, UAS and aviation learners, CAD/FEA/CFD learners seeking aerodynamic understanding.",
    outcome: "Clear foundation in aerodynamic principles and understanding of how airflow affects design, stability, performance, and efficiency in aircraft and drones.",
  },
  {
    id: "drone-components",
    title: "Drone Components & Applications",
    category: "Technical Foundation",
    description:
      "Foundation in UAS technology covering major drone components, basic aerodynamics, industry applications, and R&D awareness for practical drone solutions.",
    duration: "8 weeks",
    lessons: 32,
    level: "Beginner" as const,
    price: 2499,
    rating: 4.8,
    students: 1120,
    image: "/banner_components_1784991954912.png",
    tags: ["UAS", "Drone", "Components", "R&D"],
    modules: [
      {
            "title": "Module 1: Introduction to Drone Technology",
            "items": [
                  "Drones, UAVs and UAS terminology",
                  "Development of drone technology",
                  "Remote, automated and autonomous operation",
                  "Overview of a complete drone system"
            ]
      },
      {
            "title": "Module 2: Drone Types and Configurations",
            "items": [
                  "Fixed-wing, multirotor and hybrid platforms",
                  "Quadcopter, hexacopter and octocopter layouts",
                  "Advantages and limitations of configurations",
                  "Mission-based platform selection"
            ]
      },
      {
            "title": "Module 3: Frames and Flight Principles",
            "items": [
                  "Frame purpose, layouts and materials",
                  "Weight distribution and centre of gravity",
                  "Lift, thrust, drag and weight",
                  "Pitch, roll, yaw and stability"
            ]
      },
      {
            "title": "Module 4: Propulsion and Power Systems",
            "items": [
                  "Motors, ESCs and propellers",
                  "Battery types and power distribution",
                  "Component compatibility",
                  "Thrust-to-weight and flight-time awareness"
            ]
      },
      {
            "title": "Module 5: Flight Controllers and Navigation",
            "items": [
                  "Flight-controller functions",
                  "IMU, compass and barometer sensors",
                  "GPS and satellite navigation",
                  "Flight modes and waypoint awareness"
            ]
      },
      {
            "title": "Module 6: Communication and Payload Systems",
            "items": [
                  "Radio control and telemetry",
                  "Ground-control stations",
                  "Cameras, gimbals and imaging payloads",
                  "Specialised sensors and payload integration"
            ]
      },
      {
            "title": "Module 7: Drone Applications and System Selection",
            "items": [
                  "Photography, mapping and surveying",
                  "Agriculture and infrastructure inspection",
                  "Public safety, logistics and environmental uses",
                  "Selecting systems for mission requirements"
            ]
      },
      {
            "title": "Module 8: Integration, Testing and Development",
            "items": [
                  "Component compatibility and basic integration",
                  "Pre-flight inspection and system testing",
                  "Performance evaluation and troubleshooting",
                  "Concept-to-prototype development awareness"
            ]
      }
],
    topics: [
      "UAS terminology and basic concepts",
      "Major drone components and system overview",
      "Basic aerodynamics and flight principles",
      "Drone types, configurations, and use cases",
      "Payload, sensor, battery, propulsion, and control system awareness",
      "Industry applications of drones",
      "Introduction to drone R&D and innovation process",
      "Concept-to-prototype awareness",
      "Component selection and payload integration basics",
      "Testing, validation, and performance improvement awareness",
    ],
    eligibility: "Students and beginners interested in drone technology, aspiring drone pilots, entrepreneurs exploring drone-based ideas, professionals from agriculture, surveying, and inspection.",
    outcome: "Clear understanding of UAS components, applications, terminology, basic aerodynamics, and R&D basics with awareness of how drone ideas move toward practical solutions.",
  },
  {
    id: "matlab-programming",
    title: "MATLAB Programming",
    category: "Technical Foundation",
    description:
      "Foundation in MATLAB programming for engineering, data analysis, mathematical modeling, and technical problem-solving in aerospace and simulation applications.",
    duration: "6 weeks",
    lessons: 24,
    level: "Beginner" as const,
    price: 2499,
    rating: 4.7,
    students: 750,
    image: "/banner_matlab_1784991967948.png",
    tags: ["MATLAB", "Programming", "Engineering", "Data"],
    modules: [
      {
            "title": "Module 1: Introduction to MATLAB",
            "items": [
                  "MATLAB environment and engineering applications",
                  "Variables, data types and expressions",
                  "Files, commands and built-in help",
                  "Basic mathematical operations"
            ]
      },
      {
            "title": "Module 2: Arrays and Matrix Operations",
            "items": [
                  "Vectors, matrices and indexing",
                  "Matrix and element-wise operations",
                  "Array reshaping and built-in functions",
                  "Engineering applications of matrices"
            ]
      },
      {
            "title": "Module 3: Programming Fundamentals",
            "items": [
                  "Scripts and input-output commands",
                  "Relational and logical operations",
                  "Conditional statements",
                  "For and while loops"
            ]
      },
      {
            "title": "Module 4: Functions and Code Organisation",
            "items": [
                  "User-defined functions",
                  "Inputs, outputs and variable scope",
                  "Reusable code organisation",
                  "Debugging and error correction"
            ]
      },
      {
            "title": "Module 5: Data Visualisation",
            "items": [
                  "Two-dimensional engineering plots",
                  "Multiple data sets and plot formatting",
                  "Basic three-dimensional plotting",
                  "Figure customisation and export"
            ]
      },
      {
            "title": "Module 6: Data Import and Analysis",
            "items": [
                  "Importing spreadsheet and text data",
                  "Tables and structured data",
                  "Filtering and basic statistics",
                  "Exporting processed results"
            ]
      },
      {
            "title": "Module 7: Numerical Problem-Solving",
            "items": [
                  "Linear equations and polynomials",
                  "Interpolation and curve fitting",
                  "Numerical differentiation and integration",
                  "Root-finding and engineering models"
            ]
      },
      {
            "title": "Module 8: Engineering Applications",
            "items": [
                  "Aircraft and drone data analysis",
                  "Motion and trajectory calculations",
                  "Sensor and flight-test data processing",
                  "Final engineering programming project"
            ]
      }
],
    topics: [
      "Introduction to MATLAB environment",
      "Basic programming concepts",
      "Variables, arrays, matrices, and functions",
      "Mathematical operations and plotting",
      "Data handling and visualization basics",
      "Engineering problem-solving using MATLAB",
      "Introduction to scripts and functions",
      "Basic simulation and modeling awareness",
      "Applications in aerospace, drones, and engineering analysis",
    ],
    eligibility: "Engineering students and graduates, aerospace, mechanical, electrical learners, and professionals who want to improve engineering computation skills.",
    outcome: "Clear foundation in MATLAB programming for basic engineering calculations, data visualization, problem-solving, and technical project support.",
  },
  {
    id: "catia-design",
    title: "CATIA Design",
    category: "Design Foundation",
    description:
      "Practical foundation in 3D design using CATIA with an aircraft-oriented approach. Covers part modeling, assembly basics, drafting, and professional CAD workflow.",
    duration: "10 weeks",
    lessons: 40,
    level: "Intermediate" as const,
    price: 3999,
    rating: 4.9,
    students: 1580,
    image: "/banner_aero_1784991736912.png",
    tags: ["CATIA", "CAD", "Aircraft", "3D Design"],
    modules: [
      {
            "title": "Module 1: Engineering Drawing and GD&T Basics",
            "items": [
                  "Orthographic, isometric and sectional views",
                  "Engineering dimensions and drawing conventions",
                  "Limits, fits and tolerances",
                  "Introductory GD&T symbols, datums and feature-control frames"
            ]
      },
      {
            "title": "Module 2: CATIA V5 and Sketcher",
            "items": [
                  "CATIA interface and workbenches",
                  "Creating and editing sketches",
                  "Geometrical and dimensional constraints",
                  "Applying design intent"
            ]
      },
      {
            "title": "Module 3: CATIA Part Design",
            "items": [
                  "Core solid-modelling features",
                  "Fillets, chamfers, ribs and patterns",
                  "Reference geometry and feature management",
                  "Aircraft and mechanical component modelling"
            ]
      },
      {
            "title": "Module 4: CATIA Assembly Design",
            "items": [
                  "Creating products and inserting components",
                  "Applying assembly constraints",
                  "Managing parts and subassemblies",
                  "Clash and interference checking"
            ]
      },
      {
            "title": "Module 5: CATIA Drafting and Documentation",
            "items": [
                  "Generating drawing views",
                  "Dimensions, tolerances and annotations",
                  "Section and detail views",
                  "Bills of materials and production drawings"
            ]
      },
      {
            "title": "Module 6: Wireframe and Surface Design",
            "items": [
                  "Curves, planes and reference geometry",
                  "Swept and multi-section surfaces",
                  "Joining, trimming and splitting surfaces",
                  "Applications to aerodynamic components"
            ]
      },
      {
            "title": "Module 7: Aircraft Component Design Project",
            "items": [
                  "Aircraft-design workflow awareness",
                  "Modelling a selected structural component",
                  "Assembly and engineering drawing preparation",
                  "Basic GD&T and project assessment"
            ]
      }
],
    topics: [
      "Introduction to CATIA and CAD design workflow",
      "Basic sketching and part design concepts",
      "Aircraft-oriented component design awareness",
      "General mechanical and product design approach",
      "3D modeling, constraints, features, and design intent",
      "Assembly design basics",
      "Drafting and drawing generation awareness",
      "Design modification and error correction basics",
      "Introduction to manufacturability and design documentation",
      "Professional CAD practices and file management awareness",
    ],
    eligibility: "Students and beginners in CAD design, mechanical, aerospace, aeronautical learners, UAS and aircraft design enthusiasts, and engineering graduates.",
    outcome: "Foundation in CATIA-based design — create basic 3D parts, understand assembly structure, read design intent, and apply CAD concepts to aircraft and product design.",
  },
  {
    id: "nx-cad-design",
    title: "NX CAD Design",
    category: "Design Foundation",
    description:
      "Practical foundation in 3D design using Siemens NX CAD with aircraft-oriented and general product design approach. Covers part modeling, assembly, and drafting.",
    duration: "10 weeks",
    lessons: 38,
    level: "Intermediate" as const,
    price: 3999,
    rating: 4.8,
    students: 920,
    image: "/banner_siemens_1784991985646.png",
    tags: ["NX CAD", "Siemens", "CAD", "3D Modeling"],
    modules: [
      {
            "title": "Module 1: Engineering Drawing and GD&T Basics",
            "items": [
                  "Orthographic, isometric and sectional views",
                  "Engineering dimensions and drawing conventions",
                  "Limits, fits and tolerances",
                  "Introductory GD&T symbols, datums and feature-control frames"
            ]
      },
      {
            "title": "Module 2: Siemens NX Interface and Sketching",
            "items": [
                  "NX interface and design applications",
                  "Creating and editing sketches",
                  "Geometric and dimensional constraints",
                  "Reference geometry and design intent"
            ]
      },
      {
            "title": "Module 3: NX Part Modelling",
            "items": [
                  "Core solid-modelling features",
                  "Fillets, chamfers, shells and patterns",
                  "Feature management and model modification",
                  "Introduction to synchronous modelling"
            ]
      },
      {
            "title": "Module 4: NX Assembly Design",
            "items": [
                  "Creating and positioning components",
                  "Applying assembly constraints",
                  "Managing parts and subassemblies",
                  "Exploded views and interference checking"
            ]
      },
      {
            "title": "Module 5: NX Drafting and Documentation",
            "items": [
                  "Generating model-based drawing views",
                  "Section and detail views",
                  "Dimensions, tolerances and GD&T annotations",
                  "Parts lists and technical documentation"
            ]
      },
      {
            "title": "Module 6: NX Surface Modelling",
            "items": [
                  "Curves and reference geometry",
                  "Swept and through-curve surfaces",
                  "Trimming, joining and modifying surfaces",
                  "Applications to aerodynamic components"
            ]
      },
      {
            "title": "Module 7: Aircraft Component Design Project",
            "items": [
                  "Aircraft-design workflow awareness",
                  "Modelling a selected aircraft component",
                  "Assembly and engineering drawing preparation",
                  "Basic GD&T and project assessment"
            ]
      }
],
    topics: [
      "Introduction to NX CAD and design workflow",
      "Basic sketching and feature-based modeling",
      "Aircraft-oriented component design awareness",
      "General mechanical and product design approach",
      "3D part modeling and design modification basics",
      "Assembly design fundamentals",
      "Drafting and technical drawing awareness",
      "Design validation and model review basics",
      "Introduction to manufacturability and documentation",
      "Professional CAD practices and organized design workflow",
    ],
    eligibility: "Students and beginners in NX CAD, mechanical, aerospace, aeronautical learners, UAS and aircraft enthusiasts, and professionals strengthening CAD skills.",
    outcome: "Foundation in NX CAD-based design — create basic 3D models, understand assembly concepts, apply design modifications for aircraft and product design.",
  },
  {
    id: "mathematics-fea-cfd",
    title: "Mathematics for FEA & CFD",
    category: "Engineering Mathematics",
    description:
      "Essential mathematical foundation for understanding Finite Element Analysis and Computational Fluid Dynamics — vectors, matrices, calculus, and numerical methods.",
    duration: "6 weeks",
    lessons: 24,
    level: "Intermediate" as const,
    price: 2499,
    rating: 4.7,
    students: 540,
    image: "/banner_math_1784991995091.png",
    tags: ["Mathematics", "FEA", "CFD", "Simulation"],
    modules: [
      {
            "title": "Module 1: Engineering Mathematics and Linear Algebra",
            "items": [
                  "Engineering functions and equations",
                  "Scalars, vectors and coordinate systems",
                  "Matrices and systems of equations",
                  "Eigenvalue and eigenvector awareness"
            ]
      },
      {
            "title": "Module 2: Calculus for Engineering Analysis",
            "items": [
                  "Differentiation and engineering rates",
                  "Partial derivatives and multivariable functions",
                  "Integration and area-based calculations",
                  "Gradient, divergence and curl awareness"
            ]
      },
      {
            "title": "Module 3: Differential Equations and Physical Variables",
            "items": [
                  "Ordinary and partial differential equations",
                  "Initial and boundary conditions",
                  "Steady and transient behaviour",
                  "Structural and fluid-field variables"
            ]
      },
      {
            "title": "Module 4: Numerical Methods and Approximation",
            "items": [
                  "Need for numerical solutions",
                  "Root-finding and interpolation",
                  "Numerical differentiation and integration",
                  "Error, accuracy and convergence"
            ]
      },
      {
            "title": "Module 5: Mathematical Foundations of FEA and CFD",
            "items": [
                  "Continuous and discretised models",
                  "Nodes, elements, grids and meshes",
                  "Loads, constraints and boundary conditions",
                  "Matrix and conservation concepts in simulation"
            ]
      }
],
    topics: [
      "Engineering mathematics overview for simulation",
      "Vectors, matrices, and basic field concepts",
      "Calculus and differential equation awareness",
      "Stress, strain, load, displacement, pressure, velocity, and flow variables",
      "Boundary conditions and constraints",
      "Numerical methods and approximation awareness",
      "Meshing, discretization, error, and convergence basics",
      "Mathematical understanding of structural and fluid behavior",
      "Application of mathematics in FEA and CFD result interpretation",
    ],
    eligibility: "Engineering students and graduates, CAD learners moving toward simulation, mechanical, aerospace, civil, and automotive engineering learners.",
    outcome: "Clear foundation in the mathematical concepts behind FEA and CFD — prepared to understand simulation workflows, structural analysis, and result interpretation.",
  },
  {
    id: "fea-analysis",
    title: "FEA Analysis",
    category: "Simulation & Analysis",
    description:
      "Foundation in Finite Element Analysis for engineering design and product validation. Study structural behavior, stress, deformation, and design improvement in aerospace products.",
    duration: "10 weeks",
    lessons: 38,
    level: "Advanced" as const,
    price: 4499,
    rating: 4.8,
    students: 680,
    image: "/banner_fea_1784992005177.png",
    tags: ["FEA", "Structural", "Simulation", "CAE"],
    modules: [
      {
            "title": "Module 1: Introduction to FEA and Structural Analysis",
            "items": [
                  "Finite Element Analysis fundamentals",
                  "Aerospace and mechanical applications",
                  "Stress, strain and deformation",
                  "Overview of the simulation workflow"
            ]
      },
      {
            "title": "Module 2: Geometry Preparation and Materials",
            "items": [
                  "Importing and preparing CAD geometry",
                  "Model simplification and defeaturing",
                  "Assigning engineering materials",
                  "Basic material-property awareness"
            ]
      },
      {
            "title": "Module 3: Meshing Fundamentals",
            "items": [
                  "Nodes, elements and mesh types",
                  "Element size and local refinement",
                  "Mesh-quality checks",
                  "Mesh-convergence awareness"
            ]
      },
      {
            "title": "Module 4: Loads and Boundary Conditions",
            "items": [
                  "Forces, pressures and moments",
                  "Fixed, displacement and symmetry conditions",
                  "Realistic supports and constraints",
                  "Common setup errors"
            ]
      },
      {
            "title": "Module 5: Static Structural Analysis",
            "items": [
                  "Basic simulation setup",
                  "Components and simple assemblies",
                  "Stress, strain and deformation results",
                  "Factor-of-safety awareness"
            ]
      },
      {
            "title": "Module 6: Results, Validation and Design Improvement",
            "items": [
                  "Contour plots and result interpretation",
                  "Stress concentrations",
                  "Accuracy and convergence checks",
                  "Design comparison and improvement"
            ]
      },
      {
            "title": "Module 7: Applied FEA Project",
            "items": [
                  "Preparing an engineering component",
                  "Creating the mesh and simulation setup",
                  "Evaluating and documenting results",
                  "Final project review and assessment"
            ]
      }
],
    topics: [
      "Introduction to FEA and CAE workflow",
      "Basic concepts of stress, strain, load, and deformation",
      "Geometry preparation and model simplification awareness",
      "Material properties and boundary condition basics",
      "Meshing concepts and result interpretation",
      "Structural analysis awareness",
      "Design validation and improvement approach",
      "Common errors and best practices in FEA",
      "Applications in aircraft, drones, and general product design",
    ],
    eligibility: "Engineering students and graduates, mechanical, aerospace, aeronautical learners, CAD designers moving toward simulation, UAS and aircraft enthusiasts.",
    outcome: "Clear foundation in FEA concepts and simulation workflow — understand how structural analysis supports design decisions, product improvement, and engineering validation.",
  },
  {
    id: "cfd-analysis",
    title: "CFD Analysis",
    category: "Simulation & Analysis",
    description:
      "Foundation in Computational Fluid Dynamics for understanding airflow, fluid behavior, and aerodynamic performance in aircraft, drones, and engineering applications.",
    duration: "10 weeks",
    lessons: 40,
    level: "Advanced" as const,
    price: 4999,
    rating: 4.9,
    students: 720,
    image: "/banner_cfd_1784992023667.png",
    tags: ["CFD", "Aerodynamics", "Simulation", "Fluids"],
    modules: [
      {
            "title": "Module 1: CFD and Fluid-Flow Fundamentals",
            "items": [
                  "Computational Fluid Dynamics applications",
                  "Pressure, velocity, density and viscosity",
                  "Laminar, turbulent and compressibility awareness",
                  "Overview of the CFD workflow"
            ]
      },
      {
            "title": "Module 2: Geometry and Computational Domain",
            "items": [
                  "Preparing CAD geometry",
                  "Model cleanup and simplification",
                  "Internal and external fluid domains",
                  "Inlets, outlets, walls and symmetry regions"
            ]
      },
      {
            "title": "Module 3: CFD Meshing",
            "items": [
                  "Surface and volume meshes",
                  "Element sizing and local refinement",
                  "Boundary-layer mesh awareness",
                  "Mesh quality and grid independence"
            ]
      },
      {
            "title": "Module 4: Physics Setup and Boundary Conditions",
            "items": [
                  "Fluid materials and flow models",
                  "Inlet, outlet and wall conditions",
                  "Steady and transient simulation awareness",
                  "Solver settings and convergence monitoring"
            ]
      },
      {
            "title": "Module 5: Turbulence and Heat-Flow Basics",
            "items": [
                  "Purpose of turbulence models",
                  "Near-wall flow awareness",
                  "Basic model-selection considerations",
                  "Introduction to heat-transfer simulations"
            ]
      },
      {
            "title": "Module 6: CFD Results and Validation",
            "items": [
                  "Pressure, velocity and temperature contours",
                  "Streamlines and flow patterns",
                  "Lift, drag and aerodynamic coefficients",
                  "Convergence and common setup errors"
            ]
      },
      {
            "title": "Module 7: Aerospace CFD Project",
            "items": [
                  "Aircraft, airfoil or drone geometry",
                  "Domain, mesh and flow setup",
                  "Aerodynamic performance evaluation",
                  "Final report and project assessment"
            ]
      }
],
    topics: [
      "Introduction to CFD and simulation workflow",
      "Basic fluid flow and aerodynamic concepts",
      "Geometry preparation and domain awareness",
      "Boundary conditions and material setup basics",
      "Meshing concepts for CFD",
      "Airflow, pressure, velocity, and turbulence awareness",
      "Result interpretation and performance understanding",
      "Common CFD errors and best practices",
      "Applications in aircraft, drones, and general engineering systems",
    ],
    eligibility: "Engineering students and graduates, mechanical, aerospace, aeronautical learners, CAD designers moving toward fluid simulation, and performance analysis professionals.",
    outcome: "Clear foundation in CFD concepts and simulation workflow — understand how fluid analysis supports aerodynamic study, design improvement, and performance-based decisions.",
  },
  {
    id: "as9100d-quality",
    title: "AS9100D Quality Management",
    category: "Quality & Industry Standards",
    description:
      "Practical foundation in aerospace quality management with AS9100D awareness. Covers quality policy, documentation, traceability, risk management, and continual improvement.",
    duration: "8 weeks",
    lessons: 36,
    level: "Intermediate" as const,
    price: 2999,
    rating: 4.7,
    students: 650,
    image: "/banner_as9100d_1784992034263.png",
    tags: ["AS9100D", "Quality", "Aerospace", "Compliance"],
    modules: [
      {
            "title": "Module 1: Introduction to AS9100D",
            "items": [
                  "Overview of aerospace quality management systems",
                  "Relationship between ISO 9001 and AS9100D",
                  "Structure and purpose of the standard",
                  "Applications in aviation, space and defence"
            ]
      },
      {
            "title": "Module 2: Quality Planning and Organisational Responsibilities",
            "items": [
                  "Organisational context and interested parties",
                  "Quality policy, objectives and responsibilities",
                  "Risk-based thinking and quality planning",
                  "Competence, awareness and documented information"
            ]
      },
      {
            "title": "Module 3: Aerospace Operational Requirements",
            "items": [
                  "Customer and regulatory requirements",
                  "Design, production and service controls",
                  "Product identification and traceability",
                  "Configuration and change-management awareness"
            ]
      },
      {
            "title": "Module 4: Aerospace-Specific Quality Controls",
            "items": [
                  "Product safety and operational risk",
                  "Counterfeit-part prevention",
                  "Critical items and key characteristics",
                  "Supplier selection and quality monitoring"
            ]
      },
      {
            "title": "Module 5: Performance Evaluation and Improvement",
            "items": [
                  "Process monitoring and measurement",
                  "Internal audit and management-review awareness",
                  "Nonconformity and corrective action",
                  "Root-cause analysis and continual improvement"
            ]
      },
      {
            "title": "Module 6: Implementation and Certification Awareness",
            "items": [
                  "Overview of QMS documentation",
                  "Process mapping and gap-assessment awareness",
                  "Basic implementation planning",
                  "Certification-process awareness and final assessment"
            ]
      }
],
    topics: [
      "Introduction to quality management in aerospace and UAS industries",
      "Overview of AS9100D and aerospace quality standards",
      "Basic understanding of ISO 9001 and AS9100D relationship",
      "Quality policy, objectives, and process-based thinking",
      "Documentation, records, and traceability awareness",
      "Risk-based thinking and operational risk awareness",
      "Product safety, conformity, and reliability concepts",
      "Supplier quality and purchase control awareness",
      "Inspection, verification, and nonconformity basics",
      "Corrective action and continual improvement awareness",
      "Audit readiness and compliance mindset",
      "Role of quality culture in aerospace and drone industries",
    ],
    eligibility: "Students and beginners in aerospace quality, UAS, aviation, and aerospace technology learners, quality and production professionals, and entrepreneurs with drone/aerospace products.",
    outcome: "Clear foundation in aerospace quality management and AS9100D awareness — understand quality terms, documentation, traceability, compliance mindset, and continual improvement.",
  },
];

export const COURSE_BUNDLES = [
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
    title: "UAS Type Certification",
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
    title: "AS9100D Quality Systems",
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
    title: "Drone R&D Consulting",
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
    title: "Design & Simulation",
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
];
