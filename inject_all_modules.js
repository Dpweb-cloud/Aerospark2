const fs = require('fs');

const coursesData = JSON.parse(fs.readFileSync('parsed_modules.json', 'utf8'));
let code = fs.readFileSync('src/lib/constants.ts', 'utf8');

const courseIds = [
  "dgca-drone-regulations",
  "faa-drone-regulations",
  "easa-drone-regulations",
  "aerospace-engineering-fundamentals",
  "aerodynamics-aircraft-drones",
  "drone-components-applications",
  "matlab-programming-engineering",
  "catia-v5-aircraft-design",
  "siemens-nx-cad-design",
  "mathematics-fea-cfd",
  "finite-element-analysis",
  "computational-fluid-dynamics",
  "as9100d-aerospace-quality"
];

for (let i = 0; i < courseIds.length; i++) {
  const cId = courseIds[i];
  const modules = coursesData[i];
  
  if (!modules || modules.length === 0) {
    console.log(`No modules for ${cId}`);
    continue;
  }
  
  // If modules already exist, remove them first to avoid duplication
  const removeRegex = new RegExp(`(id:\\s*"${cId}",[\\s\\S]*?)(\\n\\s*modules:\\s*\\[[\\s\\S]*?\\}\\s*\\],)`, 'g');
  code = code.replace(removeRegex, '$1');

  // Inject modules after tags array
  const injectRegex = new RegExp(`(id:\\s*"${cId}",[\\s\\S]*?tags:\\s*\\[.*?\\])(,?)`);
  code = code.replace(injectRegex, `$1,\n    modules: ${JSON.stringify(modules, null, 6)},`);
}

fs.writeFileSync('src/lib/constants.ts', code);
console.log('Successfully injected all modules!');
