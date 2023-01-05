import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/)
  @MaxLength(25)
  @MinLength(5)
  public username: string;

  @IsString()
  @MinLength(6)
  public password: string;
}
