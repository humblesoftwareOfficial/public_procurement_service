import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { ProvisionalNoticeAwardController } from "./provisional-notice-award.controller";
import { ProvisionalNoticeAwardService } from "./provisional-notice-award.service";


@Module({
    controllers: [ProvisionalNoticeAwardController],
    providers: [ProvisionalNoticeAwardService],
    imports: [DataServicesModule]
})

export class ProvisionalNoticeAwardModule {}