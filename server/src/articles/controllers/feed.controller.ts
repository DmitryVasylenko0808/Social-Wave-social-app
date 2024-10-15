import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(@Query('page', ParseIntPipe) page: number) {
    return await this.feedService.getFeed(page);
  }

  @Get(':userId')
  async getFeedByUserId(
    @Param('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.feedService.getFeedByUserId(userId, page);
  }

  @Get(':userId/following')
  async getFollowingFeedByUserId(
    @Param('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.feedService.getFollowingFeedByUserId(userId, page);
  }
}
