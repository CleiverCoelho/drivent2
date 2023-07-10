import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const ticketId : number = parseInt(req.params.ticketId);
    console.log(ticketId)
    try {
        const result = await paymentService.getPaymentByTicket(ticketId, userId);
        return res.status(httpStatus.OK).send(result);
    }
    catch(error){
        if (error.name === 'UnauthorizedError') {
            return res.status(httpStatus.UNAUTHORIZED).send({
              message: error.message,
            });
          }
        if (error.name === 'NotFoundError') {
        return res.status(httpStatus.NOT_FOUND).send({
            message: error.message,
        });
        }
        console.log(error)

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
    }
}


