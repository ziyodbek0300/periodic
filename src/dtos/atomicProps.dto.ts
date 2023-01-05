import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsString } from 'class-validator';

class AD {
  @IsBoolean({ each: true })
  a: boolean[];

  @IsBoolean({ each: true })
  b: boolean[];
}

export class CreateAtomicPropDto {
  @IsString()
  public electrConfig: string;

  @IsObject()
  public oxidationStates: {
    a: boolean[];
    b: boolean[];
  };

  @IsString()
  public vanDerWaalsRadius: string;

  @IsString()
  public atomRadius: string;

  @IsString()
  public covalentRadius: string;

  @IsString()
  public ionCharge: string;

  @IsString()
  public ionizationPotentialAtom: string;
}

// const a = new CreateAtomicPropDto();

// a.vanDerWaalsRadius = 'hi';
// a.atomRadius = 'ds';
// a.covalentRadius = 'sd';
// a.electrConfig = 'as';
// a.ionCharge = 'asd';
// a.ionizationPotentialAtom = 'sa';
// a.oxidationStates = { a: [true], b: [false] };
