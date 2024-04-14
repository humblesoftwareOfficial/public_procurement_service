/* eslint-disable prettier/prettier */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { stringToDate, stringToFullDate } from '.';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
export class IsValidDate implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value === 'string') {
      const result =
        /^(0?[1-9]|[12]\d|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value) &&
        moment(value, 'DD/MM/YYYY').isValid();
      const date = stringToDate(value);
      return result && date !== null;
    }
    return false;
  }

  defaultMessage({ property }) {
    return `${property} must be a valid date (Required format: DD/MM/YYYY)`;
  }
}

@ValidatorConstraint({ name: 'IsValidFullDate', async: false })
export class IsValidFullDate implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value === 'string') {
      const result =
        /^([1-9]|([012][0-9])|(3[01]))[\/]([0]{0,1}[1-9]|1[012])[\/]\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/.test(
          value,
        );
      const date = stringToFullDate(value);
      return result && date !== null;
    }
    return false;
  }

  defaultMessage({ property }) {
    return `${property} must be a valid full date (Required format: DD/MM/YYYY HH:mm:ss)`;
  }
}
