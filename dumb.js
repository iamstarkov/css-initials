var mdn = require('css-tree/data/mdn-data-properties.json');
var R = require('ramda');

const prepare = R.pipe(
  R.toPairs,
  R.map(R.zipObj(['prop', 'val']))
)

const isInheritable = R.pathEq(['val', 'inherited'], true);

// R.map(R.prop('prop'), inherited)


const fn = R.pipe(
  prepare,
  R.filter(isInheritable)
  // R.map(R.prop)
)

const res = fn(mdn);

console.log(res);
