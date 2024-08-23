import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from './dto/create.article.dto';
import { ArticlesService } from './articles.service';
import { articlesStorage } from 'src/multer.config';
import { EditArticleDto } from './dto/edit.artcile.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    @UseInterceptors(FilesInterceptor("images", 5, { storage: articlesStorage }))
    async create(
        @Request() req: any, 
        @Body() createArticleDto: CreateArticleDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) files?: Express.Multer.File[]
    ) {
        return await this.articlesService.create(req.user.userId, createArticleDto, files);
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    @UseInterceptors(FilesInterceptor("images", 5, { storage: articlesStorage }))
    async edit(
        @Param("id") id: string,
        @Body() editArticleDto: EditArticleDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) files?: Express.Multer.File[]
    ) {
        return await this.articlesService.edit(id, editArticleDto, files);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.articlesService.delete(id);
    }
}
