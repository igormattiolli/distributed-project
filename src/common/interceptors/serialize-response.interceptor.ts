import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SerializerDecoratorName } from '../enums/decorator-names.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ResponseSerializerInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((body) => {
                const classConstructor = this.reflector.get(
                    SerializerDecoratorName.SERIALIZE_RESPONSE,
                    context.getHandler(),
                );
                return classConstructor
                    ? plainToInstance(classConstructor, body)
                    : body;
            }),
        );
    }
}
