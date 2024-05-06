import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const isValidPartnerCode = (code: string) =>
  code && code.length === 23 && code.includes('PAR-');

@ValidatorConstraint({ name: 'PartnerCodeValidator', async: false })
export class PartnerCodeValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(code: string, _args: ValidationArguments) {
    return isValidPartnerCode(code);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Invalid Partner code.';
  }
}

export interface IPartnerListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
}
