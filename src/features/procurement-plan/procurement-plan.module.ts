import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/core/abstracts/abstract.data-services.module";
import { ProcurementPlanService } from "./procurement-plan.service";
import { ProcurementPlanController } from "./procurement-plan.controller";

@Module({
    controllers: [ProcurementPlanController],
    providers: [ProcurementPlanService],
    imports: [DataServicesModule]
})

export class ProcurementPlanModule {}