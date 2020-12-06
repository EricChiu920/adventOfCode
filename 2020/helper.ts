const fs = require('fs').promises;
const path = require('path');

const getGroupsSeparatedByEmptyLines = (lines: string[]) => {
  const groups: string[][] = [];
  let group = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line === '') {
      groups.push(group);
      group = [];
    } else {
      group.push(line);
    }
  }

  groups.push(group);
  return groups;
};

export const parseLines = async (fileName: string): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, fileName), { encoding: 'utf-8' });
  return data.split('\n');
};

export const parseGroupsSeparatedByEmptyLines = async (fileName: string): Promise<string[][]> => {
  const lines = await parseLines(fileName);
  return getGroupsSeparatedByEmptyLines(lines);
};

export type Character = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' |'m' | 'n' | 'o' | 'p' | 'q' | 'r' |'s' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
