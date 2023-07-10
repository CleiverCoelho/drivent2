import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { getTicketType, getUserTicket } from '@/controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter.get('/types', authenticateToken, getTicketType);
ticketRouter.get('/', authenticateToken, getUserTicket);

export { ticketRouter };
