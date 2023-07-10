import { Request, Response } from 'express';
import httpStatus, { BAD_REQUEST } from 'http-status';
import { TicketType } from '@/protocols';
import ticketService from '@/services/tickets-service';
import { notFoundError } from '@/errors';

export async function getTicketType(req: Request, res: Response) {

  try {
    const result = await ticketService.getTicketType();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getUserTicket(req: Request, res: Response) {

    const userId = res.locals.userId;

    try {
      const result = await ticketService.getUserTicket(userId);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }

  export async function createTicket(req: Request, res: Response) {

    const userId = res.locals.userId;
    const ticketTypeId = req.body.ticketTypeId;
    // const ticketTypeId = req.body.userId;

    try {

      const result = await ticketService.createTicket(userId, ticketTypeId);
      // console.log(result);
      return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }
