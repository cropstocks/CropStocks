async function run() {
  const res = await fetch('https://dummyimage.com/150x150/000/fff');
  const buffer = await res.arrayBuffer();
  const b64 = Buffer.from(buffer).toString('base64');
  console.log("Length of b64:", b64.length);
  console.log("Starts with:", b64.substring(0, 50));
}
run();
