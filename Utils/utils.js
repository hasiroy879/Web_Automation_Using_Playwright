// utils/updateUserdata.js
import { promises as fs } from 'fs';
import path from 'path';


const generateRandomId = (min, max) => {
    let randomId = Math.random() * (max-min)+min;
    return parseInt(randomId);

}

export async function updateUserdata(filePath, changes) {
  const absPath = path.resolve(filePath);
  const raw      = await fs.readFile(absPath, 'utf-8');
  const data     = JSON.parse(raw);

  // merge the new values
  Object.assign(data, changes);

  // prettify with 2-space indent 
  await fs.writeFile(absPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[userdata] → “${absPath}” updated ✅`);
}
export {generateRandomId};