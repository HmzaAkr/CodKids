import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignupChildService } from './signup-child.service';
import { CreateSignupChildDto } from './dto/create-signup-child.dto';
import { UpdateSignupChildDto } from './dto/update-signup-child.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseErrorMessage, ApiResponseMessage, ApiResponseStatusCode } from 'src/shared/enum/response.enum';

@Controller('signup-child')
@ApiTags('signup-child')
export class SignupChildController {
  constructor(private readonly signupChildService: SignupChildService) { }

  @Post()
  create(@Body() createSignupChildDto: CreateSignupChildDto) {
    return this.signupChildService.create(createSignupChildDto);
  }

  @Post('signupChild')
  async signupChild(@Body() childSignupDto: CreateSignupChildDto) {
    try {
      const create = await this.signupChildService.signupChild(childSignupDto);
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
        errorMessage: "An unexpected error occurred.",
        data: null,
      }
    }

  }

  @Get()
  async findAll() {
    try {
    const getAll =await this.signupChildService.findAll();
    return {
      statusCode: ApiResponseStatusCode.Success,
      statusMessage: ApiResponseMessage.Success,
      errorMessage: null,
      data: getAll,
    };
    } catch (error) {
      return {
        statusCode: ApiResponseStatusCode.InternalServerError,
        statusMessage: ApiResponseMessage.InternalServerError,
        errorMessage: "An unexpected error occurred.",
        data: null,
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const getOne =await this.signupChildService.findOne(id);
      return {
        statusCode: ApiResponseStatusCode.Success,
        statusMessage: ApiResponseMessage.Success,
        errorMessage: null,
        data: getOne,
      };
      } catch (error) {
        return {
          statusCode: ApiResponseStatusCode.InternalServerError,
          statusMessage: ApiResponseMessage.InternalServerError,
          errorMessage: "An unexpected error occurred.",
          data: null,
        }
      }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSignupChildDto: UpdateSignupChildDto) {
    try {
      const update =await this.signupChildService.update(id, updateSignupChildDto);
      return {
        statusCode: ApiResponseStatusCode.Success,
        statusMessage: ApiResponseMessage.Success,
        errorMessage: null,
        data: update,
      };
      } catch (error) {
        return {
          statusCode: ApiResponseStatusCode.InternalServerError,
          statusMessage: ApiResponseMessage.InternalServerError,
          errorMessage: "An unexpected error occurred.",
          data: null,
        }
      }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const remove =await this.signupChildService.remove(id);
      return {
        statusCode: ApiResponseStatusCode.Success,
        statusMessage: ApiResponseMessage.Success,
        errorMessage: null,
        data: remove,
      };
      } catch (error) {
        return {
          statusCode: ApiResponseStatusCode.InternalServerError,
          statusMessage: ApiResponseMessage.InternalServerError,
          errorMessage: "An unexpected error occurred.",
          data: null,
        }
      }
  }
}
