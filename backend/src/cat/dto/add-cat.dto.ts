import {
  Equals,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

import { OwnerDto } from './_owner.dto';

export class AddCatDto extends OwnerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(1)
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Equals(0 || 1)
  readonly sex: number;

  @IsDate()
  @IsNotEmpty()
  @MaxDate(new Date())
  readonly birthedAt: Date;
}
