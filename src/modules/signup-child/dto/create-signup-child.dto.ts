import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateSignupChildDto {
  @ApiProperty({ example: 'Alice Doe', description: 'Full name of the child' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 7, description: 'Age of the child' })
  @IsNotEmpty()
  @Min(3) // Assuming minimum age is 3 years
  age: number;

  @ApiProperty({ example: 'alice_doe', description: 'Unique username for child' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'childSecure123', description: 'Password for child account' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '64b5c21e6f1d9a001c8e6f12', description: 'Parent ID (required)' })
  @IsNotEmpty()
  parentId: string;
}
