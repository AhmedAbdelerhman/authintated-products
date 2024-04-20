import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;
   const Request ={
    query:{}
   } as Request

   const Response ={
     status: {

       send: jest.fn((x) => x)
     }
   } as unknown as Response
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });


  describe("getpayment",()=>{
    it("should return status 200", ()=>{
      controller.getPayment(Request , Response)
      expect(Response.status).toHaveBeenCalledWith(400)
    })
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
