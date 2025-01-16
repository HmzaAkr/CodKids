import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user. Either email or mobileNumber is required.',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The mobile number of the user. Either email or mobileNumber is required.',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
