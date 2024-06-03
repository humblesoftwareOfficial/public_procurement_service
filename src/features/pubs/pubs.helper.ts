import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export const isValidPubCode = (code: string) =>
  code && code.length === 23 && code.includes('PUB-');

@ValidatorConstraint({ name: 'PubCodeValidator', async: false })
export class PubCodeValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(code: string, _args: ValidationArguments) {
    return isValidPubCode(code);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Invalid Pub code.';
  }
}
export interface IPubsListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
  isOnNewsletter?: boolean;
}
