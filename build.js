const { join } = require('path');
const fs = require('fs');
var R = require('ramda');

var mdn = require('mdn-data');

const EXCLUDE_LIST = [
  'all',
  'unicode-bidi',
  'direction',
];

const APPEARANCE_FIX = {
  '-webkit-appearance': 'none',
     '-moz-appearance': 'none',
      '-ms-appearance': 'none',
          'appearance': 'none',
}

const cssProps = R.path(['css', 'properties']);

// { [$prop]: valueObj, … } => [ { prop: $prop, value: valueObj }, … ]
const obj2arr = R.pipe(...[
  R.toPairs,
  R.map(R.zipObj(['prop', 'val'])),
]);


// Remove unneccesaery props
// [ { prop: $prop, value: valueObj }, … ] => [ { prop: $prop, value: initialValue }, … ]

const mapVal = fn => R.map(
  R.over(
    R.lensProp('val'),
    fn
  )
);

const initial = R.prop('initial');
const normalize = R.replace(/<\/?code>/g, '')

// [ { prop: $prop, value: initialValue }, … ] => { [$prop]: initialValue, … }
const arr2ObjReducer = (acc, i) => R.merge(
  acc,
  R.pipe(...[
    R.values,
    R.map(R.of),
    R.apply(R.zipObj),
  ])(i)
);

const arr2Obj = R.reduce( arr2ObjReducer, {} );


const fn = R.pipe(...[
  cssProps,
  obj2arr,
  R.reject(R.either(...[
    // rejecting by prop name
    R.propSatisfies(R.anyPass([
      // `all` prop ignores `unicode-bidi` and `direction` props
      R.contains(R.__, EXCLUDE_LIST)
    ]), 'prop'),
    // rejecting by prop value
    R.propSatisfies(R.anyPass([
      // we dont need experimental props
      R.propEq('status', 'experimental'),
      // we do need only non-complex props
      R.complement(R.propIs(String, 'initial')),
      // we dont need any browser dependent props
      R.propSatisfies(R.anyPass([
        R.test(/browser/i),
        R.test(/useragent/i),
      ]), 'initial'),
    ]), 'val'),
  ])),
  mapVal(R.pipe(...[
    initial,
    normalize,
  ])),
  arr2Obj,
  R.merge(R.__, APPEARANCE_FIX),
]);

const css = R.pipe(...[
  obj2arr,
  R.map(R.pipe(...[
    R.values,
    R.join(': '),
    _ => `  ${_};`
  ])),
  R.join('\n'),
  R.tap(console.log),
]);


const res = fn(mdn);

const jsonResult = `module.exports = ${JSON.stringify(res, null, 2)};`;


const cssResult = `.allinitial {
  ${css(res)}
}`;

fs.writeFile(join(__dirname, 'index.css'), cssResult, 'utf8', (err, res) => {
  if (err) throw err;
  console.log('☯ done');
})

fs.writeFile(join(__dirname, 'index.js'), jsonResult, 'utf8', (err, res) => {
  if (err) throw err;
  console.log('☯ done');
})
