import { IsString, IsNumber, MaxLength, MinLength, Max, Min, IsIn, IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class CreateElementDto {
  @IsString()
  @MaxLength(6)
  @MinLength(1)
  public symbol: string;

  @IsString()
  @MinLength(3)
  public name: string;

  @IsString()
  @MinLength(1)
  public atomicNumber: string;

  @IsNumber()
  @IsNumber()
  @Max(18)
  @Min(1)
  public group: number;

  @IsNumber()
  @Max(11)
  @Min(1)
  public period: number;

  @IsString()
  // @IsIn([
  //   'Ishqoriy tuproq metallari',
  //   'Boshqa nometallar',
  //   'Ishqoriy metallar',
  //   'Galogenlar',
  //   "O'tish metallari",
  //   'Nodir gazlar',
  //   "O'tishdan keyingi metall",
  //   'Lantanoidlar',
  //   'Metalloidlar',
  //   'Aktinoidlar',
  //   'Superaktinoidlar',
  // ])
  public category: string;

  @IsString()
  discovBy: string;

  @IsString()
  discovByFullName: string;

  @IsString()
  discovYear: string;

  @IsString()
  discovCountry: string;

  @IsString()
  @IsMongoId()
  atomicProp: string;

  @IsOptional()
  @IsString()
  image: string;
}
