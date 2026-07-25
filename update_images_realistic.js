const fs = require('fs');
let code = fs.readFileSync('src/lib/constants.ts', 'utf8');

const regex = /title:\s*"(.*?)",[\s\S]*?image:\s*"(.*?)",/g;
code = code.replace(regex, (match, title, img) => {
    let newImg = img;
    const t = title.toLowerCase();
    
    if (t.includes('dgca')) newImg = '/banner_dgca_1784991714820.png';
    else if (t.includes('faa') || t.includes('easa')) newImg = '/banner_faa_1784991724685.png';
    else if (t.includes('aerodynamics')) newImg = '/banner_aerodynamics_1784991955683.png';
    else if (t.includes('components')) newImg = '/banner_components_1784991954912.png';
    else if (t.includes('matlab') || t.includes('dji')) newImg = '/banner_matlab_1784991967948.png';
    else if (t.includes('catia')) newImg = '/banner_aero_1784991736912.png';
    else if (t.includes('siemens') || t.includes('solidworks')) newImg = '/banner_siemens_1784991985646.png';
    else if (t.includes('math')) newImg = '/banner_math_1784991995091.png';
    else if (t.includes('finite') || t.includes('computational')) newImg = '/banner_fea_1784992005177.png';
    else if (t.includes('as9100d')) newImg = '/banner_as9100d_1784992034263.png';
    else if (t.includes('pixhawk') || t.includes('ardupilot')) newImg = '/banner_pixhawk_1784992045334.png';
    else newImg = '/banner_aero_1784991736912.png'; // default fallback
    
    return match.replace(`image: "${img}"`, `image: "${newImg}"`);
});

fs.writeFileSync('src/lib/constants.ts', code);
console.log('Images updated!');
