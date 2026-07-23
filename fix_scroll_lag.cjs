const fs = require('fs');

// 1. Fix Home.jsx (Remove Tilt)
let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');

home = home.replace(/import Tilt from 'react-parallax-tilt';\r?\n/g, '');

home = home.replace(
  /<Tilt\s*key=\{stage\.id\}\s*tiltMaxAngleX=\{4\}\s*tiltMaxAngleY=\{4\}\s*tiltReverse=\{true\}\s*style=\{\{ display: 'block', flex: 1 \}\}\s*>/g,
  '<div key={stage.id} style={{ display: "block", flex: 1 }}>'
);
home = home.replace(/<\/Tilt>/g, '</div>');

fs.writeFileSync('src/pages/Home.jsx', home);

// 2. Fix SignatureWall.jsx (Remove layout prop)
let wall = fs.readFileSync('src/sections/SignatureWall.jsx', 'utf8');

wall = wall.replace(
  /<motion\.div\s*layout\s*key=\{note\.id\}/g,
  '<motion.div\\n                key={note.id}'
);

fs.writeFileSync('src/sections/SignatureWall.jsx', wall);
