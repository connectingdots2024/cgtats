
const parts = [process.platform, process.arch];
console.log('Parts:', parts);
const path = `lightningcss-${parts.join('-')}`;
console.log('Trying to require:', path);
try {
  const native = require(path);
  console.log('Success with package require');
} catch (e) {
  console.log('Failed package require:', e.message);
  const localPath = `./node_modules/lightningcss/lightningcss.${parts.join('-')}.node`;
  const absolutePath = require('path').resolve(localPath);
  console.log('Trying absolute path:', absolutePath);
  try {
    const native = require(absolutePath);
    console.log('Success with absolute path require');
  } catch (e2) {
    console.log('Failed absolute path require:', e2.message);
  }
}
