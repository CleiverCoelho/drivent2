import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';
import { PaymentReq } from '@/protocols';

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const ticketId = parseInt(req.query.ticketId as string);
    
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
        if (error.name === 'BadRequestError') {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: error.message,
            });
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
    }
}

export async function postPaymentProcess(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const process = req.body as PaymentReq;

    try {
        const result = await paymentService.postPaymentProcess(process, userId);
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


