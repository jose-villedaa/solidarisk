const fs = require('fs');
const indexFilePath = '../dist/assets/index-a16d5604.js';
let contents = fs.readFileSync(indexFilePath, 'utf8');
contents = contents.replace(/return o.on(sl.Draw.Event.CREATED, i),/g, 'o.on(draw:created, i)');
fs.writeFileSync(indexFilePath, contents);