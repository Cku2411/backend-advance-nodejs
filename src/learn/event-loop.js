const fs = require("fs");
const crypto = require("crypto");

console.log("1. Script start");

setTimeout(() => {
  console.log("2. setTimeout 0s callback");
});

setTimeout(() => {
  console.log("3. setTimeout 0s callback");
});

setImmediate(() => {
  console.log("4. setImmediate 0s callback");
});

Promise.resolve().then(() => {
  console.log(`5.Promised resolved`);
});

process.nextTick(() => {
  console.log(`6.process.nextTick callback`);
});

fs.readFile(__filename, () => {
  console.log(`7.file opreation (I/O callback)`);
});

crypto.pbkdf2("secret", "salt", 1000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log(`8, pbkdf2 operation completed (CPU instensive tasks)`);
});

console.log(`9. script ends`);
