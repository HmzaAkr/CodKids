import { PartialType } from '@nestjs/swagger';
import { CreateSignupChildDto } from './create-signup-child.dto';

export class UpdateSignupChildDto extends PartialType(CreateSignupChildDto) {}
