import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export const readFile = (filePath, fileName) => {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), filePath, fileName)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const writeFile = (filePath, fileName, data) => {
  try {
    return writeFileSync(join(process.cwd(), filePath, fileName), JSON.stringify(data, null, 4));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
