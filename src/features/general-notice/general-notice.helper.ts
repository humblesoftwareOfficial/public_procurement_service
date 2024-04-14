import { stringToFullDate } from "src/utils";
import { EProcurementType } from "../procurement-plan/procurement-plan.helper";

export interface IGeneralNoticeFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
  publicationStartDate?: Date;
  publicationEndDate?: Date;
  limitStartDate?: Date;
  limitEndDate?: Date;
  types?: EProcurementType[];
}

export const getLimitDateOfProcurement = (value: string, duration: number) => {
  try {
   if (duration) {
    const limit = stringToFullDate(`${value} 00:00:00`)
    limit.setDate(limit.getDate() + duration)
    return limit;
   }
   return null;
  } catch (error) {
    console.log({ error });
    return null;
  }
}