import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";


@Module({
    controllers: [EventsController],
    providers: [EventsService],
    imports: [DataServicesModule]
})

export class EventsModule {}