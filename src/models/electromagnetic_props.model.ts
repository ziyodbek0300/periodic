import { model, Schema, Document } from 'mongoose';
import { ElectromagneticProps } from '@interfaces/electromagneticProps.interface';

const electromagneticPropsSchema: Schema = new Schema({
  specificElectricalConductivity: {
    type: String,
    required: true,
  },
  electricType: String,
  magneticType: String,
  volumeMagneticSusceptibility: String,
  specificMagneticSusceptibility: String,
  molarMagneticSusceptibility: String,
  resistivity: String,
  superconductivityTemperature: String,
});

export default model<ElectromagneticProps & Document>('Electromagnetic_Props', electromagneticPropsSchema);
