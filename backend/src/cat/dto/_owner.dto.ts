import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class OwnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  readonly ownerId: string;
}
