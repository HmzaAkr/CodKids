import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'The password for the user. Minimum 6 characters required.',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The mobile number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobileNumber?: string;
}
