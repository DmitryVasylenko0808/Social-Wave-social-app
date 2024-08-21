import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("sign-in") 
    async signIn(@Request() req: any) {
        return await this.authService.signIn(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getMe(@Request() req: any) {
        return { userId: req.user.userId };
    }
}
