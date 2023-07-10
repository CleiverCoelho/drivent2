import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketType, getUserTicket } from '@/controllers/ticket-controller';
import { ticketSchema } from '@/schemas';

const ticketRouter = Router();

// ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types', authenticateToken, getTicketType);
ticketRouter.get('/', authenticateToken, getUserTicket);
ticketRouter.post('/', authenticateToken, validateBody(ticketSchema), createTicket);


export { ticketRouter };
