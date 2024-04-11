import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { GeneralNoticeService } from "./general-notice.service";
import { GeneralNoticeController } from "./general-notice.controller";

@Module({
    controllers: [GeneralNoticeController],
    providers: [GeneralNoticeService],
    imports: [DataServicesModule]
})

export class GeneralNoticeModule {}