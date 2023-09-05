import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LinksService } from './links.service';
import { linksDto } from './links.dto';
import { Link } from 'src/schema/link.schema';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';


@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) { }


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/')
  getShortUrl(@Body() body: linksDto, @Req() req): Promise<Link> {
    return this.linksService.generateLink({ ...body, userId: req.user.id })
  }


  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAll(@Req() req, @Query() { page }): Promise<[Link]> {
    return this.linksService.getAll(req.user.id, page)
  }

  @Get('/:url')
  async getOne(@Param('url') url: string, @Res() res) {
    try {
      const test = await this.linksService.getOne(url)
      res.redirect(test.oldLink)
    } catch (e) {
      throw new HttpException(
        'The url didn`t find', HttpStatus.BAD_REQUEST
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(@Param('id') id: string): Promise<string> {
    return this.linksService.delete(id)
  }
}
