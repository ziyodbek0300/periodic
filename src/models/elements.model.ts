import { model, Schema, Document } from 'mongoose';
import { Element } from '@/interfaces/elements.interface';

const elementShema: Schema = new Schema({
  symbol: {
    type: String,
  },
  name: {
    type: String,
  },
  atomicNumber: {
    type: String,
  },
  group: {
    type: Number,
  },
  period: {
    type: Number,
  },
  category: {
    type: String,
  },
  discovBy: {
    type: String,
  },
  discovYear: {
    type: String,
  },
  discovByFullName: String,
  discovCountry: {
    name: String,
    code: String,
  },
  flag: String,
  atomicProp: {
    type: String,
    ref: 'AtomicProps',
  },
  elementProp: {
    type: String,
    ref: 'ElementProps',
  },
  reactivity: {
    type: String,
    ref: 'Reactivities',
  },
  electromagneticProp: {
    type: String,
    ref: 'ElectromagneticProps',
  },
});

export default model<Element & Document>('Elements', elementShema);
