import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketType(req: AuthenticatedRequest, res: Response) {

  try {
    const result = await ticketService.getTicketType();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
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
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;

    try {
      const result = await ticketService.getUserTicket(userId);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
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

      return res.status(httpStatus.NOT_FOUND).send({});
    }
  }

  export async function createTicket(req: AuthenticatedRequest, res: Response) {

    const ticketTypeId = req.body.ticketTypeId;
    const userId = req.userId;

    try {

      const result = await ticketService.createTicket(userId, ticketTypeId);
      return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
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

      return res.status(httpStatus.BAD_REQUEST).send({});
    }
  }
