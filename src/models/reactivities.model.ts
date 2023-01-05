import { model, Schema, Document } from 'mongoose';
import { Reactivity } from '@/interfaces/reactivities.interface';

const reactivitySchema: Schema = new Schema({
  electronegativity: String,
  valence: String,
  affinityEnergy: String,
});

export default model<Reactivity & Document>('Reactivities', reactivitySchema);
