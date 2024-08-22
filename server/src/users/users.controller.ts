import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    async edit(@Param("id", ParseIntPipe) id: number, @Body() editUserDto: unknown) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/follow")
    async follow(@Param("id", ParseIntPipe) id: number, @Request() req: any) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/unfollow")
    async unfollow(@Param("id", ParseIntPipe) id: number, @Request() req: any) {}
}
