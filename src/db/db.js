import path from 'path';
import { cwd } from 'process';

import fs from 'fs/promises';

export default {
  load: async (table) => {
    let data = [];
    try {
      data = JSON.parse(await fs.readFile(path.join(cwd(), 'src', 'db', 'data', `${table}.json`)));
    }
    catch(e) {}

    return data;
  },
  save: async (table, data) => {
    await fs.writeFile(path.join(cwd(), 'src', 'db', 'data', `${table}.json`), JSON.stringify(data, null, '\t'));
    return true;
  }
}