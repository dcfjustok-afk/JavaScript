const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
const MOD = 1e9 + 7;
void (async function () {
  const [n, m, k] = (await readline()).split(/\s+/).map(Number);

  const colFlip = new Map();
  const rowFlip = new Map();

  for (let i = 0; i < k; i++) {
    const [x, y] = (await readline()).split(/\s+/).map(Number);
    if (x === 1) {
      colFlip.set(y, (colFlip.get(y) || 0) + 1);
    } else {
      rowFlip.set(y, (rowFlip.get(y) || 0) + 1);
    }
  }
  let result = 0;
  for (let loop = 0; loop < 2; loop++) {
    for (let i = 1; i <= n; i++) {
      const r = rowFlip.get(i) || 0;
      for (let j = 1; j <= m; j++) {
        const c = colFlip.get(j) || 0;
        const bit = (c + r) % 2;
        result = (result * 2 + bit) % MOD;
      }
    }
  }
  console.log(result);
})();
