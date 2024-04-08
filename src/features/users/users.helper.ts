import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export const isValidUserCode = (code: string) =>
  code && code.length === 23 && code.includes('USR-');

@ValidatorConstraint({ name: 'UserCodeValidator', async: false })
export class UserCodeValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(code: string, _args: ValidationArguments) {
    return isValidUserCode(code);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Invalid  user code.';
  }
}
