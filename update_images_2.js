const fs = require('fs');
let code = fs.readFileSync('src/lib/constants.ts', 'utf8');

// The objects are defined like { id: ..., title: "...", ... image: "..." }
// So we can parse the whole COURSES array using a simpler approach or regex.
const regex = /title:\s*"(.*?)",[\s\S]*?image:\s*"(.*?)",/g;
code = code.replace(regex, (match, title, img) => {
    let newImg = img;
    if (title.toLowerCase().includes('drone') || title.toLowerCase().includes('uas') || title.toLowerCase().includes('uav')) {
        newImg = '/banner-drone.png';
    } else {
        newImg = '/banner-aeroplane.png';
    }
    return match.replace(`image: "${img}"`, `image: "${newImg}"`);
});

fs.writeFileSync('src/lib/constants.ts', code);
console.log('Done!');
