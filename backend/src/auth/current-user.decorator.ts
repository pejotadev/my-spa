import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // For GraphQL context
    const context = ctx.getArgByIndex(2);
    const request = context?.req;
    return request?.user;
  },
);
