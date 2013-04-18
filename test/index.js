/*
 *	Run this script with arguments like:
 *	> node index.js plain-arg --foo --bar=baz --funny="spam=eggs" --alsofunny=spam=eggs 'plain arg 2' -abc -k=value "plain arg 3" --s="original" --s='overwrite' --s
 */

var x = (!(process.argv == {}) ? process.argv : false) || ['plain-arg', '--foo', '--bar=baz', '--funny="spam=eggs"', '--alsofunny=spam=eggs', '\'plain arg 2\'', '-abc', '-k=value', '"plain arg 3"',  '--s="original"', '--s=\'overwrite\'', '--s'];
console.log(require('../line-tools').parse(x));