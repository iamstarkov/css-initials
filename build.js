const { join } = require('path');
const fs = require('fs');

var mdn = require('css-tree/data/mdn-data-properties.json');
var R = require('ramda');

const fn = R.pipe(...[
  R.toPairs,

  R.map(R.zipObj(['prop', 'val'])),


  R.filter(
    R.pathEq(['val', 'inherited'], true)
  ),

  R.map(R.over(
    R.lensProp('val'),
    R.prop('initial')
  )),


  R.map(R.pipe(
    R.values,
    R.zipObj(['prop', 'initial'])
  )),


  R.map(R.over(
    R.lensProp('initial'),
    R.when(
      R.is(String),
      R.replace(/<\/?code>/g, '')
    )
  )),

  // filtering
  R.reject(R.propEq('prop', '--*')),
  R.reject(R.propSatisfies(
    R.test(/^-(ms|moz|webkit)-/gi),
    'prop'
  )),
  R.reject(R.propSatisfies(
    R.is(Array),
    'initial'
  )),

  R.reduce(
    (acc, i) => R.merge(
      acc,
      R.pipe(...[
        R.values,
        R.map(R.of),
        R.apply(R.zipObj),
      ])(i)
    ),
    {}
  ),
]);

const res = fn(mdn);

const result = `module.exports = ${JSON.stringify(res, null, 2)};`;

fs.writeFile(join(__dirname, 'initials.js'), result, 'utf8', (err, res) => {
  if (err) throw err;
  console.log('☯ done');
})
