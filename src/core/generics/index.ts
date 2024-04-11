import { IEventListFilter } from "src/features/events/events.helper";
import { IGeneralNoticeFilter } from "src/features/general-notice/general-notice.helper";
import { IProcurementPlanListFilter } from "src/features/procurement-plan/procurement-plan.helper";
import { IProvisionalNoticeAwardFilter } from "src/features/provisional-notice-award/provisional-notice-award.helper";

export abstract class IGenericRepository<T> {
  abstract findAll(filterAttributes: string): Promise<T[]>;

  abstract findOne(code: string, filterAttributes: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(code: string, update: any): Promise<T>;

  abstract updateWithFilterObject(filter: any, update: any): Promise<T>;

  // abstract findAllByCodes(
  //   codes: string[],
  //   filterAttributes: string,
  // ): Promise<T[]>;
}

export abstract class IUserRepository<T> {
  abstract findByEmail(email: string): Promise<any>;
}

export abstract class IEventRepository<T> {
  abstract list(filter: IEventListFilter): Promise<any[]>;
}

export abstract class IProcurementPlanRepository<T> {
  abstract list(filter: IProcurementPlanListFilter): Promise<any[]>;
}

export abstract class IProvisionalNoticeAwardRepository<T> {
  abstract list(filter: IProvisionalNoticeAwardFilter): Promise<any[]>;
}

export abstract class IGeneralNoticeRepository<T> {
  abstract list(filter: IGeneralNoticeFilter): Promise<any[]>;
}