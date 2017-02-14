const { join } = require('path');
const fs = require('fs');

const ff = require('./ff');
const chrome = require('./ff');

// chrome has prio over ff
const merged = Object.assign({}, ff, chrome);

const result = `module.exports = ${JSON.stringify(merged, null, 2)};`;


fs.writeFile(join(__dirname, 'index.js'), result, 'utf8', (err, res) => {
  if (err) throw err;
  console.log('☯ done');
})
