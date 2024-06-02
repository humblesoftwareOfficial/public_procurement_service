import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { PubsService } from "./pubs.service";
import { PubsController } from "./pubs.controller";


@Module({
    controllers: [PubsController],
    providers: [PubsService],
    imports: [DataServicesModule]
})

export class PubsModule {}