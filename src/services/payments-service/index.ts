import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepositorie from '@/repositories/payments-repositorie';
import ticketRepositorie from '@/repositories/tickets-repository';

async function getPaymentByTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepositorie.getTicketById(ticketId);
  if(!ticket) throw notFoundError();

  const userEnrollmentInfo = await enrollmentRepository.getUserEnrollmentInfo(userId);
  const isUserTicket = await ticketRepositorie.getUserTicket(userEnrollmentInfo.id);
  if(!isUserTicket) throw unauthorizedError();

  const result = await paymentsRepositorie.getPaymentByTicket(ticketId);

  return result;
}


const paymentService = {
  getPaymentByTicket
};

export default paymentService;
