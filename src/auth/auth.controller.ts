import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseErrorMessage, ApiResponseMessage, ApiResponseStatusCode } from 'src/shared/enum/response.enum';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './Guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    try {
      const create = await this.authService.signUp(signupDto);
      return {
        statusCode: ApiResponseStatusCode.Success,
        statusMessage: ApiResponseMessage.signup,
        errorMessage: null,
        data: create,
      };
    } catch (error) {
      if (error.code === 400) {
        return {
          statusCode: ApiResponseStatusCode.BadRequest,
          statusMessage: ApiResponseErrorMessage.BadRequest,
          errorMessage: error.message,
          data: null,
        };
      }
      return {
        statusCode: ApiResponseStatusCode.InternalServerError,
        statusMessage: ApiResponseMessage.InternalServerError,
        errorMessage: "An unexpected error occurred",
        data: null,
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const login = await this.authService.login(loginDto);
      return {
        statusCode: ApiResponseStatusCode.Success,
        statusMessage: ApiResponseMessage.login,
        errorMessage: null,
        data: login,
      };
    } catch (error) {
      if (error.code === 400) {
        return {
          statusCode: ApiResponseStatusCode.BadRequest,
          statusMessage: ApiResponseErrorMessage.BadRequest,
          errorMessage: error.message,
          data: null,
        };
      }
      return {
        statusCode: ApiResponseStatusCode.InternalServerError,
        statusMessage: ApiResponseMessage.InternalServerError,
        errorMessage: "An unexpected error occurred.",
        data: null,
      }
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
