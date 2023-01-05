import { model, Schema, Document } from 'mongoose';
import { ElementProp } from '@/interfaces/elementProps.interface';

const elementPropShema: Schema = new Schema({
  atomicNumber: {
    type: Number,
    required: true,
  },
  atomicMass: {
    type: Number,
    require: true,
  },
  electrons: String,
  protons: String,
  neutrons: String,
  density: String,
  boilingTemperature: String,
  meltingTemperature: String,
  valence: String,
  period: String,
  group: String,
  blok: String,
});

export default model<ElementProp & Document>('ElementProps', elementPropShema);
