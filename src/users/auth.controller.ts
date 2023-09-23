import { Body, Query, Controller, Param, Patch, Post, Req, UseGuards, Get, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { Request } from 'express';
import { LogInDto } from './dto/login.dto';
import { UsersGuard } from './guards/users.guard';
import { PageOptionsDto } from '@app/libs/pagination/pageOption.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('Authentication')
export class AuthController {



  constructor(private readonly authService: AuthService) { }

  @UsePipes(ValidationPipe)
  @Post("signup")
  @ApiOperation({ summary: 'Signup user' })
  @ApiBody({ type: CreateUserDto })

  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUP(createUserDto);
  }


  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post("login")
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LogInDto })  // set default body 
  login(@Body() loginInDto: LogInDto) {
    return this.authService.login(loginInDto);
  }

  @UseGuards(UsersGuard)
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @Post("whoami")
  @ApiBearerAuth()  // apply auth token and inject into header in swagger 
  @ApiResponse({ status: 200, description: 'whoami successfully' })

  whoAmI(@Req() req: Request & { user: string }) {
    return this.authService.WhoAmI(req);
  }




}
