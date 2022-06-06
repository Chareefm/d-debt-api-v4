import { TFormatAllKeyToCustomType } from '@share/utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type HM = {
  CHN: 'HM';
  CIF: number;
  PAD1: number;
  PAD2: number
  PAD3: number;
  PAD4: number;
  ZPSDISCD: number;
  PCITY: number;
  PSTATE: number;
  PZIP: number;
  MAD1: string;
  MAD2: number;
  MAD3: number;
  MAD4: number;
  ZMSDISCD: number;
  MCITY: number;
  MSTATE: number;
  MZIP: number;
};

type SD = {
  CHN: 'SD';
  CIF: number;
  PAD1: number;
  PAD2: number
  PAD3: number;
  PAD4: number;
  ZPSDISCD: number;
  PCITY: number;
  PSTATE: number;
  PZIP: number;
  MAD1: string;
  MAD2: number;
  MAD3: number;
  MAD4: number;
  ZMSDISCD: number;
  MCITY: number;
  MSTATE: number;
  MZIP: number;
};

type NW = {
    CHN: 'NW';
    CIF: number;
    PAD1: number;
    PAD2: number
    PAD3: number;
    PAD4: number;
    ZPSDISCD: number;
    PCITY: number;
    PSTATE: number;
    PZIP: number;
    MAD1: string;
    MAD2: number;
    MAD3: number;
    MAD4: number;
    ZMSDISCD: number;
    MCITY: number;
    MSTATE: number;
    MZIP: number;
};

export type TCus_Address = HM | SD | NW;
export type TCus_AddressRaw =
  | TRawCsvData<HM, 'CHN'>
  | TRawCsvData<SD, 'CHN'>
  | TRawCsvData<NW, 'CHN'>;

export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
export type FOO =
  | BAR<HM, 'CHN' | 'CIF'>
  | BAR<SD, 'CHN' | 'CIF'>
  | BAR<NW, 'CHN' | 'CIF'>;
