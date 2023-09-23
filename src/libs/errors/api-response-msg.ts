import {
  HttpException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

export class ApiResponseMsg {
  static successResponseWithPagination(
    message: string,
    data: any,
    status: number = 200,
  ) {
    return {
      status,
      message,
      meta: data.meta,
      data: data.results || data,
    };
  }

  static successResponse(
    message: string = 'success',
    data?: any,
    status: number = 200,
  ) {
    return { status, message, data };
  }



  static errorResponse(message: string = 'failed', status: number) {
    throw new HttpException(message, status,);
  }


  static notFoundResponse(message = 'Not found', errors?, status = 404) {
    throw new NotFoundException({
      message: message,
      ...errors,
      status
    });
  }


}
