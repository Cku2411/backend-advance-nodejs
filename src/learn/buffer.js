const buffOne = Buffer.alloc(10);

console.log({ buffOne });

const bufferFromArrayOfInteger = Buffer.from([1, 2, 3, 4, 5]);

buffOne.write("Node js is something cool");
console.log(buffOne, buffOne.toString());
