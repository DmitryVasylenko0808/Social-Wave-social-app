import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SubscriptionsService } from './services/subscriptions.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, SubscriptionsService],
  controllers: [UsersController],
  exports: [UsersService, SubscriptionsService],
})
export class UsersModule {}
