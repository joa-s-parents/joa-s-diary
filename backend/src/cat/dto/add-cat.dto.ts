import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Equals(0 || 1)
  readonly sex: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @MaxDate(new Date())
  readonly birthedAt: Date;
}
