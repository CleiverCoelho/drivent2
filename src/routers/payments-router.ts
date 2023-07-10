import { Router } from 'express';

import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { getPaymentTicketSchema } from '@/schemas/getPaymentTicketSchema';
import { getPaymentByTicket, postPaymentProcess } from '@/controllers/payments-controller';
import { postPaymentTicketSchema } from '@/schemas/postPaymentSchema';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getPaymentByTicket);
paymentsRouter.post('/process', validateBody(postPaymentTicketSchema), postPaymentProcess)

export { paymentsRouter };
