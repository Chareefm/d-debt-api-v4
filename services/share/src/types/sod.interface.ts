import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CID: number;
  CIF: number;
  IRN: number;
  TLD: number;
  ZFWOS: number;
  ZFWOD: number;
  ZSTATCD: number;
  ZSTATCD_DESC: string;
  BAL: number;
  ZCLTOT: number;
  ZINTDEL: number;
  ZDELPRIN: number;
  ZDLPRD: number;
  ZEXPDT: number;
  ACR: number;
  NEGACR: number;
  NEGACRUN: number;
  DARCLS: number;
  DARCOVR: number;
  PROVCAT: number;
  BOO: number;
  BOO_DESC: string;
};

export type TSod = LN;
export type TSodRaw = TRawCsvData<LN, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO = BAR<LN, 'CHN' | 'CID' | 'CIF'>;
