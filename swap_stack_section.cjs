const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Add import
if (!home.includes("import StickyStackSection")) {
  home = home.replace("import SignatureWall from '../sections/SignatureWall';", "import SignatureWall from '../sections/SignatureWall';\nimport StickyStackSection from '../sections/StickyStackSection';");
}

// Replace the stackSection
// We use a regex that captures everything from {/* Stack Section */} to </section> right before <SignatureWall />
const stackSectionRegex = /\{\/\*\s*Stack Section\s*\*\/\}\s*<section className=\{styles\.stackSection\}>[\s\S]*?<\/section>/;

home = home.replace(stackSectionRegex, '{/* Stack Section */}\n      <StickyStackSection />');

fs.writeFileSync('src/pages/Home.jsx', home);
console.log("Successfully replaced stackSection with StickyStackSection in Home.jsx");
