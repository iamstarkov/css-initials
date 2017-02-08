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
]);

const res = fn(mdn);;

console.log(res);
