import { PartialType } from '@nestjs/swagger';

import { AddCatDto } from './add-cat.dto';

export class UpdateCatDto extends PartialType(AddCatDto) {}
