import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CID: number;
  SEQ: number;
  ODTYP: number;
  ODTYP_DESC: string;
  STDT: number;
  EXPDT: number;
  CLAMT: number;
  ACTIVATE: number;
  RATECMP: number;
};

export type TOdt = LN;
export type TOdtRaw = TRawCsvData<LN, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO =
  | BAR<LN, 'CHN' | 'CID' >


