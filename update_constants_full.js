const fs = require('fs');
const path = 'd:/asutosh/newwebsite/src/lib/constants.ts';
let content = fs.readFileSync(path, 'utf8');

const parsed = JSON.parse(fs.readFileSync('parsed_courses.json', 'utf8'));

const mapping = {
  "DGCA Drone Rules and Regulations": "dgca-drone-regulations",
  "FAA Drone Rules and Regulations": "faa-drone-regulations",
  "EASA Drone Rules and Regulations": "easa-drone-regulations",
  "Aerospace Engineering Fundamentals": "aerospace-fundamentals",
  "Aerodynamics": "aerodynamics",
  "Drone Components and Applications": "drone-components",
  "MATLAB Programming for Engineering": "matlab-programming",
  "CATIA V5 Aircraft Design": "catia-design",
  "Siemens NX CAD Aircraft Design": "nx-cad-design",
  "Mathematics for FEA and CFD": "mathematics-fea-cfd",
  "Finite Element Analysis": "fea-analysis",
  "Computational Fluid Dynamics": "cfd-analysis",
  "AS9100D Aerospace Quality Management System": "as9100d-quality"
};

for (const p of parsed) {
    const id = mapping[p.title];
    if (!id) {
        console.log("No mapping for: " + p.title);
        continue;
    }
    
    // Find the block corresponding to this course id
    // We match from 'id: "this-id"' up to the next 'id: "' or the end of the array '];'
    const blockRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(?=\\s+id:\\s*"|\\s*\\];)`);
    
    content = content.replace(blockRegex, (match) => {
        let newBlock = match;
        
        newBlock = newBlock.replace(/title:\s*"[^"]*"/, `title: ${JSON.stringify(p.title)}`);
        newBlock = newBlock.replace(/description:\s*([\s\S]*?)(?=,\s*duration:)/, `description: ${JSON.stringify(p.description)}`);
        newBlock = newBlock.replace(/duration:\s*"[^"]*"/, `duration: ${JSON.stringify(p.duration)}`);
        
        const topicsStr = `topics: ${JSON.stringify(p.topics, null, 4).replace(/\n/g, '\n    ')}`;
        if (/topics:\s*\[[\s\S]*?\]/.test(newBlock)) {
            newBlock = newBlock.replace(/topics:\s*\[[\s\S]*?\]/, topicsStr);
        } else {
            newBlock = newBlock.replace(/(rating:)/, `${topicsStr},\n    $1`);
        }
        
        const modulesStr = `modules: ${JSON.stringify(p.modules, null, 4).replace(/\n/g, '\n    ')}`;
        if (/modules:\s*\[[\s\S]*?\]/.test(newBlock)) {
            newBlock = newBlock.replace(/modules:\s*\[[\s\S]*?\]/, modulesStr);
        } else {
            newBlock = newBlock.replace(/(topics:\s*\[[\s\S]*?\]),?/, `$1,\n    ${modulesStr},`);
        }
        
        const outcomeStr = `outcome: ${JSON.stringify(p.outcome)}`;
        if (/outcome:\s*"[^"]*"/.test(newBlock)) {
            newBlock = newBlock.replace(/outcome:\s*"[^"]*"/, outcomeStr);
        } else {
            newBlock = newBlock.replace(/(rating:)/, `${outcomeStr},\n    $1`);
        }
        
        return newBlock;
    });
}

fs.writeFileSync(path, content);
console.log('Constants updated with new parsed data!');
