import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class OwnerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  ownerId: string;
}
