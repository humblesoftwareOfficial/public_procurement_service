import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../entities/users/user.entity";
import { IGenericDataServices } from "../generics/generic-data.services";
import { MongoDataServices } from "./abstract.service";
import { Event, EventSchema } from '../entities/event/event.entity';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  providers: [
    {
      provide: IGenericDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IGenericDataServices],
})
export class AbstractMongoModule {}
