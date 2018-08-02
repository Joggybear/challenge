import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection } from 'typeorm';
import { InjectConnection } from 'typeorm-typedi-extensions';

@ValidatorConstraint({ async: true })
export class DoesAuthorExistsConstraint implements ValidatorConstraintInterface {

  @InjectConnection()
  private connection: Connection;

  public async validate(authorId: string, args: ValidationArguments): Promise<boolean> {
    const authorRepository = this.connection.getRepository('Author');
    const author = await authorRepository.findOne({ id: authorId });
    console.log(author);
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
