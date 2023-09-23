import { Like, Repository } from 'typeorm';
import { TypeOrmMethodsInterface } from './find.interface';
import { ServiceOptions } from './serviceOptions.interfaces';

export class TypeOrmMethods_Find {
  constructor(
    public readonly entityRepository: Repository<any>,
    public serviceOptions ?: ServiceOptions,
  ) {
    console.log('@@@@@@@@@@@@@@@{serviceOptions}', this.serviceOptions);
  }

  // find a single record by specific key
  async FindOneBy(query: TypeOrmMethodsInterface) {
    const data = await this.entityRepository.findOne({
      ...query,
      loadEagerRelations: false,
    });

    return data;
  }

  // // make filter dynamic 
  // setFilter(filters) {
  //   Object.keys(filters).forEach((filter) => {
  //     if (typeof filters[filter] == 'string') {
  //       this.serviceOptions.filter[filter] = Like(`%${filters[filter]}%`);
  //     } else {
  //       this.serviceOptions.filter[filter] = filters[filter];
  //     }
  //   });
  // }
  // find with pagination
  async FindAllPagination({products:productsArray}: any) {
    // this.setFilter(filters);
    // pagination
    const skip = (this.serviceOptions.page - 1) * this.serviceOptions.limit;
    const take = skip +this.serviceOptions.limit;
    // do find
    let results = productsArray.slice(skip,take);
    let total = productsArray.length
    let totalPages = 0;
    // if has records
    if (total) {
      totalPages = Math.ceil(total / this.serviceOptions.limit);
    }
    // clear filter
    // this.serviceOptions.filter = {};

    let response: any = null;
    if (total > 0) {
      response = {
        meta: {
          total: Number(total),
          per_page: Number(results.length),
          total_pages: Number(totalPages),
          current_page: Number(this.serviceOptions.page),
        },
        results: results,
      };
    } else {
      response = {
        meta: {
          total: Number(total),
          per_page: Number(results.length),
          total_pages: Number(totalPages),
          current_page: Number(this.serviceOptions.page),
        },
        results: [],
      };
    }

    return response;
  }
}
