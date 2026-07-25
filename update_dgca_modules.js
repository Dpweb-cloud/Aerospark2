const fs = require('fs');

const dgcaModules = [
  {
    title: "Module 1: Introduction to DGCA Drone Regulations",
    items: [
      "Overview of drone regulations in India",
      "Role of DGCA and the Ministry of Civil Aviation",
      "Introduction to the Drone Rules 2021",
      "Responsibilities of drone owners, operators and pilots"
    ]
  },
  {
    title: "Module 2: Drone Classification and Registration",
    items: [
      "Drone classification according to weight",
      "Overview of type-certification requirements",
      "Drone registration and Unique Identification Number",
      "Essential operational documents and records"
    ]
  },
  {
    title: "Module 3: Digital Sky and Airspace Regulations",
    items: [
      "Introduction to the Digital Sky platform",
      "Green, yellow and red airspace zones",
      "Restrictions near airports and sensitive locations",
      "Overview of flight permissions and approvals"
    ]
  },
  {
    title: "Module 4: Remote Pilot Requirements",
    items: [
      "Role and responsibilities of a remote pilot",
      "Overview of the Remote Pilot Certificate",
      "Basic eligibility and training requirements",
      "Role of Remote Pilot Training Organisations"
    ]
  },
  {
    title: "Module 5: Safe Drone Operating Practices",
    items: [
      "Pre-flight planning and drone inspection",
      "Weather, location and airspace assessment",
      "Safe take-off, flight and landing practices",
      "Emergency awareness and operational records"
    ]
  },
  {
    title: "Module 6: Legal Responsibilities and Drone Compliance",
    items: [
      "Privacy and responsible aerial data collection",
      "Restrictions around sensitive locations",
      "Common regulatory violations",
      "Standard operating procedures and compliance examples"
    ]
  }
];

let code = fs.readFileSync('src/lib/constants.ts', 'utf8');

// Insert after `tags: [...]` for dgca course
const regex = /(id:\s*"dgca-drone-regulations",[\s\S]*?tags:\s*\[.*?\])(,?)/;
code = code.replace(regex, `$1,\n    modules: ${JSON.stringify(dgcaModules, null, 6)},`); // Note the comma at the end!

fs.writeFileSync('src/lib/constants.ts', code);
console.log('DGCA modules added!');
