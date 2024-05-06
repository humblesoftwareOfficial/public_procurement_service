import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './features/users/users.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { EventsModule } from './features/events/events.module';
import { ProcurementPlanModule } from './features/procurement-plan/procurement-plan.module';
import { ProvisionalNoticeAwardModule } from './features/provisional-notice-award/provisional-notice-award.module';
import { DataServicesModule } from './core/abstracts/abstract.data-services.module';
import { GeneralNoticeModule } from './features/general-notice/general-notice.module';
import { BusinessOpportunityModule } from './features/business-opportunity/business-opportunity.module';
import { PartnerModule } from './features/partners/partner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.${process.env.NODE_ENV}.env`],
    }),
    UsersModule,
    EventsModule,
    ProcurementPlanModule,
    ProvisionalNoticeAwardModule,
    AuthenticationModule,
    DataServicesModule,
    GeneralNoticeModule,
    BusinessOpportunityModule,
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
