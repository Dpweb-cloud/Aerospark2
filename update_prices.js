const fs = require('fs');
const path = 'd:/asutosh/newwebsite/src/lib/constants.ts';
let content = fs.readFileSync(path, 'utf8');

const updates = [
    { id: 'faa-drone-regulations', price: 1499 },
    { id: 'easa-drone-regulations', price: 1499 },
    { id: 'aerospace-fundamentals', price: 3499 },
    { id: 'aerodynamics', price: 3999 },
    { id: 'drone-components', price: 3999 },
    { id: 'matlab-programming', price: 4499 },
    { id: 'catia-design', price: 5499 },
    { id: 'nx-cad-design', price: 5499 },
    { id: 'mathematics-fea-cfd', price: 2999 },
    { id: 'fea-analysis', price: 5499 },
    { id: 'cfd-analysis', price: 6499 },
];

updates.forEach(u => {
    const regex = new RegExp(`(id:\\s*"${u.id}"[\\s\\S]*?price:\\s*)\\d+`);
    content = content.replace(regex, `$1${u.price}`);
});

fs.writeFileSync(path, content);
console.log('Prices updated');
