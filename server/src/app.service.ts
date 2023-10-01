import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor() {

  }

  getStatus(): string {
    return 'Server working.';
  }
}
