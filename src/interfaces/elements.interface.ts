import { AtomicProp } from './atomicProps.interface';

export interface Element {
  _id: string;
  symbol: string;
  name: string;
  atomicNumber: string;
  group: number;
  period: number;
  category: string;
  discovBy: string;
  discovByFullName: string;
  discovYear: string;
  discovCountry: string;
  flag: string;
  atomicProp: string & AtomicProp;
  elementProp: string;
  reactivity: string;
}
