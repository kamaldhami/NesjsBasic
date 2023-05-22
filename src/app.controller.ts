import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './middleware/roles.guard';
import { Role } from './enum/role.enum';
import { Roles } from './enum/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
}
