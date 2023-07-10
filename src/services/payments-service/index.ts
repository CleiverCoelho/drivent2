import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentReq } from '@/protocols';
import { Payment } from '@prisma/client';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepositorie from '@/repositories/payments-repositorie';
import ticketRepositorie from '@/repositories/tickets-repository';
import { badRequestError } from '@/errors/bad-request-error';

async function getPaymentByTicket(ticketId : number, userId: number) {
  
  if(!ticketId) throw badRequestError();
  
  const ticket = await ticketRepositorie.getTicketById(ticketId);
  if(!ticket) throw notFoundError();

  const userEnrollmentInfo = await enrollmentRepository.getUserEnrollmentInfo(userId);
  const isUserTicket = await ticketRepositorie.getUserTicket(userEnrollmentInfo.id);
  if(!isUserTicket) throw unauthorizedError();
  
  const result = await paymentsRepositorie.getPaymentByTicket(ticketId);
  return result;
}

async function postPaymentProcess(process : PaymentReq, userId: number) {
  const ticket = await ticketRepositorie.getTicketById(process.ticketId);
  if(!ticket) throw notFoundError();

  const userEnrollmentInfo = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);

  if(userEnrollmentInfo.userId !== userId) throw unauthorizedError();

  type CreatePayment = Omit<Payment, 'id'>;

  const lastDigist = process.cardData.number.toString();

  const payment : CreatePayment = {
    ticketId: ticket.id,
    value: ticket.TicketType.price,
    cardIssuer: process.cardData.issuer,
    cardLastDigits: lastDigist.substring(lastDigist.length - 4, lastDigist.length),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  const result = await paymentsRepositorie.postPaymentProcess(payment);
  const updated = await ticketRepositorie.updateTicketStatus(ticket.id, 'PAID');
  return result;
}


const paymentService = {
  getPaymentByTicket,
  postPaymentProcess
};

export default paymentService;
