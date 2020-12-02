const fs = require('fs').promises;

export const parseLines = async (fileName: string) => {
  const data = await fs.readFile(fileName, { encoding: 'utf-8' });
  return data.split('\n');
};

export type Character = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' |'m' | 'n' | 'o' | 'p' | 'q' | 'r' |'s' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
