import path from 'path';
import { cwd } from 'process';

import fs from 'fs';

export default function init() {
  const dbDataDir = path.join(cwd(), 'src', 'db', 'data');
  try {
    if (!(fs.statSync(dbDataDir)).isDirectory()) {
      throw new Exception();
    };
  }
  catch(e) {
    fs.mkdirSync(dbDataDir);
  }
  

  fs.writeFileSync(path.join(dbDataDir, 'user.json'), JSON.stringify(users, null, '\t'));
}

const users = {
  "admin@gmail.com": {
    id: 0,
    name: "Ruben",
    surname: "Fileti",
    username: "R",
    password: "test",
    enabled: true,
    role: "admin",
  },
  "eve@gmail.com": {
    id: 0,
    name: "Eve",
    surname: "Bianchi",
    username: "EB",
    password: "test",
    enabled: true,
    role: "user",
  },
  "adam@gmail.com": {
    id: 0,
    name: "Adam",
    surname: "Rossi",
    username: "AR",
    password: "test",
    enabled: true,
    role: "user",
  }
}

init();