import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

interface DecoratorOption {
  name?: string;
  nullable?: boolean;
  description?: string;
  optional?: boolean;
  type?: object;
  example?: any;
  message?: string;
  transform?: boolean;
}

interface StringDecoratorOption extends DecoratorOption {
  minLength?: number;
  maxLength?: number;
}

export function Optional(optional: boolean): PropertyDecorator {
  const swaggerOption = optional
    ? applyDecorators(ApiPropertyOptional())
    : applyDecorators();

  const validatorOption = optional
    ? applyDecorators(IsOptional())
    : applyDecorators();

  return applyDecorators(swaggerOption, validatorOption);
}

export function StringProperty({
  name,
  description,
  example,
  message,
  transform,
  minLength,
  maxLength,
  nullable = false,
  optional = false,
}: StringDecoratorOption = {}): PropertyDecorator {
  const swaggerMainOption = applyDecorators(
    ApiProperty({
      name,
      nullable,
      type: String,
      description,
      example,
      minLength,
      maxLength,
    }),
  );

  const validatorMainOption = applyDecorators(
    IsString({
      message,
    }),
    ...(minLength !== undefined ? [MinLength(minLength)] : []),
    ...(maxLength !== undefined ? [MaxLength(maxLength)] : []),
    ...(minLength !== undefined && maxLength !== undefined
      ? [Length(minLength, maxLength)]
      : []),
  );

  const optionalOption = Optional(optional);

  return applyDecorators(
    ...(transform ? [Type(() => String)] : []),
    swaggerMainOption,
    validatorMainOption,
    optionalOption,
  );
}
