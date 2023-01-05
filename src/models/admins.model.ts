import { model, Schema, Document } from 'mongoose';
import { Admin } from '@/interfaces/admins.interface';

const adminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default  model<Admin & Document>('Admins', adminSchema);
