import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class DoesAuthorExistsConstraint implements ValidatorConstraintInterface {

  public async validate(authorId: string, args: ValidationArguments): Promise<boolean> {
    const authorRepository = getRepository('Author');
    const author = await authorRepository.findOne({ id: authorId });
    if (!author) {
      return false;
    }
    return true;
  }

}

export function DoesAuthorExists(validationOptions?: ValidationOptions): any {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      async: true,
      validator: DoesAuthorExistsConstraint,
    });
  };

}
