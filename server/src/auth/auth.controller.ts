import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/multer.config';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    @UseInterceptors(FileInterceptor("avatar", { storage: avatarsStorage }))
    async signUp(
        @Body() signUpDto: SignUpDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) file?: Express.Multer.File
    ) {
        return await this.authService.signUp(signUpDto, file?.filename);
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
