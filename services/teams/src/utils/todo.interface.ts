export interface  ITodo  {
  chn: string;
  name: string,
  description: string,
  user: string,
  oalist:IOaList[]
};

interface IOaList{
  name:string
  percent:number
}


