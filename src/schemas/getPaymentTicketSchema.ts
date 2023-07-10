import Joi from 'joi';

export const getPaymentTicketSchema = Joi.object({
  ticketId: Joi.string().required()
});