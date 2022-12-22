import { PartialType } from '@nestjs/mapped-types';

import { AddCatDto } from './add-cat.dto';

export class UpdateCatDto extends PartialType(AddCatDto) {}
