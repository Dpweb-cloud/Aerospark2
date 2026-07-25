const fs = require('fs');
let code = fs.readFileSync('src/lib/constants.ts', 'utf8');
code = code.replace(/image:\s*['"][^'"]*['"]/g, (match, offset) => {
    // Look backward for the title
    let strBefore = code.substring(Math.max(0, offset - 300), offset);
    let titleMatch = strBefore.match(/title:\s*['"]([^'"]*)['"]/);
    if (!titleMatch) {
        // Look forward
        let strAfter = code.substring(offset, offset + 300);
        titleMatch = strAfter.match(/title:\s*['"]([^'"]*)['"]/);
    }
    
    if (!titleMatch) return match;
    const title = titleMatch[1].toLowerCase();
    
    if (title.includes('drone') || title.includes('uas') || title.includes('uav')) {
        return 'image: "/banner-drone.png"';
    } else {
        return 'image: "/banner-aeroplane.png"';
    }
});
fs.writeFileSync('src/lib/constants.ts', code);
console.log('Done!');
