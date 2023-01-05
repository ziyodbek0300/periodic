import { IsNumber, IsString } from 'class-validator';

export class CreateElementPropDto {
  @IsNumber()
  public atomicNumber: number;

  @IsNumber()
  public atomicMass: number;

  @IsString()
  public electrons: string;

  @IsString()
  public protons: string;

  @IsString()
  public neutrons: string;

  @IsString()
  public density: string;

  @IsString()
  public boilingTemperature: string;

  @IsString()
  public meltingTemperature: string;

  @IsString()
  public valence: string;

  @IsString()
  public period: string;

  @IsString()
  public group: string;

  @IsString()
  public blok: string;
}
