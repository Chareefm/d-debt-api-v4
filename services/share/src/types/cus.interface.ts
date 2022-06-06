import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CIF: number;
  ZTITLE: string;
  FNAME: string; 
  LNM: string;
  ZCIZID: number;
  DOB: number;
  SEX: string;
  ZOCC: number;
  ZOCC_DESC: string;
  ZSOCC: number;
  ZSOCC_DESC: string;
  ZOCC2: number;
  ZOCC2_DESC: string;
  ZSOCC2: number; 
  ZSOCC2_DESC: string;
  HPH: number;
  BPH: number;
  APH: number;
};

export type TCus = LN;
export type TCusRaw = TRawCsvData<LN, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO =
  | BAR<LN, 'CHN' | 'CIF' >


