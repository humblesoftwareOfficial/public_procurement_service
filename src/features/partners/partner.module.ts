import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { PartnerService } from "./partner.service";
import { PartnerController } from "./partner.controller";


@Module({
    controllers: [PartnerController],
    providers: [PartnerService],
    imports: [DataServicesModule]
})

export class PartnerModule {}