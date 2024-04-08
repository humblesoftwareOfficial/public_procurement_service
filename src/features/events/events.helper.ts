import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export const isValidEventCode = (code: string) =>
  code && code.length === 23 && code.includes('EVE-');

@ValidatorConstraint({ name: 'EventCodeValidator', async: false })
export class EventCodeValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(code: string, _args: ValidationArguments) {
    return isValidEventCode(code);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Invalid event code.';
  }
}


export interface IEventListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
}
