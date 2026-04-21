import { NotFoundException } from '@nestjs/common';

export class DataNotFoundException extends NotFoundException {
  constructor(message: string = 'Data not found') {
    super(message);
  }
}
