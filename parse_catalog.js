const fs = require('fs');

const text = fs.readFileSync('catalog.txt', 'utf16le');
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const coursesData = [];
let currentModules = [];
let currentModule = null;

let isParsingModules = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line === 'Course Modules') {
    isParsingModules = true;
    currentModules = [];
    currentModule = null;
    continue;
  }

  if (isParsingModules && line === 'Learning Outcomes') {
    isParsingModules = false;
    if (currentModule) {
      currentModules.push(currentModule);
      currentModule = null;
    }
    coursesData.push(currentModules);
    continue;
  }

  if (isParsingModules) {
    if (line.startsWith('Module ')) {
      if (currentModule) {
        currentModules.push(currentModule);
      }
      currentModule = { title: line, items: [] };
    } else {
      if (currentModule) {
        currentModule.items.push(line);
      }
    }
  }
}

console.log(`Found ${coursesData.length} courses modules!`);
fs.writeFileSync('parsed_modules.json', JSON.stringify(coursesData, null, 2));
console.log('Saved to parsed_modules.json');

