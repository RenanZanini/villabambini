const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/"category":\s*"Boneca"/g, '"category": "Menina de 1 até 14"');
content = content.replace(/"category":\s*"Menina"/g, '"category": "Menina de 1 até 14"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Categories updated!');
