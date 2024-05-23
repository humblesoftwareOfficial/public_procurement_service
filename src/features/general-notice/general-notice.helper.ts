import { stringToFullDate } from 'src/utils';
import { EProcurementType } from '../procurement-plan/procurement-plan.helper';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

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
      const limit = stringToFullDate(`${value} 00:00:00`);
      limit.setDate(limit.getDate() + duration - 1);
      return limit;
    }
    return null;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const isValidGeneralNoticeCode = (code: string) =>
  code && code.length === 23 && code.includes('GNT-');

@ValidatorConstraint({ name: 'ArrayGeneralNoticesCodesValidator' })
export class ArrayGeneralNoticesCodesValidator implements ValidatorConstraintInterface {
  validate(codes: string[], _args: ValidationArguments) {
    if (!codes?.length) return false;
    let isValid = true;
    for (const code of codes) {
      if (!isValidGeneralNoticeCode(code)) isValid = false;
    }
    return isValid;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'At least one general notice code you provided is incorrect.';
  }
}
