import { notFoundError } from '@/errors';
import ticketRepositorie from '@/repositories/tickets-repository';

async function getTicketType() {
    const result = await ticketRepositorie.getTicketType();
    return result;
}

async function getUserTicket(userId: number) {
    const result = await ticketRepositorie.getUserTicket(userId);
    
    if(!result) throw notFoundError();
    
    return result;
}

async function createTicket(userId: number, ticketTypeId: number) {
  
  const userEnrollmentInfo = await ticketRepositorie.getUserEnrollmentInfo(userId);
  if(!userEnrollmentInfo) throw notFoundError();

  const result = await ticketRepositorie.createTicket(userEnrollmentInfo.id, ticketTypeId);
  if(!result) throw notFoundError();
  
  return result;
}

const ticketService = {
  getTicketType,
  getUserTicket,
  createTicket
};

export default ticketService
