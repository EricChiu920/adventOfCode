import { parseLines, Character } from "./helper";

const getPolicy = (input: string): [number, number, Character, string] | null => {
  const strings = input.split(' ');

  if (strings.length != 3) { return null }

  const nums = strings[0].split('-').map(Number);
  const character = strings[1].split(':')[0];
  const password = strings[2];

  if (nums.length !== 2 || character.length !== 1) { return null }

  return [...nums as [number, number], character as Character, password];
};

const isValidPasswordOld = (min: number, max: number, character: Character, password: string): boolean => {
  let characterCount = 0;

  for (let i = 0; i < password.length; i += 1) {
    if (password[i] === character) {
      characterCount += 1;
    }
  }

  return characterCount >= min && characterCount <= max;
};

const isValidPassword = (pos1: number, pos2: number, character: Character, password: string): boolean => {
  const isInPos1 = password[pos1 - 1] === character;
  const isInPos2 = password[pos2 - 1] === character;

  return isInPos1 !== isInPos2 // equivalent to isInPos1 xor isInPos2
}

const countValidPasswords = (passwords: string[]): number => {
  let count = 0;

  for (let password of passwords) {
    let policy = getPolicy(password);

    if (policy !== null && isValidPassword(...policy)) {
      count += 1;
    }
  }

  return count;
}

const main = async () => {
  const passwords = await parseLines('02');
  return countValidPasswords(passwords);
}

main().then(res => console.log(res));
