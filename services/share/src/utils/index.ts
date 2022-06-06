import { parseObject } from '@midas-soft/midas-input-parser';
// import { VariablesType } from '@share/enums/VariablesType.enum';
import GsiteError from '@share/errors';
import BigNumber from 'bignumber.js';
import CryptoJS from 'crypto-js';
import { Request } from 'express';

const generateSalt = () => CryptoJS.lib.WordArray.random(128 / 8).toString();

const sha256Encrypt = (password: string, salt: string, iteration: number) => {
  let saltedPassword = salt + password;
  for (let i = 0; i < iteration - 1; i++) {
    saltedPassword = CryptoJS.SHA256(saltedPassword).toString(
      CryptoJS.enc.Base64,
    );
  }
  saltedPassword = CryptoJS.SHA256(saltedPassword).toString(
    CryptoJS.enc.Base64,
  );
  return saltedPassword;
};

const generateHash = (raw: string, unique: number | string) =>
  CryptoJS.MD5(`${raw}${unique}`).toString();

const createReadableId = (len: number) => {
  const result = [];
  const list = 'abcdefhknprstxyz23456789';
  for (let i = 0; i < len; i += 1) {
    result.push(list.charAt(Math.floor(Math.random() * list.length)));
  }
  return result.join('');
};

const getIPFromRequest = (req: Request): string | undefined => {
  const xIp = req.headers['x-forwarded-for'];
  if (xIp) {
    if (typeof xIp === 'string') return xIp.trim();
    return xIp.map((x: string) => x.trim()).join(',');
  }
  return req.connection.remoteAddress?.trim();
};

const generateOtp = (length: number) => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const randStrReadable = (len: number) => {
  const result = [];
  const list = 'abcdefhknprstxyz';
  for (let i = 0; i < len; i += 1) {
    result.push(list.charAt(Math.floor(Math.random() * list.length)));
  }
  return result.join('');
};

export const randDigitReadable = (len: number) => {
  const result = [];
  const list = '23456789';
  for (let i = 0; i < len; i += 1) {
    result.push(list.charAt(Math.floor(Math.random() * list.length)));
  }
  return result.join('');
};

const generateRefCode = (id: string | number) => {
  const digits = id.toString().split('');
  const checkDigit = digits.reduce((a, b) => Number(a) + Number(b), 0) % 10;
  return { result: `${id}-${checkDigit}`, id, checkDigit };
};

const checkRefCode = (code: string) => {
  const [number, checkDigit] = code.split('-');
  const check = generateRefCode(number);
  if (check.checkDigit === Number(checkDigit)) return true;
  return false;
};

// const formatType = (type: VariablesType, value: string) => {
//   try {
//     switch (type) {
//       case VariablesType.BIG_NUMBER:
//         parseObject(
//           { value },
//           { fields: { value: { type: 'bignumberAsString' } } },
//         );
//         return new BigNumber(value);
//       case VariablesType.BOOLEAN:
//         parseObject(
//           { value },
//           { fields: { value: { type: 'booleanAsString' } } },
//         );
//         return value === 'true';
//       case VariablesType.NUMBER:
//         parseObject(
//           { value },
//           { fields: { value: { type: 'numberAsString' } } },
//         );
//         return Number(value);
//       case VariablesType.DATE:
//         parseObject({ value }, { fields: { value: { type: 'isodate' } } });
//         return new Date(value);
//       default:
//         parseObject({ value }, { fields: { value: { type: 'string' } } });
//         return value;
//     }
//   } catch (e) {
//     throw new GsiteError('BAD_INPUT_PARAMETER', { msg: e.message });
//   }
// };
export default {
  generateSalt,
  sha256Encrypt,
  generateHash,
  createReadableId,
  getIPFromRequest,
  generateOtp,
  randStrReadable,
  randDigitReadable,
  generateRefCode,
  checkRefCode,
  // formatType,
};
