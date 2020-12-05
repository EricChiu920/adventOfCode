import { parseLines } from './helper';

// refactor to return array of objects instead?
const getPassports = (passportBatch: string[]): string[] => {
  const passports: string[] = [];
  let currentPassport = '';

  for (let i = 0; i < passportBatch.length; i += 1) {
    const line = passportBatch[i];

    if (line === '') {
      passports.push(currentPassport.trim());
      currentPassport = '';
    }

    currentPassport += ` ${line}`;
  }
  passports.push(currentPassport.trim());

  return passports;
};

const isValidField = (key: string, value: string) => {
  switch (key) {
    case 'byr': {
      return Number(value) >= 1920 && Number(value) <= 2002;
    }
    case 'iyr': {
      return Number(value) >= 2010 && Number(value) <= 2020;
    }
    case 'eyr': {
      return Number(value) >= 2020 && Number(value) <= 2030;
    }
    case 'hgt': {
      const measurement = value.slice(-2);
      const height = value.slice(0, -2);
      if (measurement === 'cm') {
        return Number(height) >= 150 && Number(height) <= 193;
      }
      if (measurement === 'in') {
        return Number(height) >= 59 && Number(height) <= 76;
      }

      return false;
    }
    case 'hcl': {
      return /#([0-9]|[a-f]){6}/.test(value);
    }
    case 'ecl': {
      const colors = [
        'amb',
        'blu',
        'brn',
        'gry',
        'grn',
        'hzl',
        'oth',
      ];

      return colors.includes(value);
    }
    case 'pid': {
      return /^[\d]{9}$/.test(value);
    }
    default: {
      return false;
    }
  }
};

const isValidPassport = (passport: string) => {
  type PassportFieldType = {
    [key: string]: boolean
  }

  const passportFields: PassportFieldType = {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
  };

  const fields = passport.split(' ');

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i].split(':');

    const key = field[0];
    const value = field[1];

    if (key in passportFields && isValidField(key, value)) {
      passportFields[key] = true;
    }
  }

  return Object.values(passportFields).every((value) => value === true);
};

const main = async () => {
  const passportBatch = await parseLines('04');
  const passports = getPassports(passportBatch);

  console.log(passports.map(isValidPassport).reduce((acc, curr) => (curr === true ? acc + 1 : acc), 0));
};

main();
