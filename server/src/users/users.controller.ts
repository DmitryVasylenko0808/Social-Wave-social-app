import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards, Request, HttpStatus, ParseFilePipeBuilder, UploadedFile, UseInterceptors, Get, Query, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto } from './dto/edit.user.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { avatarsStorage, coversStorage } from 'src/multer.config';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: 'avatar', maxCount: 1},
            {name: 'coverImage', maxCount: 1}
        ], { storage: avatarsStorage })
    )
    async edit(
        @Param("id") id: string, 
        @Body() editUserDto: EditUserDto,
        @UploadedFiles() files: { avatar: Express.Multer.File[], coverImage: Express.Multer.File[] }
    ) {
        console.log(files);
        return await this.usersService.edit(id, editUserDto, files);
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/follow")
    async follow(@Param("id") id: string, @Request() req: any) {
        await this.usersService.follow(id, req.user.userId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/unfollow")
    async unfollow(@Param("id") id: string, @Request() req: any) {
        await this.usersService.unfollow(id, req.user.userId);
    }

    @Get(":id/followers")
    async getFollowers(@Param("id") id: string, @Query("page", ParseIntPipe) page: number) {
        return await this.usersService.getFollowers(id, page);
    }

    @Get(":id/followings")
    async getFollowings(@Param("id") id: string, @Query("page", ParseIntPipe) page: number) {
        return await this.usersService.getFollowings(id, page);
    }
}
