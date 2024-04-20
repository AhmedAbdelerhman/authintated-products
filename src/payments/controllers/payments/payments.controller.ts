import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {



    @Get()
    getPayment(@Req() request, @Res() response) {

        const { count, page } = request.query
        if (!count || !page) {
            response.status(400).send({ mesg: "missing " })
        }
        else {
            response.send(200)
        }
    }
}
