import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'ACC';
  CID: number;
  CIF: number;
  AD1: string;
  AD2: string;
  AD3: string;
  AD4: string;
  ZSDISTCD: string;
  CITY: string;
  STATE: string;
  MZIP: string;
};

export type TDebt_Address = LN;
export type TDebt_AddressRaw = TRawCsvData<LN, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO = BAR<LN, 'CHN' | 'CID' | 'CIF'>;
