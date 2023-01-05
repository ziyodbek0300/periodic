import { IsString } from 'class-validator';

export class CreateElectromagneticPropDto {
  @IsString()
  public specificElectricalConductivity: string;

  @IsString()
  public electricType: string;

  @IsString()
  public magneticType: string;

  @IsString()
  public volumeMagneticSusceptibility: string;

  @IsString()
  public specificMagneticSusceptibility: string;

  @IsString()
  public molarMagneticSusceptibility: string;

  @IsString()
  public resistivity: string;

  @IsString()
  public superconductivityTemperature: string;
}
