import { PageOptionsDto } from '@app/libs/pagination/pageOption.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UsersGuard } from './guards/users.guard';
import { ProductsService } from './products.service';

@Controller("v1")
@ApiTags('get products') // Optional: Add tags for better organization

export class ProductsController {



  constructor(private readonly productsService: ProductsService) {
   }


  @UseGuards(UsersGuard)
  @Get("auth-products")
  @Throttle({ default: { limit:+process.env.authApiRatLimit ||30, ttl: +process.env.ttlRatLimit ||300 } })
  @ApiOperation({ summary: 'Get a list of items with authorization' })
  @ApiQuery({ name: 'page', required: true, description: 'pagination' })
  @ApiQuery({ name: 'limit', required: true, description: ' number of products per page ' })
  @ApiBearerAuth() 
  authProducts(@Query() pageOptionsDto: PageOptionsDto,) {
    return this.productsService.findAllProducts(pageOptionsDto, "./auth-data.json")
  }

  @Throttle({ default: { limit:+process.env.publicApiRatLimit ||30, ttl: +process.env.ttlRatLimit ||300 } })
  @Get("public-products")
  @ApiOperation({ summary: 'Get a list of items without authorization' })
  @ApiQuery({ name: 'page', required: true, description: 'pagination' })
  @ApiQuery({ name: 'limit', required: true, description: ' number of products per page ' })
  
  publicProducts(@Query() pageOptionsDto: PageOptionsDto,) {
    return this.productsService.findAllProducts(pageOptionsDto, "./public-data.json")
  }


}
