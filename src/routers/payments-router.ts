import { Router } from 'express';

import { authenticateToken, validateParams } from '@/middlewares';
import { getPaymentTicketSchema } from '@/schemas/getPaymentTicketSchema';
import { getPaymentByTicket } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', validateParams(getPaymentTicketSchema), getPaymentByTicket);


export { paymentsRouter };
