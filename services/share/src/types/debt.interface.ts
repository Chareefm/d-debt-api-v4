import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CID: number;
  CARDNO: number;
  CIF: number;
  SUBT: string;
  SUBT_DESC: string;
  ZMKTCD: string;
  ZMKTCD_DESC: string;
  DTNT: bigint;
  MDT: bigint;
  CRLMT: number;
  PMT: number;
  SCHNUM: number;
  ONP: number;
  LPDT: bigint;
  CURRENTBALANCE: number;
  GTDUE: number;
  CNTCR: number;
  DIST1FRE: string;
  INDEX: string;
  PCTO: number;
  IRN: number;
  DLCAF: string;
  BAL: number;
  ACR: number;
  LCHG: number;
  PONPT: number;
  POIF: number;
  POVALD: bigint;
  ZFWOS: string;
  PROVCAT: number;
  ZFWOD: bigint;
  ZSUBAC: string;
  ZMASTER: number;
  STAT: number;
  STAT_DESC: string;
  ZDELPERM: string;
  ZOBFP: string;
  ZOBFI: string;
  OSEQDT: string;
  BOO: number;
  BOO_DESC: string; 
};

type OD = {
  CHN: 'OD';
  CID: number;
  CIF: number;
  IRN: number;
  TLD: bigint;
  ZSTATCD: number;
  ZSTATCD_DESC: string;
  ZCLTOT: number;
  ZINTDEL: number;
  ZDELPRIN: number;
  ZDELPRD: number;
  ZEXPDT: bigint;
  NEGACR: number;
  NEGACRUN: number;
  DARCLS: number;
  DARCOVR: number;
  ZFWOF: string;
  ZFWOD: bigint;
  BAL: number;
  ACR: number;
  PROVCAT: number;
};

export type TDebt = LN | OD;
export type TDebtRaw = TRawCsvData<LN, 'CHN'> | TRawCsvData<OD, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO =
  | BAR<LN, 'CHN' | 'CID' | 'CIF'>
  | BAR<OD, 'CHN' | 'CID' | 'CIF'>;
