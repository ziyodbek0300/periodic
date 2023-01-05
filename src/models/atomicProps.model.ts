import { model, Schema, Document } from 'mongoose';
import { AtomicProp } from '@/interfaces/atomicProps.interface';

const atomicPropShema: Schema = new Schema({
  electrConfig: {
    type: String,
    required: true,
  },
  oxidationStates: {
    a: [Boolean],
    b: [Boolean],
  },
  vanDerWaalsRadius: String,
  atomRadius: String,
  covalentRadius: String,
  ionCharge: String,
  ionizationPotentialAtom: String,
});

export default model<AtomicProp & Document>('AtomicProps', atomicPropShema);
