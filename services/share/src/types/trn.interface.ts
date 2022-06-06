import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CID: number;
  TSEQ: number;
  ETC: string;
  TJD: number;
  TIME: string;
  TOT: number;
  ENDBAL: number;
  EFD: number;
};

export type TTrn = LN;
export type TTrnRaw = TRawCsvData<LN, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO =
  | BAR<LN, 'CHN' | 'CID' >


