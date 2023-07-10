import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketType, getUserTicket } from '@/controllers/ticket-controller';
import { ticketSchema } from '@/schemas';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types', getTicketType);
ticketRouter.get('/', getUserTicket);
ticketRouter.post('/', validateBody(ticketSchema), createTicket);


export { ticketRouter };
