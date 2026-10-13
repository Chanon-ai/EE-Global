const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
(async () => {
  for (const name of fs.readdirSync('Data/Global')) {
    const result = await pdf(fs.readFileSync(path.join('Data/Global', name)));
    fs.writeFileSync(path.join('tools', name + '.txt'), result.text);
    console.log(name, result.numpages, result.text.length);
  }
})();
