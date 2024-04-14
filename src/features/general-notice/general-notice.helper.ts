import { stringToFullDate } from "src/utils";

export interface IGeneralNoticeFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
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