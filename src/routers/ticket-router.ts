import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { getTicketType, getUserTicket } from '@/controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken)
ticketRouter.get('/types', getTicketType);
ticketRouter.get('/', getUserTicket);

export { ticketRouter };
