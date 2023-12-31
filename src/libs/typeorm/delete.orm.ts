import { ApiResponseMsg } from '../errors/api-response-msg';
import { IsNull, Not, Repository } from 'typeorm';
import { ServiceOptions } from './serviceOptions.interfaces';

export class TypeOrmMethods_Delete {
  constructor(public readonly entityRepository: Repository<any>) {}

  //  delete a record
  async delete(id: any) {
    // check record first
    const record = await this.entityRepository.findOne({
      where: {
        id,
      },
    });

    if (record) {
      await this.entityRepository.delete(id);
      // return success message
      return ApiResponseMsg.successResponse(
        `element with id = ${id}  deleted successfully`,
      );
    } else {
      // return not found message
      return ApiResponseMsg.notFoundResponse(
        `element with id = ${id} not found`,
      );
    }
  }
}
