import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TicketType } from '@/protocols';
import ticketService from '@/services/tickets-service';

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
