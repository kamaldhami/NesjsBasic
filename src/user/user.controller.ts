import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.userService.signup(signUpDto);
  }

  @Post('login')
  async signin(@Body() signUpDto: SignUpDto) {
    return await this.userService.signin(signUpDto);
  }
}
